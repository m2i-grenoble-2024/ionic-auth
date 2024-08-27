import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { User } from '../entities';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  user:User = {
    email:'',
    password:''
  }
  constructor() { }

  ngOnInit() {
  }

}
