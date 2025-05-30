import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'addService-page',
  templateUrl: './addService.page.html',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
})
export class addServicePage {
  service = {
    name: '',
    price: '',
    duration: '',
    description: '',
    picUrl: '',
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  saveService() {
    if (!this.service.name || !this.service.price || !this.service.duration || !this.service.description) {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['bg-red-600', 'text-white']
      });
      return;
    }
    this.http.post('http://localhost:3000/services', this.service)
      .subscribe({
        next: res => {
          this.snackBar.open('Service saved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['bg-green-600', 'text-white']
          });
        },
        error: err => {
          console.error('Error saving service:', err);
          this.snackBar.open('Failed to save service.', 'Close', {
            duration: 3000,
            panelClass: ['bg-red-600', 'text-white']
          });
        }
      });
  }
}
