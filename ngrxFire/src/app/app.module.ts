import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//ngRX - Estudos
import { StoreModule} from '@ngrx/store'; 
import { reducer as counterReducer } from './ngrx'

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      counterReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
