import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../models/api.model';
import { wsModel } from 'src/app/models/ws.model'
import { Observable,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  public client: HttpClient;
  public api = Api;
  public list: any[]=[];
  constructor(client: HttpClient, private resource: string) {
    this.client = client;
  }

  getUrl() {
    return `${this.api}/${this.resource}/`;
  }

  get(): Observable<any> {
    return this.client.get<any>(this.getUrl());

  }
  getByID(id:number|string): Observable<any> {
    return this.client.get<any>(`${this.getUrl()}${id}`);

  }

  create(body: any): Observable<any> {
    let head: any = {}
    head['Content-Type'] = 'application/json';
    console.log('post: ',body);
    return this.client.post(this.getUrl(), body, head);
  }

  update(body: any,id: string|number): Observable<any> {
    let head: any = {}
    head['Content-Type'] = 'application/json';
    return this.client.put(`${this.getUrl()}${id}`, body, head);
  }

  delete(id: any): Observable<any> {
    let head: any = {}
    head['Content-Type'] = 'application/json';
    return this.client.delete(this.getUrl() + id, head);
  }

  updateList(data:wsModel){

    switch(data.event){
      case 'C':
        data.data.forEach(el=>{
          this.list.push(el)
        })
        break;
      case 'U':
        let index = this.list.map(el =>{return el.id}).indexOf(data.data[0].id);
        this.list.splice(index, 1, data.data[0])
        break;
      case 'D':
        let indeX = this.list.map(el =>{return el.id}).indexOf(data.data[0].id);
        this.list.splice(indeX, 1)
        break;

    }
    return of(this.list)
  }
}
