import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCardComponent } from './booking-card.component';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCardComponent);
    component = fixture.componentInstance;

    component.booking = {
    id: 1,
    date: '2025-06-01',
    time: '10:00',
    duration: 60,
    status: 'confirmed',
    service: {
      name: 'Haircut',
      price: 30,
      duration: 60
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit booking id when delete() is called', () => {
    component.booking = {
      id: 1,
      date: '2025-05-31',
      time: '10:00',
      duration: 60,
      status: 'confirmed',
      service: {
        name: 'Haircut',
        price: 30,
        duration: 60,
      }
    };

    spyOn(component.cardClick, 'emit');

    component.delete();

    expect(component.cardClick.emit).toHaveBeenCalledWith(1);
  });
});
