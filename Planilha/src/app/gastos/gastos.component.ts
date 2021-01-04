import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroGastoComponent } from '../cadastro-gasto/cadastro-gasto.component'; 

import  {
   ApexAxisChartSeries,
   ApexChart,
   ChartComponent,
   ApexDataLabels,
   ApexPlotOptions,
   ApexYAxis,
   ApexLegend,
   ApexGrid,
   ApexXAxis, 
 } from "ng-apexcharts";

import { MatDialog } from '@angular/material/dialog';


export type ChartOptions = {
   series: ApexAxisChartSeries;
   chart: ApexChart;
   dataLabels: ApexDataLabels;
   plotOptions: ApexPlotOptions;
   yaxis: ApexYAxis;
   xaxis: ApexXAxis;
   grid: ApexGrid;
   colors: string[];
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
                     series: [
                       {
                         name: "Valor",
                         data: [240, 145, 66.39, 992.57, 90, 
                                900, 200, 150, 675]
                       }
                     ],
                     chart: {
                       height: 350,
                       type: "bar",
                       events: {
                         click: function(chart, w, e) {
                           // console.log(chart, w, e)
                         }
                       }
                     },
                     colors: [
                       "#008FFB",
                       "#00E396",
                       "#FEB019",
                       "#FF4560",
                       "#775DD0",
                       "#546E7A",
                       "#26a69a",
                       "#D10CE8"
                     ],
                     plotOptions: {
                       bar: {
                         columnWidth: "45%",
                         distributed: true
                       }
                     },
                     dataLabels: {
                       enabled: false
                     },
                     legend: {
                       show: false
                     },
                     grid: {
                       show: false
                     },
                     xaxis: {
                       categories: [
                         ["Condomínio"],
                         ["Internet", "Banda Larga"] ,
                         ["Fatura","Claro"],
                         ["Cartão de", "Crédito"],
                         ["Agua e", "Luz/Gas"],
                         ["Aluguel","Apartamento"],
                         ["Transporte ", "Onibus"],
                         ["Segurança","(Reserva)"],
                         ["Investimento"]
                       ],
                       labels: {
                         style: {
                           colors: [
                             "#008FFB",
                             "#00E396",
                             "#FEB019",
                             "#FF4560",
                             "#775DD0",
                             "#546E7A",
                             "#26a69a",
                             "#D10CE8"
                           ],
                           fontSize: "12px"
                         }
                       }
                     }
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
