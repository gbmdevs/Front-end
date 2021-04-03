import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export interface graphData {
  name: string;
  id: number;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graphistdespesafix',
  templateUrl: './graphistdespesafix.component.html',
  styleUrls: ['./graphistdespesafix.component.css']
})
export class GraphistdespesafixComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private REST_API_ULT_12_DESP  = "http://localhost:8080/Planilha/ultmovidesp";

  // Variaveis de Trabalho
  ult12desp      = [];
  valores12desp  = [];
  histdespfixa   = [];

  // Requisição Busca Historico de Despesasfixas
  requiDespfixa = 
   {
    idExpenses: 0,
    titleExpenses: "teste do Angular",
    valueExpenses: 0.00,
    dueDate: "0000-00-00",
    sitPayment: "N" 
   }
  ;
  

  // Indexador
  i = 0;
  divisao: any   = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: graphData,
                                       private httpClient : HttpClient){
     console.log(data);
    
  }  

  async ngOnInit(){ 

    this.requiDespfixa.titleExpenses = this.data.name;

    await this.httpClient.post(this.REST_API_ULT_12_DESP, this.requiDespfixa)
    .subscribe(( histdespfixa: any[]) => {
       // Construindo Grafico
     this.chartOptions = {
      series: [
         {
           name: this.data.name,
           data: []
         }, 
         {
           name: 'Media',
           data: []
         } 
        ],
      chart: {
        width: "100%",
        height: 380,
        type: "line",
        parentHeightOffset: 15,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
         width: [4,7,5],
         curve: "straight",
         dashArray: [0,8,1]
      },
      title: {
        text: "Historico dos ultimos 12 meses(média)",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }

   }
   // Fim constroi grafico
        this.histdespfixa = histdespfixa;
        var somatorio = 0;
        this.divisao = 750
        for(this.i=0; this.i < histdespfixa.length ; this.i++){
          // Compor a Media de Historico 
          this.chartOptions.series[0].data.push(
            this.histdespfixa[this.i].valorDespesaFixa
          )

          this.chartOptions.xaxis.categories.push(
            this.histdespfixa[this.i].dataDespesaFixa
          )
          
          somatorio += this.histdespfixa[this.i].valorDespesaFixa 
          
          
        this.divisao = somatorio / (this.i + 1);
        this.divisao = this.divisao.toFixed(2); 
        this.chartOptions.series[1].data.push(
          this.divisao
        ) 

        } 
    }); 
  }
}
