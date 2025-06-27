import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course.interface';
import { Observable } from 'rxjs';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-manager',
  imports: [MatTableModule, MatIconModule, MatButtonModule, 
    CommonModule, RouterModule, CourseFormComponent],
  templateUrl: './course-manager.component.html',
  styleUrl: './course-manager.component.css'
})
export class CourseManagerComponent implements OnInit{

  private courseService: CourseService = inject(CourseService)
  courseList$: Observable<Course[]> | undefined;
  courseDetail$: Observable<Course> | undefined;
  displayedColumns: string[] = ['id', 'name', 'description', 'duration', 'level', 'price', 'actions'];
  courseFormVisible: boolean = false;
 

  ngOnInit(): void {
   this.setCourseList();
  }

  openCourseForm(course: Course | null = null): void {
    this.courseFormVisible = true;
    this.getDetailCourse(course);
  }

  getDetailCourse(course:  Course | null = null): void {
     if (course) {
      this.courseDetail$ = this.courseService.getDetailCourse(course.id);
    } else {
      this.courseDetail$ = undefined;
    }
  }

  setCourseList(): void {
     this.courseList$ = this.courseService.getCourseList()
  }

  onCourseSaved(): void {
    this.setCourseList();
    this.courseFormVisible = false;
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe({
      next: () => {
        this.setCourseList();
      }
    });
  }

}
