import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { lastValueFrom } from 'rxjs';
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
export interface Vlan {
  id?: number;
  id_commutateur: string;
  nom: string;
  numero_vlan: string;
  adresse_ip: string;
  masque_sous_reseau: string;
  idbureau: string;

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


@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.scss'
})
export class EquipementComponent {

isEditing_routeur: { [id: number]: { [valeur: string]: boolean } } = {};

modifierCategorie(id: number, valeur: string): void {
  // Initialise l'objet pour l'id s'il n'existe pas déjà
  if (!this.isEditing_routeur[id]) {
    this.isEditing_routeur[id] = {};
  }

  // Définir la valeur à true pour la clé correspondante
  this.isEditing_routeur[id][valeur] = true;
}

validerModification(id: number, valeur: string): void {
  // Modifier la valeur de isEditing pour l'id et la valeur spécifiée
  if (this.isEditing_routeur[id]) {
    this.isEditing_routeur[id][valeur] = false;
  }

}


  afficherValeurModifiee(id: number): void {

  }

  // -----------------gfh----------------------modif--routeur--------------------------------------------------
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
isEditing_interfacrouteur: { [id: number]: { [valeur: string]: boolean } } = {};

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
    id_user:Number=0
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
    nom_switch:string=''
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
    //----------------------------routeur-------------------------
    All_routeur: Routeur [] = [];
    routeur_bureau:  Routeur [] = [];
    routeur_bureau_pdf:  Routeur [] = [];
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
    //--------------------routeur----------------------------
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
  //----------------------------interface routeur---------------------
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

 //-----------------------------wifi routeur--------------------------
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
    //
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
  ouverturerouteur = false;
  ouverturecommut = false;
  ouverturepointacc = false;
  ouvrir_routeur() {
    this.ouverturerouteur =true;
    this.ouverturecommut = false; // Cache le commutateur quand le routeur est ouvert
    this.ouverturepointacc = false; // Cache le point d'accès
  }

  // Méthode pour afficher le contenu du commutateur
  ouvrir_commutateur() {
    this.ouverturecommut =   true;
    this.ouverturerouteur = false; // Cache le routeur quand le commutateur est ouvert
    this.ouverturepointacc = false; // Cache le point d'accès
  }

  // Méthode pour afficher le contenu du point d'accès
  ouvrir_pointacce() {
    this.ouverturepointacc = true;
    this.ouverturerouteur = false; // Cache le routeur quand le point d'accès est ouvert
    this.ouverturecommut = false; // Cache le commutateur
  }
    liste_etage(){
      this.etages.push({ value: 0, label: 'Rez-de-chaussée' }); // Ajoute le rez-de-chaussée
      for (let i = 1; i <= 100; i++) {
        this.etages.push({ value: i, label: `${i}e étage` });
    }
    }
    constructor(  private backend: BackendserviceService) {}

   ngOnInit() {

      this.recupe_all_imprimante()
      this.active_affiche_bureau=true;
      this.active_insert_ordinateur=true;
      this.active_affiche_equiment=false;
      this.active_ordinateur = true;
      this.recupere_all_routeur()
      this.loadBureaux();
      this.recupe_user()
      this.ouvrir_routeur()
      const urlSegments = window.location.pathname.split('/');
      const idString = urlSegments[urlSegments.length - 1]; // Dernier élément de l'URL
      this.id_user = isNaN(Number(idString)) ? -1 : Number(idString);

      console.log('ID Utilisateur:', this.id_user);



    }

