import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule} from './material-module';

import {DialogExampleComponent} from './dialog-example/dialog-example.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialModule
  ],
  entryComponents: [DialogExampleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
