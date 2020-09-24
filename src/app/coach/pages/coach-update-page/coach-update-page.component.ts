import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coach-update-page',
  templateUrl: './coach-update-page.component.html',
  styleUrls: ['./coach-update-page.component.scss']
})
export class CoachUpdatePageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackbar(): void {
    this.snackBar.open('Treinador atualizado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

}
