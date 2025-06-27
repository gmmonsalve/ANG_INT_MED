import { Component, OnInit, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course.interface';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule, MatGridListModule, MatButtonModule, MatChipsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  private courseService: CourseService = inject(CourseService)
  courseList$: Observable<Course[]> | undefined;

  ngOnInit(): void {
    this.courseList$ = this.courseService.getCourseList()
  }

}
