import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public baseUrl: string = 'https://api.openweathermap.org';
  public api_ID: string = "5a4b2d457ecbef9eb2a71e480b947604"
  public picturesUrl : string = "https://www.angulartraining.com/images/weather/"
  constructor() { }

  
}
