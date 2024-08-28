import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonText, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { AnnonceService } from '../annonce.service';
import { Annonce } from '../entities';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
  standalone: true,
  imports: [IonButton, IonTextarea, IonText, IonInput, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class AddAnnoncePage implements OnInit {
  form = this.fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.1)]]
  })
  constructor(private fb:FormBuilder, private annonceService:AnnonceService) { }

  ngOnInit() {
  }

  handleSubmit( ) {
    this.annonceService.add(this.form.value as Annonce).subscribe(data => alert('bravo'));
  }


}
