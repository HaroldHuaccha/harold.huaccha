import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltroModel } from 'src/app/models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  //Inicializar el filtroSubject
  private filtroSubject = new BehaviorSubject<FiltroModel>({
    titulo: '',
    genero: [],
    descripcion: ''
  })

  //Observable para suscribirse
  filtro$ = this.filtroSubject.asObservable();

  //Metodo para actualizar los datos del filtro
  actualizarFiltro(filtro:FiltroModel){
    this.filtroSubject.next(filtro);
  }
}
