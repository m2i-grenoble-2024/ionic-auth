import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  constructor(public auth:AuthService) {}


  testAuth() {
    this.auth.getUser().subscribe(data => console.log(data)); 
  }
}
