import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, ChartTypeRegistry, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { BackendserviceService, } from '../backendservice.service';
import { InventaireComponent } from "./composante_admin/inventaire/inventaire.component";
import { OutilsComponent } from './composante_admin/outils/outils.component';
import { ParcComponent } from './composante_admin/parc/parc.component';
import { TicketComponent } from './composante_admin/ticket/ticket.component';
import { UtilisateurComponent } from './composante_admin/utilisateur/utilisateur.component';
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
export interface Serviceserveur {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  id_serveur: string;
  version: string;
  chemin: string;
  service: string;
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
  id?: number; // L'ID peut être optionnel lors de la création
  nom: string; // Nom ajouté
  model: string;
  marque: string; // Marque ajoutée
  numSerie: string;
  dateAcquisition: Date;
  statut: string;
  prix: string;
  idPc: string; // ID de l'ordinateur auquel le moniteur est associé
  idbureau: string; // ID du bureau auquel le moniteur est associé
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
  typeram : string;
}
export interface Projecteur {
  id?: number;
  nom: string;
  resolution: string;
  modele: string;
  marque: string;
  dateInstallation: Date;
  prix: string;
  idbureau: string;
  technologie: string;
  statut: string;
  numSerie: string;
}
export interface Interfacerouteur {
  id?: number;  // L'id peut être optionnel s'il est auto-généré par la base de données
  nom: string;
  idrouteur: string;
  nominterface: string;
  typeinterface: string;
  idbureau: string;
  ip: string;
  masque: string;
}
export interface Parametrewifirouteur {
  id?: number;
  nom: string;
  id_routeur: string;
  ssid: string;
  frequence: string;
  canal: string;
  encryption: string;
  motdepasse: string;
  id_bureau: string;
}
export interface Vlan {
  id?: number;
  id_commutateur: string;
  nom: string;
  numero_vlan: string;
  adresse_ip: string;
  masque_sous_reseau: string;
  idbureau: string;

}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    OutilsComponent,
    ParcComponent,
    TicketComponent,
    UtilisateurComponent,
    InventaireComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    BaseChartDirective,
    InventaireComponent
],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] // Ajout du "s" à styleUrls
})

export class AdminComponent {
  ouverture_parc:boolean=false;
  ouverture_ticket:boolean=false;
  ouverture_inventaire:boolean=false;
  ouverture_Graphique:boolean=false;
  ouverture_acceuille:boolean=false;
  ouverture_user:boolean=false;

  //-----------------parc------------------------------
  //--------affiche---------------------
  active_affiche_equiment:boolean=false;
  active_insert_ordinateur:boolean=false;
  active_insert_moniteur:boolean=false;
  active_insert_serveur:boolean=false;
  active_insert_routeur:boolean=false;
  active_insert_imprimante:boolean=false;
  active_insert_swict:boolean=false;

//------------------ticket-------------------------------
ticket_ouvert:boolean=false;
ticket_encour:boolean=false;
ticket_fermer:boolean=false;
liste_ticket:boolean=false;
ajoute_ticket:boolean=false;



  // Configuration du graphique
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40], // Exemple de données
        label: 'Série A',
        backgroundColor: '#fffb0020',
        borderColor: '#fffb00',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 0, max: 100 },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public lineChartType: ChartType = 'line';
////////////////circu/////////////////////
 // Type du graphique
 public pieChartType: ChartType = 'pie';


//------------------------------------------repartition------------------------------------------------
public  repartition_pieChartData: ChartConfiguration['data'] = {
  labels: ['imprimante', 'ordinateur', 'switch', 'moniteur', 'routeur', 'Stabilisateur', 'serveur'],
  datasets: [{
    data: [], // Initialiser avec un tableau vide
    backgroundColor: [
      'rgba(253, 5, 59, 0.95)',
      'rgb(13, 158, 255)',
      'rgba(248, 178, 2, 0.97)',
      'rgb(0, 255, 255)',
      'rgb(9, 156, 255)',
      'rgba(252, 182, 5, 0.97)',
      'rgba(8, 241, 241, 0.97)',
    ],
  }]
};
roleSelectionne: string="";
  plateformeDifferentDeNavigateur: boolean=false;
