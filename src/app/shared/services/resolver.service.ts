import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnalyzeService } from './analyze.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve <any>{

  constructor(private router: Router, private analyzeService: AnalyzeService) { 
    
  }
  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(route.url[0].path === 'analysis'){
      return this.analyzeService.analyze().pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            this.router.navigate(['/error']);
          }
        }
      ))
    }
  }
}
