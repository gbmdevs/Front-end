import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Estudos de Erro Global Handle';

  throwError1(){
    throw "Erro2";
  }
 

  throwError2(){
    try{
    }catch(error){

    }
  }


}