// Métjhode pour mettre à jour les données du graphique
repartition_updateChartData() {
  this.repartition_pieChartData.datasets[0].data = [
    this.All_imprimante.length,     // Nombre d'imprimantes
    this.all_ordinateurs.length,    // Nombre d'ordinateurs
    this.Allswitches.length,        // Nombre de switches
    this.allmoniteur.length,        // Nombre de moniteurs
    this.All_routeur.length,        // Nombre de routeurs
    this.All_Stabilisateur.length,  // Nombre d'onduleurs
    this.All_serveur.length         // Nombre de serveurs
  ];
  console.log( this.repartition_pieChartData)
}


 // Options du graphique
 public pieChartOptions: ChartConfiguration['options'] = {
  plugins: {
    title: {
      display: true,
      text: 'Répartition du matériel informatique',
      color: 'rgb(46, 42, 4)', // Couleur du titre
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgb(10, 9, 2)' // Met les labels en blanc
      }
    }
  }
};


  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private backend: BackendserviceService
  ) {
    Chart.register(...registerables);
    this.initializeChartData();
  }

  async loadAllData() {
    forkJoin({
      ordinateurs: this.backend.getAllOrdinateurs(),
      moniteurs: this.backend.getAllMoniteurs(),
      imprimantes: this.backend.getAllImprimantes(),
      stabilisateurs: this.backend.getAllStabilisateurs(),
      switches: this.backend.getAllSwitches(),
      routeurs: this.backend.getAllRouteurs(),
      serveurs: this.backend.getAllServeurs()
    }).subscribe({
      next: (data) => {
        // Assigner les données récupérées aux propriétés du composant
        this.all_ordinateurs = data.ordinateurs;
        this.allmoniteur = data.moniteurs;
        this.All_imprimante = data.imprimantes;
        this.All_Stabilisateur = data.stabilisateurs;
        this.Allswitches = data.switches;
        this.All_routeur = data.routeurs;
        this.All_serveur = data.serveurs;

        // Mettre à jour les données du graphique
        this.repartition_updateChartData(); // <-- ICI
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
   console.log( this.repartition_pieChartData)
  }

  async ngOnInit() {
    const userAgent = navigator.userAgent;
    this.plateformeDifferentDeNavigateur = !userAgent.includes('YourSpecificBrowserIdentifier');
    console.log(   this.plateformeDifferentDeNavigateur)
    this.loadAllData();
    this.  ouverture_parc=true;
    this.active_insert_ordinateur=true;
    this.liste_ticket =true;
    this.ouverture_Graphique_equipement = true;

  }
  ouvrir_acceuille(){
    this.ouverture_user=false;
    this.ouverture_acceuille=true;
    this.ouverture_parc=false;
    this.ouverture_ticket=false;
    this.ouverture_inventaire=false;
    this.ouverture_Graphique=false;
    this.active_affiche_equiment=false;
  }
  ouvrir_parc(){
    this.ouverture_user=false;
    this.ouverture_parc=true;
    this.ouverture_ticket=false;
    this.ouverture_inventaire=false;
    this.ouverture_Graphique=false;
    this.ouverture_acceuille=false;
    this.active_affiche_equiment=false;
  }
  ouvrir_ticket(){
    this.ouverture_user=false;
    this.ouverture_parc=false;
    this.ouverture_ticket=true;
    this.ouverture_inventaire=false;
    this.ouverture_Graphique=false;
    this.ouverture_acceuille=false;
    this.active_affiche_equiment=false;
  }
  ouvrir_inventaire(){
    this.ouverture_user=false;
    this.ouverture_parc=false;
    this.ouverture_ticket=false;
    this.ouverture_inventaire=true;
    this.ouverture_Graphique=false;
    this.ouverture_acceuille=false;
    this.active_affiche_equiment=false;
}
  ouvrir_Graphique(){
    this.ouverture_user=false;
    this.ouverture_parc=false;
    this.ouverture_ticket=false;
    this.ouverture_inventaire=false;
    this.ouverture_Graphique=true;
    this.ouverture_acceuille=false;
    this.active_affiche_equiment=false;


  }
  ouvrir_Deconnexion(){
    this.router.navigate(['/acceuille']);
  }
  ouvrir_user(){
    this.ouverture_parc=false;
    this.ouverture_ticket=false;
    this.ouverture_inventaire=false;
    this.ouverture_Graphique=false;
    this.ouverture_acceuille=false;
    this.active_affiche_equiment=false;
    this.ouverture_user=true;
  }
//----------------------------------------parc-----------------------------------
//----------------Affiche------------------
affiche_equiment(){
  this.active_affiche_equiment=true;
}
affiche_insert_ordinateur(){
  this.active_insert_ordinateur=true;
  this.active_insert_moniteur=false;
}
affiche_insert_moniteur(){
  this.active_insert_ordinateur=false;
  this.active_insert_moniteur=true;
}
//---------------------------------------ticket--------------------------------------
affiche_ouvert(){
  this.ticket_fermer=false;
  this.ticket_encour=false;
 this.ticket_ouvert=true;
}
affiche_encour(){
  this.ticket_ouvert=false;
  this.ticket_fermer=false;
  this.ticket_encour=true;
}
affiche_fermer(){
  this.ticket_ouvert=false;
  this.ticket_encour=false;
  this.ticket_fermer=true;
}
affiche_liste_ticket(){
  this.liste_ticket =true;
  this.ajoute_ticket=false;
}
affiche_ajoute_ticket(){
  this.liste_ticket =false;
  this.ajoute_ticket=true;
}
onSubmit_ticket(){

}

/*-------------------------------------------graphics-----------------------------------------------*/
  ouverture_Graphique_equipement: boolean = false;
  ouverture_Graphique_Ticket: boolean = false;
  ouverture_Graphique_Reseau: boolean = false;
  ouverture_Graphique_Technicien: boolean = false;
  ouverture_Graphique_Cout: boolean = false;
  ouverture_Graphique_Panne: boolean = false;

  // Fonction pour afficher le graphique correspondant
  afficherGraphique(type: string) {
    // Ferme tous les graphiques avant d'en ouvrir un
    this.ouverture_Graphique_equipement = false;
    this.ouverture_Graphique_Ticket = false;
    this.ouverture_Graphique_Reseau = false;
    this.ouverture_Graphique_Technicien = false;
    this.ouverture_Graphique_Cout = false;
    this.ouverture_Graphique_Panne = false;
    console.log(type)

    // Active uniquement le graphique sélectionné
    switch (type) {
      case 'equipement':
        this.ouverture_Graphique_equipement = true;
        break;
      case 'ticket':
        this.ouverture_Graphique_Ticket = true;
        break;
      case 'reseau':
        this.ouverture_Graphique_Reseau = true;
        break;
      case 'technicien':
        console.log(type);
        this.ouverture_Graphique_Technicien = true;
        console.log(this.ouverture_Graphique_Technicien);
        break;
      case 'cout':
        this.ouverture_Graphique_Cout = true;
        break;
      case 'panne':
        this.ouverture_Graphique_Panne = true;
        break;
    }

    // Affiche la section graphique
    this.ouverture_Graphique = true;
  }
  //-----------------graphic equipement------------------
  titre_graphe_equipement: string = "Répartition des équipements";
  currentStep: number = 0;

  // Mise à jour du titre selon l'étape
  mettreAJourTitre() {
    switch (this.currentStep) {
      case 0:
        this.titre_graphe_equipement = "Répartition des équipements";
        break;
      case 1:
        this.titre_graphe_equipement = "Âge des équipements";
        break;
      case 2:
        this.titre_graphe_equipement = "Statut des équipements";
        break;
    }
  }

  // Fonction pour passer à l'étape suivante
  suivant() {
    if (this.currentStep < 1) {
      this.currentStep++;
      this.mettreAJourTitre();
    }
  }

  // Fonction pour revenir à l'étape précédente
  precedent() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.mettreAJourTitre();
    }
  }

  // Déterminer quelle section afficher
  get ouverture_repartition_equipement() {
    return this.currentStep === 0;
  }

  get ouverture_age_equipement() {
    return this.currentStep === 1;
  }

  get ouverture_statu_equipement() {
    return this.currentStep === 2;
  }

    //---------------------graphique age-----------------------------
    equipements = [
      { age: '0-5 ans', batiment: 'Bâtiment 1', bureau: 'Bureau A', nom : "pc001" },
      { age: '6-10 ans', batiment: 'Bâtiment 2', bureau: 'Bureau B', nom :" switc03" },
      { age: '11-15 ans', batiment: 'Bâtiment 3', bureau: 'Bureau C',  nom: "pc005"},
      { age: '16-20 ans', batiment: 'Bâtiment 1', bureau: 'Bureau D', nom :"pc008"},
      { age: '20+ ans', batiment: 'Bâtiment 2', bureau: 'Bureau E', nom :"routeur5"}
    ];

    barChartOptions: ChartOptions<'bar'> = {
      responsive:  true,
      plugins: {
        title: {
          display: true,
          text: 'Age des équipements',
          color: 'rgba(36, 33, 13, 0.87)', // Couleur du titre
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        legend: {
          labels: {
            color: 'rgb(0, 0, 0)' // Met les labels en blanc
          }
        }
      }
    };

    barChartLabels: string[] = ['0-5 ans', '6-10 ans', '11-15 ans', '16-20 ans', '20+ ans'];

    barChartData: ChartData<'bar'> = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [15, 30, 20, 10],
          label: 'Nombre d’équipements',
        //  backgroundColor: 'rgb(44, 42, 42)',
        backgroundColor: 'rgb(41, 27, 1)',
          borderColor:'rgb(252, 236, 11)',
          borderWidth: 3,
        }
      ]
    };

    barChartType: 'bar' = 'bar';

    genererRapport() {
      alert('Rapport généré avec succès !');
    }

    //----------------graphique statut---------------

    // Type du graphique
    public pieChartTypestatu: ChartType = 'pie';

    // Options générales des graphiques
    public pieChartOptionsstatu: ChartConfiguration['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    };

    // Données des graphiques (exemples)
    public pieChartDataDisponible = {
      labels: ['En stock', 'Utilisé récemment'],
      datasets: [{ data: [70, 30], backgroundColor: ['#4CAF50', '#FFC107'] }]
    };

    public pieChartDataUtilisation = {
      labels: ['Actif', 'En pause'],
      datasets: [{ data: [60, 40], backgroundColor: ['#2196F3', '#FF9800'] }]
    };

    public pieChartDataMaintenance = {
      labels: ['Réparation', 'Inspection'],
      datasets: [{ data: [50, 50], backgroundColor: ['#FF5722', '#607D8B'] }]
    };

    public pieChartDataHorsService = {
      labels: ['Défectueux', 'Remplacement prévu'],
      datasets: [{ data: [80, 20], backgroundColor: ['#F44336', '#9E9E9E'] }]
    };

    //--------------liste statu----------------

      // Variables d'affichage
      ouverture_liste_statu = true;
      ouverture_liste_equipmnt_dispo = false;
      ouverture_liste_equipmnt_en_cour_util = false;
      ouverture_liste_equipmnt_enmaiten = false;
      ouverture_liste_equipmnt_horservice = false;

      // Liste des équipements avec les nouvelles colonnes
      equipementss = {
        disponible: [
          { nom: 'Imprimante HP', type: 'Imprimante', batiment: 'A', bureau: '101' },
          { nom: 'Ordinateur Dell', type: 'PC', batiment: 'B', bureau: '202' }
        ],
        enCoursUtilisation: [
          { nom: 'Projecteur Epson', type: 'Vidéo-projecteur', batiment: 'C', bureau: '303' }
        ],
        enMaintenance: [
          { nom: 'Scanner Canon', type: 'Scanner', batiment: 'D', bureau: '404' }
        ],
        horsService: [
          { nom: 'Serveur Lenovo', type: 'Serveur', batiment: 'E', bureau: '505' }
        ]
      };

      // Méthodes pour gérer l'affichage
      afficherListeEquipements(statut: string) {
        this.ouverture_liste_statu = false;
        this.ouverture_liste_equipmnt_dispo = statut === 'disponible';
        this.ouverture_liste_equipmnt_en_cour_util = statut === 'enCoursUtilisation';
        this.ouverture_liste_equipmnt_enmaiten = statut === 'enMaintenance';
        this.ouverture_liste_equipmnt_horservice = statut === 'horsService';
      }

      retourListeStatut() {
        this.ouverture_liste_statu = true;
        this.ouverture_liste_equipmnt_dispo = false;
        this.ouverture_liste_equipmnt_en_cour_util = false;
        this.ouverture_liste_equipmnt_enmaiten = false;
        this.ouverture_liste_equipmnt_horservice = false;
      }



//-----------------------------------------------TICKET---------------------------------------
titre_graphe_ticket: string = "Statut des ticket";
currentStep_ticket: number = 0;

// Mise à jour du titre selon l'étape
mettreAJourTitre_ticket() {
  switch (this.currentStep_ticket) {
    case 0:
      this.titre_graphe_ticket = "Statut des tickets";
      break;
    case 1:
      this.titre_graphe_ticket = "Priorité des tickets";
      break;
  }
}

// Fonction pour passer à l'étape suivante
suivant_ticket() {
  if (this.currentStep_ticket <1 ) {
    this.currentStep_ticket++;
    this.mettreAJourTitre_ticket();
  }
}

// Fonction pour revenir à l'étape précédente
precedent_ticket() {
  if (this.currentStep_ticket > 0) {
    this.currentStep_ticket--;
    this.mettreAJourTitre_ticket();
  }
}

// Déterminer quelle section afficher
get ouverture_ticket_ouvert() {
  return this.currentStep_ticket === 0;
}

get ouverture_ticket_priorite() {
  return this.currentStep_ticket === 1;
}



//-------------ticket ouvert fermer----------------
afficherGraphiqueTicketsouvert: boolean = true;

lineChartTypeTickets: ChartType = 'line';

lineChartDataTickets = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Tickets Ouverts',
      data: [10, 15, 8, 20, 30, 25, 18], // Exemple de données
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      borderWidth: 2,
      fill: true
    },
    {
      label: 'Tickets Fermés',
      data: [5, 10, 7, 15, 20, 22, 14], // Exemple de données
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderWidth: 2,
      fill: true
    }
  ]
};

