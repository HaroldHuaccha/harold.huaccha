import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ListaPeliculasComponent } from './components/lista-peliculas/lista-peliculas.component';
import { PrincipalComponent } from './views/principal/principal.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ListaPeliculasComponent,
    CabeceraComponent,
    FiltrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
