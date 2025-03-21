
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Ajoutez cette ligne
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { BackendserviceService } from '../../backendservice.service';
export interface Bureau {
  id: number;
  nom: string;
  etage: number;
}
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
export interface Moniteur {
  id?: number;
  model: string;
  numSerie: string;
  dateAcquisition: Date;
  statut: string;
  prix: string;
  idPc: string;
  idbureau: string;
}
export interface Imprimante {
  id?: number;
  nom: string;
  statut: string;
  model: string;
  marque: string;
  numSerie: string;
  dateAcquisition: Date;
  prix: string;
  ip: string;
  masque: string;
  mac: string;
  passerel: string;
  nomLan: string;
  idLan: string;
  relieEquipmt: string;
  idEquipmt: string;
  idbureau: string;
}
export interface Stabilisateur {
  id?: number; // Optionnel, si géré par la base de données
  nom: string;
  statut: string;
  model: string;
  marque: string;
  numSerie: string;
  dateAcquisition: Date;
  prix: string;
  puissance: string;
  tensionSortie: string;
  frequence: string;
  idEquipmt: string;
  idbureau: string;
  relieEquipmt: string;
}
export interface Swicth {
  id?: number; // Optionnel car il est généré automatiquement par le backend
  nom: string;
  marque: string;
  model: string;
  numSerie: string;
  idBureau: string;
  dateInstallation: Date;
  statut: string;
  configurable: boolean;
  adresseIPv4Gestion: string;
  adresseIPv6Gestion: string;
  masqueSousReseaupv4: string;
  masqueSousReseauipv6: string;
  passerelleParDefaut: string;
  protocolesGestion: string[];
  adresseMAC: string;
  nombrePorts: number;
  typePorts: string[];
  systemeExploitation: string;
  dateDerniereMiseAJour: Date;
  motDePasseAdmin: string;
  protocolesSecurite: string[];
  dansLvlan: string;
  prix: string;


}
export interface Routeur {
  id?: number; // Optionnel si géré par la base de données
  nom: string;
  marque: string;
  model: string;
  numSerie: string;
  idBureau: string;
  dateInstallation: Date;
  statut: string;
  typeConnexion: string;
  adresseIp: string;
  adresseMac: string;
  dansVlanId: string;
  dansVlanNom: string;
  idBureauSup: string;
  idStabisiteur: string;
  prix: string;
}
export interface PointdAcces {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  marque: string;
  model: string;
  prix: string;
  ip: string;
  macc: string;
  idlieu: string;
  statut: string;
  dateInstallation: Date;
  numSerie: string;
}
export interface Serveur {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  marque: string;
  description: string;
  dateInstallation: Date;
  typeHeberge: string;
  hebergeur: string;
  typeServeur: string;
  systemeExploitation: string;
  versionOS: string;
  statut: string;
  idBureau: string;
  idStabilisateur: string;
  idAdminReseau: string;
  modeleCPU: string;
  frequenceCPU: string;
  ram: string;
  stockage: string;
  typeDisque: string;
  gpu: string;
  frequenceGPU: string;
  mac: string;
  ip: string;
  dnsPrimaire: string;
  dnsSecondaire: string;
  passerelle: string;
  protocole: string;
  nomUtilisateur: string;
  motDePasse: string;
  prix: string;
  periodePaiement : string;
  mode: string;
  typeram: string;
}

export interface Serviceserveur {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  id_serveur: string;
  version: string;
  chemin: string;
  service: string;
}

interface ServerInfo {
  serverName: string;
  serverId: string;
  serverStatus: string;
  serverLocation: string;
  serverDescription: string;
}

interface HardwareConfig {
  processor: string;
  ram: string;
  disks: string;
  networkCard: string;
  gpu: string;
}

interface NetworkConfig {
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  dnsServers: string;
  vlan: string;
}

interface OSConfig {
  osName: string;
  lastUpdate: string;
  securityPatches: string;
}