lineChartOptionsTickets: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Statut des tickets',
      color: 'rgba(36, 33, 13, 0.87)', // Couleur du titre
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 10
      }
    }
  },
  scales: {
    x: {
      ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
    },
    y: {
      beginAtZero: true
    }
  }
};

//-------------ticket priorite----------------




//------------------------------------------------RESEAU--------------------------------------
titre_graphe_reseau: string = "Bande passante";
currentStep_reseau: number = 0;

// Mise à jour du titre selon l'étape
mettreAJourTitre_reseau() {
  switch (this.currentStep_reseau) {
    case 0:
      this.titre_graphe_reseau ="Bande passante";
      break;
    case 1:
      this.titre_graphe_reseau = "Priorité des reseaus";
      break;
  }
}

// Fonction pour passer à l'étape suivante
suivant_reseau() {
  if (this.currentStep_reseau <1 ) {
    this.currentStep_reseau++;
    this.mettreAJourTitre_reseau();
  }
}

// Fonction pour revenir à l'étape précédente
precedent_reseau() {
  if (this.currentStep_reseau > 0) {
    this.currentStep_reseau--;
    this.mettreAJourTitre_reseau();
  }
}

// Déterminer quelle section afficher
get ouverture_reseau_ouvert() {
  return this.currentStep_reseau === 0;
}

