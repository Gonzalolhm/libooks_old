import { RouterModule, Routes } from '@angular/router';
import { ColeccionComponent } from './components/coleccion/coleccion.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { NubeComponent } from './components/nube/nube.component';
import { FiltrarNubeComponent } from './components/filtrar-nube/filtrar-nube.component';
import { OrdenarNubeComponent } from './components/ordenar-nube/ordenar-nube.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';

const app_routes: Routes = [
  { path: 'mi-coleccion', component: ColeccionComponent },
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: 'la-nube', component: NubeComponent },
  { path: 'filtrar-nube', component: FiltrarNubeComponent },
  { path: 'ordenar-nube', component: OrdenarNubeComponent },
  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'mi-biblioteca', component: BibliotecaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'mi-coleccion' }
];

export const app_routing = RouterModule.forRoot(app_routes);
