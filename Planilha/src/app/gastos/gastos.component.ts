import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroGastoComponent } from '../cadastro-gasto/cadastro-gasto.component'; 

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
   
   private REST_API_GASTOS         = "http://localhost:8080/Planilha/gastos";
   private REST_API_RESUMO         = "http://localhost:8080/Planilha/resumo";
   private REST_API_DESPESASFIXAS  = "http://localhost:8080/Planilha/despesasfixas";
   

   // Gráficos da Tela
   @ViewChild("chart") chart: ChartComponent;
   public chartOptions: Partial<ChartOptions>;


   // Arrays de Trabalho
   gastos   = [];
   despesas = [];
   despesasfixas = [];

   // Saldos
   salarioLivre = 0.0;

   animal: string;
   name: string;

  constructor( private httpClient : HttpClient,
               public dialog: MatDialog ) { 
                  this.chartOptions = {
                     series: [240, 145, 66.39, 992.57, 90, 
                                900, 200, 150, 675],
                     chart: {
                       width: 380,
                       type: "pie"
                     },
                     labels: [
                         ["Condomínio"],
                         ["Internet Banda Larga"] ,
                         ["Fatura Claro"],
                         ["Cartão de Crédito"],
                         ["Agua e Luz/Gas"],
                         ["Aluguel Apartamento"],
                         ["Transporte Onibus"],
                         ["Segurança (Reserva)"],
                         ["Investimento"]] , 
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
  }

  // Funções 
  openDialog( opcao: any){
       switch(opcao){
          case 'gastos': 
             this.dialog.open(CadastroGastoComponent);
             break;
             
       }
   
  } 


}