get ouverture_reseau_priorite() {
  return this.currentStep_reseau === 1;
}



//-------------Bznde passante----------------


barChartDatabande_passant: ChartData<'bar'> = {
  labels: [
    'PC1 - Bâtiment 1 - Bureau 105', 'PC2 - Bâtiment 1 - Bureau 106', 'PC3 - Bâtiment 1 - Bureau 107',
    'PC4 - Bâtiment 1 - Bureau 108', 'PC5 - Bâtiment 1 - Bureau 109', 'PC6 - Bâtiment 2 - Bureau 201',
    'PC7 - Bâtiment 2 - Bureau 202', 'PC8 - Bâtiment 2 - Bureau 203', 'PC9 - Bâtiment 2 - Bureau 204',
    'PC10 - Bâtiment 2 - Bureau 205', 'PC11 - Bâtiment 3 - Bureau 301', 'PC12 - Bâtiment 3 - Bureau 302',
    'PC13 - Bâtiment 3 - Bureau 303', 'PC14 - Bâtiment 3 - Bureau 304', 'PC15 - Bâtiment 3 - Bureau 305',
    'PC16 - Bâtiment 4 - Bureau 401', 'PC17 - Bâtiment 4 - Bureau 402', 'PC18 - Bâtiment 4 - Bureau 403',
    'PC19 - Bâtiment 4 - Bureau 404', 'PC20 - Bâtiment 4 - Bureau 405', 'PC21 - Bâtiment 5 - Bureau 501',
    'PC22 - Bâtiment 5 - Bureau 502', 'PC23 - Bâtiment 5 - Bureau 503', 'PC24 - Bâtiment 5 - Bureau 504',
    'PC25 - Bâtiment 5 - Bureau 505'
  ],
  datasets: [
    {
      label: 'Bande passante (Mo)',
      data: [50, 30, 80, 40, 90, 20, 70, 60, 55, 85, 95, 45, 65, 75, 35, 25, 15, 10, 5, 95,
             85, 75, 65, 55, 45],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }
  ]
};

