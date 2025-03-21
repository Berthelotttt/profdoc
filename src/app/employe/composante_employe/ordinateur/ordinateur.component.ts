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
  selector: 'app-ordinateur',
  templateUrl: './ordinateur.component.html',
  styleUrl: './ordinateur.component.scss'
})
export class OrdinateurComponent {
   constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}

@Input()  ordinateurs :any[] = [];

    systemInfo: any = {};
    osInfo: any = {};
    antivirusStatus: any[]= [];

    async ngOnInit() {
      this.recupere_ordi();
    }
    //--------------------------recupe data ordi---------------------
    recupere_ordi(){
      console.log(this.ordinateurs)
      if (Array.isArray(this.ordinateurs) &&this.ordinateurs.length >= 3) {
        [this.systemInfo, this.osInfo, this.antivirusStatus] = this.ordinateurs;

      }

      else {
        console.error("Les données reçues sont incomplètes ou invalides.");
      }
    }

    //--------------------------------------------------------------

  // Liste des attributs système
  systemAttributes: string[] = ['manufacturer', 'model',   'serial' ];
  // Labels des attributs système
  systemLabels: { [attribute: string]: string } = {
    manufacturer: 'Fabricant',
    model: 'Modèle',

    serial: 'Numéro de série',
  };

  // Liste des attributs du système d'exploitation
  osAttributes: string[] = ['platform', 'version', 'arch', 'serial'];

  // Labels des attributs du système d'exploitation
  osLabels: { [attribute: string]: string } = {
    platform: 'Nom',
    version: 'Version',
    arch: 'Architecture',
    serial: 'Numéro de série'
  };

  //---------------------Antivirus--------------------------------------
  ajour: boolean = false;
  formatDate_Ant(timestamp: string | undefined): string {
  if (!timestamp) return "Inconnu";

  const match = timestamp.match(/\d+/);
  if (!match) return "Inconnu";

  const date = new Date(parseInt(match[0], 10));
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  }

  verification_anjour_antivirus(date_antivirus: string | undefined): boolean {
    if (!date_antivirus) return false;

    const match = date_antivirus.match(/\d+/);
    if (!match) return false;

    const lastUpdate = new Date(parseInt(match[0], 10));
    const today = new Date();

    const diffTime = today.getTime() - lastUpdate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3; // À jour si la mise à jour a moins de 3 jours
  }


}
