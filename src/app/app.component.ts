import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './experience/experience.component';

@Component({
  selector: 'app-root',
  template: `
    <ngt-canvas 
      [sceneGraph]="sceneGraph" 
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
