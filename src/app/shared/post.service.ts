import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPost} from "./interfaces";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  create(post: IPost): Observable<IPost> {
      return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
        .pipe(
          map( (res: {name: string}) => {
            return {
              ...post,
              id: res.name,
              date: new Date(post.date)
            }
          })
      );
  }

  getPost(id: string): Observable<IPost> {
    return this.http.get(`${environment.fbDBUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
                ...post, id,
                date: new Date(post.date)
              }
            })
      );
  }

  getPosts(): Observable<IPost[]> {
      return this.http.get(`${environment.fbDBUrl}/posts.json`)
        .pipe(
          map(post => {
            return Object.entries(post)
              .map( i => {
                return {
                  ...i[1],
                  id: i[0],
                  date: new Date(i[1].date)
                }
              })
          }),
        );
  }

  removePost(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/posts/${id}.json`)
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDBUrl}/posts/${post.id}.json`, post)
  }

}