interface SecurityConfig {
  firewallRules: string;
  antivirusStatus: string;
  sshRdpAccess: string;
}

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
    selector: 'app-serveur',
    templateUrl: './serveur.component.html',
    styleUrl: './serveur.component.scss'
  })
  export class ServeurComponent implements OnInit{

      active_affiche_equiment:boolean=false;
      active_insert_ordinateur:boolean=false;
      active_insert_moniteur:boolean=false;
      active_insert_serveur:boolean=false;
      active_insert_routeur:boolean=false;
      active_insert_imprimante:boolean=false;
      active_insert_swict:boolean=false;
      visualisation_equipemen:boolean=false;
      active_affiche_bureau:boolean=false;

      //-----------------------------------
      active_ordinateur :boolean= false;
      active_materiel:boolean = false;
      active_logiciel:boolean = false;
      active_imprimante :boolean= false;

      systemInfo: any = {};
      osInfo: any = {};
      antivirusStatus: any[] = [];
      ajour: boolean = false;
      nom_bureau_entete:string="";
      id_bureau:number=0;
      //------------------------------user---------------------------------
      nom:string=''
      prenom:string=''
      id_user:number=0
      //---------------------------------buraur--------------------------------
      bureaux: Bureau[] = []; // Initialisation avec un tableau vide
      newBureau: Bureau = { id: 0, nom: '', etage: 1 };
       // Liste des étages disponibles
       etages = [
        { value: 1, label: '1er étage' },
        { value: 2, label: '2e étage' },
        { value: 3, label: '3e étage' },
        { value: 4, label: '4e étage' },
        { value: 5, label: '5e étage' },
        { value: 5, label: '6e étage' },
      ];
     //-----------------------------ordinateurs -----------------------
      //--------envoi-------
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
      ordinateur_visual: Ordinateur  = {
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
      //-------recupere------
      ordinateurs_id_bureau: Ordinateur[] = [];  // Liste d'ordinateurs
      all_ordinateurs : Ordinateur[] = [];  // Liste d'ordinateurs
      id_ordi!:number;
      id_ordi_visual!:number;
      user_id_odrinateur={};
      user:Utilisateur[] = [];

      //------------*--------------------moniteur-----------------------

      moniteur:Moniteur[] = [];
      newmoniteur: Moniteur = {
        model: '',
        numSerie: '',
        dateAcquisition: new Date(),
        statut: '',
        prix:'0',
        idPc: '0',
        idbureau: '0',
      };

       //------------*--------------------imprimante---------------------------
       All_imprimante:Imprimante[] = [];
       imprimante_bureau:Imprimante[] = [];
       newImprimante: Imprimante = {
        nom: '',
        statut: '',
        model: '',
        marque: '',
        numSerie: '',
        dateAcquisition: new Date(),
        prix: '0',
        ip: '',
        masque: '',
        mac: '',
        passerel: '',
        nomLan: '',
        idLan: '',
        relieEquipmt: '',
        idEquipmt: '',
        idbureau: '',
      };

      //---------------------------------stabilisateur-------------------------
      All_Stabilisateur:Stabilisateur[] = [];
      Stabilisateur_bureau: Stabilisateur[] = [];
      newStabilisateur: Stabilisateur = {
        nom: " ",
        statut: " ",
        model: " ",
        marque: " ",
        numSerie: "",
        dateAcquisition: new Date(),
        prix: "",
        puissance: "",
        tensionSortie: "",
        frequence: "",
        idEquipmt: "",
        idbureau: "",
        relieEquipmt: ""
      };

       //------------*--------------------swicth---------------------------
       switches: Swicth[] = []; // Tableau pour stocker la liste des switches
       newSwicth: Swicth = {
        nom: '',
        marque: '',
        model: '',
        numSerie: '',
        idBureau: '',
        dateInstallation: new Date(),
        statut: '',
        configurable: false,
        adresseIPv4Gestion: '',
        adresseIPv6Gestion: '',
        masqueSousReseaupv4: '',
        masqueSousReseauipv6: '',
        passerelleParDefaut: '',
        protocolesGestion: [],
        adresseMAC: '',
        nombrePorts: 0,
        typePorts: [],
        systemeExploitation: '',
        dateDerniereMiseAJour: new Date(),
        motDePasseAdmin: '',
        protocolesSecurite: [],
        dansLvlan: '',
        prix: '',
      };
      //----------------------------routeur-------------------------
      All_routeur: Routeur [] = [];
      routeur_bureau:  Routeur [] = [];
      newrouteur: Routeur = {
        id: undefined,
        nom: '',
        marque: '',
        model: '',
        numSerie: '',
        idBureau: '',
        dateInstallation: new Date(),
        statut: '',
        typeConnexion: '',
        adresseIp: '',
        adresseMac: '',
        dansVlanId: '',
        dansVlanNom: '',
        idBureauSup: '',
        idStabisiteur: '',
        prix:'',
      };
      //----------------------------point d acce--------------------------
      All_pointsAcces: PointdAcces[] = [];
      pointsAcces_bureau: PointdAcces[] = [];
      newpointsAcces: PointdAcces = {
        nom: '',
        marque: '',
        model:'',
        prix:'',
        ip: '',
        macc: '',
        idlieu: '',
        statut:'',
        dateInstallation: new Date(),
        numSerie:'',
      };
    //----------------------serveur------------------------------
    All_serveur: Serveur[] = [];
    serveur_bureau:Serveur[] = [];
    serveur :Serveur[] = [];
    serveur_id: Serveur = {
      id: 0, // Au lieu de `undefined`
      nom: "",
      marque: "",
      description: "",
      dateInstallation: new Date("2025-03-01"), // Format correct
      typeHeberge: "",
      hebergeur: "",
      typeServeur: "",
      systemeExploitation: "",
      versionOS: "",
      statut: "",
      idBureau: "",
      idStabilisateur: "",
      idAdminReseau: "",
      modeleCPU: "",
      frequenceCPU: "",
      ram: "",
      stockage: "",
      typeDisque: "",
      gpu: "",
      frequenceGPU: "",
      mac: "",
      ip: "",
      dnsPrimaire: "",
      dnsSecondaire: "",
      passerelle: "",
      protocole: "",
      nomUtilisateur: "",
      motDePasse: "",
      prix: "",
      periodePaiement: "",
      mode: "",
      typeram: ""
    };
//--------------------------
    nom_serveur:string='';
    marque_serveur: string  = "";
    description_serveur: string  = "";
    dateInstallation: Date = new Date("2025-03-01"); // Format correct
    typeHeberge_serveur: string  = "";
    hebergeur_serveur: string  = "";
    typeServeur_serveur: string  = "";
    systemeExploitation_serveur: string  = "";
    versionOS_serveur: string  = "";
    statut_serveur: string  = "";
    idBureau_serveur: string  = "";
    idStabilisateur_serveur: string  = "";
    idAdminReseau_serveur: string  = "";
    modeleCPU_serveur: string  = "";
    frequenceCPU_serveur: string  = "";
    ram_serveur: string  = "";
    stockage_serveur: string  = "";
    typeDisque_serveur: string  = "";
    gpu_serveur: string  = "";
    frequenceGPU_serveur: string  = "";
    mac_serveur: string  = "";
    ip_serveur: string  = "";
    dnsPrimaire_serveur: string  = "";
    dnsSecondaire_serveur: string  = "";
    passerelle_serveur: string  = "";
    protocole_serveur: string  = "";
    nomUtilisateur_serveur: string  = "";
    motDePasse_serveur: string  = "";
    prix_serveur: string  = "";
    periodePaiement_serveur: string  = "";
    mode_serveur: string  = "";
    typeram_serveur: string  = "";
//---------------------------------
    nom_bureau_servuer: string = " ";
    newserveur: Serveur = {
      id: undefined,
      nom: '',
      marque: '',
      description: '',
      dateInstallation: new Date(),
      typeHeberge: '',
      hebergeur: '',
      typeServeur: '',
      systemeExploitation: '',
      versionOS: '',
      statut: '',
      idBureau: '',
      idStabilisateur: '',
      idAdminReseau: '',
      modeleCPU: '',
      frequenceCPU: '',
      ram: '',
      stockage: '',
      typeDisque: '',
      gpu: '',
      frequenceGPU: '',
      mac: '',
      ip: '',
      dnsPrimaire: '',
      dnsSecondaire: '',
      passerelle: '',
      protocole: '',
      nomUtilisateur: '',
      motDePasse: '',
      prix: '',
      periodePaiement : '',
      mode: '',
      typeram: ''
    };
    id_serveur:number=0
    //----------------------serviceserveur--------------------------
    All_serviceserveur:Serviceserveur[] = [];
    service_idserveur:Serviceserveur[] = [];
    newserviceserveur: Serviceserveur = {
      nom: '',
      id_serveur: '',
      version: '',
      chemin: '',
      service: ''
    };
    constructor( private route: ActivatedRoute,private backend: BackendserviceService) {}

    serverInfo: ServerInfo = {
      serverName: 'Serveur 1',
      serverId: '1234',
      serverStatus: 'Actif',
      serverLocation: 'Salle 101',
      serverDescription: 'Serveur principal'
    };

    hardwareConfig: HardwareConfig = {
      processor: 'Intel Xeon',
      ram: '32 Go',
      disks: 'SSD 1 To',
      networkCard: 'Intel NIC',
      gpu: 'NVIDIA Tesla'
    };

    networkConfig: NetworkConfig = {
      ipAddress: '192.168.1.1',
      subnetMask: '255.255.255.0',
      gateway: '192.168.1.254',
      dnsServers: '8.8.8.8, 8.8.4.4',
      vlan: 'VLAN 1'
    };

    osConfig: OSConfig = {
      osName: 'Linux Ubuntu 20.04',
      lastUpdate: '12 février 2025',
      securityPatches: 'Tous les patches installés'
    };

    securityConfig: SecurityConfig = {
      firewallRules: 'Actif',
      antivirusStatus: 'Mis à jour',
      sshRdpAccess: 'Désactivé'
    };

    isEditing: { [key: number]: boolean } = {};

    modifierCategorie(id: number): void {
      this.isEditing[id] = true;
    }

    validerModification(id: number): void {
      this.isEditing[id] = false;
    ////  this.afficherValeurModifiee(id);
    }


    afficherValeurModifiee(id: number): void {
      switch (id) {
        case 1:
          console.log('Nom du serveur modifié:', this.serverInfo.serverName);
          break;
        case 2:
          console.log('ID du serveur modifié:', this.serverInfo.serverId);
          break;
        case 3:
          console.log('Emplacement du serveur modifié:', this.serverInfo.serverLocation);
          break;
        case 4:
          console.log('Descrifffption du serveur modifiée:', this.serverInfo.serverDescription);
          break;
        case 5:
          console.log('Processeur modifié:', this.hardwareConfig.processor);
          break;
        case 6:
          console.log('RAM modifiée:', this.hardwareConfig.ram);
          break;
        case 7:
          console.log('Disques durs / SSD modifiés:', this.hardwareConfig.disks);
          break;
        case 8:
          console.log('Carte réseau modifiée:', this.hardwareConfig.networkCard);
          break;
        case 9:
          console.log('Carte graphique modifiée:', this.hardwareConfig.gpu);
          break;
        case 10:
          console.log('Adresse IP modifiée:', this.networkConfig.ipAddress);
          break;
        case 11:
          console.log('Masque de sous-réseau modifié:', this.networkConfig.subnetMask);
          break;
        case 12:
          console.log('Passerelle par défaut modifiée:', this.networkConfig.gateway);
          break;
        case 13:
          console.log('Serveurs DNS modifiés:', this.networkConfig.dnsServers);
          break;
        case 14:
          console.log('VLAN modifié:', this.networkConfig.vlan);
          break;
        case 15:
          console.log('Système d\'exploitation modifié:', this.osConfig.osName);
          break;
        case 16:
          console.log('Dernière mise à jour modifiée:', this.osConfig.lastUpdate);
          break;
        case 17:
          console.log('Patchs de sécurité modifiés:', this.osConfig.securityPatches);
          break;
        case 18:
          console.log('Règles du pare-feu modifiées:', this.securityConfig.firewallRules);
          break;
        case 19:
          console.log('Statut de l\'antivirus modifié:', this.securityConfig.antivirusStatus);
          break;
        case 20:
          console.log('Accès SSH/RDP modifié:', this.securityConfig.sshRdpAccess);
          break;
        default:
          console.log('ID non reconnu');
      }
    }
    recupe_nom_bureau(id:  string): string {
      const id_bur= Number(id )
      if (id === "-1") {
        return "ID invalide";
      }
      // Recherche  nom l'ordinateur
      const bureau =   this.bureaux .find(u => u.id === id_bur ); // Assurez-vous que idPc est une chaîne de caractères
      if (! bureau) {
        this.nom_bureau_servuer= "Inconnu"
        return "Inconnu";
      }
     this. nom_bureau_servuer=bureau.nom

      // Retourne le nom complet de l'utilisateur
      return `${ this. nom_bureau_servuer} `;
    }

    Modificationnom(id: number ): void{
      this.isEditing[id] = false;
      this.serveur_id.nom=this.nom_serveur
        console.log( this.serveur_id)
       this .mise_jour_serveur(id, this.serveur_id)
    }


    ModificationMarque(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.marque = this.marque_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationDescription(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.description = this.description_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationDateInstallation(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.dateInstallation = this.dateInstallation;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationTypeHeberge(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.typeHeberge = this.typeHeberge_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationHebergeur(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.hebergeur = this.hebergeur_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationTypeServeur(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.typeServeur = this.typeServeur_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationSystemeExploitation(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.systemeExploitation = this.systemeExploitation_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationVersionOS(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.versionOS = this.versionOS_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationStatut(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.statut = this.statut_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationIdBureau(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.idBureau = this.idBureau_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationIdStabilisateur(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.idStabilisateur = this.idStabilisateur_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationIdAdminReseau(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.idAdminReseau = this.idAdminReseau_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationModeleCPU(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.modeleCPU = this.modeleCPU_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationFrequenceCPU(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.frequenceCPU = this.frequenceCPU_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationRAM(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.ram = this.ram_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }
    ModificationtypeRAM(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.typeram = this.typeram_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationStockage(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.stockage = this.stockage_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationTypeDisque(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.typeDisque = this.typeDisque_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationGPU(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.gpu = this.gpu_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationFrequenceGPU(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.frequenceGPU = this.frequenceGPU_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationMAC(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.mac = this.mac_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationIP(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.ip = this.ip_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationDNSPrimaire(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.dnsPrimaire = this.dnsPrimaire_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationDNSSecondaire(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.dnsSecondaire = this.dnsSecondaire_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationPasserelle(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.passerelle = this.passerelle_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationProtocole(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.protocole = this.protocole_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationNomUtilisateur(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.nomUtilisateur = this.nomUtilisateur_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationMotDePasse(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.motDePasse = this.motDePasse_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }

    ModificationPrix(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.prix = this.prix_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }
    Modificationmode(id: number): void {
      this.isEditing[id] = false;
      this.serveur_id.mode = this.mode_serveur;
      this.mise_jour_serveur(id, this.serveur_id);
    }




  //----------------------------------------------------------------------------------------------

  ngOnInit() {
      this.id_user= Number(this.route.snapshot.paramMap.get('id') || '-1');
      this.recupere_all_serveur()
      this.recupere_all_serviceserveur()
      this.loadBureaux();
      this.recupe_user()

    }

  // Charger tous les bureaux
  loadBureaux()  {
   this.backend.getAllBureaux().subscribe(
      (data) => {
        this.bureaux = data;
      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );
  }

  //--------------------------------------serveur-----------------------------------

  async recupere_all_serveur(){

    await this.backend.getAllServeurs () .subscribe(
      (data) => {
        this.All_serveur= data;
        console.log( this.All_serveur)
        this.recupe__serveur_bureau()
      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );
  }

// Récupère un serveur spécifique par son ID
recupere_serveur_id(id: number) {
  this.id_serveur = id;
  this.serveur = this.All_serveur.filter(u => u.id === id);
  console.log(this.serveur)
  this.serveur_id= this.serveur[0]
  this.recupere_all_serviceserveur()
}

// Récupère les serveurs associés à un bureau spécifique
recupe__serveur_bureau() {
  const id_bureau = String(this.id_bureau);
  console.log(id_bureau);
  this.serveur_bureau = this.All_serveur.filter(u => u.idBureau === id_bureau);
  console.log(this.serveur_bureau);
}

// Ajouter un nouveau serveur
async addserveur() {
  this.newserveur.statut = "actif";
  this.newserveur.idBureau = String(this.id_bureau);
  console.log(this.newpointsAcces);

  try {
    const newserveur = await this.backend.addServeur(this.newserveur).toPromise();
    console.log('Nouveau serveur ajouté avec succès:', newserveur);
    this.recupere_all_serveur(); // Récupérer à nouveau la liste des serveurs après l'ajout
  } catch (err) {
    console.error('Erreur lors de l\'ajout du serveur:', err);
    alert('Erreur lors de l\'ajout du serveur.');
  }
}

// Mise à jour d'un serveur existant
async mise_jour_serveur(id: number, serveur: Serveur) {
  try {
    const response = await this.backend.updateServeur(this.id_serveur ?? -1, serveur).toPromise();
    console.log('Serveur mis à jour avec succès:', response);
    this.recupere_serveur_id(this.id_serveur); // Récupérer le serveur mis à jour
  } catch (err) {
    console.error('Erreur lors de la mise à jour du serveur:', err);
  }
}

// Suppression d'un serveur par son ID
async supprime_serveur_id(id: number, event: MouseEvent) {
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }

  try {
    const response = await this.backend.deleteServeur(id).toPromise();
    console.log('Serveur supprimé avec succès:', response);
    this.recupere_all_serveur(); // Récupérer à nouveau la liste des serveurs après suppression
  } catch (err) {
    console.error('Erreur lors de la suppression  du serveur:', err);
  }
}

  //-----------------------------------service-------------------------------------
  async recupere_all_serviceserveur(){

    await this.backend.getAllServiceserveurs () .subscribe(
      (data) => {
        this.All_serviceserveur= data;
        console.log(  this.All_serviceserveur)
        this.recupe__service_serveur()
      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );
  }
  recupe__service_serveur( ){
    const id_serve=   String( this.id_serveur)
    this.service_idserveur= this.All_serviceserveur.filter(u => u.id_serveur ===  id_serve);
    console.log( this.service_idserveur )
  }
  // Ajouter un nouveau serveur
async addservice() {
  this.newserviceserveur.id_serveur= String(this.id_serveur);
  console.log( this.newserviceserveur);

  try {
    const newserveur = await this.backend.addServiceserveur(this.newserviceserveur).toPromise();
    console.log('Nouveau this.newserviceserveur ajouté avec succès:', newserveur);
    this.recupere_all_serviceserveur(); // Récupérer à nouveau la liste des serveurs après l'ajout
  } catch (err) {
    console.error('Erreur lors de l\'ajout du this.newserviceserveur:', err);
    alert('Erreur lors de l\'ajout du this.newserviceserveur.');
  }
}

  async supprime_service_id(id: number, event: MouseEvent) {
    event.stopPropagation();

    if (id === -1) {
      console.error('ID invalide pour la suppression');
      return;
    }

    try {
      const response = await this.backend.deleteServiceserveur(id).toPromise();
      console.log('service supprimé avec succès:', response);
      this. recupere_all_serviceserveur(); // Récupérer à nouveau la liste des serveurs après suppression
    } catch (err) {
      console.error('Erreur lors de la suppression du service:', err);
    }
  }
  //------------------------------------user------------------------------------------
  // Récupère tous les utilisateurs
async recupe_user() {
  try {
   await this.backend.getTousLesUtilisateurs().subscribe({
      next: (data) => {
        this.user = data;
        const utilisateur = this.user.find(u => u.id === this.id_user);
        if (utilisateur) {
          this.nom = utilisateur.nom;
          this.prenom = utilisateur.prenom;
        }
        },
      error: (err) => {
        alert("Ce compte n'existe pas")
      }
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    alert("Une erreur s'est produite lors de la récupération des utilisateurs.");
  }
}
// Récupère tous les utilisateurs

  //------------------------------------3-------------------------------------------
  async recupe_ordi_id(){
    console.log(this.id_ordi_visual)
    await this.backend.getOrdinateurById(this.id_ordi_visual).subscribe(
      (data) => {
        this.ordinateur_visual= data
        console.log("eterer",this.ordinateur_visual.cpu)
        this.systemInfo =this.ordinateur_visual.ordinateur;
        this.osInfo=this.ordinateur_visual.os;
        this.antivirusStatus=this.ordinateur_visual.virus;
        this.ramInfo=this.ordinateur_visual.ram;
        this.ramInfo=this.ordinateur_visual.ram;
        this.cpuInfo=this.ordinateur_visual.cpu;
        this.disks=this.ordinateur_visual.disks;
        this.gpuInfo=this.ordinateur_visual.gpu;
        this.displayMonitors=this.ordinateur_visual.moniteur;
        this.peripheriques =this.ordinateur_visual.peripheriques
        this.networkDetails=this.ordinateur_visual.interfacereseau
        this.softwareInfo =this.ordinateur_visual.logiciel



      },
      (error) => {
        console.error('Erreur lors recup ordi', error);
      }
    );
  }

  ouvrir_ordinateur() {
    this.resetAll();
    this.active_ordinateur = true;
  }

  ouvrir_materiel() {
    this.resetAll();
    this.active_materiel = true;
  }

  ouvrir_logiciel() {
    this.resetAll();
    this.active_logiciel = true;
  }

  ouvrir_imprimante() {
    this.resetAll();
    this.active_imprimante = true;
  }

  private resetAll() {
    this.active_ordinateur = false;
    this.active_materiel = false;
    this.active_logiciel = false;
    this.active_imprimante = false;
  }
  //------------------------------------------
  fetchSystemInfo() {
    // Simulation des données
   /* this.systemInfo = {
      manufacturer: 'Dell',
      model: 'XPS 15',
      version: '1.2.3',
      serial: 'ABC123456',
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      sku: 'SKU-9876',
      virtual: false
    };*/
  }

  fetchOsInfo() {
    // Simulation des données
    /*this.osInfo = {
      platform: 'Windows',
      distro: 'Windows 10 Pro',
      release: '10.0.19044',
      kernel: '10.0.19044.2006',
      arch: 'x64',
      serial: 'OS-12345',
      fqdn: 'mycomputer.local',
      hypervisor: false,
      uefi: true
    };*/
  }

  fetchAntivirusStatus() {
    // Simulation des données
    /*this.antivirusStatus = [
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
    ];*/


    // Vérifier si l'antivirus est à jour
    this.ajour = this.isAntivirusUpToDate();
  }

  isAntivirusUpToDate(): boolean {
    if (!this.antivirusStatus.length) return false;
    const lastUpdate = new Date(this.antivirusStatus[0]?.AntivirusSignatureLastUpdated);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Considérer comme à jour si mis à jour dans les 7 derniers jours
  }

  formatDate_Ant(date: Date | undefined): string {
    if (!date) return 'Non disponible';
    return new Date(date).toLocaleDateString('fr-FR');
  }
  //-------------------materiel------------------------------
  ramInfo: any[] = [
   /* { manufacturer: 'Corsair', type: 'DDR4', size: 8 * 1024 * 1024 * 1024, clockSpeed: 3200, ecc: false, serialNum: '12345' },
    { manufacturer: 'Kingston', type: 'DDR4', size: 16 * 1024 * 1024 * 1024, clockSpeed: 2666, ecc: false, serialNum: '67890' },
  */];

  cpuInfo: any = {
   /* brand: 'Intel',
    model: 'Core i7-9700K',
    manufacturer: 'Intel Corporation',
    cores: 8,
    speed: 3.60,
    virtualization: true,*/
  };

  disks: any[] = [
   /* { name: 'Samsung SSD', type: 'SSD', size: 512 * 1024 * 1024 * 1024, serialNum: 'SSD123', interfaceType: 'SATA', smartStatus: 'Good' },
    { name: 'Seagate HDD', type: 'HDD', size: 1 * 1024 * 1024 * 1024 * 1024, serialNum: 'HDD456', interfaceType: 'SATA', smartStatus: 'Warning' },*/
  ];

  gpuInfo: any[] = [
   /* { model: 'GeForce GTX 1080', vendor: 'NVIDIA', vram: 8192 },
    { model: 'Radeon RX 5700', vendor: 'AMD', vram: 8192 },*/
  ];

  displayMonitors: any[] = [
   /* { model: 'Dell U2718Q', vendor: 'Dell', connection: 'HDMI', builtin: false, deviceName: 'Monitor1', main: true, currentResX: 3840, currentResY: 2160, sizeX: 61.4, sizeY: 34.5 },
    { model: 'LG 27GL850-B', vendor: 'LG', connection: 'DisplayPort', builtin: false, deviceName: 'Monitor2', main: false, currentResX: 2560, currentResY: 1440, sizeX: 61.1, sizeY: 34.3 },*/
  ];

  peripheriques: any[] = [
    /*{ Class: 'USB', Name: 'Mouse', Status: 'Connected' },
    { Class: 'USB', Name: 'Keyboard', Status: 'Disconnected' },*/
  ];
  networkDetails: any[] = [
    /*{ iface: 'eth0', ip4: '192.168.0.1', ip6: 'fe80::1234:5678:9abc:def0', mac: '00:1A:2B:3C:4D:5E', type: 'Ethernet', dhcp: true, ifaceName: 'Ethernet0' },
    { iface: 'wlan0', ip4: '192.168.0.2', ip6: '', mac: '00:1A:2B:3C:4D:5F', type: 'Wireless', dhcp: false, ifaceName: 'Wi-Fi' },*/
  ];
  displayedvirusKeys: string[] = ['Name', 'AntivirusSignatureLastUpdated', 'AntivirusSignatureVersion', 'AntivirusEnabled'];

  virusKeyLabels: { [key: string]: string } = {
    Name: 'Nom',
    AntivirusSignatureLastUpdated: 'Dernière mise à jour',
    AntivirusSignatureVersion: 'Version',
    AntivirusEnabled: 'Activé'
  };

  peripheriqueAttributes: string[] = ['Class', 'Name', 'Status'];
  peripheriqueLabels: { [attribute: string]: string } = {
    Class: 'Classe',
    Name: 'Nom',
    Status: 'Statut',
  };

  monitorDisplayedKeys: string[] = [
    'model', 'vendor', 'connection', 'builtin', 'main', 'currentResX', 'currentResY',
  ];

  monitorKeyLabels: { [key: string]: string } = {
    model: 'Modèle', vendor: 'Fabricant', connection: 'Connexion', builtin: 'Écran intégré', main: 'Écran principal',
    currentResX: 'Résolution actuelle X', currentResY: 'Résolution actuelle Y'};

  networkAttributes: string[] = ['iface', 'ip4', 'ip6', 'mac','dhcp'];
  networkLabels: { [attribute: string]: string } = {
    iface: 'Interface', ip4: 'Adresse IPv4', ip6: 'Adresse IPv6', mac: 'Adresse MAC',   dhcp: 'DHCP'};

  gpuProperties: string[] = ['model', 'vendor', 'vram'];
  gpuLabels: { [key: string]: string } = {
    model: 'Modèle', vendor: 'Fabricant', vram: 'Mémoire VRAM (Mo)',
  };

  displayedKeys: string[] = ['name', 'type', 'size', 'serialNum', 'interfaceType', 'smartStatus'];
  keyLabels: { [key: string]: string } = {
    name: 'Nom', type: 'Type', size: 'Taille', serialNum: 'Numéro de Série', interfaceType: 'Interface', smartStatus: 'État SMART',
  };

  displayedRamKeys: string[] = ['manufacturer', 'type', 'size', 'clockSpeed',  'serialNum'];
  ramKeyLabels: { [key: string]: string } = {
    manufacturer: 'Fabricant', type: 'Type', size: 'Taille', clockSpeed: 'Fréquence (MHz)', serialNum: 'Numéro de Série',
  };
  //---------------------------------logiciel----------------------------
  installedSoftware: any[] = [];
  softwareInfo: any[] = [];
  //----------------------------------imprimante---------------------------

    softwarePrinters: any[] = [
      { id: 1, name: 'Imprimante Logiciel 1', model: 'Modèle A', local: 'Bureau 1' },
      { id: 2, name: 'Imprimante Logiciel 2', model: 'Modèle B', local: 'Bureau 2' },
      { id: 3, name: 'Imprimante Logiciel 3', model: 'Modèle C', local: 'Bureau 3' }
    ];

    materialPrinters: any[] = [
      { id: 1, name: 'Imprimante Matériel 1', model: 'Modèle X', local: 'Bureau 4' },
      { id: 2, name: 'Imprimante Matériel 2', model: 'Modèle Y', local: 'Bureau 5' }
    ];

    printerDisplayedKeys: string[] = ['id', 'name', 'model', 'local']; // Clés à afficher

    printerKeyLabels: { [key: string]: string } = {
      id: 'ID',
      name: 'Nom',
      model: 'Modèle',
      local: 'Local'
    };
/*
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  marque: string;
  description: string;
  dateInstallation: Date;
  typeHeberge: string;
  hebergeur: string;
  typeServeur: string;
  systemeExploitation: string;
  versionOS: string;
  statut: string;
  idBureau: string;
  idStabilisateur: string;
  idAdminReseau: string;
  modeleCPU: string;
  frequenceCPU:
  ram: string;
  stockage: string;
  typeDisque: string;
  gpu: string;
  frequenceGPU: string;
  mac: string;
  ip: string;
  dnsPrimaire: string;
  dnsSecondaire: string;
  passerelle: string;
  protocole: string;
  nomUtilisateur: string;
  motDePasse: string;
  prix: string;
  periodePaiement : string;
  mode: string;
  typeram: string;*/
    //----------------------------------------------------------------------------------------
    telecharge_pdf() {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Crée un PDF en orientation portrait, format A4

      // Titre du document
      pdf.setFontSize(18);
      pdf.text('Rapport sur les serveurs ', 10, 20);
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0]; // Formate en "yyyy-mm-dd"
      const generatedBy = `Généré par l adimistrateur réseau: ${this.nom || 'Nom'} ${this.prenom || 'Prénom'}`;

      pdf.setFontSize(12);
      pdf.text(`Date : ${formattedDate}`, 10, 28);
      pdf.text(generatedBy, 10, 34);
      // Fonction pour ajouter un tableau horizontal

      let yPosition = 40;
      const addTable = (title: string, data: any[], columns: string[], columnLabels: string[], yPosition: number) => {
        pdf.setFontSize(14);
        pdf.text(title, 10, yPosition); // Ajouter un titre au tableau
        yPosition += 10;

        // Convertir les données en format compatible avec autoTable
        const rows = data.map((item) => columns.map((col) => item[col]));

        // Ajouter le tableau au PDF
        (pdf as any).autoTable({
          startY: yPosition,
          head: [columnLabels], // En-têtes du tableau
          body: rows, // Données du tableau
          theme: 'grid', // Style du tableau
          styles: { fontSize: 10 }, // Taille de la police

        });

        return (pdf as any).lastAutoTable.finalY + 10; // Retourne la position Y après le tableau
      };

       // Position verticale initiale

      for (let i = 0; i < this.All_serveur.length; i++) {
        let serveur = this.All_serveur[i];

        // Tableau des informations système
        yPosition = addTable(
          `Informations Générales du Serveur ${i + 1}`,
          [serveur],
          ['nom', 'systemeExploitation', 'typeServeur', 'hebergeur', 'statut', 'description'],
          ['Nom', 'Système d Exploitation', 'Type Serveur', 'Hébergeur', 'Statut', 'Description'],
          yPosition
        );

        let emplacement = '';
        let mode = '';
        let prix = '';
        let periodePaiement = '';

        // Utilisation des conditions avec if uniquement
        if (serveur.mode === 'Local') {
          emplacement = serveur.idBureau;
          periodePaiement = serveur.periodePaiement;
          // Modification temporaire pour le PDF
          serveur.idBureau = this.recupe_nom_bureau(serveur.idBureau);
          serveur.periodePaiement = 'Aucun';

          yPosition = addTable(
            `Suite Informations`,
            [serveur],
            ['idBureau', 'mode', 'prix', 'periodePaiement'],
            ['Emplacement', 'Mode', 'Prix', 'Période de paiement'],
            yPosition
          );

          // Restauration des valeurs originales
          serveur.idBureau = emplacement;
          serveur.periodePaiement = periodePaiement;
        }
        else if (serveur.mode === 'En ligne') {

          yPosition = addTable(
            `Suite Informations`,
            [serveur],
            ['mode', 'prix', 'periodePaiement'],
            [ 'Mode', 'Prix', 'Période de paiement'],
            yPosition
          );
        }
        // Création du tableau de configuration matérielle
        yPosition = addTable(
          'Matérielle',
          [serveur],
          ['modeleCPU','frequenceCPU', 'ram','typeram',  'stockage', 'typeDisque','gpu', 'frequenceGPU' ],
          ['Modèle CPU', 'Fréquence du CPU','RAM Totale (Go)','Type du RAM','Stockage Total (Go)','Type du Disque',  'Modèle GPU', 'Fréquence du GPU'
          ],
          yPosition
        );
        // Création du tableau pour la configuration réseau
      yPosition = addTable(
        'Configuration Réseau',
        [serveur],
        ['mac', 'ip', 'dnsPrimaire', 'dnsSecondaire', 'passerelle', 'protocole'],
        ['Adresse MAC', 'Adresse IP', 'DNS Primaire', 'DNS Secondaire', 'Passerelle', 'Protocole Utilisé'],
        yPosition
      );
       // Génération du tableau dans le PDF
       const idserv= String(serveur.id)
         const serviceData =    this.All_serviceserveur.filter(u => u.id_serveur ===  idserv);
         console.log( "----------------------------")
         console.log( serviceData)
          yPosition = addTable(
            'Liste des Services Hébergés',
            serviceData,
            ['id', 'nom', 'version', 'service'],
            ['ID', 'Nom Service', 'Version', 'Service'],
            yPosition
      );
      }

      // Télécharger le PDF
      pdf.save('rapport_parc_informatique.pdf');
    }

}

