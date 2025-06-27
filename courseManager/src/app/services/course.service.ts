import { Injectable, inject } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
private api = inject(HttpClient)

  getCourseList(): Observable<Course[]>{
    return this.api.get(`${env.apiEndpoint}/course`) as Observable<Course[]>
  }

  getDetailCourse(id: number): Observable<Course>{
    return this.api.get(`${env.apiEndpoint}/course/${id}`) as Observable<Course>
  }

  createCourse(course: Course): Observable<any>{
    return this.api.post(`${env.apiEndpoint}/course`, course)
  }

  updateCourse(course: Course): Observable<any>{
    return this.api.put(`${env.apiEndpoint}/course`, course)
  }

  deleteCourse(id: number): Observable<any>{
    return this.api.delete(`${env.apiEndpoint}/course/${id}`)
  }
}
