import { Component } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas/peliculas.service';
import { PeliculasModel } from 'src/app/models/peliculas.model';
import { Subscription } from 'rxjs';
import { FiltrosService } from 'src/app/services/filtros/filtros.service';
import { FiltroModel } from 'src/app/models/filtro.model';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css'],
})
export class ListaPeliculasComponent {
  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly filtroService: FiltrosService
  ) {}
  listaPeliculas: PeliculasModel[] = [];
  cargandoDatos: boolean = false;
  filtroSubscripcion!: Subscription;

  ngOnInit() {
    //Suscribe a los cambios que tenga el filtro
    this.filtroSubscripcion = this.filtroService.filtro$.subscribe((filtro) => {
      this.obtenerPeliculas(filtro);
    });
  }

  obtenerPeliculas(filtros: FiltroModel) {
    this.cargandoDatos = true;
    this.peliculasService
      .getPeliculasFiltradas(filtros)
      .then((data) => {
        this.listaPeliculas = data;
      })
      .catch((error) => {
        console.log('Error al obtener las peliculas en componente', error);
      })
      .finally(() => {
        this.cargandoDatos = false;
      });
  }

  obtenerTodasPeliculas() {
    this.cargandoDatos = true;
    this.peliculasService
      .getPeliculas()
      .then((responseData: PeliculasModel[]) => {
        this.listaPeliculas = responseData;
        console.log('DATA', this.listaPeliculas);
      })
      .catch((error) => {
        console.log('Error al obtener las peliculas en componente', error);
      })
      .finally(() => {
        this.cargandoDatos = false;
      })
  }

  ngOnDestroy(){
    this.filtroSubscripcion.unsubscribe();
  }
}
