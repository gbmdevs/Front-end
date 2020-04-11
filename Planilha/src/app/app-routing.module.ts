import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpregadosComponent} from './empregados/empregados.component';
import {GastosComponent} from './gastos/gastos.component';

const routes: Routes = [
  {path: 'empregados', component: EmpregadosComponent} ,
  {path: 'gastos' , component: GastosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
