import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../interfaces/course.interface';
import { MatButtonModule } from '@angular/material/button';
import { O } from '@angular/cdk/keycodes';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-form',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatIconModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent{

 
  @Input() 
  set courseData(course: Course | null) {
    this.updateForm(course);
  };
  @Output() courseSaved: EventEmitter<void> = new EventEmitter<void>();
  
 private _courseApi: CourseService = inject(CourseService);
 isEditMode: boolean = false;
 courseForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    duration: new FormControl('', [Validators.required, Validators.min(0.5)]),
    level: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)])
  });


 private updateForm(course: Course | null) {
  if (course) {
    this.isEditMode = true;
    this.courseForm.patchValue({
      id: course.id,
      name: course.name,
      description: course.description,
      duration: this.formatDuration(course.duration),
      level: course.level,
      price: course.price
    });
  } else {
    this.isEditMode = false;
    this.courseForm.reset();
  }
}

  formatDuration(value: string | number): string | number | undefined {
    if (typeof value === 'number') {
      return `${value} horas`;
    }else if (typeof value === 'string') {
      return value.split(' ')[0];
    }
    return undefined;
  }

  saveCourse(): void {
    if(!this.courseForm.valid) return;
    const formValue: Course = this.courseForm.value;
    const formattedDuration = this.formatDuration(formValue.duration);
    formValue.duration = formattedDuration !== undefined ? String(formattedDuration) : '';
    const transactionType = this.isEditMode ? 'updateCourse' : 'createCourse';
    this._courseApi[transactionType](formValue).subscribe({
      next: () => {
        this.courseSaved.emit();
      }
    });
  }
}
