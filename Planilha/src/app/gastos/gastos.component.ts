import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroGastoComponent } from '../cadastro-gasto/cadastro-gasto.component'; 

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
   
   private REST_API_GASTOS         = "http://localhost:8080/Planilha/gastos";
   private REST_API_RESUMO         = "http://localhost:8080/Planilha/resumo";
   private REST_API_DESPESASFIXAS  = "http://localhost:8080/Planilha/despesasfixas";
   
   // Arrays de Trabalho
   gastos   = [];
   despesas = [];
   despesasfixas = [];

   // Saldos
   salarioLivre = 0.0;

   animal: string;
   name: string;

  constructor( private httpClient : HttpClient,
               public dialog: MatDialog ) { }

  async ngOnInit(){ 
     await this.httpClient.get(this.REST_API_GASTOS)
         .subscribe(( data: any[]) => {
             this.gastos = data;
             console.log(this.gastos); 
         }); 
      await this.httpClient.get(this.REST_API_RESUMO)
         .subscribe(( despesas: any[]) =>{
            this.despesas = despesas;
            console.log(this.despesas);
         });  
  }

  // Funções 
  openDialog(){
   this.dialog.open(CadastroGastoComponent);
  } 


}
