import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGroupsViewComponent } from './messagegroupsview.component';

describe('MessagegroupsviewComponent', () => {
  let component: MessageGroupsViewComponent;
  let fixture: ComponentFixture<MessageGroupsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageGroupsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGroupsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
