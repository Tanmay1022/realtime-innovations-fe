import { Component,  inject,  OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from '../services/handle-data.service';
import { MatDialog } from '@angular/material/dialog';
import { InstructionDialogComponent } from '../instruction-dialog/instruction-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeData:any[] = [];
  showNoEmployeeImg =  true;
  
  constructor(
    private router: Router,
    private dataService: HandleDataService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.fetchItems();

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      this.openDialog();
      localStorage.setItem('hasVisited', 'true');
    }
    
  }

  openDialog(): void {
    this.dialog.open(InstructionDialogComponent);
  }

  fetchItems(): void {
    this.dataService.getItems().subscribe((data: any) => {
      this.employeeData = data.map((item: any)=>{
        return {
          ...item,
          startDate: this.formatDate(item.startDate),
          endDate: this.formatDate(item?.endDate)
        }
      })
      
     if(this.employeeData.length > 0){
      this.showNoEmployeeImg = false;
     }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  addEmployee(){
    this.router.navigate(['/create-employee'])
  }

  deleteEmployee(id: string): void {
    this.dataService.deleteItem(id).subscribe(response => {
      location.reload();
    }, error => {
      location.reload();
      
    });
  }

  onScroll(event: any, employee: any) {
    const element = event.target;
    const maxScrollLeft = element.scrollWidth * 0.2;
    if (element.scrollLeft > maxScrollLeft) {
      element.scrollLeft = maxScrollLeft;
      this.deleteEmployee(employee?.id);
    }
  }
  

  editEmployee(employee:any){
    this.router.navigate(['/create-employee',employee?.id])
  }

}
