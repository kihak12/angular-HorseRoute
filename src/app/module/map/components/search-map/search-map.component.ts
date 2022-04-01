import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../service/map.service';
import { Location } from '../../interface/map.interface';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit, AfterViewInit {
  minDate: Date;
  selected = '';
  map: mapboxgl.Map;
  locations: Location[];
  locationStart: Location;
  locationEnd: Location;
  markerStart = new mapboxgl.Marker();
  markerEnd = new mapboxgl.Marker();
  locationCtrl = new FormControl();
  route: any;
  private searchLocation = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router
  ) {
    this.minDate = new Date();
  }

  trajetSearchForm = this.formBuilder.group({
    depart: new FormControl(null, Validators.required),
    arriver: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    flexibiliter: new FormControl(null, Validators.required)
  })

  onClickSubmit(data: any) {
    if (this.trajetSearchForm.valid) {
      let f = JSON.stringify(this.route);

      f = f.replace(/\],\[/g, "rep").replace(/\[/g, "").replace(/\]/g, "").replace(/,/g, "&!&").replace(/rep/g, ",");

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/trajets/search'], {
          state: {
            depart: this.trajetSearchForm.value.depart,
            arriver: this.trajetSearchForm.value.arriver,
            location: f,
            date: this.trajetSearchForm.value.date,
            flexibility: this.trajetSearchForm.value.flexibiliter
          }
        });
      });
    }
  }

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 4,
      center: [2.209666999999996, 46.232192999999995],
      accessToken: environment.mapbox.accessToken,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  SearchLocation(value: string, input: string): void {
    if (value.length >= 2) {
      this.mapService.SearchLocation(value).subscribe(_ => {
        //console.log(_.features);
        //console.log(this.mapService.BuildLocationEntity(_.features));
        this.locations = this.mapService.BuildLocationEntity(_.features);
      });
      if (this.locations?.length > 0) {
        if (input == "depart") {
          this.locations.forEach(e => { if (e.info == this.trajetSearchForm.value.depart) { this.SetPointOnMap(e, "start") } })
        } else if (input == "arriver") {
          this.locations.forEach(e => { if (e.info == this.trajetSearchForm.value.arriver) { this.SetPointOnMap(e, "arriver") } })
        }
      }
    }
  }

  SetDirectionOnMap(LngLat: any): void {
    this.mapService.SearchDirection(LngLat).subscribe(_ => {
      console.log(_);
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route').removeSource('route');
      }
      try {
        this.route = _.routes[0].geometry.coordinates;
        const geojson: any = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.route
          }
        };
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      } catch
      {
        Swal.fire({
          title: 'Aucun Itinéraire trouvé !',
          icon: 'error',
          confirmButtonText: 'Fermer'
        })
      }
    });

    const llb = new mapboxgl.LngLatBounds(LngLat[0], LngLat[1]);
    llb.getCenter();
    this.map.fitBounds(llb, {
      padding: { top: 40, bottom: 15, left: 50, right: 50 },
      speed: 1,
      curve: 3,
      easing(t) {
        return t;
      }
    });
  }

  AwaitMapLoad(event: Location, input: string, t = 0) {
    if (this.map.isStyleLoaded()) {
      this.SetPointOnMap(event, input, t);
    } else {
      this.map.on('load', () => {
        this.SetPointOnMap(event, input, t);
      });
    }
  }
  SetPointOnMap(event: Location, input: string, t = 0) {
    var longitude: number = +event.longitude;
    var latitude: number = +event.latitude;
    var adresseInfo: string = event.adresse + ", " + event.city

    //console.log("longitude :", longitude);
    //console.log("latitude :", latitude);
    //console.log('this.map :', this.map);

    if (input == "start") {
      if (t != 0) {
        this.trajetSearchForm.patchValue({
          depart: adresseInfo,
        });
      }


      this.locationStart = event;
      this.markerStart
        .remove();

      this.markerStart
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    } else {
      if (t != 0) {
        this.trajetSearchForm.patchValue({
          arriver: adresseInfo,
        });
      }
      this.locationEnd = event;
      this.markerEnd
        .remove();

      this.markerEnd
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    }

    if (this.markerEnd.getLngLat() != undefined && this.markerStart.getLngLat() != undefined) {
      let LngLat = [this.markerEnd.getLngLat(), this.markerStart.getLngLat()];
      this.SetDirectionOnMap(LngLat);
    } else {
      this.map.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 1,
        curve: 3,
        easing(t) {
          return t;
        }
      });
    }
  }
}
