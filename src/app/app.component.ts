import { Component, ViewChild, ElementRef } from '@angular/core';
import { of, Observable } from 'rxjs'; 
import { interval, zip, fromEvent } from 'rxjs'; 
import { map, filter, tap, debounceTime } from 'rxjs/operators'; 
import firebase from 'firebase/app';
import 'firebase/firestore';
import { list } from 'rxfire/database';
import { collectionData } from 'rxfire/firestore';
import {environment} from "../environments/environment"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularreactiveprogramming';

  app = firebase.initializeApp(environment.firebaseConfig);

  test = collectionData(this.app.firestore().collection('astronauts'));

  
  //numbers$ = of(10); 
  increment = interval(1000); 

  userAge = this.increment.pipe(
    map(i => i * 10),
    filter(i => i  % 3 === 0 )
    ); 

    data$ = of('a', 'b', 'c', 'd')
    incrementData$ = interval(1000); 

    zippy$ = zip(this.data$, this.incrementData$); 

    task$ = this.zippy$.pipe(
      map(i => i[0])
      )
      

      inputText$ : Observable<any>; 

  @ViewChild("myInput", { "static" : true }) input: ElementRef;
  ngAfterViewInit() {
    this.inputText$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      debounceTime(500),
      map(event => event.target.value)
    );
  }
}
