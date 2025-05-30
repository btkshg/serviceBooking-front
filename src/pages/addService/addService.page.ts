import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'addService-page',
    templateUrl: './addService.page.html',
    standalone: true,
    imports: [FormsModule, MatSnackBarModule, CommonModule, RouterModule],
  })
  
export class addServicePage {
    service: {
        id?: string;
        name: string;
        price: string;
        duration: string;
        description: string;
        picUrl: string;
      } = {
        name: '',
        price: '',
        duration: '',
        description: '',
        picUrl: ''
      };
      
  isEdit = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadService(id);
        this.isEdit = true;
      }
    });
  }
  
  loadService(id: string) {
    this.http.get(`http://localhost:3000/services/${id}`).subscribe({
      next: (data: any) => {
        this.service = data;
      },
      error: err => {
        console.error('Error loading service:', err);
        this.snackBar.open('Failed to load service.', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-600', 'text-white']
        });
      }
    });
  }

  saveService() {
    const { name, price, duration, description } = this.service;
  
    if (!name || !price || !duration || !description) {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['bg-red-600', 'text-white']
      });
      return;
    }
  
    this.isEdit ? this.updateService() : this.createService();
  }
  
  private createService() {
    const payload = {
      name: this.service.name,
      description: this.service.description,
      price: +this.service.price,
      duration: +this.service.duration,
      picUrl: this.service.picUrl || ''
    };
  
    this.http.post('http://localhost:3000/services', payload).subscribe({
      next: () => this.snackBar.open('Service created.', 'Close', { duration: 3000 }),
      error: () => this.snackBar.open('Failed to create service.', 'Close', { duration: 3000 })
    });
  }
  
  private updateService() {
    const id = this.service.id;
    if (!id || isNaN(+id)) {
      this.snackBar.open('Invalid service ID.', 'Close', { duration: 3000 });
      return;
    }
  
    const payload = {
      name: this.service.name,
      description: this.service.description,
      price: +this.service.price,
      duration: +this.service.duration,
      picUrl: this.service.picUrl || ''
    };
  
    this.http.patch(`http://localhost:3000/services/${id}`, payload).subscribe({
      next: () => this.snackBar.open('Service updated.', 'Close', { duration: 3000 }),
      error: () => this.snackBar.open('Failed to update service.', 'Close', { duration: 3000 })
    });
  }
  
  

  deleteService() {
    this.http.delete(`http://localhost:3000/services/${this.service.id}`)
      .subscribe({
        next: res => {
          this.snackBar.open('Service deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['bg-green-600', 'text-white']
          });
          this.router.navigate(['/']);
        },
        error: err => {
          this.snackBar.open('Failed to delete service.', 'Close', {
            duration: 3000,
            panelClass: ['bg-red-600', 'text-white']
          });
        }
      });
  }
  
}
