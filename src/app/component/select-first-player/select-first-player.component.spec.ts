import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFirstPlayerComponent } from './select-first-player.component';

describe('SelectStarterPlayerComponent', () => {
  let component: SelectFirstPlayerComponent;
  let fixture: ComponentFixture<SelectFirstPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFirstPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFirstPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
