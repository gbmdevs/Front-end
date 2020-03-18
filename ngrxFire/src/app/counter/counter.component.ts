import { Component, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  // Variaveis de Trabalho
  public contador$: Observable<any>;

  constructor(private store:Store<{contador: number}>) { }

  ngOnInit(): void {
      this.contador$ = this.store.pipe(
        select('counterReducer')
      )
  }

   increment() {
     this.contador++;

  }
  decrement(){
    this.contador--;
  }

}
