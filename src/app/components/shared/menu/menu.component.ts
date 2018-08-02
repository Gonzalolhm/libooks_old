import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {

  @Input() activo:boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
