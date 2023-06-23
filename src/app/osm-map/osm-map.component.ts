
/// <reference types='@runette/leaflet-fullscreen' />
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MapOptions, latLng, tileLayer, Map, LeafletEvent, FullscreenOptions, FeatureGroup, featureGroup, DrawEvents, TileLayer } from 'leaflet';


@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.scss']
})
export class OsmMapComponent implements OnInit, OnDestroy {

  //criação de layers
  layer_2015: TileLayer = tileLayer.wms("https://catalogo.ipe.df.gov.br/geoserver/wms", {
    layers: 'geonode:cobertura_df_2015',
    format: 'image/png',
    transparent: true,
  });

  layer_2010: TileLayer = tileLayer.wms("https://catalogo.ipe.df.gov.br/geoserver/wms", {
    layers: 'geonode:cobertura_df_2010',
    format: 'image/png',
    transparent: true,
  });


  layer_lixo_coletado: TileLayer = tileLayer.wms("https://catalogo.ipe.df.gov.br/geoserver/wms", {
    layers: 'geonode:lixo_coletado_2018',
    format: 'image/png',
    transparent: true,
  });
  
  layer_uf_nascimento_pop_df: TileLayer = tileLayer.wms("https://catalogo.ipe.df.gov.br/geoserver/wms", {
    layers: 'geonode:uf_nascimento_pop_df_1',
    format: 'image/png',
    transparent: true,
  });


  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;

  @Input() options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: false,
    })],
    zoom: 10,
    center: latLng(-15.77609, -47.79801)
  };

  layersControl = {
    baseLayers: {
      "Layer 2015": this.layer_2015,
      "Layer 2010": this.layer_2010,
      "Lixo Coletado": this.layer_lixo_coletado,
      "Local de Nascimento população DF": this.layer_uf_nascimento_pop_df
    },
    overlays:{

    }
  };
  

  public map!: Map;
  public zoom!: number;

  //opção de fullscreen
  public fullscreenOptions: FullscreenOptions = {
    position: 'topleft'
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  //Criação do componente de desenho no mapa
  drawnItems: FeatureGroup = featureGroup();

  drawOptions = {
    edit: {
      featureGroup: this.drawnItems
    }
  };

  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }

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


