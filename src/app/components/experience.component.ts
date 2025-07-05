import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  effect,
} from '@angular/core';
import { extend } from 'angular-three';
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
    console.log(`Element clicked: ${element.name} (${element.symbol})`);
    
    // Broadcast element click to connected peers
    const message: PeerMessage = {
      type: 'element-click',
      data: {
        element: element,
        position: this.getElementPosition(element)
      },
      timestamp: Date.now()
    };
    
    this.peerService.sendMessage(message);
  }

  private handlePeerMessage(message: PeerMessage) {
    console.log('Handling peer message:', message);
    
    switch (message.type) {
      case 'element-click':
        console.log(`Peer clicked element: ${message.data.element.name}`);
        // You can add visual feedback here, like highlighting the element
        this.highlightElement(message.data.element);
        break;
      
      case 'camera-sync':
        console.log('Peer camera position:', message.data);
        // Implement camera synchronization if needed
        break;
      
      case 'position':
        console.log('Peer position update:', message.data);
        // Handle position updates
        break;
      
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  private highlightElement(element: any) {
    // Add temporary visual feedback for peer interactions
    console.log(`Highlighting element ${element.symbol} due to peer interaction`);
    // You can implement visual highlighting here
  }
}
