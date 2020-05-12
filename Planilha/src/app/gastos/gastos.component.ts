import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
   
   private REST_API_GASTOS     = "http://localhost:8080/Planilha/gastos";
   private REST_API_RESUMO = "http://localhost:8080/Planilha/resumo"
   
   gastos   = [];
   despesas = [];
   

  constructor( private httpClient : HttpClient) { }

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

}
