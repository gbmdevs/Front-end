import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpregadosComponent } from './empregados/empregados.component';
import { HttpClientModule } from '@angular/common/http';
import { GastosComponent } from './gastos/gastos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
 
@NgModule({
  declarations: [
    AppComponent,
    EmpregadosComponent,
    GastosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule 
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
