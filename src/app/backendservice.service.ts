import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare global {
  interface Window {
    electron: any; // Déclaration du type pour accéder à Electron
  }
}
export interface Bureau {
  id: number;
  nom: string;
  etage: number;
}
export interface Ordinateur {
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

export interface Ticket {
  id?: number;
  titre: string;
  priorite: string;
  categorie: string;
  description: string;
  statut: string;
  dateOuverture: string;
  dateFermeture?: string;
  datePrise?: string;
  demandeur: string;
  technicien: string;
  typeEquipement: string;
  idEquipement: number;
  panne: string;
  id_bureau: number;
  id_demandeur: number;
  id_technicien: number;
}
export interface MiseAJourLogiciel {
  id?: number;
  id_bureau: number;
  id_pc: number;
  installDate: string;
  installLocation: string;
  name: string;
  update_auto: boolean;
  version: string;
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
export interface Serviceserveur {
  id?: number; // Optionnel car il peut être généré par le backend
  nom: string;
  id_serveur: string;
  version: string;
  chemin: string;
  service: string;
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
export interface PriseAntivirus{
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
@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  async verifieelectron(): Promise<boolean> {
    try {
      const verife = await (window as any).api.verifieelectron();
      return verife || false;
    } catch (error) {
      console.error("Erreur lors de la vérification Electron :", error);
      return false;
    }
  }
constructor(private http: HttpClient) { }
//----------------------------------------electron-----------------------------------
async getSystemInfo(): Promise<any> {
  const systmeinfo = await (window as any).api.getSystemInfo();

  return systmeinfo;
}
getOsInfo(): Promise<any> {
  return (window as any).api.getOsInfo();
}
getNetworkStats(): Promise<any> {
  return (window as any).api.getNetworkStats();
}

async getRamInfo(): Promise<any[]> {
  return (window as any).api.getRamInfo();
}

async getCpuInfo(): Promise<any[]> {
  return (window as any).api.getCpuInfo();
}

async getDiskInfo(): Promise<any[]> {
  return  (window as any).api.getDiskInfo();
}
  // Récupérer les informations sur la carte graphique
  async getGpuInfo(): Promise<any[]> {
    return (window as any).api.getGpuInfo();
  }
  // Récupérer les informations sur la carte graphique
   getMonitorInfo(): Promise<any[]> {
      return (window as any).api. getMonitorInfo();
    }
  // Récupérer les informations audio
  async getAudioInfo(): Promise<any> {
    return (window as any).api.getAudioInfo();
  }
  // Récupérer les informations sur les imprimantes
  async getPrinterInfo(): Promise<any[]> {
    return (window as any).api.getPrinterInfo();
  }
 // Méthode pour récupérer les statut antivirus
 async getAntivirusStatus(): Promise<any[]> {
  try {
    const status = await (window as any).api.getAntivirusStatus();

    return status;
  } catch (error) {
    console.error("Erreur lors de la récupération du statut antivirus:", error);
    return [];
  }
}
 // Méthode pour ouvrir un dialogue de fichier et récupérer le nom du fichier
 async openFileDialog(directoryPath: string): Promise<string | null> {
  try {
    // Appeler la méthode de l'API Electron pour ouvrir un fichier
    const fileName = await (window as any).api.openFileDialog(directoryPath);

    return fileName;  // Retourner le nom du fichier sélectionné
  } catch (error) {
    console.error("Erreur lors de l'ouverture du dialogue de fichier :", error);
    return null;  // Retourner null en cas d'erreur
  }
}
 // Méthode pour récupérer peripheriqueusb
 async getperipheriqueusb(): Promise<any> {
  try {
    const peripheriqueUSB = await (window as any).api.getperipheriqueusb();
    return peripheriqueUSB;
  } catch (error) {
    console.error("Erreur lors de la récupération des périphériques USB:", error);
    return [];
  }
}
//Méthode pour récupérer interface reseau
async  getinterfaceNetwork(): Promise<any[]> {
  try {
    const NetworkInfo = await (window as any).api. getinterfaceNetwork();

    return NetworkInfo;
  } catch (error) {
    console.error("Erreur lors de la récupération NetworkInfo:", error);
    return [];
  }
}
 // Méthode pour récupérer les logiciels installés
async getInstalledSoftware(): Promise<any[]> {
 try {
   const softwareList = await (window as any).api.getInstalledSoftware();

   return softwareList;
 } catch (error) {
   return [];
 }
}
  // Méthode pour ouvrir un dialogue de fichier et récupérer le nom du fichier
async verifie_mise_jour(directoryPath: string): Promise<boolean | null> {
    try {
      // Appeler la méthode de l'API Electron pour ouvrir un fichier
      const etat = await (window as any).api.verifie_mise_jour(directoryPath);

      return etat;  // Retourner le nom du fichier sélectionné
    } catch (error) {
      console.error("Erreur lors :", error);
      return null;  // Retourner null en cas d'erreur
    }
  }
//----------------------------api---------------------------------------------
 // Définir l'URL de l'API et l'entité "bureaux"
//private apiUrl = 'http://localhost:8080/';
private apiUrl =  'https://databasecti.onrender.com/'
 private entite_priseantivirus = 'api/priseantivirus';
private entite_prisemisejour ="prisemiseajourlogiciels"
private entite_projecteur = 'projecteurs';
private endpoint: string = 'parametreswifi';
private entiteInterfacerouteur = 'interfacerouteur';
private entite_service_serveur = 'serviceserveurs';
private entite_serveur = 'serveurs';
private entite_point_acces = 'pointdacce';
private entite_swicth = 'switches';
private entite_vlan = 'vlans';
private entite_routeur = 'routeurs';
private entite_stabilisateur = 'stabilisateurs';
private entite_bureau = 'bureaux';
private entite_ordinateur = 'ordinateurs';
private entite_utilisateur = 'utilisateurs';
private entite_moniteur = 'moniteurs';
private entite_imprimante= 'imprimantes';
private entite_ticket = 'tickets';
private entite_mise_a_jour = 'mises-a-jour';

// Récupérer tous les bureaux
getAllBureaux(): Observable<Bureau[]> {
  return this.http.get<Bureau[]>(`${this.apiUrl}${this.entite_bureau}`);
}

// Récupérer un bureau par ID
getBureauById(id: number): Observable<Bureau> {
  return this.http.get<Bureau>(`${this.apiUrl}${this.entite_bureau}/${id}`);
}

// Récupérer un bureau par nom
getBureauByNom(nom: string): Observable<Bureau> {
  return this.http.get<Bureau>(`${this.apiUrl}${this.entite_bureau}/nom/${nom}`);
}

// Récupérer les bureaux par étage (retourne une liste de bureaux)
getBureauByEtage(etage: number): Observable<Bureau[]> {
  return this.http.get<Bureau[]>(`${this.apiUrl}${this.entite_bureau}/etage/${etage}`);
}

// Ajouter un nouveau bureau
addBureau(bureau: Bureau): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.apiUrl}${this.entite_bureau}`, bureau);
}

// Mettre à jour un bureau existant
updateBureau(id: number, bureau: Bureau): Observable<{ message: string }> {
  return this.http.put<{ message: string }>(`${this.apiUrl}${this.entite_bureau}/${id}`, bureau);
}

// Supprimer un bureau par ID
deleteBureau(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_bureau}/${id}`);
}
//------------------------------Ordinateur--------------------------------------
// Récupérer tous les ordinateurs
getAllOrdinateurs(): Observable<Ordinateur[]> {
  return this.http.get<Ordinateur[]>(`${this.apiUrl}${this.entite_ordinateur}/all`);
}

// Récupérer un ordinateur par ID
getOrdinateurById(id: number): Observable<Ordinateur> {
  return this.http.get<Ordinateur>(`${this.apiUrl}${this.entite_ordinateur}/${id}`);
}
// Récupérer un ordinateur par ID bureau
getOrdinateurByIdBureau(id: number): Observable<Ordinateur> {
  return this.http.get<Ordinateur>(`${this.apiUrl}${this.entite_ordinateur}/bureau/${id}`);

}

// Ajouter un nouvel ordinateur
addOrdinateur(ordinateur: Ordinateur): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.apiUrl}${this.entite_ordinateur}`, ordinateur);
}

// Mettre à jour un ordinateur existant
updateOrdinateur(id: number, ordinateur: Ordinateur): Observable<{ message: string }> {
  return this.http.put<{ message: string }>(`${this.apiUrl}${this.entite_ordinateur}/${id}`, ordinateur);
}

// Supprimer un ordinateur par ID
deleteOrdinateur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_ordinateur}/${id}`);
}
//---------------------------utilisateur----------------------------------------
// Ajouter un utilisateur
ajouterUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
  return this.http.post<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}`, utilisateur);
}

// Récupérer tous les utilisateurs
getTousLesUtilisateurs(): Observable<Utilisateur[]> {
  return this.http.get<Utilisateur[]>(`${this.apiUrl}${this.entite_utilisateur}/all`);
}

// Récupérer un utilisateur par ID
getUtilisateurParId(id: number): Observable<Utilisateur> {
  return this.http.get<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}/${id}`);
}
// Supprimer un utilisateur par idPc
deleteUtilisateurParIdPc(idPc: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_utilisateur}/byIdPc/${idPc}`);
}
// Récupérer un utilisateur par email
getUtilisateurParEmail(email: string): Observable<Utilisateur> {
  return this.http.get<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}/email/${email}`);
}

