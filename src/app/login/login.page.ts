import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  feedback = '';
  form = this.fb.group({
    email:['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){}

  ngOnInit() {
  }

  handleSubmit() {
    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.feedback = 'Invalid credentials'
    })
  }

}
