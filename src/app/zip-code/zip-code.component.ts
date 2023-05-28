import { Component, NgModule, OnInit } from "@angular/core";
import { WeatherService } from "../services/weatherService/weather.service";
import { Observable, Subscriber, map } from "rxjs";
import { WeatherDetails } from "../model/weatherDetails";
import { SharedService } from "../services/sharedService/shared.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-zip-code",
  templateUrl: "./zip-code.component.html",
  styleUrls: ["./zip-code.component.css"],
})
export class ZipCodeComponent implements OnInit {
  zipCode: string;
  weatherConditions: WeatherDetails[] = [];
  test: WeatherDetails;
  weatherCondition: string
  weatherIconUrl:string;
  constructor(private weatherService: WeatherService , private sharedService: SharedService,private router: Router) {}

  ngOnInit(): void {
     const zipCodes = JSON.parse(localStorage.getItem('zipCodes') || '[]') as string[];

     zipCodes.forEach(zipCode => {
      this.getWeather(zipCode);
    });
  }

  addZipCode() {
    const storedZipCodes = localStorage.getItem("zipCodes");
    let zipCodes: string[] = [];
    if (storedZipCodes) {
      zipCodes = JSON.parse(storedZipCodes);
    }
    zipCodes.push(this.zipCode);
    localStorage.setItem("zipCodes", JSON.stringify(zipCodes));
    this.getWeather(this.zipCode);

    this.zipCode = "";
  }

  // get Lat and lon from service and inject it to find the city and the weather conditions
  getWeather(zipCode: string) {
    this.weatherService
      .getWeatherDetails(zipCode)
      // .subscribe((data: { lat: number; lon: number }) => {
      //   console.log(" lat " + data.lat + " and lon " + data.lon);
      //    this.weatherService
      //     .getWeatherDetails(data.lat, data.lon)
          .subscribe((results :WeatherDetails) => {
            this.test=results;
            this.setWeatherIcon(results.mainWeatherDescription);
           // this.navigateToForecast(results.zipCode);
            this.weatherConditions.push(results);
            console.log(this.test,'this is the weather')
            
          });
      // });
     

  }

  setWeatherIcon(weatherCondition:string): void {

    console.log(this.weatherIconUrl , 'this is the weather icon');
    if (!this.weatherIconUrl){
      this.weatherIconUrl = this.sharedService.getWeatherIconUrl(weatherCondition);
    }
  }

  navigateToForecast(zipCode: string) : void{
    console.log('navigateToForecast');
    this.router.navigate(['/forecast', zipCode]);
  }
  
}