// Récupérer les utilisateurs par profession
getUtilisateursParProfession(profession: string): Observable<Utilisateur[]> {
  return this.http.get<Utilisateur[]>(`${this.apiUrl}${this.entite_utilisateur}/profession/${profession}`);
}
 // Méthode pour récupérer un utilisateur par idPc
 getUtilisateurByIdPc(idPc: string): Observable<any> {
  return this.http.get<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}/byIdPc/${(idPc)}`);
}

// Récupérer les utilisateurs par statut de validation
getUtilisateursParValide(valide: string): Observable<Utilisateur[]> {
  return this.http.get<Utilisateur[]>(`${this.apiUrl}${this.entite_utilisateur}/valide/${valide}`);
}

// Récupérer un utilisateur par matricule
getUtilisateurByMatricule(nMatricule: string): Observable<Utilisateur> {
  return this.http.get<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}/matricule/${nMatricule}`);
}

// Supprimer un utilisateur
supprimerUtilisateur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_utilisateur}/${id}`);
}

// Mettre à jour un utilisateur
mettreAJourUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
  return this.http.put<Utilisateur>(`${this.apiUrl}${this.entite_utilisateur}/${id}`, utilisateur);
}
//---------------------------Moniteur-----------------------------------------------------
// Récupérer tous les moniteurs
getAllMoniteurs(): Observable<Moniteur[]> {
  return this.http.get<Moniteur[]>(`${this.apiUrl}${this.entite_moniteur}`);
}

// Récupérer un moniteur par son ID
getMoniteurById(id: number): Observable<Moniteur> {
  return this.http.get<Moniteur>(`${this.apiUrl}${this.entite_moniteur}/${id}`);
}

// Récupérer les moniteurs par idPc
getMoniteursByIdPc(idPc: string): Observable<Moniteur[]> {
  return this.http.get<Moniteur[]>(`${this.apiUrl}${this.entite_moniteur}/byPc/${idPc}`);
}

// Récupérer les moniteurs par idbureau
getMoniteursByIdbureau(idbureau: string): Observable<Moniteur[]> {
  return this.http.get<Moniteur[]>(`${this.apiUrl}${this.entite_moniteur}/byBureau/${idbureau}`);
}

// Ajouter un nouveau moniteur
addMoniteur(moniteur: Moniteur): Observable<Moniteur> {
  return this.http.post<Moniteur>(`${this.apiUrl}${this.entite_moniteur}`, moniteur);
}

// Mettre à jour un moniteur par son ID
updateMoniteur(id: number, moniteur: Moniteur): Observable<Moniteur> {
  return this.http.put<Moniteur>(`${this.apiUrl}${this.entite_moniteur}/${id}`, moniteur);
}

// Supprimer un moniteur par son ID
deleteMoniteur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_moniteur}/${id}`);
}
 //---------------------------------------prise mise a jour---------------------------------------------------
  ajouterPrisemiseajourlogiciel(logiciel: Prisemiseajourlogiciel): Observable<Prisemiseajourlogiciel> {
    return this.http.post<Prisemiseajourlogiciel>(`${this.apiUrl}${this.entite_prisemisejour}`, logiciel);
  }

  /**
   * Récupère tous les enregistrements de mise à jour logicielle.
   * @returns Un Observable d'une liste d'enregistrements.
   */
  getAllPrisemiseajourlogiciels(): Observable<Prisemiseajourlogiciel[]> {
    return this.http.get<Prisemiseajourlogiciel[]>(`${this.apiUrl}${this.entite_prisemisejour}`);
  }

  /**
   * Récupère un enregistrement de mise à jour logicielle par son ID.
   * @param id L'ID de l'enregistrement à récupérer.
   * @returns Un Observable de l'enregistrement correspondant à l'ID.
   */
  getPrisemiseajourlogicielById(id: number): Observable<Prisemiseajourlogiciel> {
    return this.http.get<Prisemiseajourlogiciel>(`${this.apiUrl}${this.entite_prisemisejour}/${id}`);
  }

  /**
   * Met à jour un enregistrement de mise à jour logicielle existant.
   * @param id L'ID de l'enregistrement à mettre à jour.
   * @param logicielDetails Les nouvelles informations du logiciel.
   * @returns Un Observable de l'enregistrement mis à jour.
   */
  updatePrisemiseajourlogiciel(id: number, logicielDetails: Prisemiseajourlogiciel): Observable<Prisemiseajourlogiciel> {
    return this.http.put<Prisemiseajourlogiciel>(`${this.apiUrl}${this.entite_prisemisejour}/${id}`, logicielDetails);
  }

  /**
   * Supprime un enregistrement de mise à jour logicielle par son ID.
   * @param id L'ID de l'enregistrement à supprimer.
   * @returns Un Observable vide.
   */
  deletePrisemiseajourlogiciel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_prisemisejour}/${id}`);
  }

  /**
   * Récupère les enregistrements de mise à jour logicielle par nom.
   * @param name Le nom du logiciel à rechercher.
   * @returns Un Observable d'une liste d'enregistrements correspondant au nom.
   */
  findByName(name: string): Observable<Prisemiseajourlogiciel[]> {
    return this.http.get<Prisemiseajourlogiciel[]>(`${this.apiUrl}${this.entite_prisemisejour}/name/${name}`);
  }

  /**
   * Récupère les enregistrements de mise à jour logicielle par statut.
   * @param statut Le statut à rechercher.
   * @returns Un Observable d'une liste d'enregistrements correspondant au statut.
   */
  findByStatut(statut: string): Observable<Prisemiseajourlogiciel[]> {
    return this.http.get<Prisemiseajourlogiciel[]>(`${this.apiUrl}${this.entite_prisemisejour}/statut/${statut}`);
  }

  /**
   * Récupère les enregistrements de mise à jour logicielle par ID du PC.
   * @param idpc L'ID du PC à rechercher.
   * @returns Un Observable d'une liste d'enregistrements correspondant à l'ID du PC.
   */
  findByIdpc(idpc: string): Observable<Prisemiseajourlogiciel[]> {
    return this.http.get<Prisemiseajourlogiciel[]>(`${this.apiUrl}${this.entite_prisemisejour}/idpc/${idpc}`);
  }
//---------------------------------------prise mise antivirus-----------------------------------------

  // Récupérer toutes les prises d'antivirus
  getAllPrises(): Observable<PriseAntivirus[]> {
    return this.http.get<PriseAntivirus[]>(`${this.apiUrl}${this.entite_priseantivirus}`);
  }

  // Récupérer une prise d'antivirus par son ID
  getPriseById(id: number): Observable<PriseAntivirus> {
    return this.http.get<PriseAntivirus>(`${this.apiUrl}${this.entite_priseantivirus}/${id}`);
  }

  // Ajouter une nouvelle prise d'antivirus
  addPrise(prise: PriseAntivirus): Observable<PriseAntivirus> {
    return this.http.post<PriseAntivirus>(`${this.apiUrl}${this.entite_priseantivirus}`, prise);
  }

  // Mettre à jour une prise d'antivirus par son ID
  updatePrise(id: number, prise: PriseAntivirus): Observable<PriseAntivirus> {
    return this.http.put<PriseAntivirus>(`${this.apiUrl}${this.entite_priseantivirus}/${id}`, prise);
  }

  // Supprimer une prise d'antivirus par son ID
  deletePrise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_priseantivirus}/${id}`);
  }
