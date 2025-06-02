import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { servicePage } from './service.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

describe('servicePage', () => {
  let component: servicePage;
  let fixture: ComponentFixture<servicePage>;
  let httpMock: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { events: of() });
    activatedRouteMock = {
      queryParams: of({ id: 1, name: 'Test', dur: 60 })
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [servicePage],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(servicePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle selected time if slot is free', () => {
    const slot = { time: '10:00', free: true };
    component.selectedTime = null;

    component.selectTime(slot);
    expect(component.timeSlots.find(t => t.time === '10:00')?.free).toBeFalse();


    component.selectTime(slot);
    expect(component.selectedTime).toBeNull();
  });

  it('should change date and fetch booked times on date change', () => {
    spyOn(component, 'fetchBookedTimes');
    const newDate = new Date('2025-01-01');

    component.onDateChange(newDate);
    expect(component.selected).toEqual(newDate);
    expect(component.fetchBookedTimes).toHaveBeenCalledWith(newDate);
  });

  it('should mark booked time slots as not free', fakeAsync(() => {
    const mockOrders = [
      { time: '10:00:00', service: { duration: 60 } } // covers 10:00 and 10:30
    ];
    component.timeSlots = [
      { time: '10:00', free: true },
      { time: '10:30', free: true },
      { time: '11:00', free: true }
    ];

    component.fetchBookedTimes(new Date('2025-01-01'));
    const req = httpMock.expectOne(req =>
        req.url.includes('orders/by-date') && req.method === 'GET'
      );
      
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
    tick();

    expect(component.timeSlots.find(t => t.time === '10:00')?.free).toBeFalse();
    expect(component.timeSlots.find(t => t.time === '10:30')?.free).toBeFalse();
    expect(component.timeSlots.find(t => t.time === '11:00')?.free).toBeTrue();
  }));

  it('should show error if user not logged in during confirm()', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.confirm();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Please log in to book a service.', 'Close', { duration: 3000 });
  });

  it('should show error if time not selected during confirm()', () => {
    spyOn(localStorage, 'getItem').and.returnValue('1');
    component.selectedTime = null;
    component.confirm();
    expect(snackBarSpy.open).toHaveBeenCalledWith('Please select a time and date.', 'Close', { duration: 3000 });
  });

  it('should navigate with correct query params on successful confirm()', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'currentUser' ? 'user' : '123';
    });

    component.selectedTime = '10:00';
    component.id = 1;
    component.name = 'Test Service';
    component.duration = '60';
    component.selected = new Date('2025-01-01');

    component.confirm();
    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('POST');
    req.flush({}); // simulate success
    tick();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/booking'], {
      queryParams: {
        name: 'Test Service',
        dur: '60',
        date: '2025-01-01',
        time: '10:00'
      }
    });
  }));

  it('should show snackbar if confirm() HTTP fails', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'currentUser' ? 'user' : '123';
    });

    component.selectedTime = '10:00';
    component.id = 1;
    component.name = 'Fail';
    component.duration = '60';
    component.selected = new Date('2025-01-01');

    component.confirm();
    const req = httpMock.expectOne('http://localhost:3000/orders');
    req.flush({}, { status: 500, statusText: 'Error' });
    tick();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Registration failed! Try again.', 'Close', {
      duration: 3000,
      panelClass: ['bg-red-600', 'text-white'],
    });
  }));
});
