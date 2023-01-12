import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Path } from 'src/app/util/path/path';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.sass']
})
export class NavigationButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() path?: Path;
  @Input() active$?: Observable<boolean>;
  @Input() confirm?: string;
  @Input() mode: string="fab";
  @Output() click: EventEmitter<(event: any)=>void>=new EventEmitter<(event: any)=>void>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick(event: any)
  {
    if(this.confirm && !confirm(this.confirm)) return;
    this.click.emit(event);
    if(this.path) this.path.navigate(this.router);
  }

}
