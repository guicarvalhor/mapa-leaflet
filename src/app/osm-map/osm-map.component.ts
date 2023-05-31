/// <reference types='@runette/leaflet-fullscreen' />
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MapOptions, ZoomAnimEvent, latLng, tileLayer, Map, Control, DomUtil, Layer, LeafletEvent, FullscreenOptions} from 'leaflet';

@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.scss']
})
export class OsmMapComponent implements OnInit, OnDestroy {
 
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;

  @Input() options: MapOptions= {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: false,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:12,
                      center: latLng(-15.782598111064056, -47.906869026134935), 
                      
  };

  public map!: Map;
  public zoom!: number;

  public fullscreenOptions: FullscreenOptions = {
    position: 'topleft',
  };
  
  constructor() { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
