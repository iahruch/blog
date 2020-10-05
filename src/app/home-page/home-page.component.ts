import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {IPost} from "../shared/interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<IPost[]>

  constructor(
    private postsService: PostService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
  }

}
