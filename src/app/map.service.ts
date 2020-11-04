import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import HeatMapLayer from 'ol/layer/Heatmap';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map;
  private confirmedCasesSourceUrl = '/api/confirmed-cases/';

  constructor() {}

  initialize(target: string): void {
    const view = new View({
      center: [2776957.204335059, 8442622.403718097],
      zoom: 12
    });
    this.map = new Map({
      target,
      layers: this.getLayers(),
      view,
    });
  }

  private getLayers(): Array<Layer> {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const confirmedCasesSource = new VectorSource({
      url: this.confirmedCasesSourceUrl,
      format: new GeoJSON({ dataProjection: 'EPSG:3857' }),
      attributions: ['Virus icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>']
    });
    const confirmedCasesLayer = new VectorLayer({
      source: confirmedCasesSource,
      style: new Style({
        image: new Icon({
          src: 'assets/virus.png'
        })
      })
    });
    const heatmapLayer = new HeatMapLayer({
      source: confirmedCasesSource,
      blur: 15,
      radius: 15
    });
    return [osmLayer, confirmedCasesLayer, heatmapLayer];
  }

  getMap(): Map {
    return this.map;
  }
}
