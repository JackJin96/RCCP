import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routes';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    PageNotFoundComponent,
    NewProblemComponent,
    NavbarComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
