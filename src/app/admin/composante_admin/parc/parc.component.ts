import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Ajoutez cette ligne
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { lastValueFrom } from 'rxjs';
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
  selector: 'app-parc',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './parc.component.html',
  styleUrl: './parc.component.scss'
})
export class ParcComponent implements OnInit{

  //--------------------modifiecation------------------------------
  isEditing: { [id: number]: { [valeur: string]: boolean } } = {};

  modifierCategorie(id: number, valeur: string): void {
    // Initialise l'objet pour l'id s'il n'existe pas déjà
   if (!this.isEditing[id]) {
      this.isEditing[id] = {};
    }
    this.isEditing[id][valeur] = true;
    if (!this.isEditing_routeur[id]) {
      this.isEditing_routeur[id] = {};
    }
    this.isEditingg[id] = true;
    // Définir la valeur à true pour la clé correspondante
    this.isEditing_routeur[id][valeur] = true;
  }
  modifierCategoriee(id: number ): void {
    // Initialise l'objet pour l'id s'il n'existe pas déjà

    this.isEditingg[id] = true;
  }
  //----------------------moniteur--------------------------------
  modifemoniteur: Moniteur = {
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
  nom_moniteur: string="";
  model_moniteur: string="";
  marque_moniteur: string="";
  numSerie_moniteur: string="";
  dateAcquisition_moniteur=new Date();
  statut_moniteur: string="";
  prix_moniteur: string="";
  idPc_moniteur: string="";
  idbureau_moniteur: string="";
  recupere_moniteur_id(id: number) {
    this.modifemoniteur= this.moniteur.find(u => u.id === id) || {
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
  async modife_moniteur_id(id:number, moniteur:Moniteur) {

    await this.backend.updateMoniteur(id?? -1,moniteur).subscribe({
      next: (response) => {
        console.log('moniteur mise jour avec succès:', response);
        this.recupe_monitor_id_bureau(this.id_bureau)
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du moniteur :', err);
      }
    });
  }
  Modification_nom_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.nom=this.nom_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }
   Modification_model_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.model=this.model_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }


   Modification_marque_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.marque=this.marque_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }
   Modification_date_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.dateAcquisition=this.dateAcquisition_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }


   Modification_reliepc_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.idPc=this.idPc_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)

   }


   Modification_seri_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.numSerie=this.numSerie_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }
   Modification_prix_moniteur(id: number, valeur: string,  idrout: number  ): void{
    // Fermer l'édition pour cette valeur
    if (this.isEditing[id]) {
      this.isEditing[id][valeur] = false;
    }
    this. recupere_moniteur_id(idrout)
    this.modifemoniteur.prix=this.prix_moniteur
    this.modife_moniteur_id(idrout, this.modifemoniteur)
   }

   //---------------------------------imprimante------------------------------------------
   nom_impri: string=""
statut_impri: string="";
model_impri: string="";
marque_impri: string="";
numSerie_impri: string="";
dateAcquisition_impri= new Date();
prix_impri: string="";
ip_impri: string="";
masque_impri: string="";
mac_impri: string="";
passerel_impri: string="";
nomLan_impri: string="";
idLan_impri: string="";
relieEquipmt_impri: string="";
idEquipmt_impri: string="";
idbureau_impri: string="";

  modifeimprimante: Imprimante = {
    nom:"",
    statut:"",
    model:"",
    marque:"",
    numSerie:"",
    dateAcquisition: new Date(),
    prix:"",
    ip:"",
    masque:"",
    mac:"",
    passerel:"",
    nomLan:"",
    idLan:"",
    relieEquipmt:"",
    idEquipmt:"",
    idbureau:"",
}

recupe_imprimante_id(id:number){
  this.modifeimprimante = this.All_imprimante.find(u => u.id === id) || {
    nom:"",
    statut:"",
    model:"",
    marque:"",
    numSerie:"",
    dateAcquisition: new Date(),
    prix:"",
    ip:"",
    masque:"",
    mac:"",
    passerel:"",
    nomLan:"",
    idLan:"",
    relieEquipmt:"",
    idEquipmt:"",
    idbureau:"",
  };
}
async modife_imprimante_id(id:number,imprimante:Imprimante) {

  await this.backend.updateImprimante(id?? -1,imprimante).subscribe({
    next: (response) => {
      console.log('imprimante mise jour avec succès:', response);
      this.recupe_imprimante_bureau( )
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour imprimante :', err);
    }
  });
}
Modification_nom_imprimante(index: number, categorie: string, id: number ) {
  console.log(`Modification du nom de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante.nom= this.nom_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}

// Fonction de modification pour le modèle de l'imprimante
Modification_model_imprimante(index: number, categorie: string, id:number ) {
  console.log(`Modification du modèle de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante.model= this.model_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}

// Fonction de modification pour la marque de l'imprimante
Modification_marque_imprimante(index: number, categorie: string, id: number ) {
  console.log(`Modification de la marque de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante.marque= this.marque_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}
// Fonction de modification pour la marque de l'imprimante
Modification_date_imprimante(index: number, categorie: string, id: number ) {
  console.log(`Modification de la  date de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante.dateAcquisition= this.dateAcquisition_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}
// Fonction de modification pour le numéro de série de l'imprimante
Modification_numSerie_imprimante(index: number, categorie: string, id: number ) {
  console.log(`Modification du numéro de série de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante.numSerie= this.numSerie_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}

// Fonction de modification pour l'équipement relié à l'imprimante
Modification_relieEquipmt_imprimante(index: number, categorie: string, id: number, event: any ) {
 const selectedValue = event.target.value;
  console.log(`Modification de l'équipement relié de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
   const equipement = JSON.parse(selectedValue);
    this.modifeimprimante.idEquipmt = equipement.id;
    this.modifeimprimante.relieEquipmt = equipement.nom;
    this.modife_imprimante_id( id,this.modifeimprimante)
}

// Fonction de modification pour le nom LAN de l'imprimante
Modification_type_imprimante(index: number, categorie: string, id: number ) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante. nomLan= this. nomLan_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}

// Fonction de modification pour le prix de l'imprimante
Modification_prix_imprimante(index: number, categorie: string, id:number ) {
  console.log(`Modification du prix de l'imprimante avec id ${id}`);
  this.isEditing[index][categorie] = false;
  this.recupe_imprimante_id(id)
  this.modifeimprimante. prix= this. prix_impri
  this.modife_imprimante_id( id,this.modifeimprimante)
}

//-------------------------------------pROJECTEUR------------------------------------------
modifeprojecteur: Projecteur={
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
}

nom_projecteur: string="";
resolution_projecteur: string="";
modele_projecteur: string="";
marque_projecteur: string="";
dateInstallation_projecteur= new Date();
prix_projecteur: string="";
idbureau_projecteur: string="";
technologie_projecteur: string="";
statut_projecteur: string="";
numSerie_projecteur: string="";

recupe_projecteur_id(id:number){
  this.modifeprojecteur = this. All_Projecteur.find(u => u.id === id) || {
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
}
async modife_projecteur_id(id:number,projecteur:Projecteur) {

  await this.backend.updateProjecteur (id?? -1,projecteur).subscribe({
    next: (response) => {
      console.log('projecteur mise jour avec succès:', response);
      this. recupere_all_Projecteur()
    },
    error: (err) => {
      console.error('Erreur lors de mise a jour projecteur:', err);
    }
  });
}

// Fonction pour la modification du nom
Modification_nom_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur. nom= this. nom_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}

// Fonction pour la modification de la résolution
Modification_resolution_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.resolution= this. resolution_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}


// Fonction pour la modification du modèle
Modification_modele_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  this.modifeprojecteur.modele= this. modele_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}

// Fonction pour la modification de la marque
Modification_marque_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.marque= this. marque_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}
// Fonction pour la modification de la date d'installation
Modification_dateInstallation_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.dateInstallation= this. dateInstallation_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)

}

// Fonction pour la modification du prix
Modification_prix_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.prix= this. prix_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}

// Fonction pour la modification de la technologie
Modification_technologie_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.technologie= this.technologie_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}

