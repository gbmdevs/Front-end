import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GlobalErrorService } from './global-error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
     provide: ErrorHandler, useClass: GlobalErrorService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
