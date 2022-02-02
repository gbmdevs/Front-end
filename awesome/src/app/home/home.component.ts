import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Resumo}       from "../models/resumo";
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CadastroGastoComponent } from '../cadastro-gasto/cadastro-gasto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private REST_API_RESUMO          = "http://localhost:8080/Planilha/resumo";
  resumo: any;

  constructor(private httpClient : HttpClient, 
              public dialog: MatDialog ) { 
    
  }

  async ngOnInit()  {
    await this.httpClient.get(this.REST_API_RESUMO)
    .subscribe(( resumo: any) => {
       this.resumo = resumo.ResumoGastos;
       console.log(this.resumo);
    }); 
  }

  openDialog(opcao: any, titulo: string){
    switch(opcao){
      case 'gastos': 
         this.dialog.open(CadastroGastoComponent);
         break;  
   }
  }

}
