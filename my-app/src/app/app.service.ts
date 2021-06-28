import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  /**
   *    get specific file or all files if fileName is ''
   */
  getFile(fileName: string = '') {
    return this.http.get(`${this.rootURL}/file?name=${fileName}`);
  }



}
