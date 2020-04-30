import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
   
   private REST_API_HOST     = "http://localhost:8080/Planilha/gastos";
   private API_HOST_DESPESAS = "http://localhost:8080/Planilha/despesasfixas"
   
   gastos   = [];
   despesas = [];
   

  constructor( private httpClient : HttpClient) { }

  async ngOnInit(){ 
     await this.httpClient.get(this.REST_API_HOST)
         .subscribe(( data: any[]) => {
             this.gastos = data;
             console.log(this.gastos); 
         }); 
      await this.httpClient.get(this.API_HOST_DESPESAS)
         .subscribe(( despesas: any[]) =>{
            this.despesas = despesas;
            console.log(this.despesas);
         });

  }

}
