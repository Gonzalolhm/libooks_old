import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { app_routing } from './app.routes';

//Servicios
import { PeticionDBService } from './services/peticion-db.service';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ColeccionComponent } from './components/coleccion/coleccion.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { LibroComponent } from './components/shared/libro/libro.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { NubeComponent } from './components/nube/nube.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { FiltrarNubeComponent } from './components/filtrar-nube/filtrar-nube.component';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { CrearAutorComponent } from './components/modals/crear-autor/crear-autor.component';
import { OrdenarNubeComponent } from './components/ordenar-nube/ordenar-nube.component';
import { CoincidenciasNubeComponent } from './components/modals/coincidencias-nube/coincidencias-nube.component';
import { MiniaturaComponent } from './components/shared/libro/miniatura.component';
import { CrearSerieComponent } from './components/modals/crear-serie/crear-serie.component';
import { CrearColeccionComponent } from './components/modals/crear-coleccion/crear-coleccion.component';
import { CrearEditorialComponent } from './components/modals/crear-editorial/crear-editorial.component';
import { CrearPremioComponent } from './components/modals/crear-premio/crear-premio.component';
import { AjustarPortadaComponent } from './components/modals/ajustar-portada/ajustar-portada.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ColeccionComponent,
    BuscarComponent,
    LibroComponent,
    MenuComponent,
    RecomendacionesComponent,
    NubeComponent,
    BibliotecaComponent,
    FiltrarNubeComponent,
    CrearLibroComponent,
    CrearAutorComponent,
    OrdenarNubeComponent,
    CoincidenciasNubeComponent,
    MiniaturaComponent,
    CrearSerieComponent,
    CrearColeccionComponent,
    CrearEditorialComponent,
    CrearPremioComponent,
    AjustarPortadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    app_routing
  ],
  providers: [
    PeticionDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
