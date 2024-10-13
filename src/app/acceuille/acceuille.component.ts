// src/app/acceuille/acceuille.component.ts
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { SecurityModalComponent } from '../security-modal/security-modal.component';

@Component({
  selector: 'app-acceuille',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    SecurityModalComponent,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './acceuille.component.html',
  styleUrls: ['./acceuille.component.css']  // Correction : `styleUrls` au lieu de `styleUrl`
})
export class AcceuilleComponent implements OnInit {
  title = 'profdoc';
  isHomePage = false;

  constructor(public dialog: MatDialog, private router: Router, private location: Location) {}  // Injecter le Router

  ngOnInit() {
    // Écouter les changements de l'historique
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/acceuille';
    });
  }

  openModal(): void {
    this.dialog.open(SecurityModalComponent, {
      width: '400px',
    });
  }

}
