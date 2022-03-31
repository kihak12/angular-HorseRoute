import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { Trajet } from '../../trajet/interface/trajet.interface';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    apiUrl: string = "http://localhost:51044/api/";

    constructor(private http: HttpClient) { }

    getUserDetails(userId: string):Observable<any>{
        const url = this.apiUrl + "users/" + userId;
        return this.http.get<User[]>(url);
    }

    getUserTrajets(userId: string){
        const url = this.apiUrl + "trajets/" + userId + "/user";
        return this.http.get<Trajet[]>(url);
      }
}