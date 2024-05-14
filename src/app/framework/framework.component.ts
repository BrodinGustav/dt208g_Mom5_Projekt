import { CommonModule } from '@angular/common';   
import { Component, OnInit } from '@angular/core';
import { Framework } from '../../models/framework';
import { ScheduleService } from '../services/framework.service';
import { FormsModule } from '@angular/forms';       

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  schedule: Framework[] = [];
  totalPoints: number = 0;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.calculateTotalPoints();
  }

  addToSchedule(course: Framework): void {
    this.scheduleService.addToSchedule(course);
    this.loadSchedule();
  }

  removeFromSchedule(courseCode: string): void {
    this.scheduleService.removeFromSchedule(courseCode);
    this.loadSchedule();
  }

  calculateTotalPoints(): void {
    this.totalPoints = this.scheduleService.getTotalPoints();
  }
}