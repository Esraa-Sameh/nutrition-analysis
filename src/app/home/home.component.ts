import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyzeService } from '../shared/services/analyze.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ingredients: string[];
  constructor(private router: Router, private analyzeService: AnalyzeService) {}

  ngOnInit(): void {}

  onSubmit(ingredientsForm: NgForm) {
    //get the ingredients from the textarea as a string, then split the string with the line breaks
    this.ingredients = ingredientsForm.value['ingredients'].split(/\n/);
    //remove the empty items to handle if the user entered a new line without typing in it
    this.ingredients = this.ingredients.filter(item => item!="");
    //pass the ingredients to the service
    this.analyzeService.ingredients = this.ingredients;
    this.router.navigate(['/analysis']);
  }
}
