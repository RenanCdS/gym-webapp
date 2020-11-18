import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  @ViewChild('confirmationModal', { static: true }) confirmationModal: TemplateRef<ConfirmationModalComponent>;
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openConfirmationModal(): void {
    this.dialog.open(this.confirmationModal);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

}
