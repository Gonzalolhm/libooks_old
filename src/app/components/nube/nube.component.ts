import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionDBService } from '../../services/peticion-db.service';
import { Libro } from '../../classes/libro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nube',
  templateUrl: './nube.component.html',
  styles: []
})
export class NubeComponent implements OnInit {

  menuActivo:boolean = false;
  menuIcon:string = "icon-menu";

  contexto:string = "nube";

  total:number = 0;
  libros:Libro[] = [];
  filtros:Object[] = [];

  pag:number = 1;

  constructor(private _peticion:PeticionDBService,
              private route:ActivatedRoute,
              private router:Router) {
      this.route.queryParams.subscribe( params => {
      })
  }

  ngOnInit() {
    this.cargarLibros();
  }
  cargarLibros(){
    this._peticion.pedirNube(this.pag, this.filtros)
      .subscribe( res => {
        if(res){
          this.total = res.total;
          this.libros = this.libros.concat(res.lista);
          this.pag++;
        }
      })
  }
  crearLibro(){
    this.router.navigate(['/crear-libro'], { queryParams: {
        contexto: '/la-nube'
    }})
  }

}