barChartOptionsbande_passant: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 25 PC utilisant le plus de bande passante',
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        autoSkip: false,
        maxRotation: 45,
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'Bande passante utilisée (Mo ou Go)',
      },
    },
  },
};

//-------------------------------------TECHNICIEN----------------------------------------
barChartDataTechniciens: ChartData<'bar'> = {
  labels: [
    'Technicien 1', 'Technicien 2', 'Technicien 3', 'Technicien 4', 'Technicien 5',
    'Technicien 6', 'Technicien 7', 'Technicien 8', 'Technicien 9', 'Technicien 10'
  ],
  datasets: [
    {
      label: 'Tickets Résolus',
      data: [120, 90, 80, 150, 110, 130, 95, 100, 140, 125], // Nombre de tickets résolus
      backgroundColor: 'rgb(1, 127, 245)',
    }
  ]
};

barChartOptionsTechniciens: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Compétences des Techniciens - Nombre de Tickets Résolus',
      font: {
        size: 18,
        weight: 'bold'
      },
    },

  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        autoSkip: false,
        maxRotation: 45,
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'Nombre de Tickets Résolus',
      },
    },
  },
};
//----------------------------------COUT------------------------------------------------

currentStep_cout: number = 0;
titre_graphe_cout:string =  "Couts équipements";
// Mise à jour du titre selon l'étape
mettreAJourTitre_cout() {
  switch (this.currentStep_cout) {
    case 0:
      this.titre_graphe_cout = "Couts équipements";
      break;
    case 1:
      this.titre_graphe_cout = "Couts logiciel";
      break;
    case 2:
      this.titre_graphe_cout = "Couts maintenace";
      break;
    case 3:
      this.titre_graphe_cout = "Couts Temporel";
      break;
  }
}

