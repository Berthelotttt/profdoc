// src/app/app.component.ts
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { SecurityModalComponent } from './security-modal/security-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,
    CommonModule,
    FormsModule,
    SecurityModalComponent,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'profdoc';
  isHomePage = false;
  constructor(public dialog: MatDialog, private router: Router,private location: Location) {}  // Injecter le Router

  ngOnInit() {
      // Écouter les changements d'URL

  }


}
