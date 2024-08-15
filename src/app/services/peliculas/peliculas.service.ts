import { Injectable } from '@angular/core';
import axios from 'axios';
import { FiltroModel } from 'src/app/models/filtro.model';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private url = 'assets/data/data.json';

  constructor() {}

  async getPeliculas() {
    return await axios
      .get(this.url)
      .then((response) => response.data.movies)
      .catch((error) => {
        console.error('Error al cargar las peliculas', error);
        throw error;
      });
  }

  async getGeneros(){
    return await axios
      .get(this.url)
      .then((response) => response.data.genres)
      .catch((error) => {
        console.error('Error al cargar las peliculas', error);
        throw error;
      });
  }

  async getPeliculasFiltradas(filtros: FiltroModel){
    try{
      const peliculas = await this.getPeliculas();
      
      if(!filtros.titulo && !filtros.genero && !filtros.descripcion){
        return peliculas;
      }

      return peliculas.filter((pelicula: any) => {
        const coincideTitulo = filtros.titulo
          ? pelicula.title?.toLowerCase().includes(filtros.titulo?.toLowerCase())
          : true;

        const coincideGenero = filtros.genero && filtros.genero.length > 0
          ? filtros.genero?.some((genero:any) => pelicula.genre.includes(genero))
          : true;

        const coincideDescripcion = filtros.descripcion
          ? pelicula.description?.toLowerCase().includes(filtros.descripcion?.toLowerCase())
          : true;

        return coincideTitulo && coincideGenero && coincideDescripcion;
      });
    } catch (error) {
      console.error('Error al filtrar las peliculas', error);
      throw error;
    }
    
  }
}
