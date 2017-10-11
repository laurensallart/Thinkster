import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SessionsService,
  User,
  UserService,
  Session,
} from '../shared';

@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit {
  results: Session[];
  currentDayResults: Session[];
  nextDayResults: Session[];
  nextNextDayResults: Session[];
  processedResults;
  currentDay: string;
  nextDay;
  nextNextDay;

  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private userService: UserService,
  ) { }

  @Input() slug: string;

  ngOnInit() {
    // Retreive the prefetched client

    this.setCurrentDates(new Date());
    this.runQuery();
  }

  nextDays() {
    this.setCurrentDates(new Date(this.nextDay));
    this.runQuery();
  }

  previousDays() {
    var yesterday = new Date(this.currentDay);
    yesterday.setDate(yesterday.getDate() - 1);
    this.setCurrentDates(yesterday);
    this.runQuery();
  }

  runQuery() {
    this.sessionsService.getDay(this.currentDay)
    .subscribe(data => {
      this.results = data;
      this.processedResults = this.splitResultPerDay(this.results);
      this.currentDayResults = this.processedResults[this.currentDay];
      this.nextDayResults = this.processedResults[this.nextDay];
      this.nextNextDayResults = this.processedResults[this.nextNextDay];
    });
  }

  splitResultPerDay(results) {
    var sessionsPerDate = {};
    var session;
    for (session in results) {
      var date = new Date(results[session].date);
      if (this.dateToString(date) in sessionsPerDate) {
        sessionsPerDate[this.dateToString(date)].push(results[session]);
      } else {
        sessionsPerDate[this.dateToString(date)] = [results[session]];
      }
    }
    return sessionsPerDate;
  }

  setCurrentDates(date) {
    this.currentDay = this.dateToString(date);
    this.nextDay = this.dateToString(new Date(date.setDate(date.getDate() + 1)));
    this.nextNextDay = this.dateToString(new Date(date.setDate(date.getDate() + 1)));
  }

  remove_session(id: any) {
    console.log("removing session ");
    this.sessionsService.destroy(id)
    .subscribe((res) => {console.log('ssuucceess!'); console.log(res)})
  }

  dateToString(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  
};