//--------------------------------------imprimante------------------------------------------
// Récupérer toutes les imprimantes
getAllImprimantes(): Observable<Imprimante[]> {
  return this.http.get<Imprimante[]>(`${this.apiUrl}${this.entite_imprimante}`);
}

// Récupérer une imprimante par son ID
getImprimanteById(id: number): Observable<Imprimante> {
  return this.http.get<Imprimante>(`${this.apiUrl}${this.entite_imprimante}/${id}`);
}

// Récupérer les imprimantes par idPc
getImprimantesByIdPc(idPc: string): Observable<Imprimante[]> {
  return this.http.get<Imprimante[]>(`${this.apiUrl}${this.entite_imprimante}/byPc/${idPc}`);
}

// Récupérer les imprimantes par idbureau
getImprimantesByIdbureau(idbureau: string): Observable<Imprimante[]> {
  return this.http.get<Imprimante[]>(`${this.apiUrl}${this.entite_imprimante}/byBureau/${idbureau}`);
}

// Ajouter une nouvelle imprimante
addImprimante(imprimante: Imprimante): Observable<Imprimante> {
  return this.http.post<Imprimante>(`${this.apiUrl}${this.entite_imprimante}`, imprimante);
}

// Mettre à jour une imprimante par son ID
updateImprimante(id: number, imprimante: Imprimante): Observable<Imprimante> {
  return this.http.put<Imprimante>(`${this.apiUrl}${this.entite_imprimante}/${id}`, imprimante);
}