// Fonction pour passer à l'étape suivante
suivant_cout() {
  if (this.currentStep_cout <1 ) {
    this.currentStep_cout++;
    this.mettreAJourTitre_cout();
  }
}

// Fonction pour revenir à l'étape précédente
precedent_cout() {
  if (this.currentStep_cout > 0) {
    this.currentStep_cout--;
    this.mettreAJourTitre_cout();
  }
}

// Déterminer quelle section afficher
get ouverture_cout_materiel() {
  return this.currentStep_cout === 0;
}

get ouverture_cout_logiciel() {
  return this.currentStep_cout === 1;
}
get ouverture_cout_maintenance() {
  return this.currentStep_cout === 2;
}
get ouverture_cout_temp() {
  return this.currentStep_cout === 3;
}



// ✅ Données pour le graphique en secteurs (Pie)
dataMateriel: ChartData<"pie", number[], unknown> = {
  labels: ['Ordinateurs', 'Serveurs', 'Périphériques'],
  datasets: [
    {
      data: [5000, 7000, 3000],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
    }
  ]
};
dataLogiciel: ChartData<"pie", number[], unknown> = {
  labels: ['OS', 'Bureautique', 'Sécurité'],
  datasets: [{
    data: [2000, 1500, 1000],
    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
  }]
};

dataMaintenance: ChartData<"pie", number[], unknown> = {
  labels: ['Support', 'Mises à jour', 'Réparations'],
  datasets: [{
    data: [3000, 2000, 2500],
    backgroundColor: ['#4bc0c0', '#ff9f40', '#9966ff']
  }]
};

// ✅ Données pour le graphique en barres (Bar)
barChartDatacout: ChartData<"bar", number[], unknown> = {
  labels: ['Matériel', 'Logiciel', 'Maintenance'],
  datasets: [{
    data: [15000, 4500, 7500], // Coût total pour chaque catégorie
    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
  }]
};

// ✅ Options pour les graphiques
optionsPieChart: ChartOptions<"pie"> = {
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Coût total des équipents',
      color: 'rgb(46, 42, 4)', // Couleur du titre
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
    legend: { position: 'bottom' }
  }
};
optionsPieChartlog: ChartOptions<"pie"> = {
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Coût total des logiciels',
      color: 'rgb(46, 42, 4)', // Couleur du titre
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
    legend: { position: 'bottom' }
  }
};

optionsBarChart: ChartOptions<"bar"> = {
  responsive: true,
  scales: {
    y: { beginAtZero: true }
  },
  plugins: {


  }
}
//------------------temp------------------
chartOptionstemp: any | undefined;
selectedDate: string = '2023';
chartDatatemp: ChartData<'bar'> = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril'],
  datasets: [
    {
      data: [1000, 1500, 1200, 1800],
      backgroundColor: '#4bc0c0',
      borderColor: '#36a2a2',
      borderWidth: 1
    }
  ]
};
dateOptions = [
  { value: '2023-01', label: 'Janvier 2023' },
  { value: '2023-02', label: 'Février 2023' },
  { value: '2023-03', label: 'Mars 2023' },
  // Ajoute d'autres options ici
];
// Méthode pour initialiser ou mettre à jour les données du graphique
initializeChartData() {
  // Ici, on met à jour les données du graphique en fonction de la sélection
  this.chartDatatemp = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril','Mai'], // Labels des mois
    datasets: [
      {
        data: [1000, 1500, 1200,450, 1800], // Montants pour chaque mois
        backgroundColor: '#4bc0c0', // Couleur du graphique
        borderColor: '#36a2a2',
        borderWidth: 1
      }
    ]
  };

  // Options du graphique (personnalisables)
  this.chartOptionstemp = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false }
    }
  };
}



