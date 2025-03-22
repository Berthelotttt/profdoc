


//---------------


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { BackendserviceService } from '../../../backendservice.service';
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
export interface Prisemiseajourlogiciel {
  id?: number; // Optionnel car il est généré automatiquement par le backend
  name: string;
  idpc: string;
  idbureau: string;
  statut: string;
  installDate: string;
  idateprise: string;
  idtechnin: string; // Nouveau champ : ID du technicien
  nomtechnicein: string; // Nouveau champ : Nom du technicien
}

@Component({
  imports: [ RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule],
    selector: 'app-misejouranti',
    templateUrl: './misejouranti.component.html',
    styleUrl: './misejouranti.component.scss'
    })
    export class MisejourantiComponent {

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
    panne:  '',
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
//mise a jour-------------------------
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
  //-----------------------------------mise ajour----------------
 Allordi: Ordinateur[] = [];
 softwareInfo: any[] = []
 softfiltredate: any[] = []



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
  this.loadBureaux()
  this.recupe_all_ordi()
  const urlSegments = window.location.pathname.split('/');
      const idString = urlSegments[urlSegments.length - 1]; // Dernier élément de l'URL
      this.id_user = isNaN(Number(idString)) ? -1 : Number(idString);
      console.log('ID Utilisateur:', this.id_user);
      this.recupe_user()
}
nom:string=''
prenom:string=''
id_user:Number=0
user:Utilisateur[] = [];
  //------------------------------------------user--------------------------------
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
  logicielsFiltres: Prisemiseajourlogiciel[]=[]
  recuper_logiciel_prise_id_tech() {
    const id_user = this.id_user;
    this.backend.getAllPrises ().subscribe({
      next: (logiciels) => {
        console.log(logiciels)
       this. logicielsFiltres = logiciels.filter(logiciel => logiciel.idtechnin === String(id_user));
        console.log("Logiciels pris en charge par le technicien (ID:", id_user, "):",this. logicielsFiltres);

      },
      error: (err) => {
        console.error("Erreur lors de la récupération des logiciels :", err);
      }
    });

  }
  toNumber(value: string): number {
    return Number(value);
  }
//----------------ordinateur------------------------
recupe_all_ordi() {
  this.backend.getAllOrdinateurs().subscribe({
    next: (data) => {
      this.Allordi = data;
      console.log( this.Allordi)
      this.recupe_all_logiciel()
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du ticket:', err);
    }
  });
}
recup_nom_pc_id(id: number): string {
  if (id === -1) {
    return "ID invalide";
  }
  const ordiId = Number(id);
  if (isNaN(ordiId) || ordiId <= 0) {
    return "Inconnu";
  }

  // Vérifier si les bureaux sont déjà chargés
  const filtre_pc = this.Allordi.find(u => u.id === ordiId);
  if ( filtre_pc ) {
    return `${ filtre_pc.nom || "inconnu"}`;
  }

  // Si le bureau n'est pas trouvé, le récupérer via l'API
  return "inconnu";
}/*
recupe_all_logiciel() {
  this.softwareInfo = this.Allordi.flatMap(ordi =>
    (ordi.logiciel || []).map(software => ({
      name: software['name'] || "Inconnu",
      version: software['version'] || "N/A",
      installDate: software['installDate'] || "N/A",
      installLocation: software['installLocation'] || "N/A",
      update_auto: software['update_auto'] ?? "N/A",
      id_pc: ordi.id, // Associe correctement l'ID du PC au logiciel
      id_bureau: ordi.idBureau
    }))
  ).sort((a, b) => a.name.localeCompare(b.name));

  console.log("Liste des logiciels triés:", this.softwareInfo);

  // Appelle la fonction pour filtrer les logiciels à mettre à jour
  this.recupe_all_logiciel_filtre_date();
}*/

recupe_all_logiciel() {
  this.softwareInfo=[]
  this.softwareInfo = this.Allordi.flatMap(ordi =>
    (ordi.virus|| []).map(software => ({
      name: software['Name'] || "Inconnu",
      version: software['AntivirusSignatureVersion'] || "N/A",
      installDate: software['AntivirusSignatureLastUpdated'] || "N/A",
      Enable: software['AntivirusEnabled'] || "N/A",
      id_pc: ordi.id, // Associe correctement l'ID du PC au logiciel
      id_bureau: ordi.idBureau
    }))
  ).sort((a, b) => a.name.localeCompare(b.name));

  console.log("Liste des logiciels triés:", this.softwareInfo);

  // Appelle la fonction pour filtrer les logiciels à mettre à jour
  this.recupe_all_logiciel_filtre_date();
}
// Récupère les logiciels qui doivent être mis à jour
recupe_all_logiciel_filtre_date() {
  const jour = 5; // Nombre de jours avant qu'une mise à jour soit nécessaire
  const dateActuelle = new Date();

  this.softfiltredate = this.softwareInfo.filter(software => {
    // Convertir la date du format DD/MM/YYYY au format YYYY-MM-DD
    const installDateStr = software.installDate.split('/').reverse().join('-');
    const installDate = new Date(installDateStr);

    // Vérifiez si la conversion a réussi
    if (!isNaN(installDate.getTime())) {
      console.log(installDate);

      // Calcul de la différence en jours entre aujourd'hui et la date d'installation
      const differenceJours = Math.floor((dateActuelle.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24));
      console.log(differenceJours);

      // Retourne seulement si la différence dépasse le nombre de jours spécifié
      return differenceJours >= jour;
    } else {
      console.warn("Date d'installation invalide pour le logiciel:", software);
      return false;
    }
  });

  console.log("Liste des logiciels qui doivent être mis à jour (installés il y a plus de 5 jours):", this.softfiltredate);
}






