import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
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
export class SecurityModalComponent {
  securityKey: string = '';
  correctKey: string = '0852147*';  // Clé correcte
  errorMessage: string = '';  // Message d'erreur

  constructor(public dialogRef: MatDialogRef<SecurityModalComponent> , private router: Router) {}

  validate(): void {
    if (this.securityKey === this.correctKey) {
      console.log('Clé correcte:', this.securityKey);
      this.dialogRef.close();  // Ferme le modal si la clé est correcte
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Clé de sécurité incorrecte. Veuillez réessayer.';
    }
  }

  onCancel(): void {
    this.dialogRef.close();  // Ferme le modal en cas d'annulation
  }
}
