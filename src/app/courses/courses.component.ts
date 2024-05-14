import { CommonModule } from '@angular/common';                   //Används för *ngFor etc
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/courses.service';      //Importerar kurs-service
import { Courses } from '../../models/courses';                   //Importerar interface för kurser
import { FormsModule } from '@angular/forms';                     //För ngModule i formulär

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Courses[] = [];                                        //Array för att lagra alla kurser
  filteredCourses: Courses[] = [];                                //Array för att lagra filtrerade kurser
  searchTerm: string = '';                                        //Sökterm för filtrering av kurser

  constructor(private courseService: CourseService) { }           //Injicering av CourseService

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {        //Hämtar kurser från kurs-service 
      this.courses = courses;                                     //Tilldelar hämtade kurser till courses-array
      this.filteredCourses = courses;                             //Tilldelar samma kurser till filteredCourses-array
    });
  }

  //Funktion för att filtrera kurser baserat på sökterm
  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||    //Filtrering efter kurskod
      course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())       //Filtrering efter kursnamn
    );
  }
}

