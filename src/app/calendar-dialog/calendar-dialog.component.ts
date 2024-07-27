import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {
  selected: Date;
  title!: string;


  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ 
    this.selected = new Date();
    this.title = data?.dateType === 'startDate' ? 'Select Start Date' : 'Select End Date';
   }

  ngOnInit(): void {

  }

  selectedButton: string = '';

  selectButton(button: string): void {
    this.selectedButton = button;
  }

  selectToday() {
    this.selected = new Date();
    this.selectButton('today');
  }

  selectNextMonday() {
    const date = new Date();
    date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
    this.selected = date;
    this.selectButton('nextMonday');
  }

  selectNextTuesday() {
    const date = new Date();
    date.setDate(date.getDate() + ((2 + 7 - date.getDay()) % 7));
    this.selected = date;
    this.selectButton('nextTuesday');
  }

  selectAfterOneWeek() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.selected = date;
    this.selectButton('afterOneWeek');
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selected);
  }
}
