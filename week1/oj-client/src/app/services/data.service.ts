import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {

  constructor() { }

  getProblems(): Problem[]{
    return PROBLEMS;
  }

  getProblem(id:number): Problem{
    return PROBLEMS.find( (problem) => problem.id === id);
    //short function that takes a problem in the mock data as a param
    //and returns the problem that has the same id as the specified id
  }

}
