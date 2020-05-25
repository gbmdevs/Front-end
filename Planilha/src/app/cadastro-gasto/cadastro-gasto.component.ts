import { Component, OnInit } from '@angular/core';
import * as data from './jsonTest.json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro-gasto',
  templateUrl: './cadastro-gasto.component.html',
  styleUrls: ['./cadastro-gasto.component.css']
})
export class CadastroGastoComponent implements OnInit {
  
  form: FormGroup;  
  apiDate: any; 
  tipogasto : any ;
    
  REST_API_TIPO_GASTO: string = "http://localhost:8080/Planilha/tipogasto";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Iniciar o Formulario
  constructor(public fb: FormBuilder,
              private datePipe: DatePipe,
              private _snackBar: MatSnackBar,
              private http: HttpClient) { 
  }
 
  tipgastos: any = (data as any).default;
  

  async ngOnInit() { 
    this.form = this.fb.group({
      spentdescription: ['',[Validators.required]],
      spentValue: [null,[Validators.required]],
      cdTipSpent: ['',[Validators.required]],
      dateSpent: ['',[Validators.required]]
    });

    //Iniciar a ComboBox da Inclusao
    await this.http.get(this.REST_API_TIPO_GASTO).
       subscribe((tipogasto: any[]) => {
           this.tipogasto = tipogasto;
           console.log(this.tipogasto);
       });
  }

  onClick(){ 
  // Formata a Data que vinha completa, apenas precisando
  // do formato yyyy-MM-dd
   this.apiDate =  this.datePipe.transform(
    this.form.get('dateSpent').value, 'yyyy-MM-dd');
    this.form.patchValue({"dateSpent": this.apiDate});
    console.log(this.apiDate); 
    console.log(this.form.value);  

    // Teste de SnackBar
    this._snackBar.open('CannonBall', 'Fechar',{
       duration: 1500,
       horizontalPosition: this.horizontalPosition,
       verticalPosition: this.verticalPosition
    });


    //location.reload();
  }

}
