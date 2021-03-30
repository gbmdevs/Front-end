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

  constructor(@Inject(MAT_DIALOG_DATA) public data: graphData,
                                       private httpClient : HttpClient){
     console.log(data);
     // Construindo Grafico
     this.chartOptions = {
        series: [
           {
             name: data.name,
             data: [500, 257.69, 360, 1567.88, 120, 268, 300, 432, 1480]
           }
           ,{
             name: 'Media',
             data: [520,520,520,520,520,520,520,520,520]
           }],
        chart: {
          height: 350,
          type: "line",
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
          categories: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro"
          ]
        }

     }
     // Fim constroi grafico
  }  

  async ngOnInit(){
    await this.httpClient.get(this.REST_API_ULT_12_DESP)
    .subscribe(( data: any[]) => {
        this.ult12desp = data;
        console.log(this.ult12desp.length);  
    }); 
  }
}
