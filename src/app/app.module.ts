import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { GaugeInputComponent } from './shared/gauge-input/gauge-input.component';
import { RangeCalculatorComponent } from './range-calculator/range-calculator.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from '@angular/material/table';
import { ConfirmButtonComponent } from "./shared/confirm-button/confirm-button.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SequenceDirective } from './sequence.directive';

const routes: Routes = [
  { path: 'home', component: RangeCalculatorComponent },
  { path: 'tours', component: TourListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    GaugeInputComponent,
    RangeCalculatorComponent,
    ConfirmButtonComponent,
    TourListComponent,
    SequenceDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],

  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
