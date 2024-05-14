import { Injectable } from '@angular/core';
import {Framework} from '../../models/framework'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly scheduleKey = 'schedule';                          //Nyckel som används för att lagra schemainformation i localStorage

  constructor() { }


//Funktion för att hämta data från localStorage
getSchedule(): Framework [] {
  const scheduleString = localStorage.getItem(this.scheduleKey);      //Hämta data från localStorage med hjälp av nyckel
  return scheduleString ? JSON.parse(scheduleString) : [];            //Om data finns, konvertera det från JSON till array av scheduleCourse-objekt och returnera. Om ingen data, returnera tom array
}

//Funktion för att lägga till kurs i ramschema
addToSchedule(course: Framework): void {
  const schedule = this.getSchedule();                                //Hämta schema från localStorage
  schedule.push(course);                                              //Lägg till ny kurs i schemat
  localStorage.setItem(this.scheduleKey,JSON.stringify(schedule) );   //Spara uppdaterat schema i localStorage som JSON-sträng
}

//Funktion för att ta bort kurs från schemat baserat på kurskod
removeFromSchedule(courseCode: string): void {
  let schedule = this.getSchedule();                                  //Hämta schema från localStorage

  //Filtrera bort kurs som matchar kurskod och uppdatera schema
  schedule = schedule.filter(course => course.courseCode !== courseCode);

  localStorage.setItem(this.scheduleKey, JSON.stringify(schedule));    //Spara uppdaterat schema i localStorage
}

//Funktion för beräkning av antal högskolepoäng
getTotalPoints(): number {
  const schedule = this.getSchedule();                                //Hämta schema från localStorage

  //Summera poäng för alla kurser och returnera den totala summan
  return schedule.reduce((total, course) => total + course.points, 0);
}

}
  
