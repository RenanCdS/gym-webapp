import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {

  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/champion.json',
    autoplay: true,
    loop: true,
  };

  constructor(private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(1);
    animationItem.play();
  }

  goBackHome(): void {
    this.router.navigate(['']);
    this.dialog.closeAll();
  }

}
