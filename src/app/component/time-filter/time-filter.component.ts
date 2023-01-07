import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrls: ['./time-filter.component.sass']
})
export class TimeFilterComponent implements OnInit {

  filterForm: FormGroup=new FormGroup({
    'from': new FormControl(""),
    'to': new FormControl("")
  });

  @Output() filter: EventEmitter<{from: string, to: string}>=new EventEmitter<{from: string, to: string}>();

  constructor() { }

  ngOnInit(): void {
    this.onClickDay();
  }

  onFilter()
  {
    const from=this.filterForm.get("from")?.value;
    const to=this.filterForm.get("to")?.value;
    this.filter.emit({from, to});
  }

  onClickDay()
  {
    const from=new Date();
    const to=new Date();
    to.setDate(to.getDate()+1);
    this.setFilterValues(this.toDayText(from), this.toDayText(to));
  }

  onClickMonth()
  {
    const from=new Date();
    const to=new Date();
    to.setMonth(to.getMonth()+1);
    this.setFilterValues(this.toMonthText(from), this.toMonthText(to));
  }

  onClickYear()
  {
    const from=new Date();
    const to=new Date();
    to.setFullYear(to.getFullYear()+1);
    this.setFilterValues(this.toYearText(from), this.toYearText(to));
  }

  onClickAll()
  {
    this.setFilterValues("", "");
  }

  private toDayText(date: Date)
  {
    return date.toISOString().substring(0, 10);
  }

  private toMonthText(date: Date)
  {
    return date.toISOString().substring(0, 7);
  }

  private toYearText(date: Date)
  {
    return date.toISOString().substring(0, 4);
  }

  private setFilterValues(from: string, to: string)
  {
    this.filterForm.get("from")?.setValue(from);
    this.filterForm.get("to")?.setValue(to);
    this.onFilter();
  }
}