// Fonction pour la modification du numéro de série
Modification_numSerie_projecteur(index: number, field: string, id: number) {
  console.log(`Modification du nom LAN de l'imprimante avec id ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_projecteur_id(id)
  console.log(id)
  this.modifeprojecteur.numSerie= this.numSerie_projecteur
  this.modife_projecteur_id( id, this.modifeprojecteur)
}

//-------------------------------------------Stabilisateur-----------------------------------------

nom_stabi: string="";
statut_stabi: string="";
model_stabi: string="";
marque_stabi: string="";
numSerie_stabi: string="";
dateAcquisition_stabi= new Date();
prix_stabi: string="";
puissance_stabi: string="";
tensionSortie_stabi: string="";
frequence_stabi: string="";
idEquipmt_stabi: string="";
idbureau_stabi: string="";
relieEquipmt_stabi: string="";
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
Modification_nom_stabilisateur(index: number, field: string, id: number) {
  console.log(`Nom modifié pour le stabilisateur ${id}`);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  console.log(id)
  this.modifeStabilisateur .nom= this.nom_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

// Fonction de modification pour la marque du stabilisateur
Modification_marque_stabilisateur(index: number, field: string, id: number) {
  console.log(`Marque modifiée pour le stabilisateur ${id} `);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  this.modifeStabilisateur .marque= this.marque_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

// Fonction de modification pour le modèle du stabilisateur
Modification_model_stabilisateur(index: number, field: string, id: number) {
  console.log(`Modèle modifié pour le stabilisateur ${id}: ${this.Stabilisateur_bureau[index].model}`);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  this.modifeStabilisateur . model= this.model_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

// Fonction de modification pour la puissance
Modification_puissance_stabilisateur(index: number, field: string, id: number) {
  console.log(`Puissance modifiée pour le stabilisateur ${id}: ${this.Stabilisateur_bureau[index].puissance}`);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  this.modifeStabilisateur .puissance= this.puissance_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

// Fonction de modification pour la date d'acquisition
Modification_dateAcquisition_stabilisateur(index: number, field: string, id: number) {
  console.log(`Date d'acquisition modifiée pour le stabilisateur ${id}: ${this.Stabilisateur_bureau[index].dateAcquisition}`);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  this.modifeStabilisateur .dateAcquisition= this.dateAcquisition_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

// Fonction de modification pour le numéro de série
Modification_numSerie_stabilisateur(index: number, field: string, id: number) {
  // Vérifie que le numéro de série n'est pas vide si nécessaire
  console.log(`Numéro de série modifié pour le stabilisateur ${id}: ${this.Stabilisateur_bureau[index].numSerie}`);
  this.isEditing[index][field] = false;
  this.recupe_stabilisateur_id(id)
  this.modifeStabilisateur .numSerie= this.numSerie_stabi
  this.modife_stabilisateur_id( id, this.modifeStabilisateur)
}

//-----------------------------------------routeur--------------------------------------------------
newWifirouteur: Parametrewifirouteur = {
  nom: '',
  id_routeur: '',
  ssid: '',
  frequence: '',
  canal: '',
  encryption: '',
  motdepasse: '',
  id_bureau: ''
};
modifWifirouteur: Parametrewifirouteur = {
  nom: '',
  id_routeur: '',
  ssid: '',
  frequence: '',
  canal: '',
  encryption: '',
  motdepasse: '',
  id_bureau: ''
};
nom_wifi_routeur: string = ''
id_routeur_wifi_routeur: string = ''
ssid_wifi_routeur: string = ''
frequence_wifi_routeur: string = ''
canal_wifi_routeur: string = ''
encryption_wifi_routeur: string = ''
motdepasse_wifi_routeur: string = ''
id_bureau_wifi_routeur: string = ''

 wifirouteur_idbreau:Parametrewifirouteur[]=[]
 all_wifirouteur :Parametrewifirouteur[]=[]
 nom_routeur_wifi:string=''





    //----------------------------interfacrouteur-------------------------
    All_interfacrouteur: Interfacerouteur [] = [];
    interfacrouteur_idrout:  Interfacerouteur[] = [];
    newInterfacerouteur: Interfacerouteur = {
      nom: '',
      idrouteur: '',
      nominterface: '',
      typeinterface: '',
      idbureau: '',
      ip: '',
      masque: '',
    };
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
  Modificationnom_routeur(id: number, valeur: string,  idrout: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_routeur_id(idrout)
  this.routeur_id.nom=this.nom_routeur
  this.modife_routeur_id(idrout, this.routeur_id)
 }


 /** Modifier la marque du routeur */

 Modificationmarque_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.marque = this.marque_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier le modèle du routeur */
 Modificationmodel_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.model = this.model_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier le numéro de série */
 ModificationnumSerie_routeur(id: number, valeur: string, idrout: number){
  this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.numSerie = this.numSerie_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier l'ID du bureau */
 ModificationidBureau_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.idBureau = String (this.idBureau_routeur)
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier la date d'installation */
 ModificationdateInstallation_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.dateInstallation = this.dateInstallation_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier le statut du routeur */
 Modificationstatut_routeur(id: number, valeur: string, idrout: number){
  this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.statut = this.statut_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier le type de connexion */
 ModificationtypeConnexion_routeur(id: number, valeur: string, idrout: number){
   this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.typeConnexion = this.typeConnexion_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier l'adresse IP */
 ModificationadresseIp_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.adresseIp = this.adresseIp_routeur;
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier l'adresse MAC */
 ModificationadresseMac_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.adresseMac = this.adresseMac_routeur.toLowerCase();
  this.modife_routeur_id(idrout, this.routeur_id);
 }


 /** Modifier l'ID du Stabisiteur */
 ModificationidStabisiteur_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.idStabisiteur = String(this.idStabisiteur_routeur)
  this.modife_routeur_id(idrout, this.routeur_id);
 }

 /** Modifier le prix */
 Modificationprix_routeur(id: number, valeur: string, idrout: number){
 this.isEditing_routeur[id][valeur] = false;
  this.recupere_routeur_id(idrout);
  this.routeur_id.prix = String(this.prix_routeur)
  this.modife_routeur_id(idrout, this.routeur_id);
 }

//-------------------------------interfacerouteur------------------------------------
  interfacerouteur_id: Interfacerouteur = {
    nom: '',
    idrouteur: '',
    nominterface: '',
    typeinterface: '',
    idbureau: '',
    ip: '',
    masque: ''
  };
  newinterfacerouteur_id: Interfacerouteur = {
    nom: '',
    idrouteur: '',
    nominterface: '',
    typeinterface: '',
    idbureau: '',
    ip: '',
    masque: ''
  };

  nom_interfrouteur: string = "";
  idrouteur_interface: string = "";
  nominterfaceroutuer: string = "";
  typeinterface_routeur: string = "";
  idbureau_interrouteur: string = "";
  ip_interfcerout: string = "";
  masqueinterfrout: string = "";
isEditing_interfacrouteur: { [id: number]: { [valeur: string]: boolean } } = {};
recupere_interfacerouteur_id(id: number) {
  this.interfacerouteur_id = this.All_interfacrouteur.find(u => u.id === id) || {
    nom: '',
    idrouteur: '',
    nominterface: '',
    typeinterface: '',
    idbureau: '',
    ip: '',
    masque: ''
  };
}

modifierCategorieinterfacrouteur(id: number, valeur: string): void {
  // Initialise l'objet pour l'id s'il n'existe pas déjà
  if (!this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id] = {};
  }

  // Définir la valeur à true pour la clé correspondante
  this.isEditing_interfacrouteur[id][valeur] = true;
}
Modificationtype_interfrout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_interfacerouteur_id(idinterfrt)
  this.interfacerouteur_id.typeinterface=this.typeinterface_routeur
  this.modife_interfacerouteur_id(idinterfrt, this.interfacerouteur_id)
 }
 Modificationip_interfrout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_interfacerouteur_id(idinterfrt)
  this.interfacerouteur_id.ip=this.ip_interfcerout
  this.modife_interfacerouteur_id(idinterfrt, this.interfacerouteur_id)
 }
 Modificationmasq_interfrout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_interfacerouteur_id(idinterfrt)
  this.interfacerouteur_id.masque=this.masqueinterfrout
  this.modife_interfacerouteur_id(idinterfrt, this.interfacerouteur_id)
 }
 Modificationnom_interfrout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_interfacerouteur_id(idinterfrt)
  this.interfacerouteur_id.nom=this.nom_interfrouteur
   this.modife_interfacerouteur_id(idinterfrt, this.interfacerouteur_id)
 }

 //-----------------------wif routeur----------------------------------------------
   recupere_wifi_routeur_id(id: number) {
    this.modifWifirouteur = this.all_wifirouteur.find(u => u.id === id) || {
      nom: '',
      id_routeur: '',
      ssid: '',
      frequence: '',
      canal: '',
      encryption: '',
      motdepasse: '',
      id_bureau: ''
    };
}
 Modificationssid_wifirout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;}
 this.recupere_wifi_routeur_id(idinterfrt)
 this.modifWifirouteur.ssid=this.ssid_wifi_routeur
 this.modife_wifi_routeur_id(idinterfrt, this.modifWifirouteur)

}

 Modificationfreqnc_wifirout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_wifi_routeur_id(idinterfrt)
 this.modifWifirouteur.frequence=this.frequence_wifi_routeur
 this.modife_wifi_routeur_id(idinterfrt, this.modifWifirouteur)
 }

 Modificationencry_wifirout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_wifi_routeur_id(idinterfrt)
  this.modifWifirouteur.encryption=this.encryption_wifi_routeur
  this.modife_wifi_routeur_id(idinterfrt, this.modifWifirouteur)
 }
 Modificationmdp_wifirout(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_wifi_routeur_id(idinterfrt)
  this.modifWifirouteur.motdepasse=this.motdepasse_wifi_routeur
  this.modife_wifi_routeur_id(idinterfrt, this.modifWifirouteur)
 }
 //----------------------------------------swicth----------------------------------------------------

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
Modificationnom_swicth(id: number, valeur: string,  idinterfrt: number  ): void{
  // Fermer l'édition pour cette valeur
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;}
 this. recupere_swtch_id(idinterfrt)
 this.newSwicth_id.nom=this.nom_swic
