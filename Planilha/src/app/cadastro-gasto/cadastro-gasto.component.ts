import { Component, OnInit } from '@angular/core';
import * as data from './jsonTest.json';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-gasto',
  templateUrl: './cadastro-gasto.component.html',
  styleUrls: ['./cadastro-gasto.component.css']
})
export class CadastroGastoComponent implements OnInit {
  
  form: FormGroup;

  // Iniciar o Formulario
  constructor(public fb: FormBuilder) { 
  }
 
  tipgastos: any = (data as any).default;
  
  ngOnInit() { 
    this.form = this.fb.group({
      spentdescription: ['',[Validators.required]],
      spentValue: [null,[Validators.required]],
      cdTipSpent: ['',[Validators.required]],
      dateSpent: [null,[Validators.required]]
    });
  }

  onClick(){ 
    console.log(this.form.value);
    alert('OI');
    //location.reload();
  }

}