// Méthode pour mettre à jour les données du graphique selon le mois/année sélectionné
updateChartData() {
  if (this.selectedDate === '2023') {
    this.chartDatatemp.datasets[0].data = [1000, 1500, 1200, 1800];
  }
   else if (this.selectedDate === '01-2023') {
    this.chartDatatemp.datasets[0].data = [1200, 1300, 1100, 1400];
  }
  // Ajoute ici d'autres conditions selon les options sélectionnées
}
//-----------------------------------PANNE-------------------------------------------------
ouverture_panne: boolean = true;
ouverture_liste_panne: boolean = true;
ouverture_panne_equipement: boolean = false;
ouverture_pannelogiciel: boolean = false;
ouverture_pannereseau: boolean = false;

pieChartDataMaterielle = {
  labels: [
    'Panne d’alimentation', 'Surchauffe', 'Écran défectueux', 'Clavier/Souris non fonctionnels',
    'Panne du disque dur', 'Problème de RAM', 'Imprimante en panne', 'Serveur HS'
  ],
  datasets: [
    {
      data: [15, 10, 12, 8, 18, 14, 6, 14],
      backgroundColor: [
        '#4CAF50', '#8BC34A', '#FFC107', '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7'
      ]
    }
  ]
};

pieChartTypeMaterielle: ChartType = 'pie';

    // Options générales des graphiques
pieChartOptionMaterielle: ChartConfiguration['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    };


pieChartDataLogicielle = {
  labels: [
    'Système d’exploitation corrompu', 'Logiciels qui crashent', 'Problème de compatibilité',
    'Mises à jour échouées', 'Virus/Malware'
  ],
  datasets: [
    {
      data: [10, 20, 8, 15, 15],
      backgroundColor: [
        '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#8BC34A'
      ]
    }
  ]
};

pieChartTypeLogicielle: keyof ChartTypeRegistry = 'pie';
pieChartOptionLogicielle: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  }
};

pieChartDataReseau = {
  labels: [
    'Connexion internet instable', 'Problème de Wi-Fi', 'Adresse IP en conflit',
    'Panne de switch ou routeur', 'Accès refusé à certains services'
  ],
  datasets: [
    {
      data: [12, 13, 7, 8, 10],
      backgroundColor: [
        '#FFEB3B', '#FF9800', '#FF5722', '#FF4081', '#FFCD02'
      ]
    }
  ]
};

pieChartTypeReseau: keyof ChartTypeRegistry = 'pie';
pieChartOptionReseau : ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  }
};
equipementsspanne = {
  disponible: [
    { nom: 'Imprimante', type: 'Laser', batiment: 'A', bureau: '101' },
    { nom: 'Scanner', type: 'Documentaire', batiment: 'B', bureau: '202' }
  ]
};

logicielpanne = {
  enCoursUtilisation: [
    { nom: 'Windows', type: 'OS', ordinateur: 'PC-001', batiment: 'A', bureau: '101' },
    { nom: 'Photoshop', type: 'Graphisme', ordinateur: 'PC-002', batiment: 'B', bureau: '202' }
  ]
};

panneReseau = {
  incidents: [
    { type: 'Connexion lente', batiment: 'C', bureau: '303' },
    { type: 'Déconnexion fréquente', batiment: 'D', bureau: '404' }
  ]
};

afficherpanneequipement() {
  this.ouverture_panne_equipement = true;
  this.ouverture_liste_panne = false;
}

afficherpannelogiciel() {
  this.ouverture_pannelogiciel = true;
  this.ouverture_liste_panne = false;
}

afficherpannereseau() {
  this.ouverture_pannereseau = true;
  this.ouverture_liste_panne = false;
}

retourListepanne() {
  this.ouverture_panne_equipement = false;
  this.ouverture_pannereseau = false;
  this.ouverture_pannelogiciel = false;
  this.ouverture_liste_panne = true;
}


//----------------------------------------USER----------------------------------------------------

