import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import pLimit from 'p-limit';
import { BackendserviceService } from '../backendservice.service';
import { AcceuilleComponent } from './composante_employe/acceuille/acceuille.component';
import { ImprimanteComponent } from './composante_employe/imprimante/imprimante.component';
import { LogicielComponent } from './composante_employe/logiciel/logiciel.component';
import { MaterielComponent } from './composante_employe/materiel/materiel.component';
import { OrdinateurComponent } from './composante_employe/ordinateur/ordinateur.component';
import { ProfilComponent } from './composante_employe/profil/profil.component';
import { TicketComponent } from './composante_employe/ticket/ticket.component';
export interface Ordinateur  {
  id?: number;  // Ajout d'un ID facultatif
  nom: string;
  prix: number;
  dateAcquisition: string;  // Utiliser string pour la date
  statut: string;
  idBureau: number;
  ordinateur: { [key: string]: any };  // Map en Java devient un objet en JS
  os: { [key: string]: any };
  cpu: { [key: string]: any };
  disks: { [key: string]: any }[];
  ram: { [key: string]: any }[];
  virus: { [key: string]: any }[];
  gpu: { [key: string]: any }[];
  moniteur: { [key: string]: any }[];
  peripheriques: { [key: string]: any }[];
  interfacereseau: { [key: string]: any }[];
  logiciel: { [key: string]: any }[];
}
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  nMatricule: string;
  email: string;
  motPasse: string;
  dateNaissance: string;
  telephone: string;
  profession: string;
  idPc: string;
  idBureau: string;
  valide: string;
}
interface Peripherique {
  Class: string;
  Name: string;
  Status: string;
  // Ajoutez d'autres propriétés si nécessaire
}
@Component({
  standalone: true,
  imports: [
    AcceuilleComponent,
    OrdinateurComponent,
    LogicielComponent,
    MaterielComponent,
    ImprimanteComponent,
    TicketComponent,
    ProfilComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    BaseChartDirective,
  ],
  selector: 'app-employe',

  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent implements OnInit, OnDestroy {



  constructor( private route: ActivatedRoute,private router: Router,  private ngZone: NgZone,private backend: BackendserviceService,private cdr: ChangeDetectorRef) {}
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
          top: 11,
          bottom: 30
        }
      }
    }
  };
  entre:number=1;
  isLoading: boolean = true;
  ramInfo: any[] = [];
  systemInfo: any = {};
  osInfo: any = {};users: any[] = [];
  antivirusStatus: any[]= [];
  networkInterfaces: any[] = [];
  ordinateurs: any[] = [];

  materiels: any[] = [];
  cpuInfo: any = {};
  disks: any[] = [];
  gpuInfo: any[] = [];
  displayMonitors: any[] = [];
  peripheriques: any[] = [];
  networkDetails: any[] = [];

  logiciels: any[] = [];
  niveau_barre_chargement:string="1%";
  //-----------backend--------------
  utilisateurId!: string;
  newordinateur: Ordinateur  = {
      nom: "",
      prix: 0,
      dateAcquisition: '',
      statut: '',
      idBureau: 0,
      ordinateur: {},
      os: {},
      cpu: {},
      disks: [],
      ram: [],
      virus: [],
      gpu: [],
      moniteur: [],
      peripheriques: [],
      interfacereseau: [],
      logiciel: []
  };
  ordinateur_recup: Ordinateur  = {
    nom: "",
    prix: 0,
    dateAcquisition: '',
    statut: '',
    idBureau: 0,
    ordinateur: {},
    os: {},
    cpu: {},
    disks: [],
    ram: [],
    virus: [],
    gpu: [],
    moniteur: [],
    peripheriques: [],
    interfacereseau: [],
    logiciel: []
};
  user: Utilisateur = {
    id: undefined,
    nom: '',
    prenom: '',
    nMatricule: '',
    email: '',
    motPasse: '',
    dateNaissance: '',
    telephone: '',
    profession: '',
    idPc: '',
    idBureau: '',
    valide: ''
  };
  id_ordi!: string;
  ordi={};
  base_donne_vide:boolean=false;
