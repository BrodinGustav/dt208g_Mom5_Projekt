import { CommonModule } from '@angular/common';                   //Används för *ngFor etc
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/courses.service';      //Importerar kurs-service
import { ScheduleService } from '../services/framework.service';      //Importerar ramschema-service
import { Courses } from '../../models/courses';                   //Importerar interface för kurser
import { Framework } from '../../models/framework';                   //Importerar interface för ramschema
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
  uniqueSubjects: string[] = [];                                  //Array för att lagra unika ämnen som ska användas till sortering vid sökning
  searchTerm: string = '';                                        //Sökterm för filtrering av kurser
  sortColumn: string = "";                                        //initierar egenskap för metod sortTable  
  isAscending: boolean = true;                                    //initierar egenskap för metod sortTable
  subjectSearchTerm: string = '';                                 //initierar egenskap för metod filterCoursesBySubject
  buttonClicked: boolean[] = [];                                 //Array med Booleanska värden för att spåra status för varje knapp

  constructor(
    private courseService: CourseService,                         //Injicering av CourseService
    private ScheduleService: ScheduleService                      //Deklarerar ScheduleService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {                  //Anropar getCourses() från courseService. Data från api hämtas som courses
      this.courses = courses;                                               // Tilldelar hämtade kurser till courses-array
      this.filteredCourses = [...courses];                                  //Kopia av hämtade kurser skapas och tilldelas this.filteredCourses. Kopia görs för att ha 2 separat arrayer, en för sortering och en för filtrering.
      this.extractUniqueSubjects();                                         //Tildelar unika ämnen som lagras i uniqueSubjects-array
      this.buttonClicked = new Array(courses.length).fill(false);           //Initierar arrayen med false för varje kurs (ingen är klickad på)
    });
  }

  //Funktion för att filtrera kurser baserat på sökterm
  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||    //Filtrering efter kurskod
      course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())       //Filtrering efter kursnamn
    );
  }

  filterCoursesBySubject(): void {
    this.filteredCourses = this.courses.filter(course =>                            //Tilldelar ny array till filteredCourses efter att filtrerat this.courses-array  
      course.subject.toLowerCase().includes(this.subjectSearchTerm.toLowerCase())   //Filtrering efter ämne
    );
  }

  //Funktion för att lägga till kurs till ramschemat
  addToSchedule(course: Courses): void {                                            
    const scheduledCourse: Framework = {                                            //Skapa variabel av typen Framework
      courseCode: course.courseCode,
      courseName: course.courseName,
      points: course.points,
      subject: course.subject,
      syllabus: course.syllabus
    };
    this.ScheduleService.addToSchedule(scheduledCourse);                            //ScheduleService används för att lägga till den nya kursen i ramschemat. addToSchedule-metod återfinns i framework.service.ts
                                     
  }

  // Metod för att sortera tabellen
  sortTable(column: string): void {
    if (this.sortColumn === column) {         //Kontroll för att se om sortColumn är samma som användaren klickade på
      this.isAscending = !this.isAscending;   //Om samma kolumn byts riktning på sortering
    } else {
      this.sortColumn = column;               
      this.isAscending = true;
    }

    this.filteredCourses.sort((a, b) => {            //a, b representerar 2 element som jämförs för att bestämma stigande/fallande ordning
      //Kontroll om column finns i a och b 
      if(a[column] && b[column]){
        
        //Kontroll om egenskap är "points", om ja används numerisk jämförelse
        if(column === "points"){
          return this.isAscending ? a[column] - b[column] : b[column] - a[column];
        }
        
        // Kontroll om a[column] och b[column] är strängar innan toLowerCase() används
      if (typeof a[column] === 'string' && typeof b[column] === 'string') {
      const valueA = a[column].toLowerCase();         //Hämtar värde för kolumen "a" och konverterar till små bokstäver 
      const valueB = b[column].toLowerCase();
      return this.isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);  //Jämför värde A och B för att se om ordningen ska sorteras stigande eller fallande.
      }
      
    }else{
      //returnera 0 ifall column ej finns för att inte ändra ordningen
      return 0;
    }
    });
  }

 // Funktion för att räkna antalet kurser i den aktuella filtreringen
 getTotalCourses(): number {
  return this.filteredCourses.length;
}

//Funktion som loopar igenom kurser, tar ut unika ämnen och lagrar de i uniqueSubjects
extractUniqueSubjects(): void {
  const subjectsSet = new Set<string>();
  this.courses.forEach(course => {
    subjectsSet.add(course.subject);
  });
  this.uniqueSubjects = Array.from(subjectsSet);
}

}
