import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PeliculasService } from 'src/app/services/peliculas/peliculas.service';
import { FiltrosService } from 'src/app/services/filtros/filtros.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent {
  formulario!: FormGroup;
  listaGeneros = [];

  constructor(private readonly peliculasService: PeliculasService,
    private formBuilder: FormBuilder,
    private readonly filtrosService: FiltrosService
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.obtenerGeneros();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group(
      {
        titulo: new FormControl(''),
        genero: new FormControl([]),
        descripcion: new FormControl('')
      }
    );
  }

  obtenerGeneros() {
    this.peliculasService
      .getGeneros()
      .then((responseData: []) => {
        this.listaGeneros = responseData;
      })
      .catch((error) => {
        console.log('Error al obtener los generos en componente', error);
      });
  }

  filtrarBusqueda(){
    //Invoca al metodo para actualizar el filtro
    this.filtrosService.actualizarFiltro(this.formulario.value)
  }
}
