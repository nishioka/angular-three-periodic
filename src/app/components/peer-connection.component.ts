import { Component, signal, effect, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
export class PeerConnectionComponent implements OnInit, OnDestroy {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  targetPeerId = signal<string>('');
  connecting = signal<boolean>(false);
  showQR = signal<boolean>(false);
  qrDataUrl = signal<string>('');
  
  // Camera angle controls
  cameraAngleX = signal<number>(0);
  cameraAngleY = signal<number>(0);
  cameraDistance = signal<number>(20);
  
  // Gyroscope controls
  gyroEnabled = signal<boolean>(false);
  gyroSupported = signal<boolean>(false);
  gyroPermission = signal<string>('default'); // 'granted', 'denied', 'default'

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

    // Listen for camera sync messages from peers
    effect(() => {
      const message = this.peerService.lastMessage();
      if (message && message.type === 'camera-sync') {
        this.updateCameraFromPeer(message.data);
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
    
    // Check gyroscope support
    this.checkGyroscopeSupport();
  }

  ngOnDestroy() {
    // Clean up gyroscope event listener
    if (this.gyroEnabled()) {
      this.disableGyroscope();
    }
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

  sendTestMessage() {
    const testMessage = {
      type: 'element-click' as const,
      data: {
        element: {
          name: 'Test Element',
          symbol: 'Te',
          atomicNumber: 99,
          category: 'test'
        },
        position: [0, 0, 0]
      },
      timestamp: Date.now()
    };
    
    this.peerService.sendMessage(testMessage);
    console.log('Test message sent:', testMessage);
  }

  formatMessage(message: any): string {
    return JSON.stringify(message, null, 2);
  }

  // Camera angle control methods
  onCameraAngleXChange(value: number) {
    this.cameraAngleX.set(value);
    this.sendCameraSync();
  }

  onCameraAngleYChange(value: number) {
    this.cameraAngleY.set(value);
    this.sendCameraSync();
  }

  onCameraDistanceChange(value: number) {
    this.cameraDistance.set(value);
    this.sendCameraSync();
  }

  private sendCameraSync() {
    const cameraMessage = {
      type: 'camera-sync' as const,
      data: {
        angleX: this.cameraAngleX(),
        angleY: this.cameraAngleY(),
        distance: this.cameraDistance()
      },
      timestamp: Date.now()
    };
    
    this.peerService.sendMessage(cameraMessage);
  }

  private updateCameraFromPeer(cameraData: { angleX: number, angleY: number, distance: number }) {
    console.log('Updating camera controls from peer:', cameraData);
    
    // Only update if gyroscope is not controlling the camera
    if (!this.gyroEnabled()) {
      this.cameraAngleX.set(cameraData.angleX);
      this.cameraAngleY.set(cameraData.angleY);
    }
    
    // Always update distance
    this.cameraDistance.set(cameraData.distance);
  }

  getMyRole(): 'HOST' | 'CLIENT' | null {
    return this.peerService.getMyRole();
  }

  // Gyroscope methods
  checkGyroscopeSupport() {
    if ('DeviceOrientationEvent' in window) {
      this.gyroSupported.set(true);
      console.log('Gyroscope is supported');
      
      // Check for permission API (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        console.log('Permission API available');
      } else {
        // Android or older iOS - permission likely granted
        this.gyroPermission.set('granted');
      }
    } else {
      this.gyroSupported.set(false);
      console.log('Gyroscope is not supported');
    }
  }

  async requestGyroscopePermission() {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        this.gyroPermission.set(permission);
        
        if (permission === 'granted') {
          this.enableGyroscope();
        }
        
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting gyroscope permission:', error);
        this.gyroPermission.set('denied');
        return false;
      }
    } else {
      // No permission needed or already granted
      this.gyroPermission.set('granted');
      this.enableGyroscope();
      return true;
    }
  }

  enableGyroscope() {
    if (!this.gyroSupported()) {
      console.log('Gyroscope not supported');
      return;
    }

    this.gyroEnabled.set(true);
    
    window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this), true);
    console.log('Gyroscope enabled');
  }

  disableGyroscope() {
    this.gyroEnabled.set(false);
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation.bind(this), true);
    console.log('Gyroscope disabled');
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    if (!this.gyroEnabled()) return;

    // Get orientation values
    const alpha = event.alpha || 0; // Z axis (0-360)
    const beta = event.beta || 0;   // X axis (-180 to 180)
    const gamma = event.gamma || 0; // Y axis (-90 to 90)

    console.log(`Gyro: alpha=${alpha.toFixed(1)}, beta=${beta.toFixed(1)}, gamma=${gamma.toFixed(1)}`);

    // Map gyroscope values to camera angles
    // Alpha (compass heading) -> horizontal rotation
    const angleX = alpha - 180; // Center around 0
    
    // Beta (front/back tilt) -> vertical rotation
    const angleY = Math.max(-45, Math.min(45, beta)); // Limit range
    
    // Update camera angles (but keep current distance)
    this.cameraAngleX.set(angleX);
    this.cameraAngleY.set(angleY);
    
    // Send camera sync
    this.sendCameraSync();
  }

  toggleGyroscope() {
    if (!this.gyroEnabled()) {
      if (this.gyroPermission() === 'granted') {
        this.enableGyroscope();
      } else {
        this.requestGyroscopePermission();
      }
    } else {
      this.disableGyroscope();
    }
  }
}
