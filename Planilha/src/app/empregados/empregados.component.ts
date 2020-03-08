import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
// Estudar sobre as Api em Geral - Fazer sem framework para 
// Estudo

@Component({
  selector: 'app-empregados',
  templateUrl: './empregados.component.html',
  styleUrls: ['./empregados.component.css']
})
export class EmpregadosComponent implements OnInit {
  
 // Variaveis de Trabalho 
 // private REST_API_SERVIDOR = "http://172.20.0.6:8080/Planilha/"; 
  private REST_API_SERVIDOR = "http://localhost:8080/Planilha/"; 
  empregados:string[]; 
  postData = {
     test: 'my content',
  };

  constructor(private httpClient: HttpClient ) {  }

  clickFunction(){
    this.httpClient.post(this.REST_API_SERVIDOR,this.postData).toPromise().then(
      data => {
         console.log(data);
      });
  }

  ngOnInit()  {  
    this.mandarRequisicao().subscribe((data: any[])=>{
         this.empregados = data;
         console.log(this.empregados);
    })
  } 

  // Area de Requisicao de Dados para o Servidor
  public mandarRequisicao(){
    return this.httpClient.get(this.REST_API_SERVIDOR);
  }
  

}
