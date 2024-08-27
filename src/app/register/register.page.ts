import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { User } from '../entities';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  feedback = '';
  form =this.fb.group({
    email:['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(private fb:FormBuilder, private auth:AuthService){}

  ngOnInit() {
    
  }

  handleSubmit() {
    this.auth.postUser(this.form.value as User).subscribe({
      next:() => this.feedback = 'Registered successfully',
      error:(data) => this.feedback = data.error
    })
  }

}