date_dernier_instation= new Date()
prendre_logiciel(nom: string, idpc: string) {

  // Trouver l'ordinateur correspondant dans Allordi
  const ordinateur = this.Allordi.find(ordi => ordi.id === Number(idpc));
  console.log( ordinateur)
  console.log( nom)
  if (ordinateur) {
    // Trouver le logiciel dans l'ordinateur
    const logiciel = ordinateur.virus.find(soft => soft['Name'] === nom);
    console.log(logiciel)
    if (logiciel) {
      // Mettre à jour la date d'installation à la date actuelle
      const dateActuelle = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      this.date_dernier_instation=logiciel['AntivirusSignatureLastUpdated']
      logiciel['AntivirusSignatureLastUpdated'] = dateActuelle;

      // Mettre à jour également dans softwareInfo pour synchroniser les données
      const logicielDansSoftwareInfo = this.softwareInfo.find(soft => soft.name === nom && soft.id_pc === idpc);
      if (logicielDansSoftwareInfo) {
        logicielDansSoftwareInfo.installDate = dateActuelle;
      }

      console.log(`Date d'installation mise à jour pour ${nom} (ID PC: ${idpc}) : ${dateActuelle}`);
      console.log(ordinateur)
      // Envoyer une requête au backend pour mettre à jour l'ordinateur
      this.backend.updateOrdinateur(ordinateur.id!, ordinateur).subscribe({
        next: (response) => {
          console.log("Ordinateur mis à jour dans le backend :", response);
          this.recupe_all_ordi()
          this.insertion_prisemiseajour(nom, idpc);
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'ordinateur :", err);
        }
      });
    } else {
      console.error("Logiciel non trouvé dans l'ordinateur :", nom, idpc);
    }
  } else {
    console.error("Ordinateur non trouvé :", idpc);
  }

}

finition(id: number) {
  // Trouver le logiciel dans logicielsFiltres
  const logiciel = this.logicielsFiltres.find(soft => soft.id === id);

  if (logiciel) {
    // Mettre à jour l'ID du technicien à "-1"
    logiciel.idtechnin = "-1";

    // Envoyer une requête au backend pour mettre à jour le logiciel
    this.backend.updatePrise (id, logiciel).subscribe({
      next: (response) => {
        console.log("Logiciel mis à jour avec succès :", response);

        // Recharger la liste des logiciels après la mise à jour
        this.recuper_logiciel_prise_id_tech();
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du logiciel :", err);
      }
    });
  } else {
    console.error("Logiciel non trouvé avec l'ID :", id);
  }
}
insertion_prisemiseajour(nom: string, idpc: string) {
  console.log(nom)
  // Trouver l'ordinateur correspondant dans Allordi
  const ordinateur = this.Allordi.find(ordi => ordi.id === Number(idpc));
  console.log( ordinateur!.virus)
  if (ordinateur) {
    // Trouver le logiciel dans l'ordinateur
    const logiciel = ordinateur.virus.find(soft => soft['Name'] .trim()=== nom.trim());
    console.log(logiciel);

    if (logiciel) {
      // Mettre à jour le statut du logiciel à "en cours"
      logiciel['statut'] = 'en cours';

      // Prendre la date d'installation du logiciel
      const dateInstallation = this.date_dernier_instation;

      // Prendre la date actuelle pour dateprise
      const dateActuelle = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

      // Afficher les informations dans la console
      console.log("Informations pour la prise en charge :", {
        nom: logiciel['name'],
        id_pc: ordinateur.id,
        statut: logiciel['statut'],
        dateInstallation: dateInstallation,
        dateprise: dateActuelle,
      });

      // Créer un objet contenant les informations de prise en charge
      const priseEnCharge: Prisemiseajourlogiciel = {
        name: logiciel['Name'],
        idpc: String(ordinateur.id),
        idbureau: String(ordinateur.idBureau),
        statut: logiciel['statut'],
        installDate: String(dateInstallation),
        idateprise: dateActuelle,
        idtechnin: String(this.id_user),
        nomtechnicein: `${  this.nom } ${ this.prenom}`

      };
      console.log(priseEnCharge)
      // Envoyer une requête au backend pour sauvegarder ces informations
      this.backend.addPrise(priseEnCharge).subscribe({
        next: (response) => {
          console.log("Prise en charge sauvegardée dans le backend :", response);
        },
        error: (err) => {
          console.error("Erreur lors de la sauvegarde de la prise en charge :", err);
        }
      });
    } else {
      console.error("Logiciel non trouvé dans l'ordinateur :", nom, idpc);
    }
  } else {
    console.error("Ordinateur non trouvé :", idpc);
  }
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
  this.recuper_logiciel_prise_id_tech()
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





