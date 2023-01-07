import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLeftPlayerComponent } from './select-left-player.component';

describe('SelectLeftPlayerComponent', () => {
  let component: SelectLeftPlayerComponent;
  let fixture: ComponentFixture<SelectLeftPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLeftPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLeftPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
