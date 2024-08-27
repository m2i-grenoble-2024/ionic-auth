import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  postUser(user:User) {
    return this.http.post<User>('http://localhost:8000/api/user', user);
  }
}
