import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { extend } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { 
  BoxGeometry, 
  Mesh, 
  MeshStandardMaterial, 
  AmbientLight, 
  DirectionalLight, 
  PerspectiveCamera, 
  CanvasTexture 
} from 'three';
import { periodicElements } from '../data/periodic-elements';
import { ElementCube } from '../components/element-cube.component';

@Component({
  template: `
    <!-- カメラ -->
    <ngt-perspective-camera [makeDefault]="true" [position]="[0, 5, 15]" />
    
    <!-- ライティング -->
    <ngt-ambient-light [intensity]="0.6" />
    <ngt-directional-light [position]="[10, 10, 5]" [intensity]="1" />
    
    <!-- 各元素のキューブ -->
    @for (element of elements; track element.atomicNumber) {
      <app-element-cube
        [element]="element"
        [position]="getElementPosition(element)"
      />
    }
    
    <!-- コントロール -->
    <ngts-orbit-controls [enableDamping]="true" />
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElementCube, NgtsOrbitControls],
})
export class Experience {
  elements = periodicElements;

  constructor() {
    console.log('周期表Experience コンポーネントが初期化されました');
    extend({ 
      Mesh, 
      BoxGeometry, 
      MeshStandardMaterial,
      PerspectiveCamera,
      AmbientLight,
      DirectionalLight,
      CanvasTexture
    });
  }
  
  getElementPosition(element: any): [number, number, number] {
    // 周期表の位置に基づいて3D座標を計算
    const x = (element.group - 1) * 1.2 - 10; // group 1-18 を中央揃え
    const y = -(element.period - 1) * 1.2 + 2; // period 1-7 を上から下へ
    const z = 0;
    
    return [x, y, z];
  }
}
