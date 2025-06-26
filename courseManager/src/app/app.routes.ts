import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseManagerComponent } from './components/course-manager/course-manager.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

export const routes: Routes = [
    {path:'', redirectTo: '/cursos', pathMatch: 'full'},
    {path: 'cursos', component: CoursesComponent, 
    children: [
        { path:'detail/:id', component: CourseDetailComponent }
    ]},
    {path: 'admin', component: CourseManagerComponent}
];