    //----------------------------------------parc-----------------------------------
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
      //recuper yuyuordinateur par id bureau
       this.getOrdinateursParIdBureau (bureauId)
       this.recupe_monitor_id_bureau(bureauId)
       this.recupe_imprimante_bureau()
       this.recupere_all_stabilisateur()
       this.recupere_all_swicth( )
       this.recupere_all_routeur()
       this.recupere_all_pointdacce()
       this.recupere_all_serveur()
       this.recupere_all_wifi_routeur()
       this.recupere_all_pointdacce()
       this.recupere_all_ordi()

    } else {
      console.error(`Aucun bureau trouvé avec l'ID : ${bureauId}`);
      this.nom_bureau_entete = "Bureau inconnu";
    }

    this.active_affiche_equiment = true;
    this.active_affiche_bureau = false;
    this.visualisation_equipemen = false;
  }
  affiche_equiment_visualisation(){
    this.active_affiche_equiment=true;
    this.active_affiche_bureau=false;
    this.visualisation_equipemen=false ;
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
  affiche_insert_ordinateur(){
    this.active_insert_ordinateur=true;
    this.active_insert_moniteur=false;
  }
  affiche_insert_moniteur(){
    this.active_insert_ordinateur=false;
    this.active_insert_moniteur=true;
  }
  visualise_equip(ordi: Ordinateur){
    if (ordi.id !== undefined) {
      this.id_ordi_visual = ordi.id;
      this.active_affiche_equiment = false;
      this.visualisation_equipemen = true;
    }
     this.recupe_ordi_id();
    this.active_affiche_equiment=false;
    this.visualisation_equipemen=true;
  }
  //-----------------------------------ordinateur------------------------
  //----recuperer all ordi----
  async recupere_all_ordi(){
    await this.backend.getAllOrdinateurs (  ).subscribe(
      (data) => {
        // Vérifier si la réponse est un objet ou un tableau et assigner correctement
        this.all_ordinateurs =  data;
        console.log(this.all_ordinateurs )


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
  async onSubmitimprimante( ){
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
  recupe_nom_swit_id_switc(id: Number ): string {
    const id_rout= Number(id )
    if (id === -1) {
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
  async recupe_switch_id_bureau( ){
    const id= String(this.id_bureau)
    this.switches=   this.Allswitches.filter(u => u.idBureau===  id);
    this.recupere_all_vlan()

  }
  recupere_swtch_id(id: number) {
    this.newSwicth_id= this.Allswitches.find(u => u.id === id) || {
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
recupe_nom_swtch_id_number (id: number): string {
  const id_rout= Number(id )
  if (id === -1) {
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
  async addSwicth()  {
    this. newSwicth.statut="inactif"
    this.newSwicth.idBureau= String(this.id_bureau)
    await this.backend.addSwicth(this.newSwicth).subscribe({
      next: (newSwicth) => {
        console.log('switchs ajouté avec succès :', newSwicth);
        this.recupe_switch_id_bureau( )

      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du switch :', err);
        alert('Erreur lors de l\'ajout du switch.');
      },
    });
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
        this.recupe_switch_id_bureau( );
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
    console.log( this.routeur_bureau )
    this.recupere_all_interfarouteur()

  }
  recupe_routeur_bureau_pdf(){
    const id_br= String( this.id_bureau)
    console.log(id_br)
    this.routeur_bureau = this.All_routeur.filter(u => u.idBureau === id_br);
    console.log( this.routeur_bureau )
    this.recupere_all_interfarouteur()

  }
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
   async  telecharge_pdf() {
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Titre du document
      pdf.setFontSize(18);
      pdf.text('Rapport sur les équipements réseau', 10, 20);
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];
      const generatedBy = `Généré par l'administrateur réseau: ${this.nom || 'Nom'} ${this.prenom || 'Prénom'}`;

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
            let idbureaus = this.bureaux[i].id;
            const titrebureau = `Bureau: ${this.bureaux[i].nom || 'Nom bureau'}`;

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



            yPosition += 6;
            pdf.text(titrebureau, 14, yPosition);
            yPosition += 6;

            //-----------------------------------------routeur---------------------------------

            if (routeur_bureau_pdf.length > 0) {
              yPosition = addTable(
                'Informations Générales des Routeurs',
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
                'Informations Générales des commutateurs',
                swicth_bureau_pdf,
                ['nom', 'marque', 'model', 'numSerie', 'prix', 'configurable','dateInstallation', 'statut'],
                ['Nom', 'Marque', 'Modèle', 'Numéro de série','Prix (Ar)', 'configurable', 'Date d\'Acquisition', 'Statut'],
                yPosition
              );
              yPosition = addTable(
                'Informations réseau  des commutateurs',
                swicth_bureau_pdf,
                ['nom', 'typePorts', 'nombrePorts', 'masqueSousReseauipv6', 'adresseIPv4Gestion', 'adresseMAC','passerelleParDefaut'],
                ['Nom', 'Type port', 'Nombre port', 'type de switch','Adresse Ip', 'Adresse Mac', 'Masque', 'Passerelle'],
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
                'Informations Générales des Points d\'Accès',
                pointacc_bureau_pdf,
                ['nom', 'marque', 'model', 'numSerie', 'prix','ip','macc', 'dateInstallation', 'statut'],
                ['Nom', 'Marque', 'Modèle', 'Numéro de série', 'Prix (Ar)','Adresse ip','Adresse Mac', 'Date d\'Acquisition', 'Statut'],
                yPosition
              );
            }
          }





          // Télécharger le PDF
          pdf.save('rapport_parc_informatique.pdf');

    }




}
