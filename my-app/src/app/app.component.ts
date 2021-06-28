import {Component, OnDestroy} from '@angular/core';
import {AppService} from './app.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {States} from './States';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  readonly States = States;
  title = 'angular-viewer';
  state = States.Files;
  files: any[] = [];
  tables: any[] = [];
  fileName = '';
  currentTable: any = {};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private appService: AppService) {
    this.getAllFiles();

  }




  getAllFiles() {
    this.appService.getFile().pipe(takeUntil(this.destroy$)).subscribe((files: any[]) => {
        this.files = files;
    });
  }
  toState(newState) {
    this.state = newState;
  }
  getTables(fileName) {
    this.fileName = fileName;
    this.appService.getFile(fileName).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      try {
        const temp = JSON.parse(data);
        this.tables = temp.tables;
        this.state = States.Tables;
      } catch (e) {
        this.state = States.Files;
        console.error(e);
      }
    });
  }
  showContent(table) {
    this.currentTable = table;
    this.state = States.Content;
    console.log(this.currentTable);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
