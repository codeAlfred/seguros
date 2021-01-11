import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NaworkListComponent } from './components/nawork-list/nawork-list.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EmployeService } from './services/employe.service';
import { GenerarPdfComponent } from './components/generar-pdf/generar-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NaworkListComponent,
    HomeComponent,
    GenerarPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmployeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
