import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from '../add-client-dialog/add-client-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from 'src/app/services/project.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-table-list',
  imports: [MaterialModule, CommonModule],
  templateUrl: './client-table-list.component.html',
  styleUrl: './client-table-list.component.scss'
})
export class ClientTableListComponent {

  funcListener: any;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private communicationService: CommunicationService,
    private authService:AuthService
  ) {
    this.communicationService.projectGetFunctionCall$.subscribe(() => {
      this.getProjectsList();
    });

    this.funcListener = this.func.bind(this);
    window.addEventListener('storage', this.funcListener);
  }
  userRole: string = '';
  displayedColumns: string[] = [
    'serialNo',
    'projectName',
    'description',
    'priority',
    'status',
    'startDate',
    'endDate',
    'createdDate',
    'createdBy'
  ];


  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getProjectsList();
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'Admin') {
      this.displayedColumns.push('actions');
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProjectsList() {
    this.projectService.getProjects().subscribe((response: any) => {
      this.dataSource.data = response.data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addPrpject() {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
  updateProject(project: any) {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { projectId: project.projectID }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }


  deleteProject(project: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(project.projectID).subscribe({
          next: () => {
            localStorage.removeItem('checkNewTabData');
            localStorage.setItem('checkNewTabData', 'NewTabDataSaved');
            this.successtoastMessage("Project deleted successfully!");
            this.getProjectsList();
          },
          error: () => {
          }
        });
      }
    });
  }


  successtoastMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center', // Align to center
      verticalPosition: 'top' // Move to top
    });

  }

  isDueDateExceeded(dueDate: string): boolean {
    if (!dueDate) return false; // If no due date, return false

    const today = new Date();
    const dueDateObj = new Date(dueDate);

    return dueDateObj < today; // Returns true if due date has passed
  }
  exportToExcel() {
    const dataToExport = this.dataSource.data.map((item, index) => ({
      'Si. No.': index + 1,
      ProjectName: item.projectName,
      Description: item.description,
      Priority: item.priority,
      Status: item.status,
      StartDate: item.startDate,
      EndDate: item.endDate,
      CreatedDate: item.createdDate,
      CreatedBy: item.createdBy
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

    // Save the file
    XLSX.writeFile(workbook, 'Projects_List.xlsx');
  }

  func(event: StorageEvent): void {
    if (event.key === 'checkNewTabData' && event.newValue === 'NewTabDataSaved') {
      this.getProjectsList();
    }
  }
}




