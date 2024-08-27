import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from './entities';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser = signal<User|null>(null);

  constructor(private http:HttpClient) {
    const stored = localStorage.getItem('connectedUser');
    if(stored) {
      this.connectedUser.set(JSON.parse(stored));
    }
  }

  postUser(user:User) {
    return this.http.post<User>('http://localhost:8000/api/user', user);
  }

  login(credentials:{email:string,password:string}) {
    return this.http.post<{token:string}>('http://localhost:8000/api/login', credentials)
                    .pipe(
                      tap(data => {
                        localStorage.setItem('token', data.token); //On stock le token en localStorage
                      }),
                      switchMap(() => this.getUser())
                    );
  }

  logout() {
    localStorage.clear();
    this.connectedUser.set(null);
  }

  getUser() {
    return this.http.get<User>('http://localhost:8000/api/user')
            .pipe(
              tap(data => {
                localStorage.setItem('connectedUser', JSON.stringify(data));
                this.connectedUser.set(data);
              })
            );
  }
}
