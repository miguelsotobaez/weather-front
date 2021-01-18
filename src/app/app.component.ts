import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

interface City {
  city: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  location = { city: 'Santiago', lat: -33.457, lon: -70.648};
  weather;
  city;

  selectedValue: any;

  //this data is here only if data doenst exist to create it in redis with post method setData
  cities: City[] = [
    {city: 'Santiago', lat: -33.457, lon: -70.648},
    {city: 'Zurich', lat: 47.367, lon: 8.550},
    {city: 'Auckland', lat: -36.867, lon: 174.767},
    {city: 'Sydney', lat: -33.868, lon: 151.207},
    {city: 'London', lat: 51.508, lon: -0.126},
    {city: 'Georgia', lat: 32.750, lon: -83.500}
  ];

  redisCities: any;


  constructor(private weatherService: WeatherService){}

  ngOnInit() {
    this.weatherService
      .getData()
      .subscribe(
        res => {
          if (Object.keys(res).length === 0) {
            console.log("No properties from Redis")
            this.cities.forEach(element => {
              this.weatherService
                .setData(element)
                .subscribe(
                res => {
                  console.log(res);
                  this.redisCities = res;
                },
                err => {
                  console.log(err);
                }
              );
            });
          }else{
            this.redisCities = res;
          }
        },
        err => {
          alert(err.message);
          this.ngOnInit();
        }
      );
    this.getWeather(this.location.lat, this.location.lon);
  }

  getWeather(lat: number, lon: number) {
    this.weatherService
      .getWeather(lat, lon)
      .subscribe(
        res => {
          this.weather = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  getLatLon(selectedValue){
    console.log('city:',this.selectedValue)
    let lat = 0;
    let lon = 0;
    let id = 0;
    for (let index = 0; index < this.redisCities.length; index++) {
      if(selectedValue == this.redisCities[index].city){
        id = this.redisCities[index].id;
        this.weatherService
          .getDataId(id)
          .subscribe(
            res => {
              console.log(res);
              this.city = res;
              lat = this.city.lat;
              lon = this.city.lon;
              this.weatherService
                .getWeather(lat, lon)
                .subscribe(
                res => {
                  console.log(res);
                  this.weather = res;
                },
                err => {
                  console.log(err);
                }
              );
            },
            err => {
              alert(err.message);
              this.ngOnInit();
            }
        );
      }
    }
    
 }


}
