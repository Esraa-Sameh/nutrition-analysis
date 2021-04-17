import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientDetails } from '../interfaces/ingredient-details';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  ingredientsDetails: IngredientDetails[] = [];
  nutritionFacts: {
    calories: number;
    fat: number;
    cholesterol: number;
    sodium: number;
    carbohydrate: number;
    protien;
    vitaminD;
    calcium;
    iron;
    potassium;
  };
  viewTotal: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      //extracting the details of each ingredient from the http response sent by the resolver
      for (let item of res['analysisResult']['ingredients']) {
        let ingredientDetails = {
          calories: item['parsed'][0]['nutrients']['ENERC_KCAL']['quantity'],
          quantity: item['parsed'][0]['quantity'],
          measure: item['parsed'][0]['measure'],
          food: item['parsed'][0]['foodMatch'],
          weight: item['parsed'][0]['weight'],
        };
        this.ingredientsDetails.push(ingredientDetails);
      }
      //extracting the total nutrition facts from the http response sent by the resolver
      this.nutritionFacts = {
        calories: res['analysisResult'].calories, 
        fat: res['analysisResult'].totalDaily['FAT'].quantity, 
        cholesterol: res['analysisResult'].totalDaily.CHOLE.quantity,
        sodium: res['analysisResult'].totalDaily.NA.quantity,
        carbohydrate: res['analysisResult'].totalDaily.CHOCDF.quantity,
        protien: res['analysisResult'].totalDaily.PROCNT.quantity,
        vitaminD: res['analysisResult'].totalDaily.VITD.quantity,
        calcium: res['analysisResult'].totalDaily.CA.quantity,
        iron: res['analysisResult'].totalDaily.FE.quantity,
        potassium: res['analysisResult'].totalDaily.K.quantity,
      };
     console.log(this.nutritionFacts)
    });
  }
}
