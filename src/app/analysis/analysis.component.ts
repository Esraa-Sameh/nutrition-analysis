import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientDetails } from '../shared/ingredient-details.interface';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  ingredientsDetails: IngredientDetails[] = [];
  totalNutrients;
  totalDaily;
  totalCalories;
  viewTotal: boolean = false;
  ingredientError: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      //extracting the total nutrition facts from the http response sent by the resolver
      this.totalCalories = res['analysisResult'].calories;
      if (!this.totalCalories) {
        sessionStorage.setItem(
          'errorMessage',
          'We cannot calculate the nutrition for your recipe! Please make sure of spelling or if you have entered correct quantities for the ingredients.'
        );
        this.router.navigate(['/error']);
      }
      this.totalNutrients = res['analysisResult'].totalNutrients;
      this.totalDaily = res['analysisResult'].totalDaily;
     
      //extracting the details of each ingredient from the http response sent by the resolver
      for (let item of res['analysisResult']['ingredients']) {
        if(item['parsed']){
          let ingredientDetails = {
            calories: item['parsed'][0]['nutrients']['ENERC_KCAL']['quantity'],
            quantity: item['parsed'][0]['quantity'],
            measure: item['parsed'][0]['measure'],
            food: item['parsed'][0]['foodMatch'],
            weight: item['parsed'][0]['weight'],
          };
          this.ingredientsDetails.push(ingredientDetails);
        }
       else{
        this.ingredientError = true
       }
        
      }
    });
  }
  viewTotalNutrition() {
    this.viewTotal = true;
  }
}
