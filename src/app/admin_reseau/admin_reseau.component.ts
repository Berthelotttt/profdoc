



  import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BackendserviceService } from '../backendservice.service';
import { EquipementComponent } from './equipement/equipement.component';
import { ProfilComponent } from './profil/profil.component';
import { ServeurComponent } from './serveur/serveur.component';
import { TicketComponent } from './ticket/ticket.component';

  @Component({
    standalone: true,
    imports: [
      ServeurComponent,
      EquipementComponent,
      TicketComponent,
      ProfilComponent,
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatInputModule,
      MatCardModule,
      MatIconModule,
      MatButtonToggleModule,
      BaseChartDirective,
    ],
    selector: 'app-admin_reseau',
    templateUrl: './admin_reseau.component.html',
    styleUrl: './admin_reseau.component.scss'
  })
  export class AdminReseauComponent implements OnInit {


    constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}


    async ngOnInit() {
      this.ouverture_serveur=true

    }
    // Variables pour gérer l'ouverture des différents composants
    ouverture_serveur: boolean = false;
    ouverture_equipement: boolean = false;
    ouverture_ticket: boolean = false;
    ouverture_profil: boolean = false;

    // Méthodes pour ouvrir les différents composants
    ouvrir_serveur() {
      console.log("ererer");
     this.ouverture_serveur = true;
      this.ouverture_equipement = false;
      this.ouverture_ticket = false;
      this.ouverture_profil = false;
    }

    ouvrir_equipement() {
      this.ouverture_serveur = false;
      this.ouverture_equipement = true;
      this.ouverture_ticket = false;
      this.ouverture_profil = false;
    }

    ouvrir_ticket() {
      this.ouverture_serveur = false;
      this.ouverture_equipement = false;
      this.ouverture_ticket = true;
      this.ouverture_profil = false;
    }

    ouvrir_profil() {
      this.ouverture_serveur = false;
      this.ouverture_equipement = false;
      this.ouverture_ticket = false;
      this.ouverture_profil = true;
    }
    ouvrir_deconnexion() {
      this.router.navigate(['/acceuille']);
    }



  }
