
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
export interface Serviceserveur {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  id_serveur: string;
  version: string;
  chemin: string;
  service: string;
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

export interface Ticket {
  id?: number;
  titre: string;
  priorite: string;
  categorie: string;
  description: string;
  statut: string;
  dateOuverture: string;
  id_bureau: number;
  dateFermeture?: string;
  datePrise?:string;
  demandeur: string;
  technicien: string;
  typeEquipement: string;
  idEquipement: number;
  panne: string;
  id_demandeur: number;
  id_technicien: number;
}
export interface Bureau {
  id: number;
  nom: string;
  etage: number;
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
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {

  tickets_ouvert: Ticket[] = [];
  tickets_encours: Ticket[] = [];
  tickets_ferme: Ticket[] = [];
  tickets_id: Ticket = {  // Initialisation d'un nouveau ticket
    titre: '',
    priorite: '',
    categorie: '',
    description: '',
    statut: 'OUVERT',
    dateOuverture:'',
    dateFermeture:'',
    datePrise: '',
    demandeur: '',
    technicien: '',
    typeEquipement: '',
    idEquipement: 0,
    panne: '',
    id_bureau:0,
    id_demandeur:0,
    id_technicien: 0
  };
  tickets_Abondane: Ticket = {  // Initialisation d'un nouveau ticket
    titre: '',
    priorite: '',
    categorie: '',
    description: '',
    statut: 'OUVERT',
    dateOuverture:'',
    dateFermeture:'',
    datePrise: '',
    demandeur: '',
    technicien: '',
    typeEquipement: '',
    idEquipement: 0,
    panne:'',
    id_bureau:0,
    id_demandeur:0,
    id_technicien: 0
  };
  tickets: Ticket[] = []; // Tableau pour stocker les tickets récupérés
  newTicket: Ticket = {  // Initialisation d'un nouveau ticket
    titre: '',
    priorite: '',
    categorie: '',
    description: '',
    statut: 'OUVERT',
    dateOuverture:'',
    dateFermeture:'',
    datePrise: '',
    demandeur: '',
    technicien: '',
    typeEquipement: '',
    idEquipement: 0,
    panne: '',
    id_bureau:0,
    id_demandeur:0,
    id_technicien: 0
  };


   //---------------------------------buraur--------------------------------
    bureaux: Bureau[] = []; // Initialisation avec un tableau vide
    newBureau: Bureau = { id: 0, nom: '', etage: 1 };
    //---------------------------------user*-------------------------------
    id_utilisateur:string="";
    user_id: Utilisateur = {
      nom: "",
      prenom: "",
      nMatricule: "",
      email: "",
      motPasse: "",
      dateNaissance: "",
      telephone: "",
      profession: "",
      idPc: "",
      idBureau: "",
      valide: ""
    };
    newutilisateur: Utilisateur = {
        nom: "",
        prenom: "",
        nMatricule: "",
        email: "",
        motPasse: "",
        dateNaissance: "",
        telephone: "",
        profession: "",
        idPc: "",
        idBureau: "",
        valide: ""
      };
    utilisateur: Utilisateur[] = []
    //-------------------------ticket-------------------
    panne:string='';
    type_equipement:string='';
    statut_ticket:string='';
    Action:string='';

  ticket_ouvert:boolean=false;
  ticket_encour:boolean=false;
  ticket_fermer:boolean=false;
  liste_ticket:boolean=false;
  ajoute_ticket:boolean=false;
  ferme_ticket:boolean=false;
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
    id_ordi_ticket:number=0
    id_bureau_ticket:number=0
    ordinateur_is: Ordinateur  = {
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
    ordinateur_id_bureax: Ordinateur  = {
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
    allmoniteur:Moniteur[] = [];
    moniteur:Moniteur[] = [];
    modifemoniteur:Moniteur[] = [];
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
      modifeimprimante: Imprimante[] = [];

      modifeimprimantex:Imprimante = {
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
    id_bureau:number=0;
  //
constructor( private route: ActivatedRoute,private backend: BackendserviceService) {}
ngOnInit() {
  this.ticket_ouvert=true;
  this.liste_ticket =true;
  this.id_utilisateur = this.route.snapshot.paramMap.get('id') || '-1';
  this.recupe_all_ticket( )
  this.loadBureaux()
  this.loaduser()
}
//-----------------ticket-------------------
async recupe_ticket_id(id: number) {
    this.backend.getTicketById(id).subscribe(
      (data) => {
        this.tickets_id = data;
        this.id_bureau_ticket=  this.tickets_id.id_bureau
        const Number_id_bureau=Number( this.id_bureau_ticket)
        this.getOrdinateursParIdBureau(Number_id_bureau)
        console.log("id bureau", this.id_bureau_ticket)
        try {
            lastValueFrom(this.recupe_all_imprimante());
            lastValueFrom(this.recupe_all_monitor());

        } catch (error) {
          console.error("Erreur lors de la récupération des périphériques :", error);
        }
       this.recupere_all_stabilisateur()
       this.recupere_all_Projecteur()
       this.recupere_all_swicth()
       this. recupere_all_routeur()
       this.recupere_all_pointdacce()
       this.recupere_all_serveur()


      },
      (error) => {
        console.error('Erreur lors du chargement des bureaux', error);
      }
    );
    console.log(   this.tickets_id)
}
async recupe_ticket_id_abandone(id: number) {
  this.backend.getTicketById(id).subscribe(
    (data) => {
      this.tickets_Abondane= data;
    },
    (error) => {
      console.error('Erreur lors du chargement des bureaux', error);
    }
  );
  console.log(   this.tickets_id)
}

async recupe_all_ticket() {
  try {
    this.backend.getAllTickets().subscribe(
      (data) => {
        this.tickets = data;
        const id_tech=Number(this.id_utilisateur)
        // Filtrage des tickets par statut
        this.tickets_ouvert = this.tickets.filter(ticket => ticket.statut === 'OUVERT');
        this.tickets_encours = this.tickets.filter(ticket => (ticket.statut === 'EN COURS DE MAINTENANCE' && ticket.id_technicien=== id_tech));
         this.tickets_ferme = this.tickets.filter(ticket => ( ticket.statut === 'FERME' && ticket.id_technicien=== id_tech));

        // Affectation des tickets ouverts
        this.tickets = this.tickets_ouvert;
        console.log(this.tickets);
      },
      (error) => {
        console.error('Erreur lors du chargement des tickets', error);
      }
    );
  } catch (error) {
    console.error('Une erreur s’est produite dans recupe_all_ticket:', error);
  }
}

async ajoute_tickets( ) {
  const id_user=Number(this.id_utilisateur)
  this.newTicket.id_bureau=this.recu_idbureau_user( id_user);
  this.newTicket.id_demandeur=id_user
  this.newTicket.demandeur=this.recu_nom_user(id_user)
  this.newTicket.dateOuverture=  new Date().toISOString().slice(0, 19).replace("T", " ")
  await this.backend.addTicket(this.newTicket).subscribe({
    next: (response) => {
      console.log('Ticket ajouté avec succès:', response);
      this.recupe_all_ticket( )

      // Réinitialisation du formulaire

      this.newTicket = {
        titre: '',
        priorite: '',
        categorie: '',
        description: '',
        statut: 'OUVERT',
        dateOuverture: '',
        id_bureau: 0,
        idEquipement: 0,
        panne: '',
        id_demandeur: 0,
        demandeur: '',
        technicien: '',
        typeEquipement: '',
        id_technicien: 0
      };
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du ticket:', err);
    }
  });

}

async prendre_ticket(){
  this.tickets_id.statut="EN COURS DE MAINTENANCE"
  this.tickets_id.datePrise=  new Date().toISOString().slice(0, 19).replace("T", " ")
  const id_user=Number(this.id_utilisateur)
  this.tickets_id.technicien= this.recu_nom_user(id_user)
  const id_tech=Number(this.id_utilisateur)
  this.tickets_id.id_technicien=id_tech
  console.log(this.tickets_id)
  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )

    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });
    //------prendre user-----------------------------
    this.recup_user_id( this.tickets_id.id_demandeur)
  //------prendre ordinateur pari id demandeur-------
    this.recupere_all_ordi()
  //------prendre moniteur pari id demandeur-------

  try {
    await lastValueFrom(this.recupe_all_imprimante());
    await lastValueFrom(this.recupe_all_monitor());

  } catch (error) {
    console.error("Erreur lors de la récupération des périphériques :", error);
  }
  //-----------------------modifiecation---------------------------
  this.ordinateur_id_bureax.statut="En cours de maintenance"
  this.modife_ordi_id(this.ordinateur_id_bureax.id!, this.ordinateur_id_bureax);
  // Modifier le statut de toutes les imprimantes trouvées
  this.modifeimprimante.forEach(imprimante => {
    imprimante.statut = "En cours de maintenance";
    // Vérifier que l'ID existe avant de mettre à jour
    if (imprimante.id) {
      this.modife_imprimante_id(imprimante.id, imprimante);
    }
  });

  // Modifier le statut de tous les moniteurs trouvés
  this.modifemoniteur.forEach(moniteur => {
    moniteur.statut = "En cours de maintenance";

    // Vérifier que l'ID existe avant de mettre à jour
    if (moniteur.id) {
      this.modife_moniteur_id(moniteur.id, moniteur);
    }
  });
}
//---------------------------------ordinteur-----------------------------------------
async recupere_all_ordi(){
  await this.backend.getAllOrdinateurs (  ).subscribe(
    (data) => {
      // Vérifier si la réponse est un objet ou un tableau et assigner correctement
      this.all_ordinateurs =  data;
      console.log(this.all_ordinateurs)
      this.recupe_ordi_user()


    },
    (error) => {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
    }
  );

}

recupere_ordi_id(id: number) {
  this. ordinateur_is= this.all_ordinateurs .find(u => u.id === id) || {
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
  console.log(this. ordinateur_is)

}
async modife_ordi_id(id:number,ordi:Ordinateur) {

  await this.backend.updateOrdinateur (id?? -1,ordi).subscribe({
    next: (response) => {
      console.log('ordi mise jour avec succès:', response);
      this. recupe_all_imprimante( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour ordi:', err);
    }
  });
}
async recupe_ordi_user(){
  this.user_id
  const ordi= this.all_ordinateurs.find(ordi => ordi.id === Number(this.user_id.idPc)) ||
   {
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
  } ;
  this.ordinateur_id_bureax = ordi;
  this.id_ordi_ticket = ordi.id || -1;

  console.log("ID ordinateur ticket :", this.id_ordi_ticket);



  }


// await lastValueFrom
recupere_nom_ordi_idpc(idOrdinateur:  string): string {
  this.id_ordi= Number(idOrdinateur)
  if (idOrdinateur === "-1") {
    return "ID invalide";
  }

  const ordiId = Number(idOrdinateur);
  if (isNaN(ordiId) || ordiId <= 0) {
    return "Inconnu"; // Gère les ID invalides
  }

  // Recherche  nom l'ordinateur
  const filtre_pc = this.all_ordinateurs .find(u => u.id === ordiId ); // Assurez-vous que idPc est une chaîne de caractères
  if (!filtre_pc) {
    return "Inconnu";
  }

  // Retourne le nom complet de l'utilisateur
  return `${filtre_pc.nom} `;
}
//--Ajoute
async onSubmit_ordi() {
  console.log("Nom de l'ordinateur :", this.newordinateur.nom);
  this.newordinateur.idBureau = this.id_bureau;
  this.newordinateur.statut = "Inactif";

  await this.backend.addOrdinateur(this.newordinateur).subscribe({
    next: (response) => {
      console.log('Ordinateur ajouté avec succès:', response);
      // Ajouter un message de confirmation ici si nécessaire
     this.getOrdinateursParIdBureau ( this.id_bureau)
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout de l\'ordinateur:', err);
    }
  });

}
//-------recupere------
ordi_bureau:Ordinateur[]=[]
recupe_ordi_id_bureau(id:number){
  this.ordi_bureau = this.all_ordinateurs.filter (u => u.idBureau === id);
}
//--recupere ordin
async getOrdinateursParIdBureau(idBureau: number)  {
  await this.backend.getOrdinateurByIdBureau(idBureau).subscribe(
    (data) => {
      //gere le retour objet ou tableau
      this.ordinateurs_id_bureau = Array.isArray(data) ? data : [data];
      console.log(this.ordinateurs_id_bureau )
    },
    (error) => {
      console.error('Erreur lors recup ordi', error);
    }
  );
}
//----------------------------imprimante--------------------------------------------------
recupe_all_imprimante(): Observable<any> {
  return this.backend.getAllImprimantes().pipe(
    tap((data) => {
      this.All_imprimante = data;
      console.log("Toutes les imprimantes :", this.All_imprimante);
      this.recupe_imprimante_idEquipmt();
      this.recupe_imprimante_idbureau(this.id_bureau_ticket)
    }),
    catchError((error) => {
      console.error("Erreur lors du chargement des imprimantes", error);
      return throwError(error);
    })
  );
}
recupe_imprimante_id(id:number){
  this.modifeimprimante = this.All_imprimante.filter(u => u.id === id)
  this.modifeimprimantex = this.All_imprimante.find(u => u.id === id) || {
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
  }

}
imprimante_idburea:Imprimante[]=[]
recupe_imprimante_idbureau(id:number){
  const idx=String(id)
  this.imprimante_idburea= this.All_imprimante.filter(u => u.idbureau === idx)

  console.log( this.imprimante_idburea)

}
recupe_imprimante_idEquipmt( ){
  console.log(this.id_ordi_ticket)
  this.modifeimprimante = this.All_imprimante.filter(u => u.idEquipmt === String(this.id_ordi_ticket)) ;
  console.log(this.modifeimprimante)
}
async modife_imprimante_id(id:number,imprimante:Imprimante) {

  await this.backend.updateImprimante(id?? -1,imprimante).subscribe({
    next: (response) => {
      console.log('imprimante mise jour avec succès:', response);
      this. recupe_all_imprimante( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour imprimante :', err);
    }
  });
}

//-----------------------------moniteur---------------------------------
recupe_all_monitor(): Observable<any> {
  return this.backend.getAllMoniteurs().pipe(
    tap((data) => {
      this.allmoniteur = data;
      this.recupe_monitor_id_bureau(this.id_bureau_ticket);
    }),
    catchError((error) => {
      console.error('Erreur lors de la récupération des moniteurs', error);
      return throwError(error);
    })
  );
}
async recupe_monitor_id_bureau(idBureau: number){
  const id= String(idBureau)
 await this.backend.getMoniteursByIdbureau(id).subscribe(
  (data) => {
    //gere le retour objet ou tableau
      this.moniteur = data  ;
      console.log("moniteur",    this.moniteur  )
  },
  (error) => {
    console.error('Erreur lors recup ordi', error);
  }
 )
}
async modife_moniteur_id(id:number,moniteur:Moniteur) {
  await this.backend.updateMoniteur (id?? -1,moniteur).subscribe({
    next: (response) => {
      console.log('moniteur mise jour avec succès:', response);
      this. recupe_all_imprimante( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour moniteur :', err);
    }
  });
}
async recupe_monitor_idpc (){
  this.modifemoniteur= this.allmoniteur.filter(u => u.idPc === String(this.id_ordi_ticket))
}
async fermet_ticket(){
  this.tickets_id.dateFermeture=new Date().toISOString().slice(0, 19).replace("T", " ")
  this.tickets_id.statut="FERME"
  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });}
//----------------------------------------------------------------
async Abandonne_ticket(){
  console.log(this.tickets_Abondane)
  this.tickets_id.datePrise=""
  this.tickets_id.dateFermeture=""
  this.tickets_id.technicien=""
  this.tickets_id.typeEquipement=""
  this.tickets_id.statut="OUVERT"
  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });
   //------prendre user-----------------------------
   this.recup_user_id( this.tickets_id.id_demandeur)
   //------prendre ordinateur pari id demandeur-------
     this.recupere_all_ordi()
   //------prendre moniteur pari id demandeur-------

   try {
     await lastValueFrom(this.recupe_all_imprimante());
     await lastValueFrom(this.recupe_all_monitor());

   } catch (error) {
     console.error("Erreur lors de la récupération des périphériques :", error);
   }
   //-----------------------modifiecation---------------------------
   this.ordinateur_id_bureax.statut="En cours d'utilisation"
  this.modife_ordi_id(this.ordinateur_id_bureax.id!, this.ordinateur_id_bureax);
   // Modifier le statut de toutes les imprimantes trouvées
   this.modifeimprimante.forEach(imprimante => {
     imprimante.statut = "En cours d'utilisation";
     // Vérifier que l'ID existe avant de mettre à jour
     if (imprimante.id) {
       this.modife_imprimante_id(imprimante.id, imprimante);
     }
   });

   // Modifier le statut de tous les moniteurs trouvés
   this.modifemoniteur.forEach(moniteur => {
     moniteur.statut = "En cours d'utilisation";

     // Vérifier que l'ID existe avant de mettre à jour
     if (moniteur.id) {
       this.modife_moniteur_id(moniteur.id, moniteur);
     }
   });

}

