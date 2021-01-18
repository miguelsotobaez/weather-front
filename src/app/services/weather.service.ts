import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  apiKey = 'e7576d682f76ab0d3cc19fcd0a0c5afd';
  URL: string = '';
  API_URL: string = '';

  constructor(private http: HttpClient) {
    this.URL = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`;
    this.API_URL = `http://localhost:3000`
  }

   getWeather(lat: number, lon: number){
    return this.http.get(`${this.URL}&lat=${lat}&lon=${lon}`);
   }

   getData(){
    return this.http.get(`${this.API_URL}/weathers`);
   }

   getDataId(id: number){
    return this.http.get(`${this.API_URL}/weathers/${id}`);
   }

   setData(body){
    return this.http.post(`${this.API_URL}/weathers`,body);
   }

   setError(body){
    return this.http.post(`${this.API_URL}/errors`,body);
   }

   getWeatherSelect(selectedValue: string){
    console.log(selectedValue);
    return this.http.get(`${this.URL}${selectedValue}`)
   }

}
