import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-add-client-dialog',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.scss'
})
export class AddClientDialogComponent {

  projectForm: FormGroup;
  userRole: string = '';
  projectId: any;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private authService: AuthService,
    private communicationService: CommunicationService,
    private dialogRef: MatDialogRef<AddClientDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.formInilization();
    this.userRole = this.authService.getUserRole();
    if (this.data.projectId) {
      this.projectId = this.data.projectId;
      this.getProjectDetails(this.data.projectId);
    }

  }


  formInilization() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }
  onSubmit() {
    if (this.data && this.data.projectId) {
      this.updateProject();
    } else {
      this.saveProject();
    }
  }

  saveProject() {
    if (this.projectForm.valid) {
      const formVal = this.projectForm.value;

      const payload = {
        projectName: formVal.projectName,
        description: formVal.description,
        startDate: formVal.startDate,
        endDate: formVal.endDate,
        priority: formVal.priority,
        status: formVal.status,
        createdBy: this.userRole
      };

      this.projectService.saveProject(payload).subscribe(
        (res) => {
          this.closeDialog();
          if (res.success) {
            // localStorage.removeItem('checkNewTabData');
            // localStorage.setItem('checkNewTabData', 'NewTabDataSaved');
            this.successtoastMessage("Project Saved successfully!");
            this.communicationService.triggerProjectGetList();

          }
        },
        (err) => {
          console.error('Error saving project:', err);
        }
      );
    }
  }


  // Fetch project details by ID
  getProjectDetails(projectId: number) {
    this.projectService.getProjectById(projectId).subscribe(
      (response) => {
        if (response.success && response.data) {
          const project = response.data;

          const startDate = project.startDate ? project.startDate.split('T')[0] : '';
          const endDate = project.endDate ? project.endDate.split('T')[0] : '';

          this.projectForm.patchValue({
            projectName: project.projectName,
            description: project.description,
            priority: project.priority,
            status: project.status,
            startDate: startDate,
            endDate: endDate
          });
        }
      },
      (error) => {
        console.error("Error fetching project details:", error);
      }
    );
  }

  updateProject() {
    if (this.projectForm.valid) {
      const formVal = this.projectForm.value;

      const payload = {
        projectName: formVal.projectName,
        description: formVal.description,
        startDate: formVal.startDate,
        endDate: formVal.endDate,
        priority: formVal.priority,
        status: formVal.status,
        updatedBy: this.userRole
      };

      this.projectService.updateProject(this.projectId, payload).subscribe(
        (res) => {
          this.closeDialog();
          if (res.success) {
            localStorage.removeItem('checkNewTabData');
            localStorage.setItem('checkNewTabData', 'NewTabDataSaved');
            this.successtoastMessage("Project Updated successfully!");
            this.communicationService.triggerProjectGetList();
          }
        },
        (err) => {
          console.error('Error saving project:', err);
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  successtoastMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

  }
}
