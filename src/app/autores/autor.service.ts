import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
 
  private autores: Autor[];

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getAutores(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>('http://localhost:3000/autores');
  }

  excluir(id: number) {
    this.autores = this.autores.filter(a => a.id !== id);
  }

  getAutor(id: number): Autor {
    return this.autores.find(a => a.id === id);
  }

  private adicionar(autor: Autor)  {
    autor.id = parseInt((Math.random() * 1000).toFixed(0));
    this.autores.push(autor);
  }

  private atualizar(autor: Autor) {
    this.autores.forEach((a, i) => {
      if(a.id === autor.id) {
        this.autores[i] = autor;
      } 
    })
  }

  salvar(autor: Autor) {
    if(autor.id) {
      this.atualizar(autor);
    } else {
      this.adicionar(autor);
    }
  }
}
