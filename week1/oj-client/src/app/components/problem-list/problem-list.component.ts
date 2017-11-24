import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } FROM '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

  problems : Problem[];

  constructor(private dataService: dataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems(): void {
     this.problems = this.DataService.getProblems();
  }

}
