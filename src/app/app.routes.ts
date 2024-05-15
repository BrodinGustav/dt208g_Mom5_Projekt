import { Routes } from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
    {path: 'courses', component: CoursesComponent},  
    {path: 'framework', component: FrameworkComponent},  
    {path: '', redirectTo: '/courses', pathMatch: 'full'},              //Dirigerar tillbaka till startsidan
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];
