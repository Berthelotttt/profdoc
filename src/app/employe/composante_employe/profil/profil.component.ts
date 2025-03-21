import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
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
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
   constructor( private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    public bandwidthChartData: ChartData<'line'> = {
      labels: [],
      datasets: [
        { label: 'Download (Ko/s)', data: [], borderColor: 'blue', fill: false },
        { label: 'Upload (Ko/s)', data: [], borderColor: 'red', fill: false }
      ]
    };

    public chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {},
        y: { beginAtZero: true }
      },
      plugins: {
        title: {
          display: true,
          text: 'Statistiques de la bande passante',
          color: '#f1e6e6',
          font: {
            size: 18
          },
          padding: {
            top: 10,
            bottom: 30
          }
        }
      }
    };

    systemInfo: any = {};
    osInfo: any = {};users: any[] = [];
    networkInterfaces: any[] = [];
    userInfo: any[] = [];
    ramInfo: any = {}; // Informations RAM
    cpuInfo: any = {}; // Informations processeur
    diskInfo: any = {}; // Informations disque dur  // Pour stocker les informations utilisateur
    gpuInfo: any;
    audioInfo: any;
    printerInfo: any;
    installedSoftware: any[] = [];
    softwareInfo: any[] = [];  // Déclarer la propriété softwareInfo
    antivirusStatus: any= {};

    async ngOnInit() {
   /* await this.fetchStatutAntivirus()
     await  this.fetchAdditionalData();
     await  this.startFetchingNetworkData();
     await  this.fetchSystemData();
     await  this.fetchGpuInfo();
     await   this.fetchAudioInfo();
     await  this.fetchPrinterInfo();
     await  this. fetchSoftwareData();*/


    }
    startFetchingNetworkData() {
      this.ngZone.runOutsideAngular(() => {
        setInterval(async () => {
          await this.ngZone.run(async () => {
            await this.fetchNetworkData();
          });
        }, 3000); // Rafraîchit chaque seconde
      });
    }
    async fetchNetworkData() {
          const stats = await this.backend.getNetworkStats();
          if (!stats || stats.length === 0) return;

          const download = stats[0].rx_sec / 1024; // Convertir en Ko/s
          const upload = stats[0].tx_sec / 1024;
          const timestamp = new Date().toLocaleTimeString();

          // Affichage des résultats dans la console
          console.log(`Timestamp: ${timestamp}`);
          console.log(`Download: ${download.toFixed(2)} Ko/s`);
          console.log(`Upload: ${upload.toFixed(2)} Ko/s`);

          // Limite à 20 points pour éviter la surcharge
          if (this.bandwidthChartData.labels!.length > 20) {
            this.bandwidthChartData.labels!.shift();
            this.bandwidthChartData.datasets[0].data.shift();
            this.bandwidthChartData.datasets[1].data.shift();
          }

          // Ajout des nouvelles valeurs
          this.bandwidthChartData.labels!.push(timestamp);
          this.bandwidthChartData.datasets[0].data.push(download);
          this.bandwidthChartData.datasets[1].data.push(upload);
          this.chart?.update();

    }

    //--------------------------------------------------------------

    async fetchSystemData() {
      const systemData = await this.backend.getSystemInfo();
      if (!systemData || Object.keys(systemData).length === 0) return;

      // Vérification des données avant de les assigner
      this.systemInfo = systemData.system || {};          // Système
      this.osInfo = systemData.osInfo || {};              // Infos OS
      this.networkInterfaces = systemData.networkInterfaces || [];  // Interfaces réseau
      this.userInfo = systemData.user || [];

      // Affichage des résultats dans la console
      console.log('Système:', this.systemInfo);
      console.log('OS:', this.osInfo);
      console.log('Interfaces réseau:', this.networkInterfaces);
      console.log('Utilisateurs:', this.userInfo);

      // Si vous utilisez `hostname`, assurez-vous que `this.osInfo` est défini
      if (this.osInfo && this.osInfo.hostname) {
        console.log('Hostname:', this.osInfo.hostname);
      } else {
        console.log('Aucun hostname disponible.');
      }

      // Vérifiez si networkInterfaces contient des données avant d'accéder à ses propriétés
      if (this.networkInterfaces && Array.isArray(this.networkInterfaces) && this.networkInterfaces.length > 0) {
        console.log('Interfaces réseau:', this.networkInterfaces);
      } else {
        console.log('Aucune interface réseau disponible.');
      }
    }

    async fetchAdditionalData() {
      try {
        // Récupérer RAM, CPU et disque dur
        this.ramInfo = await this.backend.getRamInfo();
        this.cpuInfo = await this.backend.getCpuInfo();
        this.diskInfo = await this.backend.getDiskInfo();
      } catch (error) {
        console.error('Erreur lors de la récupération des informations supplémentaires:', error);
      }
    }
    async fetchGpuInfo() {
      try {
        // Récupérer les informations sur la carte graphique
        this.gpuInfo = await this.backend.getGpuInfo();
        if (!this.gpuInfo || Object.keys(this.gpuInfo).length === 0) {
          console.log('Aucune information sur la carte graphique disponible.');
        } else {
          console.log('Carte graphique:', this.gpuInfo);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations GPU:', error);
      }
    }

    async fetchAudioInfo() {
      try {
        // Récupérer les informations sur les périphériques audio
        this.audioInfo = await this.backend.getAudioInfo();
        if (!this.audioInfo || this.audioInfo.length === 0) {
          console.log('Aucun périphérique audio disponible.');
        } else {
          console.log('Périphériques audio:', this.audioInfo);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations audio:', error);
      }
    }

    async fetchPrinterInfo() {
      try {
        // Récupérer les informations sur les imprimantes
        this.printerInfo = await this.backend.getPrinterInfo();
        if (!this.printerInfo || this.printerInfo.length === 0) {
          console.log('Aucune imprimante disponible.');
        } else {
          console.log('Imprimantes:', this.printerInfo);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations imprimantes:', error);
      }
    }
    // Charger les logiciels installés en utilisant le service
   // Ajout de la méthode pour récupérer les logiciels installés

    async fetchSoftwareData() {
      try {
        console.log('Récupération des données des logiciels en cours...'); // Log avant la récupération

        // Supposons que votre service backend récupère les données des logiciels
        this.softwareInfo = await this.backend.getInstalledSoftware();

        console.log('Données des logiciels récupérées avec succès:', this.softwareInfo); // Log après avoir récupéré les données
      } catch (error) {
        console.error('Erreur lors de la récupération des informations sur les logiciels:', error);
      }
    }

    formatDate(dateString: string): string {
      if (!dateString) return 'Date inconnue';

      // Extraire l'année, le mois et le jour
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);

      // Retourner la date au format jj/mm/aaaa
      return `${day}/${month}/${year}`;
    }

  //---------------------Antivirus--------------------------------------
  ajour:boolean=false;
  async fetchStatutAntivirus() {
    this.antivirusStatus = await this.backend.getAntivirusStatus();
    this.verification_anjour_antivirus();
    // Affiche tout l'objet antivirusStatus
    console.log("Statut Antivirus:", this.antivirusStatus);
  }

  formatDate_Ant(timestamp: string): string {
    const match = timestamp.match(/\d+/);
    if (!match) return "Inconnu";

    const date = new Date(parseInt(match[0], 10));
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  verification_anjour_antivirus() {
      const match = this.antivirusStatus.AntivirusSignatureLastUpdated.match(/\d+/);
      if (!match) {
        this.ajour = false;
        return;
      }

      // Convertir la date de mise à jour en objet Date
      const lastUpdate = new Date(parseInt(match[0], 10));

      // Obtenir la date actuelle
      const today = new Date();

      // Calculer la différence en jours
      const diffTime = today.getTime() - lastUpdate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convertir en jours

      // Vérifier si la mise à jour est en retard de plus de 3 jours
      this.ajour = diffDays <= 3;

      console.log("L'antivirus est à jour ?", this.ajour ? "Oui" : "Non");
  }
  selectedFileName: string | null = null;
  async openFileDialog(directoryPath: string) {
    // Récupérer le chemin du fichier via le backend
    this.selectedFileName = await this.backend.openFileDialog(directoryPath);

    // Extraire uniquement le nom du fichier
    if (this.selectedFileName) {
      const fileName = this.selectedFileName.split('\\').pop()?.split('/').pop() ?? '';  // Extraire le dernier segment du chemin
      this.selectedFileName = fileName;  // Mettre à jour la variable avec le nom du fichier uniquement

      console.log('Nom du fichier sélectionné:', this.selectedFileName);  // Affiche le nom du fichier
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }


















      ouverture_acceuille :boolean= true; // Variable pour contrôler l'affichage
      ouverture_equipement :boolean=false;
      ouvrir_acceuille() {
        this.ouverture_acceuille = true;
        this.ouverture_equipement = false;
      }

      ouvrir_equipement() {
        this.ouverture_acceuille = false;
        this.ouverture_equipement = true;
        // Ajoute ici la logique pour afficher l'équipement
      }

      ouvrir_ticket() {
        this.ouverture_acceuille = false;
        // Ajoute ici la logique pour afficher le ticket
      }

      ouvrir_profil() {
        this.ouverture_acceuille = false;
        // Ajoute ici la logique pour afficher le profil
      }

      ouvrir_Deconnexion() {
        // Ajoute ici la logique pour gérer la déconnexion
        this.router.navigate(['/acceuille']);
      }


}
