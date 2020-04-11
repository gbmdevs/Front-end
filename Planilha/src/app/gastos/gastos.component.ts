import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
   
   private REST_API_HOST = "http://localhost:8080/Planilha/gastos";
   gastos:string[];


  constructor( private httpClient : HttpClient) { }

  async ngOnInit(){
     console.log('Inicia rota');
     await this.httpClient.get(this.REST_API_HOST)
         .subscribe(( data: any[]) => {
             this.gastos = data;
             console.log(this.gastos);
         }); 
  }

}
