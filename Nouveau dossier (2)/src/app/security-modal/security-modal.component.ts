import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BackendserviceService, Cle, LoadingService } from '../backendservice.service';
@Component({
  selector: 'app-security-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  // Ajoutez FormsModule ici
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.css']
})
export class SecurityModalComponent implements OnInit,OnDestroy {
  public loading: boolean = false;
  securityKey: string = '';
  correctKey: string = '0852147*';  // Clé correcte
  errorMessage: string = '';  // Message d'erreur
  cleValue: Cle | any;
  constructor(public loadingService: LoadingService,private Backend: BackendserviceService,public dialogRef: MatDialogRef<SecurityModalComponent> , private router: Router) {}
 ngOnInit(): void {
  this.getKey(1);
 }
  validate(): void {
    if (this.securityKey === this.cleValue.valeur) {
      this.loadingService.show();
      this.loading = true;
      console.log('Clé correcte:', this.cleValue.valeur);
      this.dialogRef.close();  // Ferme le modal si la clé est correcte
      this.router.navigate(['/home']);
    } else {
      this.loadingService.hide(); // Cacher le chargement
      this.loading = false;
      this.errorMessage = 'Clé de sécurité incorrecte. Veuillez réessayer.';
    }
  }

  onCancel(): void {
    this.loadingService.hide(); // Cacher le chargement
    this.loading = false;
    this.dialogRef.close();  // Ferme le modal en cas d'annulation
  }
  async getKey(id: number): Promise<void> {
    try {
      // Récupérer la clé et l'assigner à cleValue
      this.cleValue = await this.Backend.getCle(id).toPromise();
      // Vérifiez si cleValue n'est pas nul
      if (this.cleValue) {
        console.log('ID:', this.cleValue.id);
        console.log('Valeur:', this.cleValue.valeur);
      } else {
        console.log('Aucune clé trouvée pour l\'ID:', id);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la clé:', error);
    }
  }
  ngOnDestroy(): void {
    this.loadingService.hide(); // Cacher le chargement
        this.loading = false;
    this.getKey(1);
  }
}

