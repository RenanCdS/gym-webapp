import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-athletes-page',
  templateUrl: './my-athletes-page.component.html',
  styleUrls: ['./my-athletes-page.component.scss']
})
export class MyAthletesPageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackbar(message?: string): void {
    this.snackBar.open(message || 'Aluno bonificado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

}
