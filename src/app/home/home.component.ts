import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalyzeService } from '../analyze.service';

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
    this.ingredients = ingredientsForm.value['ingredients'].split(/\n/);
    this.analyzeService.ingredients = this.ingredients;
    this.router.navigate(['/analysis']);
  }
}
