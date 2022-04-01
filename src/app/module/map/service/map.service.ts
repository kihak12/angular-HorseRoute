import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Location } from '../interface/map.interface';


@Injectable({
    providedIn: 'root',
})
export class MapService {

    apiKey = "";


    geocodingApiDirection = "https://api.mapbox.com/directions/v5/mapbox/driving"
    parametersDirection = "alternatives=false&continue_straight=false&geometries=geojson&overview=simplified&steps=false";

    geocodingApiLocation = "https://api.mapbox.com/geocoding/v5/mapbox.places";
    parametersLocation = "proximity=ip&types=address%2Cpostcode%2Cdistrict%2Cplace&language=fr&autocomplete=true";


    constructor(private http: HttpClient) { }

    SearchLocation(input: string): Observable<any> {
        const url = `${this.geocodingApiLocation}/${input}.json/?${this.parametersLocation}&access_token=${this.apiKey}`;
        return this.http.get<any>(url)
    }

    SearchDirection(logLat: any): Observable<any> {
        let longStart: string = logLat[0]["lng"]
        let latStart: string = logLat[0]["lat"]
        let longEnd: string = logLat[1]["lng"]
        let latEnd: string = logLat[1]["lat"]
        let input = longStart + "%2C" + latStart + "%3B" + longEnd + "%2C" + latEnd;
        const url = `${this.geocodingApiDirection}/${input}?${this.parametersDirection}&access_token=${this.apiKey}`;
        return this.http.get<any>(url)
    }

    BuildPlaceLocation(location: any): Location {
        let result: Location = {
            city: location.text,
            adresse: "",
            postalCode: "",
            region: location.place_name.split(", ")[1],
            country: location.place_name.split(", ")[2],
            longitude: location.geometry.coordinates[0],
            latitude: location.geometry.coordinates[1],
            info: location.place_name
        }
        return result;
    }

    BuildPostCodeLocation(location: any): Location {
        let city: string = "";
        let region: string = "";
        let country: string = "";
        let info: string = "";

        location.context.forEach((element: any) => {
            if (element.id.split(".")[0] == "place") {
                city = element.text
            } else if (element.id.split(".")[0] == "region") {
                region = element.text
            } else if (element.id.split(".")[0] == "country") {
                country = element.text
            }
        });
        if(location.place_name != undefined){
            info = location.place_name;
        }else{
            info = country;
        }

        let result: Location = {
            city: city,
            adresse: "",
            postalCode: location.text,
            region: region,
            country: country,
            longitude: location.geometry.coordinates[0],
            latitude: location.geometry.coordinates[1],
            info: location.place_name
        }
        return result;
    }

    BuildAdresseLocation(location: any): Location {
        let postalcode: string = "";
        let city: string = "";
        let region: string = "";
        let country: string = "";
        let info: string = "";

        location.context.forEach((element: any) => {
            if (element.id.split(".")[0] == "postcode") {
                postalcode = element.text
            } else if (element.id.split(".")[0] == "place") {
                city = element.text
            } else if (element.id.split(".")[0] == "region") {
                region = element.text
            } else if (element.id.split(".")[0] == "country") {
                country = element.text
            }
        });

        if(location.place_name != undefined){
            info = location.place_name;
        }else{
            info = country;
        }

        let result: Location = {
            city: city,
            adresse: location.address + " " + location.text,
            postalCode: postalcode,
            region: region,
            country: country,
            longitude: location.geometry.coordinates[0],
            latitude: location.geometry.coordinates[1],
            info: info,
        }
        return result;
    }

    BuildLocationEntity(features: any): Location[] {
        let result: Location[] = [];
        let current: Location;

        features.forEach((location: any) => {
            switch (location.id.split(".")[0]) {
                case "address":
                    current = this.BuildAdresseLocation(location);
                    break;
                case "place":
                    current = this.BuildPlaceLocation(location);
                    break;
                case "postcode":
                    current = this.BuildPostCodeLocation(location);
                    break;
            }
            result.push(current)
        });
        return result;
    }

    

}