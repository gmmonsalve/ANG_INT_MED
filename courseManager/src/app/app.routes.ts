import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseManagerComponent } from './components/course-manager/course-manager.component';

export const routes: Routes = [
    { path:'', redirectTo: '/cursos', pathMatch: 'full' },
    { path: 'cursos', component: CoursesComponent },
    { path: 'admin', component: CourseManagerComponent }
];
