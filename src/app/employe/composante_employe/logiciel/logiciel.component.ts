 import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BackendserviceService } from '../../../backendservice.service';

 @Component({
   standalone: true,
   imports: [
     CommonModule,
     FormsModule,
     MatButtonModule,
     MatInputModule,
     MatCardModule,
     MatIconModule,
     MatButtonToggleModule,
     BaseChartDirective,
   ],
  selector: 'app-logiciel',

  templateUrl: './logiciel.component.html',
  styleUrl: './logiciel.component.scss'
})
export class LogicielComponent {
   constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}
     @Input() logiciels: any ;
     softwareInfo: any[] = [];  // Déclarer la propriété softwareInfo


    async ngOnInit() {
      await  this. fetchSoftwareData();
    }

      async fetchSoftwareData() {
        try {
         // Supposons que votre service backend récupère les données des logiciels
          this.softwareInfo = this.logiciels;

          //console.log('Données des logiciels récupérées avec succès:', this.softwareInfo); // Log après avoir récupéré les données
        } catch (error) {
          console.error('Erreur lors de la récupération des informations sur les logiciels:', error);
        }
      }
      formatDate(dateString: string): string {
        if (!dateString || dateString === 'null' || dateString === 'undefined') {
          return 'Date inconnue';
        }

        // Extraire l'année, le mois et le jour si la date est valide
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);

        // Retourner la date au format jj/mm/aaaa
        return `${day}/${month}/${year}`;
      }
      async openFileDialog(path: string){
       await this.backend.openFileDialog(path);
      }
      async verifie_mise_jour(path:string){
        await this.backend.verifie_mise_jour(path);
      }
}