//---------------------------------simulateur----------------------------------------------
//-------------------materiel------------------------------
simulateur() {
  this.antivirusStatus = [
    {
      Name: 'Windows Defender',
      AntivirusEnabled: true,
      RealTimeProtectionEnabled: true,
      AntispywareEnabled: true,
      AntivirusSignatureLastUpdated: new Date('2024-02-22'),
      AntispywareSignatureLastUpdated: new Date('2024-02-22'),
      AntivirusSignatureVersion: '1.357.1001.0',
      AntispywareSignatureVersion: '1.357.1001.0'
    }
  ];
  this.osInfo = {
    platform: 'Windows',
    distro: 'Windows 10 Pro',
    release: '10.0.19044',
    kernel: '10.0.19044.2006',
    arch: 'x64',
    serial: 'OS-12345',
    fqdn: 'mycomputer.local',
    hypervisor: false,
    uefi: true
  };

 // Informations CPU et système d'exploitation
this.systemInfo  = {
  arch: "x64", // architecture du processeur
  hostname: "Thelot", // nom de l'hôte
  platform: "Windows", // système d'exploitation
  serial: "00331-10000-00001-AA915", // numéro de série
  version: "10.0.19045" // version de Windows
};

  // Simulation des informations RAM
  this.ramInfo = [
    { manufacturer: 'Corsair', type: 'DDR4', size: 8 * 1024 * 1024 * 1024, clockSpeed: 3200, ecc: false, serialNum: '12345' },
    { manufacturer: 'Kingston', type: 'DDR4', size: 16 * 1024 * 1024 * 1024, clockSpeed: 2666, ecc: false, serialNum: '67890' }
  ];
  // Simulation des informations CPU
  this.cpuInfo = {
    brand: 'Intel',
    model: 'Core i7-9700K',
    manufacturer: 'Intel Corporation',
    cores: 8,
    speed: 3.60,
    virtualization: true
  };

  // Simulation des informations des disques
  this.disks = [
    { name: 'Samsung SSD', type: 'SSD', size: 512 * 1024 * 1024 * 1024, serialNum: 'SSD123', interfaceType: 'SATA', smartStatus: 'Good' },
    { name: 'Seagate HDD', type: 'HDD', size: 1 * 1024 * 1024 * 1024 * 1024, serialNum: 'HDD456', interfaceType: 'SATA', smartStatus: 'Warning' }
  ];

  // Simulation des informations GPU
  this.gpuInfo = [
    { vram: 8192 , vendor: 'NVIDIA',model: 'GeForce GTX 1080'  },
    {  vram: 8192 ,vendor: 'AMD',model: 'Radeon RX 5700' }
  ];

  // Simulation des informations de moniteurs
  this.displayMonitors = [
    { model: 'Dell U2718Q', vendor: 'Dell', connection: 'HDMI', builtin: false, deviceName: 'Monitor1', main: true, currentResX: 3840, currentResY: 2160, sizeX: 61.4, sizeY: 34.5 },
    { model: 'LG 27GL850-B', vendor: 'LG', connection: 'DisplayPort', builtin: false, deviceName: 'Monitor2', main: false, currentResX: 2560, currentResY: 1440, sizeX: 61.1, sizeY: 34.3 }
  ];

  // Simulation des périphériques
  this.peripheriques = [
    { Class: 'USB', Name: 'Mouse', Status: 'Connected' },
    { Class: 'USB', Name: 'Keyboard', Status: 'Disconnected' }
  ];

  // Simulation des informations réseau
  this.networkDetails = [
    { iface: 'eth0', ip4: '192.168.0.1', ip6: 'fe80::1234:5678:9abc:def0', mac: '00:1A:2B:3C:4D:5E', type: 'Ethernet', dhcp: true, ifaceName: 'Ethernet0' },
    { iface: 'wlan0', ip4: '192.168.0.2', ip6: '', mac: '00:1A:2B:3C:4D:5F', type: 'Wireless', dhcp: false, ifaceName: 'Wi-Fi' }
  ];
  //---------------------------------logiciel----------------------------

  this.logiciels = [
    { name: 'Visual Studio Code', installDate: '2024-02-10', update_auto: true },
    { name: 'Google Chrome', installDate: '2024-01-25', update_auto: false },
    { name: 'Adobe Photoshop', installDate: '2023-12-15', update_auto: true },
    { name: 'Mozilla Firefox', installDate: '2023-11-30', update_auto: false },
    { name: 'Microsoft Office', installDate: '2023-10-20', update_auto: true },
    { name: 'Eclipse IDE', installDate: '2023-09-05', update_auto: false },
    { name: 'PyCharm', installDate: '2023-08-22', update_auto: true },
    { name: 'Android Studio', installDate: '2023-07-10', update_auto: true },
    { name: 'IntelliJ IDEA', installDate: '2023-06-18', update_auto: false },
    { name: 'XAMPP', installDate: '2023-05-25', update_auto: true },
    { name: 'Postman', installDate: '2023-04-12', update_auto: false },
    { name: 'Git', installDate: '2023-03-30', update_auto: true },
    { name: 'Node.js', installDate: '2023-02-15', update_auto: true },
    { name: 'Docker', installDate: '2023-01-10', update_auto: false },
    { name: 'Slack', installDate: '2022-12-05', update_auto: true }
  ];

}

