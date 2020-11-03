import { Injectable } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapa: mapboxgl.Map;
  constructor() { }

  buildMap(lng, lat) {
    mapboxgl.accessToken = environment.mapboxKey;
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [Number(lng), Number(lat)],
    zoom: 8
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([Number(lng), Number(lat)])
    .addTo(map);
    return marker;
  }

}