this.modife_swicth_id(idinterfrt, this.newSwicth_id)
}

// Fonction pour la marque du switch
modifierMarqueSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.marque = this.marque_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}

// Fonction pour le modèle du switch
modifierModeleSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.model = this.model_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}

// Fonction pour le numéro de série du switch
modifierNumSerieSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.numSerie = this.numSerie_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
modifierprixSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.prix = this.prix_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
modifierdateSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.dateInstallation = this.dateInstallation_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
modifierConfigurationSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.configurable = this.configurable_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}


// Fonction pour le nombre de port utilisé par le switch
modifiernmbreportwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.nombrePorts= this.nombrePorts_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}

// Fonction pour le type de port utilisé par le switch
modifiertypeportwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.typePorts= this.typePorts_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
// Fonction pour type swict du switch
modifiertypelayer(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.masqueSousReseauipv6= this.masqueSousReseauipv6_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}

// Fonction pour l'adresse MAC du switch
modifierAdresseMACSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.adresseMAC = this.adresseMAC_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}


// Fonction pour l'adresse IP de gestion
modifierAdresseIPv4Switch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.adresseIPv4Gestion = this.adresseIPv4Gestion_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
// Fonction pour masque IPv4 de gestion
modifiermasqIPv4Switch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.masqueSousReseaupv4 = this.masqueSousReseaupv4_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}

 // Fonction pour masque IPv4 de gestion
modifiePasserelSwitch(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_swtch_id(idinterfrt);
  this.newSwicth_id.passerelleParDefaut= this.passerelleParDefaut_swic;
  this.modife_swicth_id(idinterfrt, this.newSwicth_id);
}
//--------------------------------------vlan---------------------------------

nom_vln: string=''
numero_vlan: string=''
adresse_ip_vln: string=''
masque_sous_reseau_vln: string=''
modifienomvlan(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_vlan_id(idinterfrt)
  this.moidifie_vlan.nom=this.nom_vln
  this. modife_vlan_id(idinterfrt,  this.moidifie_vlan);
}
modifienumvlan(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_vlan_id(idinterfrt)
  this.moidifie_vlan.numero_vlan=this.numero_vlan
  this. modife_vlan_id(idinterfrt,  this.moidifie_vlan);
}
modifieipvlan(id: number, valeur: string, idinterfrt: number): void {
if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_vlan_id(idinterfrt)
  this.moidifie_vlan.adresse_ip=this.adresse_ip_vln
  this. modife_vlan_id(idinterfrt,  this.moidifie_vlan);
}
modifiemasqvlan(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_interfacrouteur[id]) {
    this.isEditing_interfacrouteur[id][valeur] = false;
  }
  this.recupere_vlan_id(idinterfrt)
  this.moidifie_vlan.masque_sous_reseau=this.masque_sous_reseau_vln
  this. modife_vlan_id(idinterfrt,  this.moidifie_vlan);
}

//---------------------------u--------point d accée---------------------------------
nom_pntacc:string= ''
marque_pntacc:string= ''
model_pntacc:string=''
prix_pntacc:string=''
ip_pntacc:string= ''
macc_pntacc:string= ''
idlieu_pntacc:string= ''
statut_pntacc:string=''
numSerie_pntacc:string=''

modifienompntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.nom=this.nom_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}
modifiemodelpntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.model =this.model_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}
modifiemarqupntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.marque =this.marque_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}


modifienumserpntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.numSerie =this.numSerie_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}


modifieprixpntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.prix =this.prix_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}


modifieipntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.ip =this.ip_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}


modifiemacntacc(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_pointdacc_id(idinterfrt)
  this.modifpointsAcces.macc =this.macc_pntacc
  this. modife_pointdacc_id(idinterfrt, this.modifpointsAcces);
}

