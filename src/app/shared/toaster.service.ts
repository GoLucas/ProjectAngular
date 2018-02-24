import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToasterService {
  constructor(public snackBar: MatSnackBar) {}

  showToaster(
    message: string,
    type: string = 'success',
    duration: number = 2000
  ) {
    switch (type) {
      case 'success': {
        this.snackBar.open(message, ' ', {
          duration: duration,
          panelClass: ['snack-bar-message', 'snack-bar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        break;
      }
      case 'error': {
        this.snackBar.open(message, ' ', {
          duration: duration,
          panelClass: ['snack-bar-message', 'snack-bar-error'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        break;
      }
      case 'info': {
        this.snackBar.open(message, ' ', {
          duration: duration,
          panelClass: ['snack-bar-message', 'snack-bar-info'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        break;
      }
      case 'warning': {
        this.snackBar.open(message, ' ', {
          duration: duration,
          panelClass: ['snack-bar-message', 'snack-bar-warning'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        break;
      }
    }
  }
}