peripheriqueAttributes: string[] = ['Class', 'Name', 'Status'];
peripheriqueLabels: { [attribute: string]: string } = {
  Class: 'Classe',
  Name: 'Nom',
  Status: 'Statut',
};

monitorDisplayedKeys: string[] = [
  'model', 'vendor', 'connection', 'builtin', 'deviceName', 'main', 'currentResX', 'currentResY', 'sizeX', 'sizeY',
];

monitorKeyLabels: { [key: string]: string } = {
  model: 'Modèle', vendor: 'Fabricant', connection: 'Connexion', builtin: 'Écran intégré', deviceName: 'Nom du périphérique', main: 'Écran principal',
  currentResX: 'Résolution actuelle X', currentResY: 'Résolution actuelle Y', sizeX: 'Largeur (cm)', sizeY: 'Hauteur (cm)',
};

networkAttributes: string[] = ['iface', 'ip4', 'ip6', 'mac', 'type', 'dhcp', 'ifaceName'];
networkLabels: { [attribute: string]: string } = {
  iface: 'Interface', ip4: 'Adresse IPv4', ip6: 'Adresse IPv6', mac: 'Adresse MAC', type: 'Type', dhcp: 'DHCP', ifaceName: 'Nom de l\'interface',
};

gpuProperties: string[] = ['model', 'vendor', 'vram'];
gpuLabels: { [key: string]: string } = {
  model: 'Modèle', vendor: 'Fabricant', vram: 'Mémoire VRAM (Mo)',
};

displayedKeys: string[] = ['name', 'type', 'size', 'serialNum', 'interfaceType', 'smartStatus'];
keyLabels: { [key: string]: string } = {
  name: 'Nom', type: 'Type', size: 'Taille', serialNum: 'Numéro de Série', interfaceType: 'Interface', smartStatus: 'État SMART',
};

displayedRamKeys: string[] = ['manufacturer', 'type', 'size', 'clockSpeed', 'ecc', 'serialNum'];
ramKeyLabels: { [key: string]: string } = {
  manufacturer: 'Fabricant', type: 'Type', size: 'Taille', clockSpeed: 'Fréquence (MHz)', ecc: 'ECC', serialNum: 'Numéro de Série',
};

  async ngOnInit() {
   // Récupérer l'ID depuis l'URL
    this.utilisateurId = this.route.snapshot.paramMap.get('id') || '';
    this.ouverture_ordinateur= true;
    this.isLoading = true;
    const limit = pLimit(1);
    try {
        //------execution un a un--------
        await Promise.all([
            limit(() => this. recupe_user_id()),
          ]);
      }
    catch (error) {
        console.error("Erreur lors du chargement :", error);
    }

    this.isLoading = false;
  }


  //-----------------------------------------bande passante----------------------------
  private intervalId: any; // Stocker l'ID de l'intervalle
  startFetchingNetworkData() {
  /*  this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(async () => {
        await this.ngZone.run(async () => {
          if (this.entre === 1) {
            await this.fetchNetworkData();
          } else {
            clearInterval(this.intervalId); // Arrête l'intervalle si la condition n'est pas remplie
            this.intervalId = null; // Réinitialise l'ID de l'intervalle
          }
        });
      }, 3000); // Rafraîchit toutes les 3 secondes
    });*/
  }
ngOnDestroy() {
  this.entre=0;
}

