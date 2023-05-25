import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForecastComponent } from "./forecast/forecast.component";
import { RouterModule, Routes } from "@angular/router";
import { ZipCodeComponent } from "./zip-code/zip-code.component";

const routes: Routes = [
  // other routes
  { path: "", component: ZipCodeComponent },
  { path: "forecast/:zipCode", component: ForecastComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})      
export class AppRoutingModule {}
