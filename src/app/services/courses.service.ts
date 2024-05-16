import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //Importerar HttpClient
import { Observable } from 'rxjs';
import { Courses } from '../../models/courses';   //Importerar interface för courses

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = "./assets/miun_courses.json"; //Hämtar JSON-filen lokalt från assets-mappen
  
  constructor(private http: HttpClient) { }         //HttpClient inkluderas

  //Hämta poster från JSON-filen
  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.apiUrl);      //Anropa URL och hämta data enligt interface Courses
  }
}