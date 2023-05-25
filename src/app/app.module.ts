import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ZipCodeComponent } from "./zip-code/zip-code.component";
import { WeatherService } from "./services/weatherService/weather.service";
import { SharedService } from "./services/sharedService/shared.service";
import { ForecastComponent } from "./forecast/forecast.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule
  ],
  providers: [SharedService, WeatherService],
  declarations: [
    AppComponent,
    HelloComponent,
    ZipCodeComponent,
    ForecastComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
