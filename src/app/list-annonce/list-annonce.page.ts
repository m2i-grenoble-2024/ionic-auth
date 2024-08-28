import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader } from '@ionic/angular/standalone';
import { AnnonceService } from '../annonce.service';
import { Annonce } from '../entities';

@Component({
  selector: 'app-list-annonce',
  templateUrl: './list-annonce.page.html',
  styleUrls: ['./list-annonce.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListAnnoncePage implements OnInit {
  annonces = this.annonceService.fetchAll();
  constructor(private annonceService:AnnonceService) { }
  
  ngOnInit() {
    // this.annonceService.fetchAll().subscribe(data => this.annonces = data);
  }

}
