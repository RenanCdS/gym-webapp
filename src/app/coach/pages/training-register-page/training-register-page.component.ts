import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-register-page',
  templateUrl: './training-register-page.component.html',
  styleUrls: ['./training-register-page.component.scss']
})
export class TrainingRegisterPageComponent implements OnInit {

  counter = [1];
  exercises = [
    { name: 'Supino' },
    { name: 'Agachamento' },
    { name: 'Barra fixa' },
  ];
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addCounter(): void {
    this.counter.push(1);
  }

  openSnackbar(): void {
    this.snackBar.open('Treino cadastrado com sucesso!', '', {
      verticalPosition: 'top'
    });
  }

}
