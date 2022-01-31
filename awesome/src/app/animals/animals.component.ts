import { Component, OnInit } from '@angular/core';
import { HEROES } from '../banco-provisorio';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals$ = HEROES;
  constructor() {
   }

  ngOnInit(): void {
  }

}
