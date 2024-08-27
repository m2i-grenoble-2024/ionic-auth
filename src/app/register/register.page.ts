import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { User } from '../entities';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  private fb:FormBuilder = inject(FormBuilder);
  form =this.fb.group({
    email:['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });
  

  ngOnInit() {
    
  }

  handleSubmit() {
    console.log(this.form.value)
  }

}
