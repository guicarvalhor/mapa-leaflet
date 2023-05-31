import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OsmMapComponent } from './osm-map/osm-map.component';
import { FormsModule } from '@angular/forms';
import {NgxLeafletFullscreenModule} from '@runette/ngx-leaflet-fullscreen'

@NgModule({
  declarations: [
    AppComponent,
    OsmMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    NgxLeafletFullscreenModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