//------------------------------------serveur-------------------------
isEditingg: { [key: number]: boolean } = {};

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
nom_bureau_servuer: string = " ";
recupere_serveur_mod_id(id: number) {
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
Modificationnom(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.nom = this.nom_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationMarque(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.marque = this.marque_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationDescription(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.description = this.description_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationDateInstallation(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.dateInstallation = this.dateInstallation;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationTypeHeberge(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.typeHeberge = this.typeHeberge_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationHebergeur(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.hebergeur = this.hebergeur_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationTypeServeur(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.typeServeur = this.typeServeur_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationSystemeExploitation(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.systemeExploitation = this.systemeExploitation_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationVersionOS(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.versionOS = this.versionOS_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationStatut(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.statut = this.statut_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationIdBureau(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.idBureau = this.idBureau_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationIdStabilisateur(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.idStabilisateur = this.idStabilisateur_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationIdAdminReseau(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.idAdminReseau = this.idAdminReseau_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationModeleCPU(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.modeleCPU = this.modeleCPU_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationFrequenceCPU(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.frequenceCPU = this.frequenceCPU_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationRAM(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.ram = this.ram_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationtypeRAM(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.typeram = this.typeram_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationStockage(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.stockage = this.stockage_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationTypeDisque(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.typeDisque = this.typeDisque_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationGPU(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.gpu = this.gpu_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationFrequenceGPU(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.frequenceGPU = this.frequenceGPU_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationMAC(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.mac = this.mac_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationIP(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.ip = this.ip_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationDNSPrimaire(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.dnsPrimaire = this.dnsPrimaire_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationDNSSecondaire(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.dnsSecondaire = this.dnsSecondaire_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationPasserelle(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.passerelle = this.passerelle_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationProtocole(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.protocole = this.protocole_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationNomUtilisateur(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.nomUtilisateur = this.nomUtilisateur_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationMotDePasse(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.motDePasse = this.motDePasse_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

ModificationPrix(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.prix = this.prix_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}

Modificationmode(id: number, valeur: string, idinterfrt: number): void {
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }
  this.recupere_serveurmodi_id(idinterfrt);
  this.modif_serveur.mode = this.mode_serveur;
  this.mise_jour_serveur(id, this.serveur_id);
}


modif_serveur: Serveur = {
   // Au lieu de `undefined`
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
recupere_serveurmodi_id(id: number) {
  this.modif_serveur= this.All_serveur.find(u => u.id === id)||
  {
    nom: "",
    marque: "",
    description: "",
    dateInstallation: new Date( ),
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
    typeram: ""};
  console.log(this.serveur)
  this.serveur_id= this.serveur[0]
}






















  active_affiche_equiment:boolean=false;
  active_insert_ordinateur:boolean=false;
  active_insert_moniteur:boolean=false;
  active_insert_serveur:boolean=false;
  active_insert_routeur:boolean=false;
  active_insert_imprimante:boolean=false;
  active_insert_swict:boolean=false;
  visualisation_equipemen:boolean=false;
  active_affiche_bureau:boolean=false;
  visualisation_routeur:boolean=false;
  visualisation_commutateur:boolean=false;
  visualisation_pointacce:boolean=false;
  visualisation_serveur:boolean=false;
  visualisation_ordi:boolean=false;
  cachebar:boolean=false;


  affiche_visual_commutateur(){
    this.resetOuvertures();
    this.backequipemnt_bureau()
    this.recupere_all_vlan()
    this.active_affiche_equiment=false;
    this.visualisation_commutateur=true
  }
  visualisation_pointacc:boolean=false
  affiche_visual_serveur(){
    this.resetOuvertures();
    this.backequipemnt_bureau()
    this.visualisation_serveur=true
  }
  affiche_visual_pointacc(){
    this.resetOuvertures();
    this.backequipemnt_bureau()
    this.visualisation_pointacc =true;

  }
  affiche_equiment_visualisation(){
    this.cachebar=true
    this.visualisation_ordi=false;
    this.ouverture_Poste=true;
  }
  visualise_equip(ordi: Ordinateur){
    this.backequipemnt_bureau()
    if (ordi.id !== undefined) {
      this.id_ordi_visual = ordi.id;
    }
     this.recupe_ordi_id();
     this.resetOuvertures();
     this.backequipemnt_bureau()
    this.visualisation_ordi=true;
    this.cachebar = false;
  }
  backequipemnt_bureau(){
    this. visualisation_routeur =false;
    this. visualisation_commutateur =false;
    this. visualisation_pointacce =false;
    this. visualisation_serveur =false;
    this. visualisation_ordi =false;

  }
   //-----------------------------vlan------------------------------
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

//-------------------------------------------------------------------------------------------
  liste_etage(){
    this.etages.push({ value: 0, label: 'Rez-de-chaussée' }); // Ajoute le rez-de-chaussée
    for (let i = 1; i <= 100; i++) {
      this.etages.push({ value: i, label: `${i}e étage` });
  }
  }
  constructor(private backend: BackendserviceService) {}

 ngOnInit() {
  this.cachebar = true;
   this.ouverture_Poste = true;
    this.recupe_all_imprimante()
    this.active_affiche_bureau=true;
    this.active_insert_ordinateur=true;
    this.active_affiche_equiment=false;
    this.active_ordinateur = true;
    this.fetchSystemInfo();
    this.fetchOsInfo();
    this.fetchAntivirusStatus();
    this.recupere_all_ordi()
    this.loadBureaux();
    this.recupe_user()
  }
  //-------------h---------------------------parc-----------------------------------
//----------------Affiche------------------
async affiche_equiment(bureauId: number) {
  this.id_bureau=bureauId;
  if (!this.bureaux) {
    console.error("La liste des bureaux n'est pas définie.");
    return;
  }

  const bureau = this.bureaux.find(b => b.id === bureauId);

  if (bureau) {
    console.log(`Afficher l'équipement du bureau : ${bureau.nom}`);
    this.nom_bureau_entete = bureau.nom;
    //recuper ordinateur par id bureau
     this.getOrdinateursParIdBureau (bureauId)
     this.recupe_monitor_id_bureau(bureauId)
     this.recupe_imprimante_bureau()
     this.recupere_all_stabilisateur()
     this.recupere_all_swicth()
     this.recupere_all_routeur()
     this.recupere_all_pointdacce()
     this.recupere_all_serveur()
     this.recupere_all_Projecteur()
  } else {
    console.error(`Aucun bureau trouvé avec l'ID : ${bureauId}`);
    this.nom_bureau_entete = "Bureau inconnu";
  }

  this.active_affiche_equiment = true;
  this.active_affiche_bureau = false;
  this.visualisation_equipemen = false;
}

back_burreau(){
  this.active_affiche_equiment=false;
  this.active_affiche_bureau=true;
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

 // Ajouter un nouveau bureau
 addBureau()  {
  this.backend.addBureau(this.newBureau).subscribe(
    (response) => {
      console.log(response.message);
      this.loadBureaux(); // Recharger la liste des bureaux après l'ajout
      this.newBureau = { id: 0, nom: '', etage: 1 }; // Réinitialiser le formulaire
    },
    (error) => {
      console.error('Erreur lors de l\'ajout du bureau', error);
    }
  );
}

// Supprimer un bureau par ID
deleteBureau(id: number)  {
  this.backend.deleteBureau(id).subscribe(
    () => {
      console.log('Bureau supprimé avec succès');
      this.loadBureaux(); // Recharger la liste des bureaux après la suppression
    },
    (error) => {
      console.error('Erreur lors de la suppression du bureau', error);
    }
  );
}
//-----------------------------------22222222222-----------------------------------
ouverture_Poste: boolean = false;
ouverture_Stabilisateur: boolean = false;
ouverture_routeur: boolean = false;
ouverture_commutateur: boolean = false;
ouverture_pointacce: boolean = false;
ouverture_Serveur: boolean = false;
ouverture_Projecteur: boolean = false;

ouvrir_Poste() {
  this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_Poste = true;
}
ouvrir_Projecteur(){
  this.resetOuvertures();
  this.ouverture_Projecteur = true;
}
ouvrir_Stabilisateur() {
  this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_Stabilisateur = true;
}

ouvrir_routeur() {
  this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_routeur = true;
}

ouvrir_commutateur() {
 this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_commutateur = true;
}

ouvrir_pointacce() {
  this. backequipemnt_bureau()
  this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_pointacce = true;
}

ouvrir_Serveur() {
  this. backequipemnt_bureau()
  this.resetOuvertures();
  this.ouverture_Serveur = true;
}

private resetOuvertures() {
  this.ouverture_Poste = false;
  this.ouverture_Stabilisateur = false;
  this.ouverture_routeur = false;
  this.ouverture_commutateur = false;
  this.ouverture_pointacce = false;
  this.ouverture_Serveur = false;
  this.ouverture_Projecteur= false;
  this.visualisation_routeur=false;
}
affiche_visual_routeur(){
  this.resetOuvertures();
  this.visualisation_routeur=true
  this.recupere_all_interfarouteur()
  this.recupere_all_wifi_routeur()
}
affiche_visual_comuutateur(){
  this.resetOuvertures();
  this.visualisation_commutateur=true
  this.recupere_all_vlan()
}
affiche_visual_pointdacce(){
  this.resetOuvertures();
  this.visualisation_pointacce=true
}
affiche_visual_serveurx(){
  this.resetOuvertures();
  this.visualisation_serveur=true
}
affiche_insert_ordinateur(){
  this.active_insert_ordinateur=true;
  this.active_insert_moniteur=false;
}
affiche_insert_moniteur(){
  this.active_insert_ordinateur=false;
  this.active_insert_moniteur=true;
}

//-----------------------------------ordinateur------------------------
//----recuperer all ordi----
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
//--recupere ordin
async getOrdinateursParIdBureau(idBureau: number)  {
  await this.backend.getOrdinateurByIdBureau(idBureau).subscribe(
    (data) => {
      //gere le retour objet ou tableau
      this.ordinateurs_id_bureau = Array.isArray(data) ? data : [data];
    },
    (error) => {
      console.error('Erreur lors recup ordi', error);
    }
  );
}
//------supprime------
supprime_ordi_id(id: number, event: MouseEvent) {

  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  //------------------------suprimme ordinateur par id---------------
  this.backend.deleteOrdinateur(id).subscribe({
    next: (response) => {
      console.log('Ordinateur supprimé avec succès:', response);
      // Rafraîchir la liste des ordinateurs après la suppression
      this.getOrdinateursParIdBureau(this.id_bureau);
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'ordinateur:', err);
    }
  });


  //------------------------Supprimer utilisateur par ID ordinateur---------------
  const idpc = ( this.id_ordi).toString();
  //------recupere user par idPc
  this.backend.getUtilisateurByIdPc(idpc). subscribe(
    (data) => {
     console.log(data)
     const id_user=data.id
     this.backend.supprimerUtilisateur(id_user). subscribe({
      next: (response) => {
        console.log('utilisateur supprimé avec succès:', response);
        // Rafraîchir la liste des ordinateurs après la suppression
        this.getOrdinateursParIdBureau(this.id_bureau);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l utilisateur:', err);
      }
    });
    },
    (error) => {
      console.error('Erreur lors recup ordi', error);
    }
  );
  //------prend son id
  //------------------suprime utilisateur-----------------------

}
//------------------------------------------user--------------------------------
// Récupère tous les utilisateurs
async recupe_user() {
  try {
   await this.backend.getTousLesUtilisateurs().subscribe({
      next: (data) => {
        this.user = data;
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
//--recupere user par id ord
recupere_nom_user(idOrdinateur: number): string {
  this.id_ordi=idOrdinateur
  if (idOrdinateur === -1) {
    return "ID invalide";
  }

  const ordiId = Number(idOrdinateur);
  if (isNaN(ordiId) || ordiId <= 0) {
    return "Inconnu"; // Gère les ID invalides
  }

  // Recherche de l'utilisateur associé à l'ID de l'ordinateur
  const filtre_user = this.user.find(u => u.idPc === ordiId.toString()); // Assurez-vous que idPc est une chaîne de caractères
  if (!filtre_user) {
    return "Inconnu";
  }



  // Retourne le nom complet de l'utilisateur
  return `${filtre_user.nom} ${filtre_user.prenom}`;
}
//-----------------------------------moniteur------------------------------------


async recupe_monitor_id_bureau(idBureau: number){
  const id= String(idBureau)
 await this.backend.getMoniteursByIdbureau(id).subscribe(
  (data) => {
    //gere le retour objet ou tableau
      this.moniteur = data  ;
  },
  (error) => {
    console.error('Erreur lors recup ordi', error);
  }
 )
}
async onSubmitMoniteur() {
  // Appeler le service pour ajouter un moniteur
  this. newmoniteur.statut="En cours d'utilisation"
  this.newmoniteur.idbureau= String(this.id_bureau)
  console.log(this. newmoniteur)
  await this.backend.addMoniteur(this. newmoniteur).subscribe({
    next: (newMoniteur) => {
      console.log('Moniteur ajouté avec succès :', newMoniteur);
      this.recupe_monitor_id_bureau(this.id_bureau)

    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du moniteur :', err);
      alert('Erreur lors de l\'ajout du moniteur.');
    },
  });
}
async supprime_monit_id(id: number, event: MouseEvent) {

  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  //------------------------suprimme ordinateur par id---------------
  await this.backend.deleteMoniteur(id).subscribe({
    next: (response) => {
      console.log('Ordinateur supprimé avec succès:', response);
      // Rafraîchir la liste des ordinateurs après la suppression
      this.recupe_monitor_id_bureau(this.id_bureau);
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'ordinateur:', err);
    }
  });
}

//-------------------------------------imprimante---------------------------------------

async recupe_all_imprimante(){
  await this.backend.getAllImprimantes() .subscribe(
    (data) => {
      this.All_imprimante = data;
      this.recupe_imprimante_bureau()

    },
    (error) => {
      console.error('Erreur lors du char ent des bureaux', error);
    }
  );

}
recupe_imprimante_bureau(){
  const id_br= String( this.id_bureau)

  // Recherche  nom l'ordinateur
  this.imprimante_bureau = this.All_imprimante.filter(u => u.idbureau === id_br);
 // Assurez-vous que idPc est une chaîne de caractères

}
modife_type_immpr( event:any){
  this.type_imprimante = event.target.value;
}
async onSubmitimprimante( ){
  this.newImprimante.nomLan=this.type_imprimante
   this.newImprimante.idbureau = String(this.id_bureau)
   this.newImprimante.statut = "En cours d'utilisation"
  console.log(   this.newImprimante)
  await this.backend.addImprimante (this.newImprimante).subscribe({
    next: (newImprimante) => {
      console.log('Moniteur ajouté avec succès :', newImprimante);
      this.recupe_all_imprimante()


    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du moniteur :', err);
      alert('Erreur lors de l\'ajout du moniteur.');
    },
  });
}
setEquipement(event: any) {
  const selectedValue = event.target.value;
  if (!selectedValue) {
    this.newImprimante.idEquipmt = '';
    this.newImprimante.relieEquipmt = '';
    return;
  }
  try {
    const equipement = JSON.parse(selectedValue);
    this.newImprimante.idEquipmt = equipement.id;
    this.newImprimante.relieEquipmt = equipement.nom;
  } catch (error) {
    console.error("Erreur de parsing JSON :", error);
  }


}
async supprime_imprimante_id(id: number, event: MouseEvent) {
  event.stopPropagation();
  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  await this.backend.deleteImprimante (id).subscribe({
    next: (response) => {
      console.log('imprimante supprimé avec succès:', response);
      // Rafraîchir la liste des imprimante après la suppression
      this.recupe_all_imprimante()
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'imprimante:', err);
    }
  });
}
//-----------------------------------------Stabilisateur--------------------------------------------
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
recupe_stabilisateur_bureau(){
  const id_br= String( this.id_bureau)
  console.log(id_br)

  // Recherche  nom l'ordinateur
  this.Stabilisateur_bureau = this.All_Stabilisateur.filter(u => u.idbureau === id_br);
 // Assurez-vous que idPc est une chaîne de caractères 

}
async addstabilisateur(){
  this.newStabilisateur.statut="actif"
  this.newStabilisateur.idbureau= String(this.id_bureau)
  await this.backend.addStabilisateur (this.newStabilisateur).subscribe({
    next: (newStabilisateur) => {
      console.log('newStabilisateur ajouté avec succès :',newStabilisateur);
      this.recupere_all_stabilisateur()

    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du newStabilisateur :', err);
      alert('Erreur lors de l\'ajout dunewStabilisateur.');
    },
  });
}
async supprime_stabilisateur_id(id: number, event: MouseEvent) {

  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  await this.backend. deleteStabilisateur (id).subscribe({
    next: (response) => {
      console.log(' Stabilisateur  supprimé avec succès:', response);
      // Rafraîchir la liste des ordinateurs après la suppression
      this.recupere_all_stabilisateur()
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'Stabilisateur :', err);
    }
  });
}
//------------------------------------------swicth-------------------------------------------------
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
  const id= String(this.id_bureau)
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
async addSwicth()  {
  this. newSwicth.statut="inactif"
  this.newSwicth.idBureau= String(this.id_bureau)
  await this.backend.addSwicth(this.newSwicth).subscribe({
    next: (newSwicth) => {
      console.log('switchs ajouté avec succès :', newSwicth);
      this.recupere_all_swicth()

    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du switch :', err);
      alert('Erreur lors de l\'ajout du switch.');
    },
  });
}
async supprime_switch_id(id: number, event: MouseEvent) {

  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  //------------------------suprimme ordinateur par id---------------
  await this.backend. deleteSwicth(id).subscribe({
    next: (response) => {
      console.log(' Swicth supprimé avec succès:', response);
      // Rafraîchir la liste des ordinateurs après la suppression
      this.recupere_all_swicth();
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'ordinateur:', err);
    }
  });
}
//-----------------------------------routeur------------------------------------
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

recupe_nom_routeur_id_interfac(id:  string): string {
  const id_rout= Number(id )
  if (id === "-1") {
    return "ID invalide";
  }
  // Recherche  nom l'ordinateur
  const interfrt =   this.routeur_bureau.find(u => u.id ===  id_rout ); // Assurez-vous que idPc est une chaîne de caractères
  if (! interfrt) {

    return "Inconnu";
  }
 this.nom_routeur_intefac=interfrt.nom

  // Retourne le nom complet de l'utilisateur
  return `${ this.nom_routeur_intefac} `;
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
 this.nom_routeur_intefac=interfrt.nom

  // Retourne le nom complet de l'utilisateur
  return `${ this.nom_routeur_intefac} `;
}
recupe_routeur_bureau(){
  const id_br= String( this.id_bureau)
  console.log(id_br)
  this.routeur_bureau = this.All_routeur.filter(u => u.idBureau === id_br);

}
async addrouteur(){
  this.newrouteur.statut="actif"
  this.newrouteur.idBureau= String(this.id_bureau)
  await this.backend.addRouteur (this.newrouteur).subscribe({
    next: (newrouteur) => {
      console.log('newrouteur ajouté avec succès :', newrouteur);
      this.recupere_all_routeur()
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout du routeur  :', err);
      alert('Erreur lors de l\'ajout du routeur .');
    },
  });
}
async supprime_routeur_id(id: number, event: MouseEvent) {

  // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
  event.stopPropagation();

  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  await this.backend. deleteRouteur(id).subscribe({
    next: (response) => {
      console.log(' routeur  supprimé avec succès:', response);
      // Rafraîchir la liste des ordinateurs après la suppression
      this.recupere_all_routeur()
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'routeur :', err);
    }
  });
}
//------------------------------------interface routeur----------------------------------------
  async recupere_all_interfarouteur(){
    await this.backend.getAllInterfacerouteurs() .subscribe(
      (data) => {
        this.All_interfacrouteur= data;
        this.recupere_interfarouteu ()

      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );

  }

  recupere_interfarouteu (){
    this.interfacrouteur_idrout=[]
    this.routeur_bureau.forEach(routeurItem => {
      // Vérifier si l'ID du switch est défini
     if (routeurItem .id !== undefined) {
          const rtr = this.All_interfacrouteur.filter(routeurs => routeurs.idrouteur === String (routeurItem .id));
          if (rtr.length > 0) {
            this.interfacrouteur_idrout.push(...rtr); // Ajouter les VLANs dans le tableau vlan
          }
     }
    });
  }
  async modife_interfacerouteur_id(id:number, interfaceroutuer :Interfacerouteur) {

    await this.backend.updateInterfacerouteur (id?? -1,interfaceroutuer ).subscribe({
      next: (response) => {
        console.log('interfaceroutuer  mise jour avec succès:', response);
        this.recupere_all_interfarouteur()
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du interfaceroutuer  :', err);
      }
    });

  }
  async addinterfarouteur(){
    this. newinterfacerouteur_id.idbureau=String(this.id_bureau)
    console.log(this. newinterfacerouteur_id)

    await this.backend.addInterfacerouteur (this. newinterfacerouteur_id).subscribe({
      next: (newinterfacerouteu) => {
        console.log('newinterfacerouteu ajouté avec succès :', newinterfacerouteu);
        this.recupere_all_interfarouteur()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newinterfacerouteu  :', err);
        alert('Erreur lors de l\'ajout du newinterfacerouteu .');
      },
    });
  }
  async supprime_interfacrouteur_id(id: number, event: MouseEvent) {

    // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
    event.stopPropagation();

    if (id === -1) {
      console.error('ID invalide pour la suppression');
      return;
    }
    await this.backend. deleteInterfacerouteur(id).subscribe({
      next: (response) => {
        console.log(' interfrouteur  supprimé avec succès:', response);
        // Rafraîchir la liste des ordinateurs après la suppression
        this.recupere_all_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'interfrouteur :', err);
      }
    });
  }
  //-------------------------------------wiifi-routuer--------------------------------------------
  async recupere_all_wifi_routeur(){
    await this.backend.getAllParametresWiFi() .subscribe(
      (data) => {
        this.all_wifirouteur= data;
        console.log(  this.all_wifirouteur)
      this.recupere_wifi_routeur_idbur()

      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );

  }

  recupere_wifi_routeur_idbur (){
    this.wifirouteur_idbreau=[]
    this.routeur_bureau.forEach(routeurItem => {
      // Vérifier si l'ID du switch est défini
     if (routeurItem .id !== undefined) {
          const wifirtr = this.all_wifirouteur.filter(wifrtr => wifrtr.id_routeur=== String (routeurItem .id));
          if (wifirtr.length > 0) {
            this.wifirouteur_idbreau.push(...wifirtr); // Ajouter les VLANs dans le tableau vlan
          }
     }
    });

  }
  async modife_wifi_routeur_id(id:number, wifiroutuerr :Parametrewifirouteur) {

    await this.backend.updateParametreWiFi(id?? -1,  wifiroutuerr).subscribe({
      next: (wifiroutuerr) => {
        console.log('wifiroutuer mise jour avec succès:',wifiroutuerr);
        this.recupere_all_wifi_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du interfaceroutuer  :', err);
      }
    });

  }
  async wifi_routeur(){
    this. newinterfacerouteur_id.idbureau=String(this.id_bureau)
    console.log(this. newinterfacerouteur_id)

    await this.backend.addInterfacerouteur (this. newinterfacerouteur_id).subscribe({
      next: (newinterfacerouteu) => {
        console.log('newinterfacerouteu ajouté avec succès :', newinterfacerouteu);
        this.recupere_all_interfarouteur()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newinterfacerouteu  :', err);
        alert('Erreur lors de l\'ajout du newinterfacerouteu .');
      },
    });
  }
  async addwifirouteur(){
    this. newWifirouteur.id_bureau=String(this.id_bureau)
    await this.backend. ajouterParametreWiFi (this.newWifirouteur).subscribe({
      next: (newinterfacerouteu) => {
        console.log('newWifirouteuru ajouté avec succès :', newinterfacerouteu);
        this.recupere_all_wifi_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newinterfacerouteu  :', err);
        alert('Erreur lors de l\'ajout du newinterfacerouteu .');
      },
    });
  } 
  async supprime_wifi_routeur(id: number, event: MouseEvent) {

    // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
    event.stopPropagation(); 
    if (id === -1) {
      console.error('ID invalide pour la suppression');
      return;
    }
    await this.backend. deleteParametreWiFi(id).subscribe({
      next: (response) => {
        console.log(' wifi  supprimé avec succès:', response);
        // Rafraîchir la liste des ordinateurs après la suppression
        this.recupere_all_wifi_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'wifi :', err);
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
  //------------------------------------------vlan---------------------------------
  async recupere_all_vlan(){
    await this.backend.getAllVlans() .subscribe(
      (data) => {
       this. Allvlan = data;
        console.log(this. Allvlan)
       this. recupere_vlan_idswicth()

      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );

  }

  recupere_vlan_id(id: number) {
    this.moidifie_vlan= this.Allvlan.find(u => u.id === id) || {
      id_commutateur: '',
      nom:  '',
      numero_vlan: '',
      adresse_ip:  '',
      masque_sous_reseau:  '',
      idbureau:  '',
    };
}
recupere_vlan_idswicth(): void {
  this.vlan=[]
  this.switches.forEach(switchItem => {
    // Vérifier si l'ID du switch est défini
   if (switchItem.id !== undefined) {
        const vln = this.Allvlan.filter(vlan => vlan.id_commutateur === String (switchItem.id));
        if (vln.length > 0) {
          this.vlan.push(...vln); // Ajouter les VLANs dans le tableau vlan
        }
   }
  });

  console.log(this.vlan);
}

async modife_vlan_id(id:number, vln: Vlan) {

    await this.backend.updateVlan (id?? -1, vln).subscribe({
      next: (wifiroutuerr) => {
        console.log('vln mise jour avec succès:',wifiroutuerr);
        this.recupere_all_wifi_routeur()
      },
      error: (err) => {
        console.error('Erreur lors de mise a jour du vln:', err);
      }
    });

  }


  async vlanswitch(){
    this. newinterfacerouteur_id.idbureau=String(this.id_bureau)
    console.log(this. newinterfacerouteur_id)

    await this.backend.addInterfacerouteur (this. newinterfacerouteur_id).subscribe({
      next: (newinterfacerouteu) => {
        console.log('newinterfacerouteu ajouté avec succès :', newinterfacerouteu);
        this.recupere_all_interfarouteur()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newinterfacerouteu  :', err);
        alert('Erreur lors de l\'ajout du newinterfacerouteu .');
      },
    });
  }
  async addvlan(){
    this.newvlan.idbureau =String(this.id_bureau)
    await this.backend.addVlan (this.newvlan).subscribe({
      next: (newinterfacerouteu) => {
        console.log('nnewvlan ajouté avec succès :', newinterfacerouteu);
        this.recupere_all_vlan()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newvlan :', err);
        alert('Erreur lors de l\'ajout du newvlan .');
      },
    });
  }
  async supprime_vlan(id: number, event: MouseEvent) {

    // Empêcher la propagation de l'événement pour éviter de déclencher visualise_equip()
    event.stopPropagation();

    if (id === -1) {
      console.error('ID invalide pour la suppression');
      return;
    }
    await this.backend. deleteVlan(id).subscribe({
      next: (response) => {
        console.log(' vlan  supprimé avec succès:', response);
        // Rafraîchir la liste des ordinateurs après la suppression
        this.recupere_all_vlan()
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\' vlan :', err);
      }
    });
  }

//-------------------------------------point d acce---------------------------------------------

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
  const id_br=   String( this.id_bureau)
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
async supprime_pointdacce_id(id: number, event: MouseEvent) {
  event.stopPropagation();
  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  await this.backend. deletePointAcces(id).subscribe({
    next: (response) => {
      console.log(' pointdacce  supprimé avec succès:', response);
      this.recupere_all_pointdacce()
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'pointdacce :', err);
    }
  });
}
//--------------------------------------serveur-----------------------------------

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
  const id_br=   String( this.id_bureau)
  console.log(id_br)
  this.serveur_bureau = this.All_serveur.filter(u => u.idBureau === id_br);
  console.log(  this.serveur_bureau )
 this .recupere_all_serviceserveur()
}
async addserveur(){
  this.newserveur.statut="actif"
  this.newserveur.idBureau= String(this.id_bureau)
  console.log(this.newpointsAcces)
  await this.backend.addServeur ( this.newserveur).subscribe({
    next: (newserveur) => {
      console.log('newserveur ajouté avec succès :',newserveur);
      this.recupere_all_serveur()
    },
    error: (err) => {
      console.error('Erreur lors de l\'ajout dunewserveur :', err);
      alert('Erreur lors de l\'ajout dunewserveur.');
    },
  });
}
async supprime_serveur_id(id: number, event: MouseEvent) {
  event.stopPropagation();
  if (id === -1) {
    console.error('ID invalide pour la suppression');
    return;
  }
  await this.backend.deleteServeur(id).subscribe({
    next: (response) => {
      console.log(' pointdacce  supprimé avec succès:', response);
      this.recupere_all_serveur()
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de l\'pointdacce :', err);
    }
  });
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


   All_serviceserveur:Serviceserveur[] = [];
      service_idserveur:Serviceserveur[] = [];
      Service_Idserv:Serviceserveur[] = [];
      newserviceserveur: Serviceserveur = {
        nom: '',
        id_serveur: '',
        version: '',
        chemin: '',
        service: ''
      };
  //-----------------------------------service-------------------------------------
  async recupere_all_serviceserveur(){
    await this.backend.getAllServiceserveurs () .subscribe(
      (data) => {
        this.All_serviceserveur= data;
        console.log(  this.All_serviceserveur)
        this.recupe__service_serveur_id_serve()
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
  recupe__service_serveur_id_serve( ){
    this. Service_Idserv=[]
    this.serveur_bureau.forEach(serveurItem => {
      if (serveurItem.id !== undefined) {
        const constvlnswtc=  this. All_serviceserveur.filter(wifrtr => wifrtr.id_serveur === String(serveurItem.id));
        if (constvlnswtc.length > 0) {
          this. Service_Idserv.push(...constvlnswtc);
        }
      }
    });
    console.log(this. All_serviceserveur)
    console.log(this.serveur_bureau)
    console.log(this.Service_Idserv)
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
//-------------474---------------------Projecteur-------------------------------------
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
    const id_br=   String( this.id_bureau)
    this.Projecteur_bureau = this. All_Projecteur.filter(u => u.idbureau === id_br);
    console.log(    this.Projecteur_bureau  )
  }
  async addprojecteur(){
    this.newsProjecteur.idbureau= String(this.id_bureau)
    console.log(this.newsProjecteur)
    await this.backend.addProjecteur (this.newsProjecteur).subscribe({
      next: (newpointsAcces) => {
        console.log('newsProjecteur ajouté avec succès :',newpointsAcces);
        this.recupere_all_Projecteur()
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du newsProjecteur  :', err);
        alert('Erreur lors de l\'ajout du newsProjecteur.');
      },
    });
  }
async supprime_projecteur_id(id: number, event: MouseEvent) {
    event.stopPropagation();
    if (id === -1) {
      console.error('ID invalide pour la suppression');
      return;
    }
    await this.backend.deleteProjecteur(id).subscribe({
      next: (response) => {
        console.log(' deleteProjecteur  supprimé avec succès:', response);
        this.recupere_all_Projecteur()
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'deleteProjecteur :', err);
      }
    });
  }
   /*


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
   async addpointdacce(){
     this.newWifirouteur.id_bureau= String(this.id_bureau)
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
  */
//------------------------------------3-------------------------------------------
recupe_ordi_id(){
  console.log(this.id_ordi_visual)
  this.backend.getOrdinateurById(this.id_ordi_visual).subscribe(
    (data) => {
      this.ordinateur_visual = data;
      console.log("eterer", this.ordinateur_visual.cpu);

      this.systemInfo = this.ordinateur_visual.ordinateur;
      this.osInfo = this.ordinateur_visual.os;
      this.antivirusStatus = this.ordinateur_visual.virus;
      this.ramInfo = this.ordinateur_visual.ram;
      this.cpuInfo = this.ordinateur_visual.cpu;
      this.disks = this.ordinateur_visual.disks;
      this.gpuInfo = this.ordinateur_visual.gpu;
      this.displayMonitors = this.ordinateur_visual.moniteur;
      this.peripheriques = this.ordinateur_visual.peripheriques;
      this.networkDetails = this.ordinateur_visual.interfacereseau;
      this.softwareInfo = this.ordinateur_visual.logiciel;

      const filtre_user = this.user.find(u => u.idPc === String(this.id_ordi_visual));
      if (!filtre_user) {
        this.nom_utilisateur_ordi = "Inconnu";
        this.Prenom_utilisateur_ordi = "";
      } else {
        this.nom_utilisateur_ordi = filtre_user.nom;
        this.Prenom_utilisateur_ordi = filtre_user.prenom;
      }

      this.nom_ordi = this.ordinateur_visual.nom;
    },
    (error) => {
      console.error('Erreur lors de la récupération de l’ordinateur', error);
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

  //---------------------------------------------------------------
  telecharge_pdf() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Crée un PDF en orientation portrait, format A4

    // Fonction pour convertir la taille en Go
    const formatSizeInGB = (sizeInBytes: number) => {
        return sizeInBytes ? (sizeInBytes / (1024 ** 3)).toFixed(2) + ' Go' : 'N/A';
    };

    // Date du document
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    pdf.setFontSize(18);
    pdf.text('Rapport de l\'ordinateur', 10, 15);

    pdf.setFontSize(12);
    pdf.text(`Date : ${formattedDate}`, 10, 25);
    pdf.text(`Ordinateur : ${this.nom_ordi || 'Nom inconnu'}`, 10, 35);
    pdf.text(`Utilisateur : ${this.nom_utilisateur_ordi || 'Nom'} ${this.Prenom_utilisateur_ordi || 'Prénom'}`, 10, 45);

    let yPosition = 55; // Position verticale initiale après le titre

    // Fonction pour ajouter un tableau au PDF
    const addTable = (title: string, data: any[], columns: string[], columnLabels: string[], yPos: number, formatSize: boolean = false) => {
        if (!data || data.length === 0) return yPos; // Évite les erreurs si les données sont vides

        pdf.setFontSize(14);
        pdf.text(title, 10, yPos);
        yPos += 10;

        const rows = data.map((item) =>
            columns.map((col) => {
                if (formatSize && col === 'size') {
                    return formatSizeInGB(item[col]); // Convertir uniquement les tailles
                }
                return item[col] || 'N/A';
            })
        );

        (pdf as any).autoTable({
            startY: yPos,
            head: [columnLabels],
            body: rows,
            theme: 'grid',
            styles: { fontSize: 10 },
        });

        return (pdf as any).lastAutoTable.finalY + 10; // Retourne la position Y après le tableau
    };

    // Ajout des tableaux en vérifiant l'existence des données
    if (this.systemInfo) {
        yPosition = addTable(
            'Informations Système',
            [this.systemInfo],
            ['manufacturer', 'model', 'version', 'serial'],
            ['Fabricant', 'Modèle', 'Version', 'Numéro de série'],
            yPosition
        );
    }

    if (this.osInfo) {
        yPosition = addTable(
            'Informations Système d\'Exploitation',
            [this.osInfo],
            ['platform', 'arch', 'serial', 'version'],
            ['Plateforme', 'Architecture', 'Numéro de série', 'Version'],
            yPosition
        );
    }

    if (this.antivirusStatus) {
        yPosition = addTable(
            'Statut Antivirus',
            this.antivirusStatus,
            ['Name', 'AntivirusEnabled', 'AntivirusSignatureLastUpdated', 'AntivirusSignatureVersion'],
            ['Nom', 'Activé', 'Dernière mise à jour', 'Version'],
            yPosition
        );
    }

    if (this.ramInfo) {
        yPosition = addTable(
            'Informations RAM',
            this.ramInfo,
            ['manufacturer', 'type', 'size', 'clockSpeed', 'serialNum'],
            ['Fabricant', 'Type', 'Taille', 'Fréquence', 'Numéro de série'],
            yPosition,
            true // Active la conversion en Go
        );
    }

    if (this.cpuInfo) {
        yPosition = addTable(
            'Informations CPU',
            [this.cpuInfo],
            ['brand', 'manufacturer', 'cores', 'speed'],
            ['Marque', 'Fabricant', 'Cœurs', 'Vitesse'],
            yPosition
        );
    }

    if (this.disks) {
        yPosition = addTable(
            'Informations Disques',
            this.disks,
            ['name', 'type', 'size', 'serialNum', 'interfaceType', 'smartStatus'],
            ['Nom', 'Type', 'Taille', 'Numéro de série', 'Interface', 'État SMART'],
            yPosition,
            true // Active la conversion en Go
        );
    }

    if (this.gpuInfo) {
        yPosition = addTable(
            'Informations GPU',
            this.gpuInfo,
            ['model', 'vendor', 'vram'],
            ['Modèle', 'Fabricant', 'VRAM'],
            yPosition
        );
    }

    if (this.softwareInfo) {
        yPosition = addTable(
            'Logiciels Installés',
            this.softwareInfo,
            ['name', 'installDate', 'update_auto'],
            ['Nom', 'Date d\'installation', 'Mise à jour automatique'],
            yPosition
        );
    }

    // Génération du PDF
    pdf.save('rapport_parc_informatique.pdf');
}

//-------------------------------telecharge pdf global------------------------------
async  telecharge_pdf_global() {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(18);
      pdf.text('Rapport sur les équipements réseau', 10, 20);
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];
      const generatedBy = `Généré par l'administrateur du parc Inforùatique`;

      pdf.setFontSize(12);
      pdf.text(`Date : ${formattedDate}`, 10, 28);
      pdf.text(generatedBy, 10, 34);
      let yPosition = 40;

      // Fonction pour ajouter un tableau
      const addTable = (title: string, data: any[], columns: string[], columnLabels: string[], yPosition: number) => {
        pdf.setFontSize(14);
        pdf.text(title, 10, yPosition);
        yPosition += 10;

        const rows = data.map((item) => columns.map((col) => item[col]));

        (pdf as any).autoTable({
          startY: yPosition,
          head: [columnLabels],
          body: rows,
          theme: 'grid',
          styles: { fontSize: 10 },
        });

        return (pdf as any).lastAutoTable.finalY + 10;
      };

      // -----------------------alll-WiFi routeur----------------------------
      this.all_wifirouteur = await lastValueFrom(this.backend.getAllParametresWiFi());

      // -----------------------alll-WiFi routeur----------------------------
      this.All_interfacrouteur = await lastValueFrom(this.backend.getAllInterfacerouteurs());

      // -----------------------alll-commutateur----------------------------
      this. Allswitches = await lastValueFrom(this.backend.getAllSwitches());

      // -----------------------alll-VLAN commutateur----------------------------
      this. Allvlan  = await lastValueFrom(this.backend.getAllVlans());

      // ----------------------- Point accée----------------------------
      this.All_pointsAcces = await lastValueFrom(this.backend.getAllPointsAcces());


      for (let i = 0; i < this.bureaux.length; i++) {
        // Vérifier si on a besoin d'une nouvelle page avant d'afficher le titre
        if (yPosition > pdf.internal.pageSize.height - 30) {
          pdf.addPage();
          yPosition = 20; // Réinitialisation en haut de la nouvelle page
        }
                  let idbureaus = this.bureaux[i].id;
            const titrebureau = `Bureau: ${this.bureaux[i].nom || 'Nom bureau'}`;

              //------------------------Filtrer les ordinateur du bureau-----------------------
           const ordi_bureau_pdf = this.all_ordinateurs
              .filter(u => u.idBureau === idbureaus)
              .map(ordi => {
                const filtre_user = this.user.find(u => u.idPc === String(ordi.id));
                return {
                  nom: ordi.nom, // Nom de l'ordinateur
                  model: ordi.ordinateur?.['model'] ??'Non spécifié', // Vérifie si `ordinateur` existe avant d’accéder à `model`
                  prix: ordi.prix ?? 'Inconnu', // Valeur par défaut si prix est absent
                  dateAcquisition: ordi.dateAcquisition ?? 'Non renseignée', // Valeur par défaut
                  nomuser: filtre_user ? `${filtre_user.nom} ${filtre_user.prenom}` : 'Non attribué', // Utilisateur
                  statut: ordi.statut ?? 'Inconnu' // Valeur par défaut si statut est absent
                };
              });

              //-------------------------------------Stabilisateur-------------------------------------
              const stabilisateur_bureau_pdf = this.All_Stabilisateur .filter(u => u.idbureau === String(idbureaus))
              //------------------------------------projecteur-----------------------------------------
              const projecte_bureau_pdf = this.All_Projecteur.filter(u => u.idbureau === String(idbureaus))



            //------------------------Filtrer les routeurs du bureau-----------------------
            const routeur_bureau_pdf = this.All_routeur.filter(u => u.idBureau === String(idbureaus));

            //------------------------Filtrer les WiFi routeurs--------------------------
            const wifirouteur_idbreau_pdf: Parametrewifirouteur[] = [];
            routeur_bureau_pdf.forEach(routeurItem => {
              if (routeurItem.id !== undefined) {
                const wifirtr = this.all_wifirouteur.filter(wifrtr => wifrtr.id_routeur === String(routeurItem.id));
                if (wifirtr.length > 0) {
                  wifirouteur_idbreau_pdf.push(...wifirtr);
                }
              }
            });
            //-------------------------Filtrer les interface routeurs--------------------------
            const interfcrouteur_idbreau_pdf: Interfacerouteur [] = [];
            routeur_bureau_pdf.forEach(routeurItem => {
              if (routeurItem.id !== undefined) {
                const ineterfcrtr =  this.All_interfacrouteur.filter(wifrtr => wifrtr.idrouteur === String(routeurItem.id));
                if ( ineterfcrtr.length > 0) {
                  interfcrouteur_idbreau_pdf.push(...ineterfcrtr);
                }
              }
            });
            //------------------------Filtrer les Swicth du bureau-----------------------
            const swicth_bureau_pdf = this.Allswitches .filter(u => u.idBureau === String(idbureaus));

            //------------------------Filtrer les VLAN du switch-----------------------
            const VLAN_switch_pdf: Vlan [] = [];
            swicth_bureau_pdf.forEach(routeurItem => {
              if (routeurItem.id !== undefined) {
                const constvlnswtc=  this. Allvlan.filter(wifrtr => wifrtr.id_commutateur === String(routeurItem.id));
                if (constvlnswtc.length > 0) {
                  VLAN_switch_pdf.push(...constvlnswtc);
                }
              }
            });
              //------------------------Filtrer les point accée du bureau-----------------------
              const pointacc_bureau_pdf =   this.All_pointsAcces.filter(u => u.idlieu === String(idbureaus));

               yPosition += 15;
               pdf.setFont("helvetica", "bold");
              pdf.text(titrebureau, pdf.internal.pageSize.width / 2, yPosition, { align: 'center' });
              yPosition += 15;
            //*---------------------ordinateur------------------------ */
            if (ordi_bureau_pdf.length > 0) {
              yPosition = addTable(
                'Ordinateurs',
                ordi_bureau_pdf,
                ['nom', 'model', 'prix', 'dateAcquisition', 'nomuser', 'statut'],
                ['Nom', 'Modèle', 'Prix (Ar)', 'Date d\'Acquisition', 'Utilisateur', 'Statut'],
                yPosition
              );
            }

            //------------------------------------stabilisateur-------------------------------
            if (  stabilisateur_bureau_pdf.length > 0) {
              yPosition = addTable(
                'Stabilisateurs',
                stabilisateur_bureau_pdf,
                ['nom', 'marque','model', 'prix','puissance', 'dateAcquisition', 'numSerie', 'statut'],
                ['Nom', 'Marque', 'Modèle','Prix (Ar)','Puissance', 'Date d\'Acquisition', 'N° serie', 'Statut'],
                yPosition
              );
            }

            //------------------------------------Projecteur-------------------------------
            if ( projecte_bureau_pdf .length > 0) {
              yPosition = addTable(
                'Projecteurs',
                projecte_bureau_pdf,
                ['nom', 'marque','model', 'prix','resolution', 'technologie','dateInstallation', 'numSerie', 'statut'],
                ['Nom', 'Marque', 'Modèle','Prix (Ar)','Résolution','Technologie', 'Date d\'Acquisition', 'N° serie', 'Statut'],
                yPosition
              );
            }

            //-----------------------------------------routeur---------------------------------

            if (routeur_bureau_pdf.length > 0) {
              yPosition = addTable(
                'Routeurs',
                routeur_bureau_pdf,
                ['nom', 'marque', 'model', 'numSerie', 'prix', 'dateInstallation', 'statut'],
                ['Nom', 'Marque', 'Modèle', 'Numéro de série', 'Prix (Ar)', 'Date d\'Acquisition', 'Statut'],
                yPosition
              );
            }

           //----------------------tabl wifirouteur-------------------------
            if (wifirouteur_idbreau_pdf.length > 0 && routeur_bureau_pdf.length > 0) {
              for (let j = 0; j <  wifirouteur_idbreau_pdf.length ; j++) {
                const routeurTrouve = routeur_bureau_pdf.find(u => u.id === Number(wifirouteur_idbreau_pdf[j].id_routeur));
                if (routeurTrouve) {
                  wifirouteur_idbreau_pdf[j].id_routeur = routeurTrouve.nom;
                } else {
                  console.warn(`Aucun routeur trouvé pour id_routeur: ${wifirouteur_idbreau_pdf[j].id_routeur}`);
                }
              }
              yPosition = addTable(
                'Point d\'accès des routeurs',
                wifirouteur_idbreau_pdf,
                ['id_routeur','ssid','frequence','encryption','motdepasse'],
                ['Routeur','ssid','fréquence','encryption','mot de passe'],
                yPosition
              );
            }


            //----------------------table interface routeur-------------------------
            if (interfcrouteur_idbreau_pdf.length > 0 && routeur_bureau_pdf.length > 0) {
              for (let j = 0; j <  interfcrouteur_idbreau_pdf.length ; j++) {
                const routeurTrouve2 = routeur_bureau_pdf.find(u => u.id === Number(interfcrouteur_idbreau_pdf[j].idrouteur));
                if (routeurTrouve2) {
                  interfcrouteur_idbreau_pdf[j].idrouteur = routeurTrouve2.nom;
                } else {
                  console.warn(`Aucun routeur trouvé pour id_routeur: ${interfcrouteur_idbreau_pdf[j].idrouteur}`);
                }
              }
              yPosition = addTable(
                'Interface des routeurs',
                interfcrouteur_idbreau_pdf,
                ['idrouteur','nominterface','typeinterface','ip','masque'],
                ['Routeur','Nom interface','Type interface','adresse Ip','Masque'],
                yPosition
              );
            }


            //-----------------------------------swicth-------------------------------
            if (swicth_bureau_pdf.length > 0) {
              yPosition = addTable(
                'Commutateurs',
                swicth_bureau_pdf,
                ['nom', 'marque', 'model', 'numSerie', 'prix', 'configurable','dateInstallation', 'statut'],
                ['Nom', 'Marque', 'Modèle', 'Numéro de série','Prix (Ar)', 'configurable', 'Date d\'Acquisition', 'Statut'],
                yPosition
              );
              yPosition = addTable(
                'Informations réseau  des commutateurs',
                swicth_bureau_pdf,
                ['nom', 'typePorts', 'nombrePorts', 'masqueSousReseauipv6', 'adresseIPv4Gestion', 'adresseMAC' ],
                ['Nom', 'Type port', 'Nombre port', 'type de switch','Adresse Ip', 'Adresse Mac', 'Masque',],
                yPosition
              );
            }

            //---------------------------------VLAN--swicth-------------------------------
            if (VLAN_switch_pdf.length > 0 && swicth_bureau_pdf.length > 0) {
              for (let j = 0; j <  VLAN_switch_pdf.length ; j++) {
                const routeurTrouve3 = swicth_bureau_pdf.find(u => u.id === Number(VLAN_switch_pdf[j].id_commutateur));
                if (routeurTrouve3) {
                  VLAN_switch_pdf[j].id_commutateur = routeurTrouve3.nom;
                } else {
                  console.warn(`Aucun routeur trouvé pour id_routeur: ${VLAN_switch_pdf[j].id_commutateur}`);
                }
              }
              yPosition = addTable(
                'Vlan( Virtual Local Area Network ) des Switch',
                VLAN_switch_pdf,
                ['id_commutateur','nom','numero_vlan','adresse_ip','masque_sous_reseau'],
                ['Nom du Swicht','Nom vlan','Numéro VLAN','adresse Ip','Masque'],
                yPosition
              );
            }

            //----------------------------------point accee----------------------------------
            if (pointacc_bureau_pdf .length > 0) {
              yPosition = addTable(
                'Points d\'Accès',
                pointacc_bureau_pdf,
                ['nom', 'marque', 'model', 'numSerie', 'prix','ip','macc', 'dateInstallation', 'statut'],
                ['Nom', 'Marque', 'Modèle', 'Numéro de série', 'Prix (Ar)','Adresse ip','Adresse Mac', 'Date d\'Acquisition', 'Statut'],
                yPosition
              );
            }

              // Vérifier si une nouvelle page est nécessaire avant le prochain bureau
            if (yPosition > pdf.internal.pageSize.height - 30) {
              pdf.addPage();
              yPosition = 20;
              }

          }
          yPosition += 15;
          pdf.setFont("helvetica", "bold");
         pdf.text("Serveurs", pdf.internal.pageSize.width / 2, yPosition, { align: 'center' });
         yPosition += 15;
          for (let i = 0; i < this.All_serveur.length; i++) {
            let serveur = this.All_serveur[i];

            // Tableau des informations système
            yPosition = addTable(
              `Serveurs ${i + 1}`,
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
