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
  templateUrl: './experience.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElementCube, NgtsOrbitControls],
})
export class Experience {
  elements = periodicElements;

  constructor() {
    console.log('Periodic Table Experience component initialized');
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
    let x: number, y: number, z: number;
    
    // ランタニド系列 (原子番号 57-71)
    if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
      x = (element.atomicNumber - 57) * 1.2 - 9; // ランタニド系列を下に配置
      y = -6; // 通常の周期表より下
      z = 0;
    }
    // アクチニド系列 (原子番号 89-103)
    else if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
      x = (element.atomicNumber - 89) * 1.2 - 9; // アクチニド系列をさらに下に配置
      y = -7.5; // ランタニドより下
      z = 0;
    }
    // 通常の周期表
    else {
      x = (element.group - 1) * 1.2 - 10.5; // group 1-18 を中央揃え
      y = -(element.period - 1) * 1.2 + 3; // period 1-7 を上から下へ
      z = 0;
    }
    
    return [x, y, z];
  }
}
