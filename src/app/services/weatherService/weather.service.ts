import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { SharedService } from '../sharedService/shared.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient , private sharedService:SharedService) {}


  findLocationByZipCode (zipCode: string){

    return this.http.get(`${this.sharedService.baseUrl}/geo/1.0/zip?zip=${zipCode},US&appid=${this.sharedService.api_ID}`)
  }



}
