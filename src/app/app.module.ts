import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ZipCodeComponent } from './zip-code/zip-code.component';
import { WeatherService } from './services/weatherService/weather.service';
import { SharedService } from './services/sharedService/shared.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule  ],
  providers: [ SharedService, WeatherService ],
  declarations: [ AppComponent, HelloComponent, ZipCodeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
