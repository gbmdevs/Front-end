import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroGastoComponent } from '../cadastro-gasto/cadastro-gasto.component';
import { AdmindespfixasComponent } from '../admindespfixas/admindespfixas.component'; 

import  { 
   ApexChart,
   ChartComponent,
   ApexDataLabels,
   ApexPlotOptions, 
   ApexLegend,
   ApexGrid, 
   ApexNonAxisChartSeries,
   ApexResponsive, 
 } from "ng-apexcharts";

import { MatDialog } from '@angular/material/dialog';


export type ChartOptions = {
   series: ApexNonAxisChartSeries;
   chart: ApexChart;
   dataLabels: ApexDataLabels;
   plotOptions: ApexPlotOptions; 
   responsive: ApexResponsive[];
   grid: ApexGrid;
   colors: string[];
   labels: any,
   legend: ApexLegend;
 };

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})


export class GastosComponent implements OnInit {
   
   private REST_API_GASTOS          = "http://localhost:8080/Planilha/gastos";
   private REST_API_RESUMO          = "http://localhost:8080/Planilha/resumo";
   private REST_API_DESPESASFIXAS   = "http://localhost:8080/Planilha/despesasfixas";
   private REST_API_GRAFICODESPFIXA = "http://localhost:8080/Planilha/despfixgrap";
   

   // Gráficos da Tela
   @ViewChild("chart") chart: ChartComponent;
   public chartOptions: Partial<ChartOptions>;

   // Indexadores
   i: number;

   // Arrays de Trabalho
   gastos          = [];
   despesas        = [];
   despesasfixas   = [];
   graficodespfixa = []; 

   // Saldos
   salarioLivre = 0.0;

   animal: string;
   name: string;

  constructor( private httpClient : HttpClient,
               public dialog: MatDialog ) { 
                  
               }

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
      await this.httpClient.get(this.REST_API_GRAFICODESPFIXA)   
         .subscribe(( graficodespfixa: any[]) =>{
            this.graficodespfixa = graficodespfixa;
            console.log(this.graficodespfixa);
            this.chartOptions = {
              series: [],
              chart: {
                width: 380,
                type: "pie"
              },
              labels: [] , 
             colors: ["#008FFB",
                      "#00E396",
                      "#FEB019",
                      "#FF4560",
                      "#775DD0",
                      "#546E7A",
                      "#26a69a",
                      "#D10CE8",
                      "#CF4520"],     
             responsive: [
               {
                 breakpoint: 480,
                 options:{
                   chart: {
                      width: 200
                   },
                   legend: {
                     position: "bottom"
                   }
                 }
               }
             ],     

            };
            for(this.i=0;this.i<=this.graficodespfixa.length;this.i++){
              this.chartOptions.labels.push(this.graficodespfixa[this.i].nomeDespesaFixa);
              this.chartOptions.series.push(this.graficodespfixa[this.i].valorDespesaFixa);
            }
            
            console.log(this.chartOptions.labels);
         });

  }

  // Funções 
  openDialog( opcao: any){
       switch(opcao){
          case 'gastos': 
             this.dialog.open(CadastroGastoComponent);
             break;
          case 'adminDespFixas':
             this.dialog.open(AdmindespfixasComponent);
             break;   
             
       }
  } 
  // Administrar Despesas Fixas
  adminDespFixas(){
    console.log("Teste");
  }


}
