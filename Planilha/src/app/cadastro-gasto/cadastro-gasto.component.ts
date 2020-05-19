import { Component, OnInit } from '@angular/core';
import * as data from './jsonTest.json';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-gasto',
  templateUrl: './cadastro-gasto.component.html',
  styleUrls: ['./cadastro-gasto.component.css']
})
export class CadastroGastoComponent implements OnInit {

  constructor() { }
  form: FormGroup;
  tipgastos: any = (data as any).default;
  
  ngOnInit(): void { 
  }

  onClick(){
     console.log("Post Foi");
  }

}
