import { Clouds } from "./clouds";
import { Coordinates } from "../coordinates";
import { Rain } from "./rain";
import { Sys } from "./sys";
import { TempDetails } from "./tempDetails";
import { Weather } from "./weather";
import { Wind } from "./wind";

export class WeatherDetailsAPI {
  coord: Coordinates;
  weather: [Weather];
  base: string;
  main: TempDetails;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
