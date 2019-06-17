import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../models/api.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  public client: HttpClient;
  public api = Api;  

  constructor(client: HttpClient, private resource:string) {
    this.client = client;
  }

  getUrl(){
    return `${this.api}/${this.resource}/`;
  }

  get():Observable<any>{
    return this.client.get<any>(this.getUrl());

  }

  create(body:any):Observable<any>{
    let head:any = {}
    head['Content-Type'] = 'application/json';
    return this.client.post(`${this.api}/${this.resource}`,body, head);
  }

  update(body:any):Observable<any>{
    let head:any = {}
    head['Content-Type'] = 'application/json';
    return this.client.put(`${this.api}/${this.resource}`,body, head);
  }

  delete(body:any):Observable<any>{
    let head:any = {}
    head['Content-Type'] = 'application/json';
    return this.client.delete(`${this.api}/${this.resource}`,body,);
  }
}
