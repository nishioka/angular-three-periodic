import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './components/experience.component';

@Component({
  selector: 'app-root',
  template: `
    <ngt-canvas 
      [sceneGraph]="sceneGraph"
      [camera]="{ position: [0, 0, 20], fov: 50 }"
      style="width: 100%; height: 100%; display: block;" />
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas],
})
export class AppComponent {
  sceneGraph = Experience;
  
  constructor() {
    console.log('AppComponent initialized');
    console.log('SceneGraph:', this.sceneGraph);
  }
}
