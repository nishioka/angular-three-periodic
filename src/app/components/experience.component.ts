import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  viewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { extend, injectStore } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { 
  BoxGeometry, 
  Mesh, 
  MeshStandardMaterial, 
  AmbientLight, 
  DirectionalLight, 
  CanvasTexture 
} from 'three';
import { periodicElements } from '../data/periodic-elements';
import { ElementCube } from './element-cube.component';
import { PeerService, PeerMessage } from '../services/peer.service';

@Component({
  templateUrl: './experience.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElementCube, NgtsOrbitControls],
})
export class Experience {
  elements = periodicElements;
  
  // Camera control
  private orbitControlsRef = viewChild<ElementRef>('orbitControls');
  private store = injectStore();
  cameraAngleX = signal<number>(0);
  cameraAngleY = signal<number>(0);  
  cameraDistance = signal<number>(20);

  constructor(private peerService: PeerService) {
    console.log('Periodic Table Experience component initialized with P2P support');
    extend({ 
      Mesh, 
      BoxGeometry, 
      MeshStandardMaterial,
      AmbientLight,
      DirectionalLight,
      CanvasTexture
    });

    // Listen for incoming peer messages
    effect(() => {
      const message = this.peerService.lastMessage();
      if (message) {
        this.handlePeerMessage(message);
      }
    });
  }
  
  getElementPosition(element: any): [number, number, number] {
    // 周期表の位置に基づいて3D座標を計算
    const x = (element.group - 1) * 1.2 - 10; // group 1-18 を中央揃え
    const y = -(element.period - 1) * 1.2 + 2; // period 1-7 を上から下へ
    const z = 0;
    
    return [x, y, z];
  }

  onElementClick(element: any) {
    console.log('=== ELEMENT CLICK ===');
    console.log(`Element clicked: ${element.name} (${element.symbol})`);
    console.log('My role:', this.peerService.getMyRole());
    console.log('Connected peers:', this.peerService.connectedPeers());
    
    // Broadcast element click to connected peers
    const message: PeerMessage = {
      type: 'element-click',
      data: {
        element: element,
        position: this.getElementPosition(element),
        clickedBy: this.peerService.peerId()
      },
      timestamp: Date.now()
    };
    
    console.log('Sending element click message:', message);
    this.peerService.sendMessage(message);
    console.log('=== END ELEMENT CLICK ===');
  }

  private handlePeerMessage(message: PeerMessage) {
    console.log('=== HANDLING PEER MESSAGE ===');
    console.log('Message type:', message.type);
    console.log('Message data:', message.data);
    console.log('Message sender:', message.sender);
    console.log('My role:', this.peerService.getMyRole());
    
    switch (message.type) {
      case 'element-click':
        console.log(`Peer clicked element: ${message.data.element.name}`);
        console.log('Element click data:', message.data);
        // You can add visual feedback here, like highlighting the element
        this.highlightElement(message.data.element);
        break;
      
      case 'camera-sync':
        console.log('Peer camera sync:', message.data);
        this.applyCameraSync(message.data);
        break;
      
      case 'position':
        console.log('Peer position update:', message.data);
        // Handle position updates
        break;
      
      case 'connection-established':
        console.log('Connection established with peer:', message.data.message);
        break;
      
      case 'heartbeat':
        console.log('Heartbeat from peer:', message.data);
        break;
      
      default:
        console.log('Unknown message type:', message.type);
    }
    console.log('=== END HANDLING PEER MESSAGE ===');
  }

  private highlightElement(element: any) {
    // Add temporary visual feedback for peer interactions
    console.log(`Highlighting element ${element.symbol} due to peer interaction`);
    // You can implement visual highlighting here
  }

  private applyCameraSync(cameraData: { angleX: number, angleY: number, distance: number }) {
    console.log('Applying camera sync:', cameraData);
    
    // Update local camera state
    this.cameraAngleX.set(cameraData.angleX);
    this.cameraAngleY.set(cameraData.angleY);
    this.cameraDistance.set(cameraData.distance);
    
    // Get camera from angular-three store
    const camera = this.store.snapshot.camera;
    
    if (camera) {
      console.log('Camera found via store');
      
      // Convert angles to radians for Three.js
      const azimuthAngle = (cameraData.angleX * Math.PI) / 180;
      const polarAngle = Math.max(0.1, Math.min(Math.PI - 0.1, ((90 - cameraData.angleY) * Math.PI) / 180));
      
      // Set camera position based on spherical coordinates
      const x = cameraData.distance * Math.sin(polarAngle) * Math.cos(azimuthAngle);
      const y = cameraData.distance * Math.cos(polarAngle);
      const z = cameraData.distance * Math.sin(polarAngle) * Math.sin(azimuthAngle);
      
      console.log('Setting camera position to:', { x, y, z });
      
      // Update camera position
      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      
      console.log('Camera position updated via store');
    } else {
      console.warn('Camera not found in store');
    }
  }
}
