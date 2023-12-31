import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as PIXI from 'pixi.js-legacy';
import {GoogleMapsService} from "../../service/google-maps.service";
import {TourDataService} from "../../service/tour-data.service";

@Component({
  selector: 'app-gauge-input',
  templateUrl: './gauge-input.component.html'
})
export class GaugeInputComponent implements AfterViewInit {
  @ViewChild('pixiContainerGauge', {static: false}) pixiContainerGauge!: ElementRef;
  @Output() percentChange = new EventEmitter<number>();
  @Input() percent = 0;

  private appGauge!: PIXI.Application;
  private appContainerGauge = new PIXI.Container();

  private gauge!: PIXI.Container;
  private gaugeScale!: PIXI.Graphics;
  private gaugeScaleRed!: PIXI.Graphics;
  private arrow!: PIXI.Sprite;
  private dragging = false;
  private eventData!: any;

  constructor(private tourDataService: TourDataService) {}

  ngAfterViewInit(): void {
    // define the stage
    this.appGauge = new PIXI.Application({
      width: 400,
      height: 700,
      transparent: true,
      antialias: true,
      autoDensity: true,
      resolution: 2,
      backgroundColor: 0xaaaaff,
      forceCanvas: true,
    });
    // add the 'view' of the element
    this.pixiContainerGauge.nativeElement.appendChild(this.appGauge.view);
    // add the stage
    this.appGauge.stage.addChild(this.appContainerGauge);
    this.drawGauge();
    this.setArrow();
  }

  drawGauge() {
    // gauge with arrow
    this.gauge = new PIXI.Container();
    this.gaugeScale = new PIXI.Graphics();
    this.gaugeScaleRed = new PIXI.Graphics();

    const arrowTexture = PIXI.Texture.from('../assets/svg/arrow.svg');
    this.arrow = new PIXI.Sprite(arrowTexture);
    this.arrow.interactive = true;
    this.arrow.buttonMode = true;
    this.arrow.anchor.set(0, 0.5);
    this.arrow.x = 50;
    this.arrow.y = 335;

    this.arrow
      .on('pointerdown', this.onDragStart.bind(this))
      .on('pointerup', this.onDragEnd.bind(this))
      .on('pointerupoutside', this.onDragEnd.bind(this))
      .on('pointermove', this.onDragMove.bind(this));

    this.gaugeScale.lineStyle(10, 0x707070);
    this.gaugeScale.arc(0, 0, 290, -Math.PI / 2, Math.PI / 2); // cx, cy, radius, startAngle, endAngle
    this.gaugeScale.y = 335;
    this.gaugeScale.x = 50;

    this.gaugeScaleRed.lineStyle(10, 0xff7070);
    this.gaugeScaleRed.arc(0, 0, 290, -Math.PI / 2 + 2.1, Math.PI / 2); // cx, cy, radius, startAngle, endAngle
    this.gaugeScaleRed.y = 335;
    this.gaugeScaleRed.x = 50;


    this.gauge.addChild(this.gaugeScale);

    this.gauge.addChild(this.gaugeScaleRed);

    this.gauge.addChild(this.arrow);

    // add to stage
    this.appContainerGauge.addChild(this.gauge);
  }

  onDragStart(event: any) {
    this.eventData = event;
    this.dragging = true;
  }

  onDragEnd() {
    this.onDragMove();
    this.dragging = false;
    this.eventData = null;
    this.percentChange.emit(this.percent);
  }

  onDragMove() {
    if (this.dragging && this.eventData.currentTarget) {

      const newPosition = this.eventData.data.getLocalPosition(this.arrow.parent);

      const posX = newPosition.x - 50;
      const posY = newPosition.y - 340;

      const rad = Math.atan(-posY / posX);

      let deg = (360 / (2 * Math.PI)) * rad;

      if (posX >= 0) {
        deg = 90 - deg;
      } else {
        deg = 270 - deg;
      }

      if (deg > 180 && deg < 270) {
        deg = 180;
      } else if (deg < 0 || deg > 270) {
        deg = 0;
      }

      // rotation = Math.PI / -2 ... Math.PI / 2 ;
      this.arrow.rotation = (deg / 180) * Math.PI - Math.PI / 2;
      this.percent = 100 - Math.round((deg / 180) * 100);


    }

  }

  setArrow(){
    const arrowpos = (100 - this.tourDataService.getCharge()) * 1.8;
    this.arrow.rotation = (arrowpos / 180) * Math.PI - Math.PI / 2;
  }

}
