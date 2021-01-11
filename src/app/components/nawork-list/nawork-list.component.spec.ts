import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaworkListComponent } from './nawork-list.component';

describe('NaworkListComponent', () => {
  let component: NaworkListComponent;
  let fixture: ComponentFixture<NaworkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaworkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
