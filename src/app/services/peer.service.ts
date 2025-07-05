import { Injectable, signal } from '@angular/core';
import { Peer, DataConnection } from 'peerjs';

export interface PeerMessage {
  type: 'position' | 'element-click' | 'camera-sync' | 'connection-established' | 'heartbeat';
  data: any;
  timestamp: number;
  sender?: string; // 'self' for sent messages, peer ID for received messages
}

export interface PeerRole {
  peerId: string;
  role: 'HOST' | 'CLIENT';
}

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  private peer!: Peer;
  private connections = new Map<string, DataConnection>();
  private connectionRoles = new Map<string, 'HOST' | 'CLIENT'>(); // Track connection roles
  private myRole: 'HOST' | 'CLIENT' | null = null; // Track my role
  
  // Signals for reactive state
  peerId = signal<string>('');
  isConnected = signal<boolean>(false);
  connectedPeers = signal<string[]>([]);
  lastMessage = signal<PeerMessage | null>(null);
  messageHistory = signal<PeerMessage[]>([]);
  peerRoles = signal<{peerId: string, role: 'HOST' | 'CLIENT'}[]>([]);

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
      
      // Only add connection if it's not already in the map (incoming connections)
      if (!this.connections.has(conn.peer)) {
        this.connections.set(conn.peer, conn);
        
        // Determine role based on connection direction
        const isInitiator = conn.metadata?.initiator === true;
        const role = isInitiator ? 'CLIENT' : 'HOST';
        this.connectionRoles.set(conn.peer, role);
        
        // Set my role (opposite of peer role)
        this.myRole = isInitiator ? 'HOST' : 'CLIENT';
        
        console.log(`Role assigned: You are ${this.myRole}, peer ${conn.peer} is ${role}`);
        
        this.updateConnectedPeers();
      }
      
      // Send acknowledgment for incoming connections with role info
      const isInitiator = conn.metadata?.initiator === true;
      if (!isInitiator) {
        const ackMessage: PeerMessage = {
          type: 'connection-established',
          data: { 
            message: `Connection acknowledged by ${this.peerId()} (HOST)`,
            yourRole: 'CLIENT',
            myRole: 'HOST'
          },
          timestamp: Date.now()
        };
        conn.send(ackMessage);
      }
    });

    conn.on('data', (data) => {
      console.log('=== MESSAGE RECEIVED ===');
      console.log('Received data from', conn.peer, ':', data);
      console.log('My role:', this.myRole);
      console.log('Sender role:', this.connectionRoles.get(conn.peer));
      
      const message = data as PeerMessage;
      
      // Add sender info and to message history
      const receivedMessage = { ...message, sender: conn.peer };
      const currentHistory = this.messageHistory();
      console.log('Current history length before adding:', currentHistory.length);
      this.messageHistory.set([...currentHistory, receivedMessage].slice(-10)); // Keep last 10 messages
      console.log('New history length after adding:', this.messageHistory().length);
      console.log('Message added to history:', receivedMessage);
      
      // Update last message
      this.lastMessage.set(message);
      
      // Handle connection establishment messages
      if (message.type === 'connection-established') {
        console.log('Bidirectional connection confirmed with:', conn.peer);
      }
      
      console.log('=== END MESSAGE RECEIVED ===');
    });

    conn.on('close', () => {
      console.log('Connection closed with:', conn.peer);
      this.connections.delete(conn.peer);
      this.connectionRoles.delete(conn.peer);
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

      const conn = this.peer.connect(peerId, {
        metadata: { initiator: true }
      });
      
      conn.on('open', () => {
        console.log('Connected to peer:', peerId);
        
        // Set my role as CLIENT (I'm initiating the connection)
        this.myRole = 'CLIENT';
        
        // Add connection to map BEFORE setting up events
        this.connections.set(peerId, conn);
        this.connectionRoles.set(peerId, 'HOST'); // The peer I'm connecting to is HOST
        this.updateConnectedPeers();
        
        this.setupConnectionEvents(conn);
        
        // Send a hello message to establish bidirectional communication with role info
        const helloMessage: PeerMessage = {
          type: 'connection-established',
          data: { 
            message: `Hello from ${this.peerId()} (CLIENT)`,
            yourRole: 'HOST',
            myRole: 'CLIENT'
          },
          timestamp: Date.now()
        };
        conn.send(helloMessage);
        
        resolve(true);
      });

      conn.on('error', (error) => {
        console.error('Failed to connect to peer:', peerId, error);
        reject(error);
      });

      // Set a timeout for connection attempts
      setTimeout(() => {
        if (!conn.open) {
          reject(new Error('Connection timeout'));
        }
      }, 10000); // 10 second timeout
    });
  }

  sendMessage(message: PeerMessage) {
    message.timestamp = Date.now();
    
    console.log('=== SEND MESSAGE DEBUG ===');
    console.log('sendMessage called with:', message);
    console.log('Connected peers count:', this.connections.size);
    console.log('My role:', this.myRole);
    console.log('Connections map:', Array.from(this.connections.keys()));
    console.log('connectedPeers signal:', this.connectedPeers());
    
    // Check if we have any active connections
    if (this.connections.size === 0) {
      console.warn('No connections available to send message');
      return;
    }
    
    // Add to our own message history with sender info
    const sentMessage = { ...message, sender: 'self' };
    const currentHistory = this.messageHistory();
    console.log('Adding message to history. Current history length:', currentHistory.length);
    this.messageHistory.set([...currentHistory, sentMessage].slice(-10));
    console.log('Message added to history. New history length:', this.messageHistory().length);
    
    let sentCount = 0;
    this.connections.forEach((conn, peerId) => {
      console.log(`Checking connection to ${peerId}: open=${conn.open}, readyState=${conn.peerConnection?.connectionState}`);
      if (conn.open) {
        try {
          conn.send(message);
          sentCount++;
          console.log('Successfully sent message to', peerId, ':', message);
        } catch (error) {
          console.error('Failed to send message to', peerId, ':', error);
        }
      } else {
        console.log('Connection to', peerId, 'is not ready for sending');
      }
    });
    
    console.log(`Message sent to ${sentCount} peer(s)`);
    console.log('=== END SEND MESSAGE DEBUG ===');
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
    this.connectionRoles.clear();
    this.myRole = null; // Clear my role
    this.peer.destroy();
    this.isConnected.set(false);
    this.updateConnectedPeers();
  }

  getMyRole(): 'HOST' | 'CLIENT' | null {
    return this.myRole;
  }

  private updateConnectedPeers() {
    const peerIds = Array.from(this.connections.keys()).filter(
      peerId => this.connections.get(peerId)?.open
    );
    this.connectedPeers.set(peerIds);
    
    // Update peer roles
    const roles = peerIds.map(peerId => ({
      peerId: peerId,
      role: this.connectionRoles.get(peerId) || 'UNKNOWN' as 'HOST' | 'CLIENT'
    }));
    this.peerRoles.set(roles);
  }
}
