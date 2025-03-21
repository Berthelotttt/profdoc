import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BackendserviceService } from '../../../backendservice.service';
interface Printer {
  id: number;
  name: string;
  model: string;
  local: string;
}
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
  selector: 'app-imprimante',
  templateUrl: './imprimante.component.html',
  styleUrl: './imprimante.component.scss'
})
export class ImprimanteComponent {
  constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}

  softwarePrinters: any[]=[];
  materialPrinters: any[]=[];
   async ngOnInit() {
    this. fetchPrinterInfo();


   }

   printerDisplayedKeys: string[] = ['id', 'name', 'model', 'local']; // Clés à afficher
    printerKeyLabels: { [key: string]: string } = {
      id: 'ID',
      name: 'Nom',
      model: 'Modèle',
      local: 'Local'
    };

    async fetchPrinterInfo() {
      try {
        // Récupérer les informations sur les imprimantes
        const printers: Printer[] = await this.backend.getPrinterInfo(); // Spécifie que printers est un tableau de Printer

        // Filtrer les imprimantes logicielles
        this.softwarePrinters = printers.filter((printer: Printer) =>
          ['Send To OneNote 2016', 'OneNote', 'Microsoft XPS Document Writer', 'Microsoft Print to PDF', 'Fax'].includes(printer.name)
        );

        // Filtrer les imprimantes matérielles (tout sauf les imprimantes logicielles)
        this.materialPrinters = printers.filter((printer: Printer) =>
          !['Send To OneNote 2016', 'OneNote', 'Microsoft XPS Document Writer', 'Microsoft Print to PDF', 'Fax'].includes(printer.name)
        );

        console.log('Imprimantes logicielles:', this.softwarePrinters);
        console.log('Imprimantes matérielles:', this.materialPrinters);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations imprimantes:', error);
      }

    }
}
