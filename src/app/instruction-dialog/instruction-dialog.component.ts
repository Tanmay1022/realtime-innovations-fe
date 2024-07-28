import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-instruction-dialog',
  templateUrl: './instruction-dialog.component.html',
  styleUrls: ['./instruction-dialog.component.scss']
})
export class InstructionDialogComponent implements OnInit{
  
  orientation!: String;
  constructor(
    public breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(): void {
    this.breakpointObserver
    .observe(['(max-width: 576px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.orientation = 'vertical';
      } else {
        this.orientation = 'horizontal';
      }
    });
  }
}
