import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BackendserviceService } from '../../../backendservice.service';
interface Peripherique {
  Class: string;
  Name: string;
  Status: string;
  // Ajoutez d'autres propriétés si nécessaire
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
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrl: './materiel.component.scss'
})
export class MaterielComponent {

   constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}

   @Input() materiels:any[] = [];

    ramInfo: any[] = []; // Informations RAM
    cpuInfo: any = {}; // Informations processeur
    disks: any[] = [];
    diskKeys: string[] = [];
    gpuInfo: any[] = [];
    displayMonitors: any[] = [];
    peripheriques: any[] = [];
    networkDetails: any[] = [];


    async ngOnInit() {
      this.recupe_data();
    }
    recupe_data() {
      if (Array.isArray(this.materiels) && this.materiels.length >= 7) {
        // Déstructuration des données
        [this.ramInfo, this.cpuInfo, this.disks, this.gpuInfo, this.displayMonitors, this.peripheriques, this.networkDetails] =this.materiels;
      } else {
        console.error("Les données reçues sont incomplètes ou invalides.");
      }
    }
    // Récupérer RAM,
    displayedRamKeys: string[] = ['manufacturer', 'type', 'size', 'clockSpeed',  'serialNum'];
    ramKeyLabels: { [key: string]: string } = {
      manufacturer: 'Fabricant',
      type: 'Type',
      size: 'Taille',
      clockSpeed: 'Fréquence (MHz)',
      serialNum: 'Numéro de Série'
    };
    // Récupérer   disque dur
    displayedKeys: string[] = ['name', 'type', 'size', 'serialNum', 'interfaceType', 'smartStatus'];
    keyLabels: { [key: string]: string } = {
      name: 'Nom',
      type: 'Type',
      size: 'Taille',
      serialNum: 'Numéro de Série',
      interfaceType: 'Interface',
      smartStatus: 'État SMART'
    };
    gpuProperties: string[] = ['model', 'vendor' , 'vram'];

    gpuLabels: { [key: string]: string } = {
      model: 'Modèle',
      vendor: 'Fabricant',
      vram: 'Mémoire VRAM (Mo)'
    };
    //------monitore
    monitorDisplayedKeys: string[] = [
      'model',
      'vendor',
      'connection',
      'builtin',
      'main',
      'currentResX',
      'currentResY',
    ];
    monitorKeyLabels: { [key: string]: string } = {
      model: 'Modèle',
      vendor: 'Fabricant',
      connection: 'Connexion',
      builtin: 'Écran intégré',
      deviceName: 'Nom du périphérique',
      main: 'Écran principal',
      currentResX: 'Résolution actuelle X',
      currentResY: 'Résolution actuelle Y',
      sizeX: 'Largeur (cm)',
      sizeY: 'Hauteur (cm)',
    };
    //interface reseau
    networkAttributes: string[] = ['iface', 'ip4', 'ip6', 'mac',   'dhcp'];
    networkLabels: { [attribute: string]: string } = {
      iface: 'Interface',
      ip4: 'Adresse IPv4',
      ip6: 'Adresse IPv6',
      mac: 'Adresse MAC',
      dhcp: 'DHCP',

    };
    //------recupere peripherique
    peripheriqueAttributes: string[] = ['Class', 'Name', 'Status'];
    peripheriqueLabels: { [attribute: string]: string } = {
      Class: 'Classe',
      Name: 'Nom',
      Status: 'Statut'
    };
}
