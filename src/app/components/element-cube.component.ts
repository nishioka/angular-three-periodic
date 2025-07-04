import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { extend, injectObjectEvents } from 'angular-three';
import { Mesh, BoxGeometry, MeshStandardMaterial, CanvasTexture } from 'three';
import { Element } from '../data/periodic-elements';

@Component({
  selector: 'app-element-cube',
  templateUrl: './element-cube.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ElementCube {
  element = input.required<Element>();
  position = input.required<[number, number, number]>();
  
  private meshRef = viewChild.required<ElementRef<Mesh>>('mesh');
  protected hovered = signal(false);
  
  texture!: CanvasTexture;

  constructor() {
    extend({ Mesh, BoxGeometry, MeshStandardMaterial });
  }

  ngOnInit() {
    this.createTexture();
  }

  private createTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // 背景
    ctx.fillStyle = this.element().color;
    ctx.fillRect(0, 0, 128, 128);

    // 枠線
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 124, 124);

    // 元素記号
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.element().symbol, 64, 50);

    // 原子番号
    ctx.font = '14px Arial';
    ctx.fillText(this.element().atomicNumber.toString(), 64, 75);

    // 元素名
    ctx.font = '10px Arial';
    ctx.fillText(this.element().name, 64, 95);

    // 原子質量
    ctx.fillText(this.element().atomicMass.toFixed(2), 64, 110);

    this.texture = new CanvasTexture(canvas);
  }

  onHover(isHovered: boolean) {
    this.hovered.set(isHovered);
    if (isHovered) {
      console.log(`Element: ${this.element().name} (${this.element().symbol})`);
    }
  }

  onClick() {
    console.log('Clicked element:', this.element());
  }
}
