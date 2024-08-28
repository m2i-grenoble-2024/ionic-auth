import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from './entities';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(private http:HttpClient) { }

  add(annonce:Annonce) {
    return this.http.post<Annonce>('http://localhost:8000/api/annonce', annonce);
  }

  fetchAll() {
    return this.http.get<Annonce[]>('http://localhost:8000/api/annonce');
  }

  remove(id:any) {
    return this.http.delete<void>('http://localhost:8000/api/annonce/'+id);
  }
}
