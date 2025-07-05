import { Component, signal, effect, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeerService } from '../services/peer.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-peer-connection',
  templateUrl: './peer-connection.component.html',
  styleUrl: './peer-connection.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class PeerConnectionComponent implements OnInit {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  targetPeerId = signal<string>('');
  connecting = signal<boolean>(false);
  showQR = signal<boolean>(false);
  qrDataUrl = signal<string>('');

  constructor(
    public peerService: PeerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Listen for peer ID changes to generate QR code
    effect(() => {
      const peerId = this.peerService.peerId();
      if (peerId) {
        this.generateQRCode(peerId);
      }
    });
  }

  ngOnInit() {
    // Check for peer ID in URL parameters
    this.route.queryParams.subscribe(params => {
      const peerIdFromUrl = params['peerId'];
      if (peerIdFromUrl && peerIdFromUrl !== this.peerService.peerId()) {
        this.targetPeerId.set(peerIdFromUrl);
        // Auto-connect if peer ID is provided in URL
        setTimeout(() => {
          this.connectToPeer();
        }, 1000); // Wait for peer service to initialize
      }
    });
  }

  async connectToPeer() {
    const peerId = this.targetPeerId().trim();
    if (!peerId) return;

    this.connecting.set(true);
    try {
      await this.peerService.connectToPeer(peerId);
      this.targetPeerId.set('');
      // Clear URL parameters after successful connection
      this.router.navigate([], { queryParams: {} });
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect to peer');
    } finally {
      this.connecting.set(false);
    }
  }

  copyPeerId() {
    const peerId = this.peerService.peerId();
    if (peerId) {
      navigator.clipboard.writeText(peerId).then(() => {
        console.log('Peer ID copied to clipboard');
      });
    }
  }

  async generateQRCode(peerId: string) {
    try {
      const currentUrl = window.location.origin + window.location.pathname;
      const qrUrl = `${currentUrl}?peerId=${encodeURIComponent(peerId)}`;
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      this.qrDataUrl.set(dataUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  }

  toggleQR() {
    this.showQR.set(!this.showQR());
  }

  shareUrl() {
    const peerId = this.peerService.peerId();
    if (peerId) {
      const currentUrl = window.location.origin + window.location.pathname;
      const shareUrl = `${currentUrl}?peerId=${encodeURIComponent(peerId)}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Connect to 3D Periodic Table',
          text: 'Join my 3D Periodic Table session!',
          url: shareUrl
        });
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Share URL copied to clipboard!');
        });
      }
    }
  }

  formatMessage(message: any): string {
    return JSON.stringify(message, null, 2);
  }
}
