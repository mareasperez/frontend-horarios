import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { wsModel } from 'src/app/models/ws.model';
import { Api } from 'src/app/models/api.model';

@Injectable()
export class MainService {

  public client: HttpClient;
  public api = Api;
  public list: any[] = [];
  public list$ = new Subject<any[]>()

  public resource: string;
  constructor(client: HttpClient) {
    this.client = client;
  }

  getUrl() {
    return `${this.api}/${this.resource}/`;
  }

  get(): Observable<any> {
    return this.client.get<any>(this.getUrl());

  }
  getByID(id: number|string): Observable<any> {
    return this.client.get<any>(`${this.getUrl()}${id}`);

  }

  create(body: any): Observable<any> {
    const head: any = {};
    head['Content-Type'] = 'application/json';
    console.log('post: ', body);
    return this.client.post(this.getUrl(), body, head);
  }

  update(body: any, id: string|number): Observable<any> {
    const head: any = {};
    head['Content-Type'] = 'application/json';
    return this.client.put(`${this.getUrl()}${id}`, body, head);
  }

  delete(id: any): Observable<any> {
    const head: any = {};
    head['Content-Type'] = 'application/json';
    return this.client.delete(this.getUrl() + id, head);
  }

  getList() {
    return this.list$.asObservable();
  }

  getByFiltro(filtro: string, id: string|number): Observable<any> {
    return this.client.get<any>(`${this.getUrl()}${filtro}=${id}`);
  }

  updateList(data: wsModel) {
  }
}
