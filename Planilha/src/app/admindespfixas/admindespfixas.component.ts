import {AfterViewInit ,Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import { HttpClient} from "@angular/common/http";

export interface UserData { 
  idExpenses: number;
  titleExpenses: string;
  valueExpenses: number; 
  dueDate: string;
  sitPayment: string;
}

@Component({
  selector: 'app-admindespfixas',
  templateUrl: './admindespfixas.component.html',
  styleUrls: ['./admindespfixas.component.css']
})
export class AdmindespfixasComponent implements AfterViewInit {

  // Rotas de requisição
  private LISTAR_MES_DESP_FIXA = "http://localhost:8080/Planilha/lidespfixa";

  displayedColumns: string[] = ['Despesa Fixa','Data de Vencimento',
                                'Valor da Despesa','Situação Pagamento'];

  listaDespesaMes = []                              
                                
  dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor( private httpClient : HttpClient) { }

  ngAfterViewInit(){
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort      = this.sort;
  }
 
   async ngOnInit(){
      await this.httpClient.get(this.LISTAR_MES_DESP_FIXA)
            .subscribe(( lidespesaMes: UserData[]) => { 
              this.dataSource.data = lidespesaMes; 
      });
   }
 
}


const ELEMENT_DATA: UserData[] = [];

