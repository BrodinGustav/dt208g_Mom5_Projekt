import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //Importerar HttpClient
import { Observable } from 'rxjs';
import { Courses } from '../../models/courses';   //Importerar interface för courses

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json'; //URL:en till JSON-fil

  constructor(private http: HttpClient) { }         //HttpClient inkluderas

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.apiUrl);     
  }
}