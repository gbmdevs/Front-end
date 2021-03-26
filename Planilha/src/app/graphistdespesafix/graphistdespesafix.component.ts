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


  constructor(@Inject(MAT_DIALOG_DATA) public data: graphData){
     console.log(data);
     // Construindo Grafico
     this.chartOptions = {
        series: [
           {
             name: data.name,
             data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
           },{
             name: 'Media',
             data: [20,20,20,20,20,20,20,20,20]
           }
        ],
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
           width: [5,7,5],
           curve: "straight",
           dashArray: [0,8,5]
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

  ngOnInit(): void {
   
  }

}
