// src/app/acceuille/acceuille.component.ts
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { BackendserviceService, LoadingService } from '../backendservice.service';
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
  public loading: boolean = false;
  fileId: number | null = null;
  title = 'profdoc';
  isHomePage = false;
  constructor(public loadingService: LoadingService,private  Backend:  BackendserviceService , public dialog: MatDialog, private router: Router, private location: Location) {}  // Injecter le Router

  ngOnInit() {
    // Écouter les changements de l'historique
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/acceuille';
    });
    this.Backend.getLastFileId().subscribe({
      next: (id) => {
        this.fileId = id;
      },
      error: (error) => {
        this.loadingService.hide(); // Cacher le chargement
        this.loading = false;
        alert('Erreur lors de la récupération du dernier ID :'+ error);
      },
    });

  }

  openModal(): void {
    this.dialog.open(SecurityModalComponent, {
      width: '400px',
    });
  }
  // Méthode pour télécharger un fichier
  downloadFile(): void {
    if (this.fileId !== null) {

      this.Backend.downloadApk(this.fileId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `CTI.apk`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          this.loadingService.hide(); // Cacher le chargement
           this.loading = false;
          console.error('Erreur lors du téléchargement du fichier :', error);
        }
      });
    }
  }
}