 async modife_ticket_panne(event: Event){
  const selectElement = event.target as HTMLSelectElement;
  this.panne = selectElement.value;
  this.tickets_id.panne= this.panne;
  console.log( this.tickets_id );

  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });
}
async modife_ticket_typeequipement(event: Event){
  const selectElement = event.target as HTMLSelectElement;
  this.type_equipement= selectElement.value;
  this.tickets_id.typeEquipement= this.type_equipement;
  console.log( this.tickets_id );

  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });
}
id_equipement_select:string="-1"

recuperation_id_equipement(event: Event){
  const selectElement = event.target as HTMLSelectElement;
  this.id_equipement_select= selectElement.value;
  console.log(this.id_equipement_select)
}
 modifemoniteurx: Moniteur = {
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
recupere_moniteur_id(id: number) {
  this.modifemoniteurx= this.moniteur.find(u => u.id === id) || {
    nom:  '', // Nom ajouté
    model:'',
    marque:'', // Marque ajoutée
    numSerie:'',
    dateAcquisition:new Date(),
    statut:'',
    prix:'',
    idPc:'', // ID de l'ordinateur auquel le moniteur est associé
    idbureau:'',
  };
}
//------------------------------routeru-----------------------------------------------
 routeur_id :Routeur ={
    nom : "",
    marque : "",
    model : "",
    numSerie : "",
    idBureau:"",
    dateInstallation: new Date(),
    statut : "",
    typeConnexion : "",
    adresseIp : "",
    adresseMac : "",
    dansVlanId : "",
    dansVlanNom : "",
    idBureauSup : "",
    idStabisiteur :"",
    prix : ""
  }
  nom_routeur: string = "";
  marque_routeur: string = "";
  model_routeur: string = "";
  numSerie_routeur: string = "";
  idBureau_routeur: number = 0;
  dateInstallation_routeur: Date = new Date();
  statut_routeur: string = "";
  typeConnexion_routeur: string = "";
  adresseIp_routeur: string = "";
  adresseMac_routeur: string = "";
  dansVlanId_routeur: number = 0;
  dansVlanNom_routeur: string = "";
  idBureauSup_routeur: number = 0;
  idStabisiteur_routeur: number = 0;
  prix_routeur: number = 0;
  nom_routeur_intefac: string = "";
isEditing_routeur: { [id: number]: { [valeur: string]: boolean } } = {};


validerModification(id: number, valeur: string): void {
  // Modifier la valeur de isEditing pour l'id et la valeur spécifiée
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }

}


  afficherValeurModifiee(id: number): void {

  }

  // -----------------gfh----------------------modif--routeur--------------------------------------------------
  recupere_routeur_id(id: number) {
    this.routeur_id = this.All_routeur.find(u => u.id === id) || {
      nom : "",
      marque : "",
      model : "",
      numSerie : "",
      idBureau:"",
      dateInstallation: new Date(),
      statut : "",
      typeConnexion : "",
      adresseIp : "",
      adresseMac : "",
      dansVlanId : "",
      dansVlanNom : "",
      idBureauSup : "",
      idStabisiteur :"",
      prix : ""
    };
    console.log(this.routeur_id);
}
  async modife_routeur_id(id:number, routeur:Routeur) {

    await this.backend.updateRouteur (id?? -1,routeur).subscribe({
      next: (response) => {
        console.log('routeur mise jour avec succès:', response);
        this.recupere_all_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du routeur :', err);
      }
    });

  }

  //------------------------------------swicth---------------------------------------------
  nom_swic: string = "";
  marque_swic: string = "";
  model_swic: string = "";
  numSerie_swic: string = "";
  idBureau_swic: string = "";
  dateInstallation_swic= new Date();
  statut_swic: string = "";
  configurable_swic: boolean =true;
  adresseIPv4Gestion_swic: string = "";
  adresseIPv6Gestion_swic: string = "";
  masqueSousReseaupv4_swic: string = "";
  masqueSousReseauipv6_swic: string = "";
  passerelleParDefaut_swic: string = "";
  protocolesGestion_swic: string[] = [];
  adresseMAC_swic: string = "";
  nombrePorts_swic: number=0;
  typePorts_swic: string[] = [];
  systemeExploitation_swic: string = "";
  dateDerniereMiseAJour_swic=new Date();
  motDePasseAdmin_swic: string = "";
  protocolesSecurite_swic: string[] = [];
  dansLvlan_swic: string = "";
  prix_swic: string = "";
  nom_switch:string = "";
   newSwicth_id: Swicth = {
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
      recupe_nom_swtch_id (id:  string): string {
        const id_rout= Number(id )
        if (id === "-1") {
          return "ID invalide";
        }
        // Recherche  nom l'ordinateur
        const nonswtch =  this.switches.find(u => u.id ===  id_rout ); // Assurez-vous que idPc est une chaîne de caractères
        if (! nonswtch) {

          return "Inconnu";
        }
       this.nom_switch= nonswtch.nom

        // Retourne le nom complet de l'utilisateur
        return `${ this.nom_switch} `;
      }
  recupere_swtch_id(id: number) {
    this.newSwicth_id= this.switches.find(u => u.id === id) || {
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
  }

    async modife_swicth_id(id:number,switchs:Swicth   ) {

      await this.backend.updateSwicth (id?? -1,switchs).subscribe({
        next: (response) => {
          console.log('switch mise jour avec succès:', response);
          this. recupere_all_swicth()
        },
        error: (err) => {
          console.error('Erreur lors de mise a jour du switch:', err);
        }
      });

    }


  //-------------------------------------point d acce---------------------------------------------


  async modife_pointdacc_id(id:number, pntacc: PointdAcces) {

    await this.backend.updatePointAcces (id?? -1, pntacc).subscribe({
      next: (wifiroutuerr) => {
        console.log('point mise jour avec succès:',wifiroutuerr);
        this.recupere_all_pointdacce()
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du point:', err);
      }
    });

  }
  recupere_pointdacc_id(id: number) {
    this.modifpointsAcces= this.All_pointsAcces.find(u => u.id === id) || {
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
}

id_serveur:number=0
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

// Récupère un serveur spécifique par son ID
recupere_serveur_id(id: number) {
  this.id_serveur = id;
  this.serveur = this.All_serveur.filter(u => u.id === id);
  console.log(this.serveur)
  this.serveur_id= this.serveur[0]

}
// Mise à jour d'un serveur existant
async mise_jour_serveur(id: number, serveur: Serveur) {
  try {
    const response = await this.backend.updateServeur(this.id_serveur ?? -1, serveur).toPromise();
    console.log('Serveur mis à jour avec succès:', response);
    this.recupere_all_serveur()
    this.recupere_serveur_id(this.id_serveur); // Récupérer le serveur mis à jour
  } catch (err) {
    console.error('Erreur lors de la mise à jour du serveur:', err);
  }
}
async modifie_ticket_ferme_rempl_equipm(event: Event){
  const selectElement = event.target as HTMLSelectElement;
  this.Action= selectElement.value;
  console.log( this.Action)
  if(this.Action==='reparation'){
    //-----------------------modifiecation---------------------------
   this.ordinateur_id_bureax.statut="En cours d'utilisateion"

   this.modife_ordi_id(this.ordinateur_id_bureax.id!, this.ordinateur_id_bureax);
    this.modifeimprimante.forEach(imprimante => {
      imprimante.statut = "En cours d'utilisateion";
      if (imprimante.id) {
        this.modife_imprimante_id(imprimante.id, imprimante);
      }
    });

    this.modifemoniteur.forEach(moniteur => {
      moniteur.statut = "En cours d'utilisateion";
      if (moniteur.id) {
        this.modife_moniteur_id(moniteur.id, moniteur);
      }
    });
  }
  else if(this.Action==='remplacement'){
    this.tickets_id.statut= 'FERME';
    if(this.type_equipement =='Ordinateur' ){
      this.recupere_ordi_id(Number( this.id_equipement_select))
      this.ordinateur_is.statut="Hors service"
      console.log( this.ordinateur_is)
      this.modife_ordi_id( this. ordinateur_is.id!,   this. ordinateur_is)
    }
    if(this.type_equipement =='Moniteur' ){
      this.recupere_moniteur_id (Number( this.id_equipement_select))
      this. modifemoniteurx.statut="Hors service"
      this.modife_moniteur_id(  this. modifemoniteurx.id!, this. modifemoniteurx)
    }
    if(this.type_equipement =='Imprimante' ){
      this.recupe_imprimante_id(Number( this.id_equipement_select))
      this.modifeimprimantex.statut ="Hors service"
      this. modife_imprimante_id(  this.modifeimprimantex.id!, this.modifeimprimantex)
    }
    if(this.type_equipement =='Stabilisateur' ){
      this.recupe_stabilisateur_id(Number( this.id_equipement_select))
      this.modifeStabilisateur  .statut="Hors service"
      this.modife_stabilisateur_id( this.modifeStabilisateur.id!,   this.modifeStabilisateur  )
    }
    if(this.type_equipement =='Routeur' ){
      this.recupere_routeur_id(Number( this.id_equipement_select))
      this.routeur_id.statut="Hors service"
      this.modife_routeur_id( this.routeur_id.id!, this.routeur_id)
    }
    if(this.type_equipement =='Commutateur' ){
      this. recupere_swtch_id(Number( this.id_equipement_select))
      this.newSwicth_id.statut="Hors service"
      this.modife_swicth_id(   this.newSwicth_id.id!,    this.newSwicth_id)
    }
    if(this.type_equipement =='PointAcces' ){
      this. recupere_pointdacc_id(Number( this.id_equipement_select))
      this.modifpointsAcces.statut="Hors service"
      this.modife_pointdacc_id(this.modifpointsAcces.id!,  this.modifpointsAcces)
    }
    if(this.type_equipement =='Serveur' ){
      this.recupere_serveur_id(Number( this.id_equipement_select))
      this.serveur_id.statut="Hors service"
      this.mise_jour_serveur( this.serveur_id.id!,   this.serveur_id)
    }
  }

  console.log( this.tickets_id );

  await this.backend.updateTicket(this.tickets_id?.id ?? -1, this.tickets_id).subscribe({
    next: (response) => {
      console.log('Ticket mise jour avec succès:', response);
      this.recupe_all_ticket( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour du ticket:', err);
    }
  });


}

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
//----------------------stabilisateur---------------------------------------
async recupere_all_stabilisateur(){
  await this.backend.getAllStabilisateurs () .subscribe(
    (data) => {
      this.All_Stabilisateur= data;
     this.recupe_stabilisateur_bureau()

    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}

modifeStabilisateur: Stabilisateur={
  nom:'',
  statut:'',
  model:'',
  marque:'',
  numSerie:'',
  dateAcquisition: new Date(),
  prix:'',
  puissance:'',
  tensionSortie:'',
  frequence:'',
  idEquipmt:'',
  idbureau:'',
  relieEquipmt:'',
}

recupe_stabilisateur_id(id:number){
  this.modifeStabilisateur = this.All_Stabilisateur.find(u => u.id === id) || {
    nom:'',
    statut:'',
    model:'',
    marque:'',
    numSerie:'',
    dateAcquisition: new Date(),
    prix:'',
    puissance:'',
    tensionSortie:'',
    frequence:'',
    idEquipmt:'',
    idbureau:'',
    relieEquipmt:'',
  };
}

async modife_stabilisateur_id(id:number,stabilisateur:Stabilisateur) {

  await this.backend.updateStabilisateur(id?? -1,stabilisateur).subscribe({
    next: (response) => {
      console.log('stabilisateur mise jour avec succès:', response);
      this. recupere_all_stabilisateur()
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour stabilisateur:', err);
    }
  });
}
recupe_stabilisateur_bureau(){
  const id_br= String( this.id_bureau_ticket)
  console.log(id_br)

  // Recherche  nom l'ordinateur
  this.Stabilisateur_bureau = this.All_Stabilisateur.filter(u => u.idbureau === id_br);
  console.log(this.Stabilisateur_bureau)
 // Assurez-vous que idPc est une chaîne de caractères

}
//------------------------projecteur-----------------------------------------

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
  numSerie: '',}
  async recupere_all_Projecteur(){
    await this.backend. getAllProjecteurs () .subscribe(
      (data) => {
       this.All_Projecteur = data;
       this. recupe__projecteur_bureau()
      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );

  }
  recupe__projecteur_bureau(){
    const id_br=   String( this.id_bureau_ticket)
    this.Projecteur_bureau = this. All_Projecteur.filter(u => u.idbureau === id_br);
    console.log(    this.Projecteur_bureau  )
  }
//------------------------------------------swicth--------------------------------------------------
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
  async recupere_all_swicth(){
    await this.backend.getAllSwitches () .subscribe(
      (data) => {
        this.Allswitches= data;
        console.log(  this.Allswitches)
       this.recupe_switch_id_bureau()

      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );

  }
  async recupe_switch_id_bureau( ){
    const id= String(this.id_bureau_ticket)
   await this.backend.getSwitchesByBureau  (id).subscribe(
    (data) => {
      //gere le retour objet ou tableau
        this.switches= data  ;
    },
    (error) => {
      console.error('Erreur lors recup ordi', error);
    }
   )
  }
  //---------------------------routeur------------------------------------------
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
    async recupere_all_routeur(){
      await this.backend.getAllRouteurs () .subscribe(
        (data) => {
          this.All_routeur= data;
         this.recupe_routeur_bureau()

        },
        (error) => {
          console.error('Erreur lors du char ent des bureaux', error);
        }
      );

    }

    recupe_nom_routeur_id_rout(id: Number ): string {
      const id_rout= Number(id )
      if (id === -1) {
        return "ID invalide";
      }
      // Recherche  nom l'ordinateur
      const interfrt =   this.routeur_bureau.find(u => u.id ===  id_rout ); // Assurez-vous que idPc est une chaîne de caractères
      if (! interfrt) {

        return "Inconnsu";
      }


      // Retourne le nom complet de l'utilisateur
      return ` `;
    }
    recupe_routeur_bureau(){
      const id_br= String( this.id_bureau_ticket)
      console.log(id_br)
      this.routeur_bureau = this.All_routeur.filter(u => u.idBureau === id_br);
      console.log(  this.routeur_bureau)

    }
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

          async recupere_all_pointdacce(){
            await this.backend.getAllPointsAcces() .subscribe(
              (data) => {
                this.All_pointsAcces= data;
               this.recupe__pointdacc_bureau()
              },
              (error) => {
                console.error('Erreur lors du char ent des bureaux', error);
              }
            );
          }
          recupe__pointdacc_bureau(){
            const id_br=   String( this.id_bureau_ticket)
            console.log(   id_br)
            this.pointsAcces_bureau = this.All_pointsAcces.filter(u => u.idlieu === id_br);

            console.log(  this.pointsAcces_bureau )
          }
          async addpointdacce(){
            this.newpointsAcces.statut="actif"
            this.newpointsAcces.idlieu= String(this.id_bureau)
            console.log(this.newpointsAcces)
            await this.backend.addPointAcces ( this.newpointsAcces).subscribe({
              next: (newpointsAcces) => {
                console.log('newpointsAcces ajouté avec succès :',newpointsAcces);
                this.recupere_all_pointdacce()
              },
              error: (err) => {
                console.error('Erreur lors de l\'ajout du newpointsAcces  :', err);
                alert('Erreur lors de l\'ajout du newpointsAcces .');
              },
            });
          }
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

async recupere_all_serveur(){
  await this.backend.getAllServeurs () .subscribe(
    (data) => {
      this.All_serveur= data;
      this.recupe__serveur_bureau()
    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );
}
recupe__serveur_bureau(){
  const id_br=   String( this.id_bureau_ticket)
  console.log(id_br)
  this.serveur_bureau = this.All_serveur.filter(u => u.idBureau === id_br);
  console.log(  this.serveur_bureau )
}
async supprime_ticket_id(id: number, event: MouseEvent) {
  event.stopPropagation();
}
//-----------------bureau-------------------
async loadBureaux() {
  this.backend.getAllBureaux().subscribe(
    (data) => {
      this.bureaux = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des bureaux', error);
    }
  );
}
recupbureaux(id: number): string {
  if (id === -1) {
    return "ID invalide";
  }

  const ordiId = Number(id);
  if (isNaN(ordiId) || ordiId <= 0) {
    return "Inconnu";
  }

  // Vérifier si les bureaux sont déjà chargés
  const filtre_bureau = this.bureaux.find(u => u.id ===  ordiId);
  if (filtre_bureau) {
    return `${filtre_bureau.nom || "inconnu"}`;
  }

  // Si le bureau n'est pas trouvé, le récupérer via l'API
  return "inconnu";
}
recup_idbureau(id: number): number {
  if (id === -1) {
    return -1;
  }

  const ordiId = Number(id);
  if (isNaN(ordiId) || ordiId <= 0) {
    return -1;
  }

  // Vérifier si les bureaux sont déjà chargés
  const filtre_bureau = this.bureaux.find(u => u.id === ordiId);
  if (filtre_bureau) {
    return filtre_bureau.id||-1;
  }

  // Si le bureau n'est pas trouvé, le récupérer via l'API
  return-1;
}
//-----------------user*-------------------
async loaduser() {
  this.backend.getTousLesUtilisateurs().subscribe(
    (data) => {
      this.utilisateur= data;
      console.log(  this.utilisateur)
    },
    (error) => {
      console.error('Erreur lors du chargement des bureaux', error);
    }
  );
}

recup_user_id(id: number) {
  const ordiId = Number(id);
  const filtre_user = this.utilisateur.find(u => u.id === ordiId) || {nom: "",
    prenom: "",
    nMatricule: "",
    email: "",
    motPasse: "",
    dateNaissance: "",
    telephone: "",
    profession: "",
    idPc: "",
    idBureau: "",
    valide: ""};
  this.user_id=filtre_user
}
recu_nom_user(id: number): string {
  if (id === -1) {
    return "ID invalide";
  }

  const ordiId = Number(id);
  if (isNaN(ordiId) || ordiId <= 0) {
    return "Inconnu";
  }

  const filtre_user = this.utilisateur.find(u => u.id === ordiId);
  if (filtre_user) {
    return `${filtre_user.nom || "inconnu"}${" "}${filtre_user.prenom || "inconnu"}`;
  }

  return "inconnu";
}
recu_idbureau_user(id: number): number {
  if (id === -1) {
    return -1;
  }

  const ordiId = Number(id);
  if (isNaN(ordiId) || ordiId <= 0) {
    return- 1;
  }

  const filtre_user = this.utilisateur.find(u => u.id === ordiId);
  if (filtre_user) {
    const id_bureau=Number(filtre_user.idBureau)
    return  id_bureau || -1;
  }

  return -1;
}
equipement_iddemandeur(){

}

affiche_ouvert(){
  this.ticket_fermer=false;
  this.ticket_encour=false;
 this.ticket_ouvert=true;
 this.tickets=  this.tickets_ouvert;
}
affiche_encour(){
  this.ticket_ouvert=false;
  this.ticket_fermer=false;
  this.ticket_encour=true;
  this.tickets=  this.tickets_encours;
}
affiche_fermer(){
  this.ticket_ouvert=false;
  this.ticket_encour=false;
  this.ticket_fermer=true;
  this.tickets=  this.tickets_ferme;
}
affiche_liste_ticket(){
  this.ticket_ouvert=true;
  this.liste_ticket =true;
  this.ajoute_ticket=false;
  this.ferme_ticket=false;
  this.ticket_fermer=false;
  this. recupe_all_ticket()
}
affiche_ajoute_ticket(){
  this.liste_ticket =false;
  this.ferme_ticket=false;
  this.ajoute_ticket=true;
}
fermeture_ticket(id: number, event: MouseEvent) {
  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();
  this.recupe_ticket_id(id)
  this.liste_ticket =false;
  this.ajoute_ticket=false;
  this.ferme_ticket=true;

}





}





