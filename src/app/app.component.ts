import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './components/experience.component';
import { PeerConnectionComponent } from './components/peer-connection.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative w-full h-full">
      <ngt-canvas 
        [sceneGraph]="sceneGraph"
        [camera]="{ position: [0, 0, 20], fov: 50 }"
        [gl]="glConfig"
        style="width: 100%; height: 100%; display: block;" />
      <app-peer-connection />
    </div>
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas, PeerConnectionComponent],
})
export class AppComponent {
  sceneGraph = Experience;
  glConfig = {
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: false
  };
  
  constructor() {
    console.log('AppComponent initialized');
    console.log('SceneGraph:', this.sceneGraph);
  }
}
