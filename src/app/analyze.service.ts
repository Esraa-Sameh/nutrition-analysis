import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnalyzeService {
  private _ingredients: string[];
  private _appID = '47379841';
  private _appKey = 'd28718060b8adfd39783ead254df7f92';
  private _endpoint = 'https://api.edamam.com/api/nutrition-details';
  constructor(private router: Router, private http: HttpClient) {}

  get ingredients(): string[] {
    return this._ingredients;
  }
  set ingredients(val: string[]) {
    this._ingredients = val;
  }

  analyze() {
    if (this._ingredients) {
      let postData = {
        ingr: this.ingredients,
      };
      const headers = new HttpHeaders().set(
        'Content-Type',
        'application/json; charset=utf-8'
      );
     return (this.http.post(this._endpoint, postData, {
        params: { app_id: this._appID, app_key: this._appKey },
        headers: headers
      }));
    } 
    else{
      this.router.navigate(['/'])
    }
  }
}
