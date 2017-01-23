// Shims
import 'reflect-metadata';
import 'zone.js';

import { YagaModule, MapComponent, Event } from '../../lib/index'; // @yaga/leflet-ng2

import { Component, AfterViewInit, ViewChild, PlatformRef } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform: PlatformRef = platformBrowserDynamic();

/* tslint:disable:max-line-length */
const template: string = `
<div class="container">
  <div class="map">
    <yaga-map
      [(zoom)]="zoom"
      [(lat)]="lat"
      [(lng)]="lng"
      [(minZoom)]="minZoom"
      [(maxZoom)]="maxZoom"
      
      (baselayerchange)="baselayerchangeEventValue = 'baselayer change'"
      (move)="handleMoveEvent($event);"
      
      (click)="handleClickEvent($event);"
      (dblclick)="handleDblclickEvent($event);"
      (mousedown)="handleMousedownEvent($event);"
      (mouseup)="handleMouseupEvent($event);"
      (mouseover)="handleMouseoverEvent($event);"
      (mouseout)="handleMouseoutEvent($event);"
      (mousemove)="handleMousemoveEvent($event);"
      (contextmenu)="handleContextmenuEvent($event);"
      (keypress)="handleKeypressEvent($event);"
      (preclick)="handlePreclickEvent($event);"
      
      [scrollWheelZoomEnabled]="scrollWheelZoom"
      [touchZoomEnabled]="touchZoom"
      [tapEnabled]="tap"
    >
      <yaga-tile-layer [url]="'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'"></yaga-tile-layer>
    </yaga-map>
  </div>
  
  <div>
    <h3>Two-Way binded properties</h3>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="zoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Latitude</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="lat">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Longitude</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="lng">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Minimal zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="minZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Maximal zoom</span>
      <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" [(ngModel)]="maxZoom">
    </div>
    <h3>Listener properties</h3>
    <h4>Layer events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event baselayerchange</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="baselayerchangeEventValue">
    </div>
    
    <h4>Map state change events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event move</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="moveEventValue">
    </div>
    
    <h4>Interaction events</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event click</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="clickEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event dblclick</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="dblclickEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mousedown</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="mousedownEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseup</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="mouseupEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseover</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="mouseoverEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mouseout</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="mouseoutEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event mousemove</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="mousemoveEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event contextmenu</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="contextmenuEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event keypress</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="keypressEventValue">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Leaflet event preclick</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" [ngModel]="preclickEventValue">
    </div>
    
    <h3>Options</h3>
    <h4>Mouse and Touch</h4>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Scroll Wheel Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="scrollWheelZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Touch Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="touchZoom">
    </div>
    <div class="input-group">
      <span class="input-group-addon fixed-space">Tap Zoom</span>
      <input type="checkbox" class="form-control" [(ngModel)]="tap">
    </div>
</div><!-- /.container -->

`;
/* tslint:enable */

export interface ITileLayerOptions {
    url: string;
    opacity?: number;
}

const HIDE_DELAY: number = 500;

@Component({
    selector: 'app',
    template
})
export class AppComponent implements AfterViewInit {
    // 2-way
    public zoom: number = 10;
    public lat: number = 51;
    public lng: number = 7;
    public minZoom: number = 1;
    public maxZoom: number = 15;
    public baselayerchangeEventValue: string = '';
    public moveEventValue: string = '';

    public clickEventValue: string = '';
    public dblclickEventValue: string = '';
    public mousedownEventValue: string = '';
    public mouseupEventValue: string = '';
    public mouseoverEventValue: string = '';
    public mouseoutEventValue: string = '';
    public mousemoveEventValue: string = '';
    public contextmenuEventValue: string = '';
    public keypressEventValue: string = '';
    public preclickEventValue: string = '';

