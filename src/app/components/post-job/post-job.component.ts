import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AboutYouComponent } from './about-you/about-you.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobRequirmentComponent } from './job-requirment/job-requirment.component';
import { JobClass } from './JobClass/job-class';
import { PostJobService } from './post-job-service/post-job-service.service';
import { Loginservice } from '../login/LoginService/loginservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [
    MatTabsModule,
    AboutYouComponent,
    JobDetailsComponent,
    JobRequirmentComponent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  constructor(
    public PostJobService: PostJobService,
    private loginservice: Loginservice,
    private router:Router
  ) {
    this.job.employerId =
      loginservice.LoggedUser.value![
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
  }
  job = new JobClass();
  display(){
    console.log(this.job.aboutYou);
  }
  isOptional = false;
  AddJob() {
    this.PostJobService.AddJob(this.job).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
        Swal.fire({
          title: 'Done',
          text:"Job Added Successfully",
          showCancelButton: true,
        });  
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text:"Failed To Add Job",
          showCancelButton: true,
        });  
      },
    });
  }
}
