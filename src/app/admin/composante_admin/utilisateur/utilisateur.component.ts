import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { BackendserviceService } from '../../../backendservice.service';
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
@Component({
  selector: 'app-utilisateur',
  imports: [CommonModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss'
})
export class UtilisateurComponent implements OnInit{
  utilisateur: Utilisateur [] =  [];
  Admin_reseau: Utilisateur [] =  [];
  Technicien: Utilisateur [] =  [];
  Autre_Profession: Utilisateur [] =  [];
  ordinateurs:  Ordinateur  = {
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
  ordi_all: Ordinateur [] =  [];
  bureaux: Bureau = { id: 0, nom: '', etage: 1 };
  bureau_all: Bureau [] =  [];
  nom_bureau_admin_reseau:string="";
  nom_bureau_technicien:string="";
  nom_bureau_Autre_profesion:string="";
  nom_ordi_admin_reseau:string="";
  nom_ordi_technicien:string="";
  nom_ordi_Autre_profesion:string="";
  modife_user:Utilisateur={
    nom: "",
    prenom: "",
    nMatricule:"",
    email: "",
    motPasse: "",
    dateNaissance: "",
    telephone: "",
    profession: "",
    idPc: "",
    idBureau:"",
    valide:"",
  }
  constructor( private backend: BackendserviceService ) {}  // Injecter le Router
  async ngOnInit() {
    this.affichageUtilisateur = true;
    this.recupe_user_profession();
    this.recupe_all_bureau();
    this.recupe_all_ordi()
  }
  //--------------cle------------------------------
  ancienCleEmploye: string = '45646';
  ancienCleTechnicien: string = '45646';
  ancienCleAdmin: string = '45646';
  affichageUtilisateur: boolean =false;
  affichagecle: boolean = false;

  genererNouvelleCle(role: string): void {
    const nouvelleCle = Math.floor(10000 + Math.random() * 90000).toString();
    if (role === 'employe') {
      this.ancienCleEmploye = nouvelleCle;
    } else if (role === 'technicien') {
      this.ancienCleTechnicien = nouvelleCle;
    } else if (role === 'admin') {
      this.ancienCleAdmin = nouvelleCle;
    }
  }
  afficherUtilisateur(): void {
    this.affichageUtilisateur = true;
    this. affichagecle  = false;
  }
  async affichervalidation(){
    this.affichageUtilisateur = false;
    this. affichagecle  = true;
    await this. recupe_user_validation()
  }
  async recupe_user_validation(){
   await  this.backend.getUtilisateursParValide("false").subscribe({
      next: (data) => {
        this.utilisateur = data;
         },
      error: (err) => {
        alert("Ce compte n'existe pas")
      }
    });
  }
  async validation(
    id: number,
    nom: string,
    prenom: string,
    nMatricule: string,
    email: string,
    motPasse: string,
    dateNaissance: string,
    telephone: string,
    profession: string,
    idPc: string,
    idBureau: string
  ) {
    this.modife_user = {
      nom: nom,
      prenom: prenom,
      nMatricule: nMatricule,
      email: email,
      motPasse: motPasse,
      dateNaissance: dateNaissance,
      telephone: telephone,
      profession: profession,
      idPc: idPc,
      idBureau: idBureau,
      valide: "true",//Reste bien un string
    };

    // Envoi des données au backend
    this.backend.mettreAJourUtilisateur(id, this.modife_user).subscribe({
      next: (response) => {
        console.log("Utilisateur mis à jour avec succès :", response);
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    });
    //mettre a jour l affichage
     this.recupe_user_validation()
  }
  user: Utilisateur[] = [];
  //------------------liste-------------------------
  async recupe_user_profession(){
    await this.backend.getTousLesUtilisateurs().subscribe({
      next: (data) => {
        this.user=data
        console.log(  this.user)
        this.Admin_reseau = this.user.filter(u => u.profession === "Administrateur réseau");
        this.Technicien = this.user.filter(u => u.profession === "Technicien");
        this.Autre_Profession = this.user.filter(u => u.profession === "Autres professions");
        console.log(  this.Technicien )
      },

    });
 }
  recupe_all_bureau() {
    this.backend.getAllBureaux().subscribe({
      next: (data) => {
        this.bureau_all = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des bureaux', error);
      }
    });
  }
  recupe_all_ordi() {
    this.backend.getAllOrdinateurs().subscribe({
      next: (data) => {
        this.ordi_all = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des ordi', error);
      }
    });
  }
  getNomBureau(id: string, profession: string): string {
    const bureauId = Number(id);
    if (isNaN(bureauId) || bureauId <= 0) return "Inconnu"; // Gère les ID invalides

    const bureau = this.bureau_all.find(b => b.id === bureauId);
    if (!bureau) return "Inconnu";

    // Attribution du nom en fonction de la profession
    if (profession === "Administrateur reseau") {
      return `Admin: ${bureau.nom}`;
    } else if (profession === "Téchnicien") {
      return `Tech: ${bureau.nom}`;
    } else if (profession === "Autre Employé") {
      return `Autre: ${bureau.nom}`;
    }

    return bureau.nom; // Valeur par défaut
  }
  getNomOrdi(id: string, profession: string): string {
    const ordiId = Number(id);
   // if (isNaN(ordiId) || ordiId <= 0) return "Inconnu"; // Gère les ID invalides

    const ordi = this.ordi_all.find(o => o.id === ordiId);
    if (!ordi) return "Inconnu";

    // Attribution du nom en fonction de la profession
    if (profession === "Administrateur reseau") {
      return `Admin: ${ordi.nom}`;
    } else if (profession === "Téchnicien") {
      return `Tech: ${ordi.nom}`;
    } else if (profession === "Autre Employé") {
      return `Autre: ${ordi.nom}`;
    }

    return ordi.nom; // Valeur par défaut
  }
  //-----------------rapport------------------------------


  telecharge_pdf() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Crée un PDF en orientation portrait, format A4

    // Titre du document
    pdf.setFontSize(18);
    pdf.text('Rapport des Utilisateurs', 10, 20);

    // Fonction pour ajouter un tableau horizontal
    const addTable = (title: string, data: any[], columns: string[], columnLabels: string[], yPosition: number) => {
      pdf.setFontSize(14);
      pdf.text(title, 10, yPosition); // Ajouter un titre au tableau
      yPosition += 10;

      // Convertir les données en format compatible avec autoTable
      const rows = data.map((item) => {
        return columns.map((col) => {
          if (col === 'idPc') {
            // Remplacer l'ID du PC par son nom
            return this.getNomOrdi(item[col], item.profession);
          } else if (col === 'idBureau') {
            // Remplacer l'ID du bureau par son nom
            return this.getNomBureau(item[col], item.profession);
          } else {
            return item[col];
          }
        });
      });

      // Ajouter le tableau au PDF
      (pdf as any).autoTable({
        startY: yPosition,
        head: [columnLabels], // En-têtes du tableau
        body: rows, // Données du tableau
        theme: 'grid', // Style du tableau
        styles: { fontSize: 10 }, // Taille de la police
        headStyles: {
          fillColor: [231, 225, 33], // Couleur de fond de l'entête (par exemple, bleu)
          textColor: [10, 10, 1], // Couleur du texte de l'entête (par exemple, blanc)
          fontStyle: 'bold', // Style du texte (optionnel)
        },
      });

      // Retourne la position Y après le tableau
      return (pdf as any).lastAutoTable.finalY + 10;
    };

    let yPosition = 30; // Position verticale initiale

    // Tableau des utilisateurs
    yPosition = addTable(
      'Administrateurs Réseau',
      this.Admin_reseau,
      ['nom', 'prenom', 'nMatricule', 'email', 'telephone', 'idBureau', 'idPc'],
      ['Nom', 'Prénom', 'Matricule', 'Email', 'Téléphone', 'Bureau', 'Ordinateur'],
      yPosition
    );

    yPosition = addTable(
      'Techniciens',
      this.Technicien,
      ['nom', 'prenom', 'nMatricule', 'email', 'telephone', 'idBureau', 'idPc'],
      ['Nom', 'Prénom', 'Matricule', 'Email', 'Téléphone', 'Bureau', 'Ordinateur'],
      yPosition
    );

    yPosition = addTable(
      'Autres Employés',
      this.Autre_Profession,
      ['nom', 'prenom', 'nMatricule', 'email', 'telephone', 'idBureau', 'idPc'],
      ['Nom', 'Prénom', 'Matricule', 'Email', 'Téléphone', 'Bureau', 'Ordinateur'],
      yPosition
    );

    // Télécharger le PDF
    pdf.save('rapport_utilisateurs.pdf');
  }
}