//-----------------------------------------vrai data-------------------------------------------------------
     Allvlan: Vlan[] = [];
         // Tableau pour stocker la liste des switches
       vlan: Vlan[] = [];
       newvlan: Vlan = {
         id_commutateur: '',
         nom:'',
         numero_vlan: '',
         adresse_ip: '',
         masque_sous_reseau: '',
         idbureau: '',
      };
      moidifie_vlan: Vlan = {
         id_commutateur: '',
         nom:'',
         numero_vlan: '',
         adresse_ip: '',
         masque_sous_reseau: '',
         idbureau: '',
      };
      nom_vlan:string=''
  //-----------------------------4444------
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
 //---------------sdfdsds--------------ordinateurs -----------------------
  nom_utilisateur_ordi:string=''
  Prenom_utilisateur_ordi:string=''
  nom_ordi:string=''
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

  //------------*--------------------moniteur-----------------------
  allmoniteur:Moniteur[] = [];
  moniteur:Moniteur[] = [];
  newmoniteur: Moniteur = {
    nom:  '', // Nom ajouté
    model:'',
    marque:'', // Marque ajoutée
    numSerie:'',
    dateAcquisition:new Date(),
    statut:'',
    prix:'',
    idPc:'', // ID de l'ordinateur auquel le moniteur est associé
    idbureau:'',  // ID du bureau auquel le moniteur est associé
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
  type_imprimante:string=''
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
    Allswitches: Swicth[] = [];
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
   modifpointsAcces: PointdAcces = {
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
  typeram : ''

};
//----------------------Projecteur------------------------------
All_Projecteur: Projecteur[] = [];
Projecteur_bureau: Projecteur[] = [];
modifeProjecteur: Projecteur= {
  id: undefined,
  nom:'',
  resolution:'',
  modele:'',
  marque:'',
  dateInstallation: new Date(),
  prix:'',
  idbureau:'',
  technologie:'',
  statut:'',
  numSerie: '',
};
newsProjecteur: Projecteur = {
  id: undefined,
  nom:'',
  resolution:'',
  modele:'',
  marque:'',
  dateInstallation: new Date(),
  prix:'',
  idbureau:'',
  technologie:'',
  statut:'',
  numSerie: '',

};
//-----------------------recupe ordinateur
  ordinateurs_id_bureau: Ordinateur[] = [];  // Liste d'ordinateurs
  all_ordinateurs : Ordinateur[] = [];  // Liste d'ordinateurs
  id_ordi!:number;
  id_ordi_visual!:number;
  user_id_odrinateur={};
  user:Utilisateur[] = [];
async recupere_all_ordi(){
  await this.backend.getAllOrdinateurs (  ).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this.all_ordinateurs =  data;
      console.log(this.all_ordinateurs)


    },
    (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
    }
  );

}
///-------------------------------------moniteur---------------------------------------------------
async recupere_all_moniteur(){
  await this.backend.getAllMoniteurs (  ).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this. allmoniteur =  data;
      console.log(this.all_ordinateurs)
    },
    (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
    }
  );

}
///-------------------------------------imprimante---------------------------------------------------
async recupere_all_imprimante(){
  await this.backend.getAllImprimantes (  ).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this. All_imprimante =  data;
      console.log(this.all_ordinateurs)
    },
    (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
    }
  );
}
//-----------------------------------------Stabilisateur--------------------------------------------
async recupere_all_stabilisateur(){
  await this.backend.getAllStabilisateurs () .subscribe(
    (data) => {
      this.All_Stabilisateur= data;

    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}
//------------------------------------------swicth-------------------------------------------------
async recupere_all_swicth(){
  await this.backend.getAllSwitches () .subscribe(
    (data) => {
      this.Allswitches= data;
      console.log(  this.Allswitches)

    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}
//-----------------------------------routeur------------------------------------
async recupere_all_routeur(){
  await this.backend.getAllRouteurs () .subscribe(
    (data) => {
      this.All_routeur= data;

    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}
//-----------------------------------------point---------------------------------------------
async recupere_all_pointdacce(){
  await this.backend.getAllPointsAcces() .subscribe(
    (data) => {
      this.All_pointsAcces= data;
    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );
}
//--------------------------------------------------serveur-----------------------------------
async recupere_all_serveur(){

  await this.backend.getAllServeurs () .subscribe(
    (data) => {
      this.All_serveur= data;
    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );
}
//------------------------------------------------projecteur------------------------------------
async recupere_all_Projecteur(){
  await this.backend. getAllProjecteurs () .subscribe(
    (data) => {
     this.All_Projecteur = data;
    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}
}
