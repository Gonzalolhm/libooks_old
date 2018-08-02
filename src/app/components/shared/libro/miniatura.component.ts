import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../../../classes/libro';

@Component({
  selector: 'app-miniatura',
  templateUrl: './miniatura.component.html',
  styleUrls: ['./libro.component.css']
})
export class MiniaturaComponent implements OnInit {

  @Input() libro:Libro;

  constructor() { }

  ngOnInit() {
  }

}
