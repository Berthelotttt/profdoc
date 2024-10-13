import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BackendserviceService, Cle } from '../backendservice.service';

@Component({
  selector: 'app-cle',
  standalone: true,
  templateUrl: './cle.component.html',
  styleUrls: ['./cle.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class CleComponent {
  oldKey: string = '';
  newKey: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private cleService: BackendserviceService) {} // Injection du service CleService
  getMessages(): void {
   /* this.cleService.getCle ().subscribe(
      (data: Cle) => {
        this.newKey = data;  // Mettre à jour la liste des messages
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages', error);
      }
    );*/
  }
  // Méthode pour changer la clé
  onChangeKey() {

    if (this.oldKey && this.newKey) {
      // Création de l'objet Cle pour mettre à jour la clé
      const cle: Cle = { id: 1, valeur: this.newKey }; // Remplacez '1' par l'ID réel si disponible

      // Appel au service pour mettre à jour la clé
      this.cleService.updateCle(cle.id, cle).subscribe({
        next: (response) => {
          console.log('Réponse du backend:', response);
          this.successMessage = 'La clé a été changée avec succès!';
          this.oldKey = '';
          this.newKey = '';
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la clé:', error);
          this.errorMessage = 'Une erreur est survenue lors du changement de la clé.';
        }
      });
    }
  }
}
