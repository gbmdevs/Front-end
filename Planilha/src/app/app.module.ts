import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpregadosComponent } from './empregados/empregados.component';
import { HttpClientModule } from '@angular/common/http';
import { GastosComponent } from './gastos/gastos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CadastroGastoComponent } from './cadastro-gasto/cadastro-gasto.component'; 
import { MaterialModules} from './material-modules'; 
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
 
import { DatePipe } from '@angular/common';

// formatar as Datas para YYYY-MM-DD
export const DateFormats = {
    parse: {
       dateInput: ['YYYY-MM-DD']
    }, 
    display: {
       dateInput: 'YYYY-MM-DD',
       monthYearLabel: 'MMM YYYY',
       dateA11yLabel: 'LL',
       monthYEarA11yLabel: 'MMMM YYYY',
    },
};


@NgModule({
  declarations: [
    AppComponent,
    EmpregadosComponent,
    GastosComponent,
    CadastroGastoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules
  ], 
  providers: [CadastroGastoComponent, 
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: MAT_DATE_FORMATS, useValue: DateFormats},
    {provide: DatePipe},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
