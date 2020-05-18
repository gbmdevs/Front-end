import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog'; 
import {DialogExampleComponent} from './dialog-example/dialog-example.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dialog';
   
  constructor(public dialog: MatDialog ){}
   
   openDialog(){
     this.dialog.open(DialogExampleComponent);
   }

}
