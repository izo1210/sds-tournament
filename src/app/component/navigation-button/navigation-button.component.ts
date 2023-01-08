import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Path } from 'src/app/util/path/path';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.sass']
})
export class NavigationButtonComponent implements OnInit {
  @Input() active$: Observable<boolean>|null=null;
  @Input() icon!: string;
  @Input() path!: Path;
  @Input() confirm: string|null=null;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick()
  {
    if(this.confirm && !confirm(this.confirm)) return;
    this.path.navigate(this.router);
  }

}