    public tileLayers: ITileLayerOptions[] = [{url: 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png', opacity: 1}];

    public scrollWheelZoom: boolean = true;
    public touchZoom: boolean = true;
    public tap: boolean = true;

    @ViewChild(MapComponent) private mapComponent: MapComponent;

    constructor() {
        (<any>window).app = this;
    }
    public handleMoveEvent(event: Event): void {
        this.moveEventValue = 'Event fired now...';
        setTimeout(() => {
            this.moveEventValue = '';
        }, HIDE_DELAY);
    };

    public handleClickEvent(event: Event): void {
        this.clickEventValue = 'Event fired now...';
        setTimeout(() => {
            this.clickEventValue = '';
        }, HIDE_DELAY);
    };
    public handleDblclickEvent(event: Event): void {
        this.dblclickEventValue = 'Event fired now...';
        setTimeout(() => {
            this.dblclickEventValue = '';
        }, HIDE_DELAY);
    };
    public handleMousedownEvent(event: Event): void {
        this.mousedownEventValue = 'Event fired now...';
        setTimeout(() => {
            this.mousedownEventValue = '';
        }, HIDE_DELAY);
    };
    public handleMouseupEvent(event: Event): void {
        this.mouseupEventValue = 'Event fired now...';
        setTimeout(() => {
            this.mouseupEventValue = '';
        }, HIDE_DELAY);
    };
    public handleMouseoverEvent(event: Event): void {
        this.mouseoverEventValue = 'Event fired now...';
        setTimeout(() => {
            this.mouseoverEventValue = '';
        }, HIDE_DELAY);
    };
    public handleMouseoutEvent(event: Event): void {
        this.mouseoutEventValue = 'Event fired now...';
        setTimeout(() => {
            this.mouseoutEventValue = '';
        }, HIDE_DELAY);
    };
    public handleMousemoveEvent(event: Event): void {
        this.mousemoveEventValue = 'Event fired now...';
        setTimeout(() => {
            this.mousemoveEventValue = '';
        }, HIDE_DELAY);
    };
    public handleContextmenuEvent(event: Event): void {
        this.contextmenuEventValue = 'Event fired now...';
        setTimeout(() => {
            this.contextmenuEventValue = '';
        }, HIDE_DELAY);
    };
    public handleKeypressEvent(event: Event): void {
        this.keypressEventValue = 'Event fired now...';
        setTimeout(() => {
            this.keypressEventValue = '';
        }, HIDE_DELAY);
    };
    public handlePreclickEvent(event: Event): void {
        this.preclickEventValue = 'Event fired now...';
        setTimeout(() => {
            this.preclickEventValue = '';
        }, HIDE_DELAY);
    };

    public ngAfterViewInit(): void {
        (<any>window).map = this.mapComponent;
    }
}

/*
 Two-Way

 [(lat)]: number
 [(lng)]: number
 [(zoom)]: number
 [(minZoom)]: number
 [(maxZoom)]: number
 [(maxBounds)]: Bounds
 Options

 Interaction Options

 [closePopupOnClick]: boolean
 [zoomSnap]: number
 [zoomDelta]: number
 [trackResize]: boolean
 [boxZoom]: boolean
 [doubleClickZoom]: boolean
 [dragging]: boolean
 Map State Options

 [maxBounds]: LatLngBounds
 [renderer]: Renderer
 Animation Options

 [fadeAnimation]: boolean
 [markerZoomAnimation]: boolean
 [transform3DLimit]: number
 [zoomAnimation]: boolean
 [zoomAnimationThreshold]: number
 Panning Inertia Options

 [inertia]: boolean
 [inertiaDeceleration]: number
 [inertiaMaxSpeed]: number
 [easeLinearity]: number
 [worldCopyJump]: boolean
 [maxBoundsViscosity]: number
 Keyboard Navigation Options

 [keyboard]: boolean
 [keyboardPanDelta]: number
 Mousewheel options

 [scrollWheelZoom]: boolean //leaflet also supports string with the value center
 [wheelDebounceTime]: number
 [wheelPxPerZoomLevel]: number
 Touch interaction options

 [tap]: boolean
 [tapTolerance]: number
 [touchZoom]: boolean
 [bounceAtZoomLimits]: boolean
 Events

 Layer events

 (baselayerchange): LayersControlEvent
 (overlayadd): LayersControlEvent
 (overlayremove): LayersControlEvent
 (layeradd): LayerEvent
 (layerremove): LayerEvent
 Map state change events

 (zoomlevelschange): Event
 (resize): ResizeEvent
 (unload): Event
 (viewreset): Event
 (load): Event
 (zoomstart): Event
 (movestart): Event
 (zoom): Event
 (move): Event
 (zoomend): Event
 (moveend): Event
 Popup events

 (popupopen): PopupEvent
 (popupclose): PopupEvent
 (autopanstart): Event
 Tooltip events

 (tooltipopen): TooltipEvent
 (tooltipclose): TooltipEvent

 Animation Options

 (zoomanim): ZoomAnimEvent
 */

@NgModule({
    imports:      [ BrowserModule, FormsModule, YagaModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

document.addEventListener('DOMContentLoaded', () => {
    platform.bootstrapModule(AppModule);
});