async fetchNetworkData() {
        const stats = await this.backend.getNetworkStats();
        if (!stats || stats.length === 0) return;

        const download = stats[0].rx_sec / 1024; // Convertir en Ko/s
        const upload = stats[0].tx_sec / 1024;
        const timestamp = new Date().toLocaleTimeString();

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
//-------------------------------ordinateur--------------------------------------------------
  async fetchSystemData() {
      this.systemInfo = await this.backend.getSystemInfo();
      this.niveau_barre_chargement='3%';
  }

async fetchOsInfo() {
  this.osInfo = await this.backend.getOsInfo();
  this.niveau_barre_chargement='8%';
}

async fetchStatutAntivirus() {
  const antivirusData = await this.backend.getAntivirusStatus();
  this.antivirusStatus = [antivirusData];
  this.niveau_barre_chargement='16%';
}
//-------combine-----------------------
async ordinateur(){
this.ordinateurs = [this.systemInfo, this.osInfo, this.antivirusStatus];
}
//--------------------------------materiel---------------------------------------------------
async fetcRamInfo() {
  try {
    this.ramInfo = await this.backend.getRamInfo();
  } catch (error) {
    console.error('Erreur lors de la récupération des informations supplémentaires:', error);
  }
  this.niveau_barre_chargement='24%';
}

async fetchCpuInfo()  {
      try {
        this.cpuInfo = await this.backend.getCpuInfo();

      } catch (error) {
        console.error('Erreur lors de la récupération des informations supplémentaires:', error);
      }
      this.niveau_barre_chargement='32%';
    }

async fetchDiskInfo() {
      try {
        this.disks = await this.backend.getDiskInfo();
      } catch (error) {
        console.error('Erreur lors de la récupération des informations supplémentaires:', error);
      }
      this.niveau_barre_chargement='40%';
    }
async fetchGpuInfo() {
      try {
        // Récupérer les informations sur la carte graphique
        this.gpuInfo = await this.backend.getGpuInfo();
      } catch (error) {
        console.error('Erreur lors de la récupération des informations GPU:', error);
      }
      this.niveau_barre_chargement='48%';
    }

async fetchMonitoreInfo() {
      try {
        // Récupérer les informations sur la carte graphique
        this.displayMonitors = await this.backend.getMonitorInfo();
      } catch (error) {
        console.error('Erreur lors de la récupération des informations GPU:', error);
      }
      this.niveau_barre_chargement='56%';
    }

async  fetchNetworkInfo() {
      try {
          const networkDetailss = await this.backend.getinterfaceNetwork();
          console.log(networkDetailss);

          // Filtrer les interfaces ayant une adresse IPv4 non vide
          const filteredInterfaces = networkDetailss
              .filter(iface => iface.ip4 && iface.ip4.trim() !== '') // Filtrer les interfaces avec ip4 non vide
              .map(iface => ({
                  dhcp: iface.dhcp,
                  iface: iface.iface,
                  ip4: iface.ip4,
                  ip4subnet: iface.ip4subnet,
                  ip6: iface.ip6,
                  ip6subnet: iface.ip6subnet,
                  mac: iface.mac
              })); // Ne garder que les propriétés souhaitées
              this.networkDetails=filteredInterfaces
          console.log('Interfaces filtrées et réduites:', filteredInterfaces);
      } catch (error) {
          console.error('Erreur lors de la récupération des informations réseau:', error);
      }
      this.niveau_barre_chargement='62%';
  }

async fetchPeripheriquesUSB() {
      try {
        const peripheriquesBruts: Peripherique[] = await this.backend.getperipheriqueusb();

        this.peripheriques = peripheriquesBruts.filter((peripherique: Peripherique) =>
          peripherique.Name !== 'Hub USB racine (USB 3.0)' &&
          peripherique.Name !== 'Contr�leur h�te Intel(R) USB�3.0 eXtensible�-�1.0 (Microsoft)'
        );

        console.log('Périphériques USB récupérés:', this.peripheriques);
      } catch (error) {
        console.error('Erreur lors de la récupération des périphériques USB:', error);
      }
      this.niveau_barre_chargement='80%';
    }

async materiel() {
    /*  // Récupération des informations
      await this.fetcRamInfo();
      this.niveau_barre_chargement='32%'
      await this.fetchCpuInfo();
      this.niveau_barre_chargement='40%'
      await this.fetchDiskInfo();
      this.niveau_barre_chargement='48%'
      await this.fetchGpuInfo();
      this.niveau_barre_chargement='56%'
     await this.fetchMonitoreInfo();
      this.niveau_barre_chargement='64%'
      await this.fetchNetworkInfo();
      this.niveau_barre_chargement='72%'
     await this.fetchPeripheriquesUSB();
      this.niveau_barre_chargement='80%'*/

      // Vérification que toutes les données sont disponibles
      if (
        this.ramInfo &&  this.cpuInfo &&   this.disks &&  this.gpuInfo &&   this.displayMonitors && this.peripheriques &&  this.networkDetails
      ) {
        // Assignation des données à `this.materiels`
        this.materiels = [this.ramInfo,  this.cpuInfo,  this.disks,  this.gpuInfo, this.displayMonitors,this.peripheriques,this.networkDetails,
        ];

      } else {
        console.error("Certaines données sont manquantes.");
      }
    }

//--------------------------------------------logiciel-----------------------------------------
async logiciel() {
  try {
    this.logiciels = await this.backend.getInstalledSoftware ();
    console.log(this.logiciel)
    this.niveau_barre_chargement='95%'
    //console.log('Données des logiciels récupérées avec succès:', this.logiciels); // Log après avoir récupéré les données
  } catch (error) {
    console.error('Erreur lors de la récupération des informations sur les logiciels:', error);
  }
  this.niveau_barre_chargement='100%';
}
//----------------------------------------------user-------------------------------------------
//recupere user par id et id pc
async recupe_user_id() {
  const id = Number(this.utilisateurId);

  if (isNaN(id)) {
    console.error('ID utilisateur invalide:', this.utilisateurId);
    return;
  }

  await this.backend.getUtilisateurParId(id).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this.user = Array.isArray(data) ? data[0] : data;
      console.log(this.user)
      if (this.user) {
        this.id_ordi = this.user.idPc; // Assurez-vous que `idPc` existe

      } else {
        console.warn('Utilisateur non trouvé pour ID:', id);
      }
      this.recupe_ordi_id()

    },
    (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
    }
  );
}

