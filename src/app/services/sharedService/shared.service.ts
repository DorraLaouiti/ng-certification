import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public baseUrl: string = "https://api.openweathermap.org";
  public api_ID: string = "5a4b2d457ecbef9eb2a71e480b947604";
  public picturesUrl: string =
    "https://www.angulartraining.com/images/weather/";
  constructor() {}

  getWeatherIconUrl(weatherCondition: string): string {
    let iconUrl = "";

    switch (weatherCondition) {
      case "Sun":
        iconUrl = this.picturesUrl + "sun.png";

        break;
      case "Snow":
        iconUrl = this.picturesUrl + "snow.png";

        break;
      case "Rain":
        iconUrl = this.picturesUrl + "rain.png";

        break;
      case "Clouds":
        iconUrl = this.picturesUrl + "clouds.png";

        break;
      case "Mist":
        iconUrl = this.picturesUrl + "clouds.png";

        break;
    }

    return iconUrl;
  }
}
