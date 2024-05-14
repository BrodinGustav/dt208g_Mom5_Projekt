import { Routes } from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},  
    {path: 'framework', component: FrameworkComponent},  
    {path: '', redirectTo: '/home', pathMatch: 'full'},              //Dirigerar tillbaka till startsidan
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];