async recupe_ordi_id() {
  const id = Number(this.id_ordi);

  if (isNaN(id)) {
    console.error('ID ordi invalide:', this.id_ordi);
    return;
  }
  await this.backend.getOrdinateurById(id).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this.ordinateur_recup = Array.isArray(data) ? data[0] : data;

      if (this.ordinateur_recup) {
        console.log('Ordinateur récupéré:', this.ordinateur_recup);

        // Fonction pour comparer deux objets ou tableaux de manière profonde
        const deepEqual = (obj1: any, obj2: any): boolean => {
          // Si les deux sont des tableaux
          if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) return false;

            // Créer une copie triée des tableaux pour ignorer l'ordre
            const sortedObj1 = obj1.slice().sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
            const sortedObj2 = obj2.slice().sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

            // Comparer chaque élément des tableaux triés
            for (let i = 0; i < sortedObj1.length; i++) {
              if (!deepEqual(sortedObj1[i], sortedObj2[i])) {
                return false;
              }
            }
            return true;
          }

          // Si les deux sont des objets
          if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            // Si le nombre de propriétés est différent
            if (keys1.length !== keys2.length) return false;

            // Normaliser les clés pour gérer les différences de noms (ex: 'model' vs 'name')
            const normalizeKey = (key: string) => {
              if (key === 'model' || key === 'name') return 'name'; // Considère 'model' et 'name' comme équivalents
              return key;
            };

            // Vérifier chaque propriété
            for (const key of keys1) {
              const normalizedKey = normalizeKey(key);

              // Trouver la clé correspondante dans le deuxième objet
              const matchingKey = keys2.find(k => normalizeKey(k) === normalizedKey);

              if (!matchingKey || !deepEqual(obj1[key], obj2[matchingKey])) {
                return false;
              }
            }
            return true;
          }

          // Comparaison simple pour les autres types (nombres, chaînes, booléens, etc.)
          return obj1 === obj2;
        };

        if (  Object.keys( this.systemInfo).length === 0  ) {
          console.log("verification ici1 base")
          this.verfication_database_vide()
          return
           }
        if (!this.ordinateur_recup.ordinateur || Object.keys(this.ordinateur_recup.ordinateur).length === 0 || !deepEqual(this.ordinateur_recup.ordinateur, this.materiels)) {
          console.log('Ordinateur : vide ou ne sont pas pareil');
          this.ordinateur_recup.ordinateur = this.systemInfo  ; // Mettre à jour avec les données simulées
        }

         if (!this.ordinateur_recup.os || Object.keys(this.ordinateur_recup.os).length === 0 || !deepEqual(this.ordinateur_recup.os, this.osInfo)) {
          console.log('OS : vide ou ne sont pas pareil');
          this.ordinateur_recup.os = this.osInfo; // Mettre à jour avec les données simulées
        }
        if (!this.ordinateur_recup.virus || Object.keys(this.ordinateur_recup.virus).length === 0 || !deepEqual(this.ordinateur_recup.virus, this.antivirusStatus)) {
          console.log('OS : vide ou ne sont pas pareil');
          this.ordinateur_recup.virus = this.antivirusStatus; // Mettre à jour avec les données simulées
        }
        // Vérification des champs obligatoires et comparaison avec les données simulées
      if (!this.ordinateur_recup.cpu || Object.keys(this.ordinateur_recup.cpu).length === 0 || !deepEqual(this.ordinateur_recup.cpu, this.cpuInfo)) {
          console.log('CPU : vide ou non pareil');
          this.ordinateur_recup.cpu = this.cpuInfo; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.disks || this.ordinateur_recup.disks.length === 0 || !deepEqual(this.ordinateur_recup.disks, this.disks)) {
          console.log('Disks : vide ou ne sont pas pareil');
          this.ordinateur_recup.disks = this.disks; // Mettre à jour avec les données simulées
        }

         if (!this.ordinateur_recup.gpu || this.ordinateur_recup.gpu.length === 0 || !deepEqual(this.ordinateur_recup.gpu, this.gpuInfo)) {
          console.log('GPU : vide ou ne sont pas pareil');
          this.ordinateur_recup.gpu = this.gpuInfo; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.interfacereseau || this.ordinateur_recup.interfacereseau.length === 0 || !deepEqual(this.ordinateur_recup.interfacereseau, this.networkDetails)) {
          console.log('Interface Réseau : vide ou ne sont pas pareil');
          this.ordinateur_recup.interfacereseau = this.networkDetails; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.logiciel || this.ordinateur_recup.logiciel.length === 0 || !deepEqual(this.ordinateur_recup.logiciel, this.logiciels)) {
          console.log('Logiciel : vide ou ne sont pas pareil');

          this.ordinateur_recup.logiciel = this.logiciels; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.moniteur || this.ordinateur_recup.moniteur.length === 0 || !deepEqual(this.ordinateur_recup.moniteur, this.displayMonitors)) {
          console.log('Moniteur : vide ou ne sont pas pareil');
          this.ordinateur_recup.moniteur = this.displayMonitors; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.peripheriques || this.ordinateur_recup.peripheriques.length === 0 || !deepEqual(this.ordinateur_recup.peripheriques, this.peripheriques)) {
          console.log('Périphériques : vide ou ne sont pas pareil');
          this.ordinateur_recup.peripheriques = this.peripheriques; // Mettre à jour avec les données simulées
        }

        if (!this.ordinateur_recup.ram || this.ordinateur_recup.ram.length === 0 || !deepEqual(this.ordinateur_recup.ram, this.ramInfo)) {
          console.log('RAM : vide ou ne sont pas pareil');
          this.ordinateur_recup.ram = this.ramInfo; // Mettre à jour avec les données simulées
        }

        this.ordinateur_recup.statut = "En cours d'utilisation";
        this.ordinateur_recup.logiciel = this.logiciels;


        this.mise_a_jour_ordi(id, this.ordinateur_recup);
      } else {
        console.warn('Ordinateur non trouvé pour ID:', id);
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération de l’ordinateur:', error);
    }
  );

}