// Supprimer une imprimante par son ID
deleteImprimante(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_imprimante}/${id}`);
}
//-------------------------------------Stabilisateur---------------------------------------
// Récupérer tous les stabilisateurs
getAllStabilisateurs(): Observable<Stabilisateur[]> {
  return this.http.get<Stabilisateur[]>(`${this.apiUrl}${this.entite_stabilisateur}`);
}

// Récupérer un stabilisateur par son ID
getStabilisateurById(id: number): Observable<Stabilisateur> {
  return this.http.get<Stabilisateur>(`${this.apiUrl}${this.entite_stabilisateur}/${id}`);
}

// Ajouter un nouveau stabilisateur
addStabilisateur(stabilisateur: Stabilisateur): Observable<Stabilisateur> {
  return this.http.post<Stabilisateur>(`${this.apiUrl}${this.entite_stabilisateur}`, stabilisateur);
}

// Mettre à jour un stabilisateur par son ID
updateStabilisateur(id: number, stabilisateur: Stabilisateur): Observable<Stabilisateur> {
  return this.http.put<Stabilisateur>(`${this.apiUrl}${this.entite_stabilisateur}/${id}`, stabilisateur);
}

// Supprimer un stabilisateur par son ID
deleteStabilisateur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_stabilisateur}/${id}`);
}
//--------------------------------------routeur-------------------------------------------
// Récupérer tous les routeurs
getAllRouteurs(): Observable<Routeur[]> {
  return this.http.get<Routeur[]>(`${this.apiUrl}${this.entite_routeur}`);
}

