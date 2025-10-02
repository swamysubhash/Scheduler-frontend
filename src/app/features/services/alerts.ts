import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Alerts {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action = 'Close', duration = 3000, horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition,
      verticalPosition
    });
  }
  
}