async mise_a_jour_ordi(id:number,ordinateur:Ordinateur){

 await this.backend.updateOrdinateur(id,ordinateur).subscribe({
    next: (response) => {
      console.log("ordinateur mis à jour avec succès :", response);
      this.verfication_database_vide()
    },
    error: (error) => {
      console.error("Erreur lors de la mise à jour de l'ordinateur :", error);
    }
  });
}

async verfication_database_vide() {
  const id = Number(this.id_ordi);
  console.log( id)
  if (isNaN(id)) {
      console.error('ID ordi invalide:', this.id_ordi);
      return;
  }
  try {
      const data = await this.backend.getOrdinateurById(id).toPromise();

      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this.ordinateur_recup = Array.isArray(data) ? data[0] : data;
      console.log("verification data base")
      console.log(Object.keys(this.ordinateur_recup.ordinateur).length )
      if (Object.keys(this.ordinateur_recup.ordinateur).length === 0) {
          console.log('vide ou ', this.ordinateur_recup.ordinateur);
          this.base_donne_vide = true;
          this.isLoading = true;
          const limit = pLimit(1);
          try {
              //------execution un a un--------
              await Promise.all([
                  limit(() => this.fetchSystemData()),
                  limit(() => this.fetchOsInfo()),
                  limit(() => this.fetchStatutAntivirus()),
                  limit(() => this.ordinateur()),
                  limit(() => this.fetcRamInfo()),
                  limit(() => this.fetchCpuInfo()),
                  limit(() => this.fetchDiskInfo()),
                  limit(() => this.fetchGpuInfo()),
                  limit(() => this.fetchMonitoreInfo()),
                  limit(() => this.fetchNetworkInfo()),
                  limit(() => this.fetchPeripheriquesUSB()),
                  limit(() => this.materiel()),
                  limit(() => this.logiciel())
              ]);
              this. recupe_ordi_id();
              this.isLoading =false;
          } catch (error) {
              console.error("Erreur lors du chargement :", error);
          }
          return;
      }

      this.systemInfo = this.ordinateur_recup.ordinateur; // Mettre à jour avec les données simulées
      this.osInfo = this.ordinateur_recup.os;
      this.antivirusStatus = this.ordinateur_recup.virus;
      this.cpuInfo = this.ordinateur_recup.cpu;
      this.disks = this.ordinateur_recup.disks;
      this.gpuInfo = this.ordinateur_recup.gpu;
      this.networkDetails = this.ordinateur_recup.interfacereseau;
      this.logiciels = this.ordinateur_recup.logiciel;
      this.displayMonitors = this.ordinateur_recup.moniteur;
      this.peripheriques = this.ordinateur_recup.peripheriques;
      this.ramInfo = this.ordinateur_recup.ram;
      this.ordinateur()
      this.materiel()
      this.logiciel()

  } catch (error) {
      console.error('Erreur lors de la récupération de l’ordinateur:', error);
      this.base_donne_vide = false;
  }
}

