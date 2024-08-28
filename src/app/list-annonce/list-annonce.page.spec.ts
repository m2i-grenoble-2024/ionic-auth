import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAnnoncePage } from './list-annonce.page';

describe('ListAnnoncePage', () => {
  let component: ListAnnoncePage;
  let fixture: ComponentFixture<ListAnnoncePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
