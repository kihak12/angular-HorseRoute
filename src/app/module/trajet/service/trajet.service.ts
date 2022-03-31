import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Trajet } from '../interface/trajet.interface';



@Injectable({
  providedIn: 'root',
})
export class TrajetService {
  apiUrl: string = "http://localhost:51044/api/";

  constructor(private http: HttpClient) { }

  getAllTrajets(): Observable<any> {
    const url = this.apiUrl + "trajets/"
    return this.http.get<Trajet[]>(url).pipe(
      catchError(err => this.catchAuthError(err))
    );
  }

  getTrajetDetails(trajetId: string): Observable<any> {
    const url = this.apiUrl + "trajets/" + trajetId;
    return this.http.get<Trajet[]>(url).pipe(
      catchError(err => this.catchAuthError(err))
    );
  }

  getDateFlexibility(trajetDate: string, dayFlexibility: number): string {
    let options: Intl.DateTimeFormatOptions = {
      day: "numeric", month: "long", year: "numeric"
    };
    var date: Date = new Date(trajetDate);
    var result =
      new Date(date.setDate(date.getDate() - 1)).toLocaleDateString("fr-FR", options)
      + " au " +
      new Date(date.setDate(date.getDate() + dayFlexibility)).toLocaleDateString("fr-FR", options)
    return result;
  }

  catchAuthError(error: any): Observable<Response>{
    if (error){
      Swal.fire({
        title: 'Impossible d\'accéder à la base de donnée.',
        icon: 'error',
        confirmButtonText: 'Fermer'
      })
    }
    return throwError(error);
  }
}