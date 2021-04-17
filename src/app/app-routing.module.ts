import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './shared/services/resolver.service';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'analysis',
    component: AnalysisComponent,
    resolve: { analysisResult: ResolverService },
  },
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
