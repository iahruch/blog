import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs";
import {IPost} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<IPost>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.paramMap
      .pipe(
        switchMap( (param: ParamMap) => {
          return this.postService.getPost(param.get('id'));
        })
      )
  }

}