// Récupérer un routeur par son ID
getRouteurById(id: number): Observable<Routeur> {
  return this.http.get<Routeur>(`${this.apiUrl}${this.entite_routeur}/${id}`);
}

// Ajouter un nouveau routeur
addRouteur(routeur: Routeur): Observable<Routeur> {
  return this.http.post<Routeur>(`${this.apiUrl}${this.entite_routeur}`, routeur);
}

// Mettre à jour un routeur par son ID
updateRouteur(id: number, routeur: Routeur): Observable<Routeur> {
  return this.http.put<Routeur>(`${this.apiUrl}${this.entite_routeur}/${id}`, routeur);
}

// Supprimer un routeur par son ID
deleteRouteur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entite_routeur}/${id}`);
}
//-------------------------------------intefaca routeur-------------------------------------
// Récupérer tous les Interfacerouteurs
getAllInterfacerouteurs(): Observable<Interfacerouteur[]> {
  return this.http.get<Interfacerouteur[]>(`${this.apiUrl}${this.entiteInterfacerouteur}`);
}

// Récupérer un Interfacerouteur par son ID
getInterfacerouteurById(id: number): Observable<Interfacerouteur> {
  return this.http.get<Interfacerouteur>(`${this.apiUrl}${this.entiteInterfacerouteur}/${id}`);
}

// Ajouter un nouveau Interfacerouteur
addInterfacerouteur(interfacerouteur: Interfacerouteur): Observable<Interfacerouteur> {
  return this.http.post<Interfacerouteur>(`${this.apiUrl}${this.entiteInterfacerouteur}`, interfacerouteur);
}

// Mettre à jour un Interfacerouteur par son ID
updateInterfacerouteur(id: number, interfacerouteur: Interfacerouteur): Observable<Interfacerouteur> {
  return this.http.put<Interfacerouteur>(`${this.apiUrl}${this.entiteInterfacerouteur}/${id}`, interfacerouteur);
}

// Supprimer un Interfacerouteur par son ID
deleteInterfacerouteur(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${this.entiteInterfacerouteur}/${id}`);
}
//---------------------------------------routuer-wifi-----------------------------------------// Construire l'URL complète pour les requêtes HTTP
  private getApiUrl(): string {
    return `${this.apiUrl}${this.endpoint}`;
  }

  // Ajouter un paramètre Wi-Fi
  ajouterParametreWiFi(parametrewifirouteur: Parametrewifirouteur): Observable<Parametrewifirouteur> {
    return this.http.post<Parametrewifirouteur>(this.getApiUrl(), parametrewifirouteur);
  }

  // Récupérer tous les paramètres Wi-Fi
  getAllParametresWiFi(): Observable<Parametrewifirouteur[]> {
    return this.http.get<Parametrewifirouteur[]>(this.getApiUrl());
  }

  // Récupérer un paramètre Wi-Fi par ID
  getParametreWiFiById(id: number): Observable<Parametrewifirouteur> {
    return this.http.get<Parametrewifirouteur>(`${this.getApiUrl()}/${id}`);
  }

  // Mettre à jour un paramètre Wi-Fi
  updateParametreWiFi(id: number, parametrewifirouteurDetails: Parametrewifirouteur): Observable<Parametrewifirouteur> {
    return this.http.put<Parametrewifirouteur>(`${this.getApiUrl()}/${id}`, parametrewifirouteurDetails);
  }

  // Supprimer un paramètre Wi-Fi
  deleteParametreWiFi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getApiUrl()}/${id}`);
  }
//--------------------------------------swicth----------------------------------------------

  // Récupérer tous les switches
  getAllSwitches(): Observable<Swicth[]> {
    return this.http.get<Swicth[]>(`${this.apiUrl}${this.entite_swicth}`);
  }

  // Récupérer un switch par son ID
  getSwicthById(id: number): Observable<Swicth> {
    return this.http.get<Swicth>(`${this.apiUrl}${this.entite_swicth}/${id}`);
  }

  // Récupérer les switches par bureau
  getSwitchesByBureau(idBureau: string): Observable<Swicth[]> {
    return this.http.get<Swicth[]>(`${this.apiUrl}${this.entite_swicth}/bureau/${idBureau}`);
  }

  // Récupérer les switches par VLAN
  getSwitchesByVlan(dansLvlan: string): Observable<Swicth[]> {
    return this.http.get<Swicth[]>(`${this.apiUrl}${this.entite_swicth}/vlan/${dansLvlan}`);
  }

  // Récupérer les switches par bureau et VLAN
  getSwitchesByBureauAndVlan(idBureau: string, dansLvlan: string): Observable<Swicth[]> {
    return this.http.get<Swicth[]>(
      `${this.apiUrl}${this.entite_swicth}/bureau/${idBureau}/vlan/${dansLvlan}`
    );
  }

  // Ajouter un nouveau switch
  addSwicth(swicth: Swicth): Observable<Swicth> {
    return this.http.post<Swicth>(`${this.apiUrl}${this.entite_swicth}`, swicth);
  }

  // Mettre à jour un switch par son ID
  updateSwicth(id: number, swicth: Swicth): Observable<Swicth> {
    return this.http.put<Swicth>(`${this.apiUrl}${this.entite_swicth}/${id}`, swicth);
  }

  // Supprimer un switch par son ID
  deleteSwicth(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_swicth}/${id}`);

  }
  //--------------------------------------vlan------------------------------------------------
  // Récupérer tous les VLANs
  getAllVlans(): Observable<Vlan[]> {
    return this.http.get<Vlan[]>(`${this.apiUrl}${this.entite_vlan}`);
  }

  // Récupérer un VLAN par son ID
  getVlanById(id: number): Observable<Vlan> {
    return this.http.get<Vlan>(`${this.apiUrl}${this.entite_vlan}/${id}`);
  }

  // Récupérer les VLANs par commutateur (switch)
  getVlansBySwitch(idSwitch: string): Observable<Vlan[]> {
    return this.http.get<Vlan[]>(`${this.apiUrl}${this.entite_vlan}/switch/${idSwitch}`);
  }

  // Ajouter un nouveau VLAN
  addVlan(vlan: Vlan): Observable<Vlan> {
    return this.http.post<Vlan>(`${this.apiUrl}${this.entite_vlan}`, vlan);
  }

  // Mettre à jour un VLAN par son ID
  updateVlan(id: number, vlan: Vlan): Observable<Vlan> {
    return this.http.put<Vlan>(`${this.apiUrl}${this.entite_vlan}/${id}`, vlan);
  }

  // Supprimer un VLAN par son ID
  deleteVlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_vlan}/${id}`);
  }
  //------------------------------------point d acce----------------------------------------
  // Récupérer tous les points d'accès
  getAllPointsAcces(): Observable<PointdAcces[]> {
    return this.http.get<PointdAcces[]>(`${this.apiUrl}${this.entite_point_acces}`);
  }

  // Récupérer un point d'accès par son ID
  getPointAccesById(id: number): Observable<PointdAcces> {
    return this.http.get<PointdAcces>(`${this.apiUrl}${this.entite_point_acces}/${id}`);
  }

  // Récupérer les points d'accès par lieu
  getPointsAccesByLieu(idLieu: number): Observable<PointdAcces[]> {
    return this.http.get<PointdAcces[]>(`${this.apiUrl}${this.entite_point_acces}/lieu/${idLieu}`);
  }

  // Ajouter un nouveau point d'accès
  addPointAcces(pointAcces: PointdAcces): Observable<PointdAcces> {
    return this.http.post<PointdAcces>(`${this.apiUrl}${this.entite_point_acces}`, pointAcces);
  }

  // Mettre à jour un point d'accès par son ID
  updatePointAcces(id: number, pointAcces: PointdAcces): Observable<PointdAcces> {
    return this.http.put<PointdAcces>(`${this.apiUrl}${this.entite_point_acces}/${id}`, pointAcces);
  }

  // Supprimer un point d'accès par son ID
  deletePointAcces(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_point_acces}/${id}`);
  }
  //-------------------------------------serveur--------------------------------------------------------
   // Récupérer tous les serveurs
   getAllServeurs(): Observable<Serveur[]> {
    return this.http.get<Serveur[]>(`${this.apiUrl}${this.entite_serveur}`);
  }

  // Récupérer un serveur par son ID
  getServeurById(id: number): Observable<Serveur> {
    return this.http.get<Serveur>(`${this.apiUrl}${this.entite_serveur}/${id}`);
  }

  // Ajouter un nouveau serveur
  addServeur(serveur: Serveur): Observable<Serveur> {
    return this.http.post<Serveur>(`${this.apiUrl}${this.entite_serveur}`, serveur);
  }

  // Mettre à jour un serveur par son ID
  updateServeur(id: number, serveur: Serveur): Observable<Serveur> {
    return this.http.put<Serveur>(`${this.apiUrl}${this.entite_serveur}/${id}`, serveur);
  }

  // Supprimer un serveur par son ID
  deleteServeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_serveur}/${id}`);
  }
  //----------------------------------------service------------------------------------------------
  // Récupérer tous les services serveurs
  getAllServiceserveurs(): Observable<Serviceserveur[]> {
    return this.http.get<Serviceserveur[]>(`${this.apiUrl}${this.entite_service_serveur}`);
  }

  // Récupérer un service serveur par son ID
  getServiceserveurById(id: number): Observable<Serviceserveur> {
    return this.http.get<Serviceserveur>(`${this.apiUrl}${this.entite_service_serveur}/${id}`);
  }

  // Ajouter un nouveau service serveur
  addServiceserveur(serviceserveur: Serviceserveur): Observable<Serviceserveur> {
    return this.http.post<Serviceserveur>(`${this.apiUrl}${this.entite_service_serveur}`, serviceserveur);
  }

  // Mettre à jour un service serveur par son ID
  updateServiceserveur(id: number, serviceserveur: Serviceserveur): Observable<Serviceserveur> {
    return this.http.put<Serviceserveur>(`${this.apiUrl}${this.entite_service_serveur}/${id}`, serviceserveur);
  }

  // Supprimer un service serveur par son ID
  deleteServiceserveur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_service_serveur}/${id}`);
  }
  //------------------------------------ticket-----------------------------------------------

  // Récupérer tous les tickets
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}${this.entite_ticket}`);
  }

  // Récupérer un ticket par son ID
  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}${this.entite_ticket}/${id}`);
  }

  // Ajouter un nouveau ticket
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}${this.entite_ticket}`, ticket);
  }

  // Mettre à jour un ticket par son ID
  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}${this.entite_ticket}/${id}`, ticket);
  }

  // Supprimer un ticket par son ID
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_ticket}/${id}`);
  }

  // Récupérer les tickets par statut
  getTicketsByStatut(statut: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}${this.entite_ticket}/byStatut/${statut}`);
  }

  // Récupérer les tickets par technicien
  getTicketsByTechnicien(technicien: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}${this.entite_ticket}/byTechnicien/${technicien}`);
  }
  //----------------------mise a jour ---------------------------------

  getAllMisesAJour(): Observable<MiseAJourLogiciel[]> {
    return this.http.get<MiseAJourLogiciel[]>(`${this.apiUrl}${this.entite_mise_a_jour}/toutes`);
  }

  getMiseAJourById(id: number): Observable<MiseAJourLogiciel> {
    return this.http.get<MiseAJourLogiciel>(`${this.apiUrl}${this.entite_mise_a_jour}/${id}`);
  }

  getMisesAJourByPc(idPc: number): Observable<MiseAJourLogiciel[]> {
    return this.http.get<MiseAJourLogiciel[]>(`${this.apiUrl}${this.entite_mise_a_jour}/pc/${idPc}`);
  }

  getMisesAJourByBureau(idBureau: number): Observable<MiseAJourLogiciel[]> {
    return this.http.get<MiseAJourLogiciel[]>(`${this.apiUrl}${this.entite_mise_a_jour}/bureau/${idBureau}`);
  }

  ajouterMiseAJour(miseAJour: MiseAJourLogiciel): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}${this.entite_mise_a_jour}/ajouter`, miseAJour);
  }

  updateMiseAJour(id: number, miseAJour: MiseAJourLogiciel): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}${this.entite_mise_a_jour}/${id}`, miseAJour);
  }

  supprimerMiseAJour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_mise_a_jour}/supprimer/${id}`);
  }
  //-------------------------------------Projecteur------------------------------------------

  // Récupérer tous les projecteurs
  getAllProjecteurs(): Observable<Projecteur[]> {
    return this.http.get<Projecteur[]>(`${this.apiUrl}${this.entite_projecteur}`);
  }

  // Récupérer un projecteur par son ID
  getProjecteurById(id: number): Observable<Projecteur> {
    return this.http.get<Projecteur>(`${this.apiUrl}${this.entite_projecteur}/${id}`);
  }

  // Récupérer les projecteurs par bureau
  getProjecteursByBureau(idBureau: string): Observable<Projecteur[]> {
    return this.http.get<Projecteur[]>(`${this.apiUrl}${this.entite_projecteur}/bureau/${idBureau}`);
  }

  // Récupérer les projecteurs par marque
  getProjecteursByMarque(marque: string): Observable<Projecteur[]> {
    return this.http.get<Projecteur[]>(`${this.apiUrl}${this.entite_projecteur}/marque/${marque}`);
  }

  // Ajouter un nouveau projecteur
  addProjecteur(projecteur: Projecteur): Observable<Projecteur> {
    return this.http.post<Projecteur>(`${this.apiUrl}${this.entite_projecteur}`, projecteur);
  }

  // Mettre à jour un projecteur par son ID
  updateProjecteur(id: number, projecteur: Projecteur): Observable<Projecteur> {
    return this.http.put<Projecteur>(`${this.apiUrl}${this.entite_projecteur}/${id}`, projecteur);
  }

  // Supprimer un projecteur par son ID
  deleteProjecteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${this.entite_projecteur}/${id}`);
  }

}


