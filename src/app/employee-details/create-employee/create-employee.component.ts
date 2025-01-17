import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDialogComponent } from 'src/app/calendar-dialog/calendar-dialog.component';
import { HandleDataService } from 'src/app/services/handle-data.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  items: any[] = [];
  employee: any;
  employeeId: string | null = null;
  title: string = "Add Employee Details";
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: HandleDataService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    
  }


  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['',Validators.required],
      selectRole: ['',Validators.required],
      startDate: [''],
      endDate: ['']
    });

    this.activateRoute.paramMap.subscribe(params=>{
      this.employeeId = params.get('id');
      if(this.employeeId){
        this.loadEmployee();
      }
    })
  }

  openCalendarDialog(dateType: string): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      data: {dateType: dateType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(dateType === 'startDate'){
          this.employeeForm.patchValue({ startDate: result });
        }
        else{
          this.employeeForm.patchValue({ endDate: result})
        } 
      }
    })
  }

  loadEmployee(): void {
    if (this.employeeId) {
      this.title = "Edit Employee Details"
      this.employeeService.getItem(this.employeeId).subscribe(employee => {
        if(employee?.startDate){
          employee.startDate = new Date(employee.startDate);
        }
        this.employeeForm.patchValue(employee);
      });
    }
  }


  onSubmit(): void {
    if (this.employeeForm.valid) {

      if (this.employeeId) {
        const startDate = this.employeeForm.value.startDate;
        const endDate = this.employeeForm.value.endDate;
      
        if (startDate === '' && endDate !== '') {
          this.snackBar.open("You must specify a start date if the end date is given.", 'Close', {
            duration: 3000,
          });
          return;
        }
        this.employeeService.updateItem(this.employeeId, this.employeeForm.value).subscribe(() => {
          this.route.navigate(['/']); 
        });
      }
      else{
        const startDate = this.employeeForm.value.startDate;
        const endDate = this.employeeForm.value.endDate;
      
        if (startDate === '' && endDate !== '') {
          this.snackBar.open("You must specify a start date if the end date is given.", 'Close', {
            duration: 2000,
          });
          return;
        }
        const formValue = this.employeeForm.value;
        this.employeeService.createItem(formValue).subscribe(response => {
          this.route.navigate(["/"])
        });
      }
      
    }
  }

  cancelAdding() {
    this.route.navigate(["/"]);
  }

 
}
