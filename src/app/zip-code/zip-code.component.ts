import { Component, NgModule, OnInit } from '@angular/core';
import { WeatherService } from '../services/weatherService/weather.service';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrls: ['./zip-code.component.css']
})
export class ZipCodeComponent implements OnInit {
  zipCode: string;

  constructor(private weatherService:WeatherService) { }

  ngOnInit(): void {
  }


  addZipCode(){
    const storedZipCodes = localStorage.getItem('zipCodes');
    let zipCodes : string[] = [];
    if (storedZipCodes) {
      zipCodes = JSON.parse(storedZipCodes);
    }
    zipCodes.push(this.zipCode);
   localStorage.setItem('zipCodes', JSON.stringify(zipCodes));
   this.getLanLon(this.zipCode);
   this.zipCode = '';
    
   
  }


  getLanLon (zipCode:string){
    return this.weatherService.findLocationByZipCode(zipCode).subscribe(data =>{console.log(data)})
    
  }
}
