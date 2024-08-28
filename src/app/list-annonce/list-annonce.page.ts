import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonButton } from '@ionic/angular/standalone';
import { AnnonceService } from '../annonce.service';
import { Annonce } from '../entities';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-annonce',
  templateUrl: './list-annonce.page.html',
  styleUrls: ['./list-annonce.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListAnnoncePage implements OnInit {
  // annonces = this.annonceService.fetchAll();
  annonces:Annonce[] = []
  constructor(private annonceService:AnnonceService, public auth:AuthService) { }
  
  ngOnInit() {
    this.annonceService.fetchAll().subscribe(data => this.annonces = data);
  }

  removeAnnonce(annonce:Annonce) {
    this.annonceService.remove(annonce.id).subscribe(() => this.annonces = this.annonces.filter(item => item.id != annonce.id));
  }

}
