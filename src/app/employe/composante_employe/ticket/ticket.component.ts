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
import { BackendserviceService } from '../../../backendservice.service';
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
  panne:  string;
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
    panne: '',
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

  ticket_ouvert:boolean=false;
  ticket_encour:boolean=false;
  ticket_fermer:boolean=false;
  liste_ticket:boolean=false;
  ajoute_ticket:boolean=false;
  ferme_ticket:boolean=false;
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
        const id_empl=Number(this.id_utilisateur)
        // Filtrage des tickets par statut
        this.tickets_ouvert = this.tickets.filter(ticket => (ticket.statut === 'OUVERT' && ticket.id_demandeur=== id_empl));
        this.tickets_encours = this.tickets.filter(ticket => (ticket.statut === 'EN COURS DE MAINTENANCE' && ticket.id_demandeur=== id_empl));
         this.tickets_ferme = this.tickets.filter(ticket => (ticket.statut === 'FERME'&& ticket.id_demandeur=== id_empl));

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
  console.log(this.tickets_Abondane)
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
all_ordinateurs : Ordinateur[] = [];  // Liste d'ordinateurs

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


id_ordi!:number;
ordinateurs_id_bureau: Ordinateur[] = [];  // Liste d'ordinateurs

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
    id_bureau_ticket:number=0
    async recupere_all_ordi(){
      await this.backend.getAllOrdinateurs (  ).subscribe(
        (data) => {
          // Vérifier si la réponse est un objet ou un tableau et assigner correctement
          this.all_ordinateurs =  data;
          console.log(this.all_ordinateurs)
          this.recupere_ordi_id(Number(this.user_id.idPc))


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
      this.id_ordi_ticket = this. ordinateur_is.id!
      console.log(this. ordinateur_is)
      //------recupere  imprimante
      this.recupe_all_imprimante()
      this.recupe_all_monitor()

    }

    async modife_ordi_id(id:number,ordi:Ordinateur) {

      await this.backend.updateOrdinateur (id?? -1,ordi).subscribe({
        next: (response) => {
          console.log('ordi mise jour avec succès:', response);

        },
        error: (err) => {
          console.error('Erreur lors de mise a jour ordi:', err);
        }
      });
    }
     //--Ajoute
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
        async recupe_all_imprimante(){
          await this.backend.getAllImprimantes() .subscribe(
            (data) => {
              this.All_imprimante = data;
              this.  recupe_imprimante_idEquipmt()

            },
            (error) => {
              console.error('Erreur lors du char ent des bureaux', error);
            }
          );}
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
        id_ordi_ticket:number=0
        recupe_imprimante_idEquipmt( ){
          console.log(this.id_ordi_ticket)
          this.modifeimprimante = this.All_imprimante.filter(u => u.idEquipmt === String(this.id_ordi_ticket)) ;
          this.modifeimprimante .forEach(impriamnt=> {
            impriamnt.statut = "En cours d'utilisation";
            this.modife_imprimante_id(impriamnt.id!, impriamnt);
        });
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
     //-----------------------------moniteur---------------------------------

     async   recupe_all_monitor(){
      await this.backend.getAllMoniteurs() .subscribe(
        (data) => {
        this.allmoniteur = data;
          this.recupe_monitor_idEquipmt()
          this.recupe_monitor_id_bureau(this.id_bureau_ticket);

        },
        (error) => {
          console.error('Erreur lors du char ent des bureaux', error);
        }
      );}

      recupe_monitor_idEquipmt() {
        console.log(this.id_ordi_ticket);

        // Filtrer les moniteurs qui correspondent à l'idPc
        this.modifemoniteur = this.allmoniteur.filter(u => u.idPc === String(this.id_ordi_ticket));

        // Parcourir tous les moniteurs filtrés et mettre à jour leur statut
        this.modifemoniteur.forEach(moniteur => {
            moniteur.statut = "En cours d'utilisation";
            this.modife_moniteur_id(moniteur.id!, moniteur);
        });
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
    moniteur_equi: Moniteur[] = []
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
id_pc_user:string=""
async Abandonne_ticket(){
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
  });
  //---recupere  id equimpemnt par
     //------prendre user-----------------------------
      this.recup_user_id( this.tickets_id.id_demandeur)
    //------prendre ordinateur pari id demandeur-------
      this.recupere_all_ordi()
    //------prendre moniteur pari id demandeur-------

     this.recupe_all_imprimante()
     this.recupe_all_monitor()


    //-----------------------modifiecation---------------------------
   this.recupere_all_ordi()
    this.ordinateur_is.statut = "En cours d'utilisation";
    console.log(this.ordinateur_is);

   /* this.modife_ordi_id(this.ordinateur_id_bureax.id!, this.ordinateur_id_bureax);
    // Modifier le statut de toutes les imprimantes trouvées
    this.modifeimprimante.forEach(imprimante => {
      imprimante.statut = "En cours d 'utilisation";
      // Vérifier que l'ID existe avant de mettre à jour
      if (imprimante.id) {
        this.modife_imprimante_id(imprimante.id, imprimante);
      }
    });

    // Modifier le statut de tous les moniteurs trouvés
    this.modifemoniteur.forEach(moniteur => {
      moniteur.statut = "En cours d 'utilisation";

      // Vérifier que l'ID existe avant de mettre à jour
      if (moniteur.id) {
        this.modife_moniteur_id(moniteur.id, moniteur);
      }
    });
*/
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




