import { Component,  OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from '../services/handle-data.service';

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
  ){}

  ngOnInit(): void {
    this.fetchItems();
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
      
      console.log(this.employeeData)
     if(this.employeeData.length > 0){
      this.showNoEmployeeImg = false;
     }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Get day and pad with leading zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Get month, pad with leading zero, and add 1 because months are zero-indexed
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
