import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CoeShopFormService {

  private countriesUrl = 'http://localhost:9090/api/countries';
  private statesUrl = 'http://localhost:9090/api/states';


  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)

    )
  }
          //this cuz we have to pass the id ex. IN> india
  getStates(theCountryCode: string): Observable<State[]>{
    // serarch url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }


               //To do rest calls
  constructor(private httpClient: HttpClient) { }


  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    // build and array for "Month" dropdown list
    // - start at current month and loop until
      for( let theMonth = startMonth; theMonth <= 12; theMonth++){
        data.push(theMonth);
      }

      return of(data)
    }


    getCreditCardYears(): Observable<number[]>{
      let data: number[] = [];

      //build an array for "Year" downlist list
      // -start at current year and loop for next 10 years

      const startYear: number = new Date().getFullYear();
      const endYear: number = startYear + 10;

      for(let theYear = startYear; theYear <= endYear; theYear++ ){
        data.push(theYear)
      }

      return of(data);
    }
}



  //Unwraps the JSON from SpringData REST _embedded entry
interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}