import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from './entities';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser = signal<User|null>(null);

  constructor(private http:HttpClient) { }

  postUser(user:User) {
    return this.http.post<User>('http://localhost:8000/api/user', user);
  }

  login(credentials:{email:string,password:string}) {
    return this.http.post<{token:string}>('http://localhost:8000/api/login', credentials)
                    .pipe(
                      tap(data => {
                        localStorage.setItem('token', data.token); //On stock le token en localStorage
                        this.connectedUser.set({...credentials}); //temporaire
                      })
                    );
  }
}
