import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpregadosComponent} from './empregados/empregados.component';

const routes: Routes = [
  {path: 'empregados', component: EmpregadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
