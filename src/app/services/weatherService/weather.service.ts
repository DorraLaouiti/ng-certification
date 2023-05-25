import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SharedService } from "../sharedService/shared.service";
import { Observable, map } from "rxjs";
import { LocationByZIP } from "../../model/locationByZIP";
import { WeatherDetails } from "../../model/weatherDetails";
import { WeatherDetailsAPI } from "../../model/API models/weatherDetailsAPI";
import { Forecast } from "../../model/forecast";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(private http: HttpClient, private sharedService: SharedService) {}

  // findLocationByZipCode (zipCode: string) : Observable<LocationByZIP>{

  //   return this.http.get(`${this.sharedService.baseUrl}/geo/1.0/zip?zip=${zipCode},US&appid=${this.sharedService.api_ID}`)
  // }

  // get lat and long coordinates, city name , zipcode and country from zip code
  findLocationByZipCode(zipCode: string): Observable<LocationByZIP> {
    return this.http
      .get(
        `${this.sharedService.baseUrl}/geo/1.0/zip?zip=${zipCode},US&appid=${this.sharedService.api_ID}`
      )
      .pipe(
        map((response: any) => {
          const location = new LocationByZIP();
          location.country = response.country;
          location.lat = response.lat;
          location.lon = response.lon;
          location.name = response.name;
          location.zip = response.zip;
          return location;
        })
      );
  }

  // get weather details from lat and lon
  getWeatherDetails(zipcode: string): Observable<WeatherDetails> {
    return this.http
      .get(
        `${this.sharedService.baseUrl}/data/2.5/weather?zip=${zipcode}&appid=${this.sharedService.api_ID}`
      )
      .pipe(
        map((response: any) => {
          const weatherDetails = new WeatherDetails();
          weatherDetails.zipCode = zipcode;
          weatherDetails.nameCity = response.name;
          weatherDetails.temp = response.main.temp;
          weatherDetails.maxTemperature = response.main.temp_max;
          weatherDetails.minTemperature = response.main.temp_min;
          weatherDetails.weatherDescription = response.weather[0].description;
          weatherDetails.mainWeatherDescription = response.weather[0].main;
          return weatherDetails;
        })
      );
  }

 

  fiveDaysForecastData(zipcode: string): Observable<Forecast[]> {
    const url = `${this.sharedService.baseUrl}/data/2.5/forecast?zip=${zipcode}&appid=${this.sharedService.api_ID}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const weatherList: any[] = response.list;
        const fiveDayForecast: Forecast[] = [];
        const currentDate = new Date();
        const nextFiveDays = new Set();
        const weekdayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        // Loop through each data point in the array
        for (const data of weatherList) {
          // Extract the date and time from the dt_txt field
          const dtTxt = data.dt_txt;
          const date = new Date(dtTxt);

          // Extract the year, month, and day from the date
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();
          const weekdayName = weekdayNames[date.getDay()];
          // Create a unique key representing the date (year-month-day)
          const key = `${year}-${month}-${day}`;

          // Check if the key is already present in the nextFiveDays set
          if (!nextFiveDays.has(key)) {
            // Add the key to the set to mark the day as included in the forecast
            nextFiveDays.add(key);

            // data.weekday = weekdayName;
            const forecastData : Forecast= {
              nameCity: response.city.name,
              weatherDescription: data.weather[0].main,
              highTemperature: data.main.temp_max,
              lowTemperature: data.main.temp_min,
              DayName: weekdayName,
            };
            // Push the data point to the fiveDayForecast array
            fiveDayForecast.push(forecastData);
          }

          // Stop the loop if we have reached the desired 5-day forecast
          if (nextFiveDays.size >= 5) {
            break;
          }
        }

        // Return the filtered forecast data
        return fiveDayForecast;
      })
    );
  }
}
