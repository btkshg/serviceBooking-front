import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginPage } from './registerLogin.page';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RegisterLoginPage', () => {
  let component: RegisterLoginPage;
  let fixture: ComponentFixture<RegisterLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoginPage],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
