import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BackendserviceService } from '../../../backendservice.service';
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
    panne:'',
    id_bureau:0,
    id_demandeur:0,
    id_technicien:0,
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
    id_technicien:0,
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

async recupe_all_ticket() {
  try {
    this.backend.getAllTickets().subscribe(
      (data) => {
        this.tickets = data;
        console.log(this.tickets);

        // Filtrage des tickets par statut
        this.tickets_ouvert = this.tickets.filter(ticket => ticket.statut === 'OUVERT');
        this.tickets_encours = this.tickets.filter(ticket => ticket.statut === 'EN COURS DE MAINTENANCE'  );
        this.tickets_ferme = this.tickets.filter(ticket => ticket.statut === 'FERMÉ');

        // Affectation des tickets ouverts
        this.tickets = this.tickets_ouvert;
        console.log( this.tickets_encours);
      },
      (error) => {
        console.error('Erreur lors du chargement des tickets', error);
      }
    );
  } catch (error) {
    console.error('Une erreur s’est produite dans recupe_all_ticket:', error);
  }
}


ajoute_tickets( ) {
  const id_user=Number(this.id_utilisateur)
  this.newTicket.id_bureau=this.recu_idbureau_user( id_user);
  this.newTicket.id_demandeur=id_user
  this.newTicket.demandeur=this.recu_nom_user(id_user)
  this.newTicket.dateOuverture=  new Date().toISOString().slice(0, 19).replace("T", " ")
  this.backend.addTicket(this.newTicket).subscribe({
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
        id_technicien:0,
      };
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du ticket:', err);
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
