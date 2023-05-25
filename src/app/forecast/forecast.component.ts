import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WeatherService } from "../services/weatherService/weather.service";
import { Forecast } from "../model/forecast";
import { SharedService } from "../services/sharedService/shared.service";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.css"],
})
export class ForecastComponent implements OnInit {
  zipCode: string;
  forecast: Forecast[] = [];
  weatherIconUrl: string;
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.zipCode = this.route.snapshot.paramMap.get("zipCode") || "";
    this.getForecastData(this.zipCode);
  }

  getForecastData(zipCode: string) {
    return this.weatherService
      .fiveDaysForecastData(zipCode)
      .subscribe((data: Forecast[]) => {
        this.forecast = data;
        this.setWeatherIcon(data[0].weatherDescription);
      });
  }

  setWeatherIcon(weatherCondition: string): void {
    console.log(this.weatherIconUrl, "this is the weather icon");
    if (!this.weatherIconUrl) {
      this.weatherIconUrl =
        this.sharedService.getWeatherIconUrl(weatherCondition);
    }
  }


  navigateToHome() : void{
    console.log('navigateToHome');
    this.router.navigate(['']);
  }
}
