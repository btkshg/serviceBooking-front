import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profilePage } from './profile.page';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('profilePage', () => {
  let component: profilePage;
  let fixture: ComponentFixture<profilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [profilePage],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(profilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
