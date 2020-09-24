import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coach-list-page',
  templateUrl: './coach-list-page.component.html',
  styleUrls: ['./coach-list-page.component.scss']
})
export class CoachListPageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackbar(message?: string): void {
    this.snackBar.open(message || 'Aluno bonificado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

}
