import { Injectable, signal } from '@angular/core';
import { Peer, DataConnection } from 'peerjs';

export interface PeerMessage {
  type: 'position' | 'element-click' | 'camera-sync';
  data: any;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  private peer!: Peer;
  private connections = new Map<string, DataConnection>();
  
  // Signals for reactive state
  peerId = signal<string>('');
  isConnected = signal<boolean>(false);
  connectedPeers = signal<string[]>([]);
  lastMessage = signal<PeerMessage | null>(null);

  constructor() {
    this.initializePeer();
  }

  private initializePeer() {
    // Use public PeerJS server
    this.peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });

    this.setupPeerEvents();
  }

  private setupPeerEvents() {
    this.peer.on('open', (id) => {
      console.log('Peer connection opened with ID:', id);
      this.peerId.set(id);
      this.isConnected.set(true);
    });

    this.peer.on('connection', (conn) => {
      console.log('Incoming connection from:', conn.peer);
      this.setupConnectionEvents(conn);
    });

    this.peer.on('error', (error) => {
      console.error('Peer error:', error);
      this.isConnected.set(false);
    });

    this.peer.on('disconnected', () => {
      console.log('Peer disconnected');
      this.isConnected.set(false);
    });
  }

  private setupConnectionEvents(conn: DataConnection) {
    conn.on('open', () => {
      console.log('Connection established with:', conn.peer);
      this.connections.set(conn.peer, conn);
      this.updateConnectedPeers();
    });

    conn.on('data', (data) => {
      console.log('Received data from', conn.peer, ':', data);
      this.lastMessage.set(data as PeerMessage);
    });

    conn.on('close', () => {
      console.log('Connection closed with:', conn.peer);
      this.connections.delete(conn.peer);
      this.updateConnectedPeers();
    });

    conn.on('error', (error) => {
      console.error('Connection error with', conn.peer, ':', error);
    });
  }

  connectToPeer(peerId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.connections.has(peerId)) {
        console.log('Already connected to:', peerId);
        resolve(true);
        return;
      }

      const conn = this.peer.connect(peerId);
      
      conn.on('open', () => {
        console.log('Connected to peer:', peerId);
        this.setupConnectionEvents(conn);
        resolve(true);
      });

      conn.on('error', (error) => {
        console.error('Failed to connect to peer:', peerId, error);
        reject(error);
      });
    });
  }

  sendMessage(message: PeerMessage) {
    message.timestamp = Date.now();
    this.connections.forEach((conn, peerId) => {
      if (conn.open) {
        conn.send(message);
        console.log('Sent message to', peerId, ':', message);
      }
    });
  }

  sendToSpecificPeer(peerId: string, message: PeerMessage) {
    const conn = this.connections.get(peerId);
    if (conn && conn.open) {
      message.timestamp = Date.now();
      conn.send(message);
      console.log('Sent message to', peerId, ':', message);
    }
  }

  disconnect() {
    this.connections.forEach((conn) => {
      conn.close();
    });
    this.connections.clear();
    this.peer.destroy();
    this.isConnected.set(false);
    this.updateConnectedPeers();
  }

  private updateConnectedPeers() {
    const peerIds = Array.from(this.connections.keys()).filter(
      peerId => this.connections.get(peerId)?.open
    );
    this.connectedPeers.set(peerIds);
  }
}
