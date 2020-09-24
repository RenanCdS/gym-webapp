import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-athlete-update-page',
  templateUrl: './athlete-update-page.component.html',
  styleUrls: ['./athlete-update-page.component.scss']
})
export class AthleteUpdatePageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackbar(): void {
    this.snackBar.open('Aluno atualizado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

}