async recupe_data_local(){
  this.isLoading = true;
  const limit = pLimit(1);
  try {
        //------execution un a un--------
        await Promise.all([
          limit(() => this.fetchSystemData()),
          limit(() => this.fetchOsInfo()),
          limit(() => this.fetchStatutAntivirus()),
          limit(() => this.ordinateur()),
          limit(() =>  this.fetcRamInfo()),
          limit(() =>  this.fetchCpuInfo()),
          limit(() =>  this.fetchDiskInfo()),
          limit(() =>  this.fetchGpuInfo()),
          limit(() =>  this.fetchMonitoreInfo()),
          limit(() =>  this.fetchNetworkInfo()),
          limit(() =>  this.fetchPeripheriquesUSB()),
          limit(() => this.materiel()),
          limit(() => this.logiciel())
        ]);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
  this. recupe_ordi_id();
  this.isLoading = false;
}











ouverture_accueil :boolean= false;
ouverture_ordinateur:boolean = false;
ouverture_logiciel :boolean= false;
ouverture_materiel :boolean= false;
ouverture_imprimante :boolean = false;
ouverture_ticket:boolean = false;
ouverture_profil :boolean= false;

ouvrir_accueil() {
  this.fermerTout();
  this.ouverture_accueil = true;
}

ouvrir_equipement() {
  this.fermerTout();
  this.ouverture_ordinateur = true;
}

ouvrir_logiciel() {
  this.fermerTout();
  this.ouverture_logiciel = true;
}
ouvrir_Materiel(){
  this.fermerTout();
  this.ouverture_materiel = true;
}

ouvrir_imprimante() {
  this.fermerTout();
  this.ouverture_imprimante = true;
}

ouvrir_ticket() {
  this.fermerTout();
  this.ouverture_ticket = true;
}

ouvrir_profil() {
  this.fermerTout();
  this.ouverture_profil = true;
}

ouvrir_deconnexion() {
  console.log('Déconnexion en cours...'); // Log pour vérifier que la méthode est appelée
  this.router.navigate(['/acceuille']);

  this.entre=0;
}
fermerTout() {
  this.ouverture_accueil = false;
  this.ouverture_ordinateur = false;
  this.ouverture_logiciel = false;
  this.ouverture_imprimante = false;
  this.ouverture_materiel = false;
  this.ouverture_ticket = false;
  this.ouverture_profil = false;
}


}
