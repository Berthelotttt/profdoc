import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

export class CleComponent implements OnInit  {
  oldKey: string = '';
  olkeyenligne:Cle | undefined;
  newKey: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  cleValue: Cle | any;
  succes :boolean| undefined;
  constructor(private cdr: ChangeDetectorRef,private Backend: BackendserviceService) {} // Injection du service CleService
 ngOnInit(): void {
  this.getKey(1)
 }
  // Méthode pour changer la clé
async  onChangeKey() {
    if (this.oldKey && this.newKey) {
      // Création de l'objet Cle pour mettre à jour la clé
     if(this.oldKey===this.cleValue.valeur){
      this.cleValue.valeur=this.newKey;
        console.log("correcte")
        try {
          const updatedCle = await this.Backend.updateCle(1,this.cleValue).toPromise();
          console.log('Clé mise à jour:', updatedCle);
          this.succes=true
          this.errorMessage="changer avec success "
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la clé:', error);
        }
      }
      else{
      this.succes=false
        this.errorMessage= 'Veuillez insérer l\'ancien clé';

      }
    }
  }
  async getKey(id: number): Promise<void> {
    try {
      // Récupérer la clé et l'assigner à cleValue
      this.cleValue = await this.Backend.getCle(id).toPromise();
      this.cdr.detectChanges();
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
}
