/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MissionControlComponent } from './mission-control.component';

describe('MissionControlComponent', () => {
  let component: MissionControlComponent;
  let fixture: ComponentFixture<MissionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
