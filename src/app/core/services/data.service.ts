import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataArraySubject = new BehaviorSubject<string[]>([]);
  dataArray$ = this.dataArraySubject.asObservable();

  setDataArray(dataArray: string[]): void {
    this.dataArraySubject.next(dataArray);
  }

  constructor() {
  }
}
