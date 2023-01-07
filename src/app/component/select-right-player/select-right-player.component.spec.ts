import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRightPlayerComponent } from './select-right-player.component';

describe('SelectRightPlayerComponent', () => {
  let component: SelectRightPlayerComponent;
  let fixture: ComponentFixture<SelectRightPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRightPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRightPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
