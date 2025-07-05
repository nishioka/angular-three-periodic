import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeerService } from '../services/peer.service';

@Component({
  selector: 'app-peer-connection',
  templateUrl: './peer-connection.component.html',
  styleUrl: './peer-connection.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class PeerConnectionComponent {
  targetPeerId = signal<string>('');
  connecting = signal<boolean>(false);

  constructor(public peerService: PeerService) {}

  async connectToPeer() {
    const peerId = this.targetPeerId().trim();
    if (!peerId) return;

    this.connecting.set(true);
    try {
      await this.peerService.connectToPeer(peerId);
      this.targetPeerId.set('');
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

  formatMessage(message: any): string {
    return JSON.stringify(message, null, 2);
  }
}
