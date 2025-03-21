
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MisejourpcComponent } from './misejourpc/misejourpc.component';
import { ProfilComponent } from './profil/profil.component';
import { ReseauComponent } from './reseau/reseau.component';
import { TicketComponent } from './ticket/ticket.component';
@Component({
  selector: 'app-technicien',
  imports: [
    MisejourpcComponent,
    ProfilComponent,
    ReseauComponent,
    TicketComponent,
    CommonModule,
          FormsModule,
          MatButtonModule,
          MatInputModule,
          MatCardModule,
          MatIconModule,

  ],
  templateUrl: './technicien.component.html',
  styleUrl: './technicien.component.scss'
})
export class TechnicienComponent implements OnInit{
  constructor( private router: Router){}
  ngOnInit(): void {
    this.ouverture_serveur=true;
  }
  ouverture_serveur: boolean = false;
  ouverture_equipement: boolean = false;
  ouverture_ticket: boolean = false;
  ouverture_profil: boolean = false;
  ouverture_antivirus: boolean = false;

  // Méthodes pour ouvrir les différents composants
  ouvrir_mise_jour() {
    console.log("ererer");
   this.ouverture_serveur = true;
    this.ouverture_equipement = false;
    this.ouverture_ticket = false;
    this.ouverture_profil = false;
    this.ouverture_antivirus = false;
  }

  ouvrir_equipement() {
    this.ouverture_serveur = false;
    this.ouverture_equipement = true;
    this.ouverture_ticket = false;
    this.ouverture_profil = false;
    this.ouverture_antivirus = false;
  }
  ouvrir_antivirus(){
    this.ouverture_serveur = false;
    this.ouverture_equipement = false;
    this.ouverture_ticket = false;
    this.ouverture_profil = false;
    this.ouverture_antivirus =true;}
  ouvrir_ticket() {
    this.ouverture_serveur = false;
    this.ouverture_equipement = false;
    this.ouverture_ticket = true;
    this.ouverture_profil = false;
    this.ouverture_antivirus = false;
  }


  ouvrir_profil() {
    this.ouverture_serveur = false;
    this.ouverture_equipement = false;
    this.ouverture_ticket = false;
    this.ouverture_profil = true;
    this.ouverture_antivirus = false;
  }
  ouvrir_deconnexion() {
    this.router.navigate(['/acceuille']);
  }



}
