import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardComponent } from './service-card.component';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;

    component.card = {
      id: 1,
      name: 'string',
      description: 'string',
      picUrl: 'string',
      duration: 1,
      price: 1,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit card data when emitClick() is called', () => {
    spyOn(component.cardClick, 'emit');

    component.emitClick();

    expect(component.cardClick.emit).toHaveBeenCalledWith(component.card);
  });
});
