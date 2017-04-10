import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { RouteParams } from '@angular/router-deprecated';

import { Post } from '../models/post';


@Component({
  selector: 'dev-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostListComponent implements OnInit {

  ngOnInit() {

  }
  
  // total$: Observable<number>;
  // items$: Observable<Post[]>;

  // page: number = 1;
  // terms: string = "";

  // private searchTermStream = new Subject<string>()
  // private pageStream = new Subject<number>()

  // constructor(protected params: RouteParams, protected postService: PostService) {
  //   this.page = 1; // parseInt(params.get('page')) || 1;
  //   this.terms = ""; // params.get('q') || "";
  // }

  // ngOnInit() {
  //   const pageSource = this.pageStream.map(pageNumber => {
  //     this.page = pageNumber;
  //     return { search: this.terms, page: pageNumber }
  //   });

  //   const searchSource = this.searchTermStream
  //     .debounceTime(1000)
  //     .distinctUntilChanged()
  //     .map(searchTerm => {
  //       this.terms = searchTerm;
  //       return { search: searchTerm, page: 1 }
  //     });

  //   const source = pageSource
  //     .merge(searchSource)
  //     .startWith({ search: this.terms, page: this.page })
  //     .mergeMap((params: { search: string, page: number }) => {
  //       return this.postService.list(params.search, params.page)
  //     })
  //     .share();

  //   this.total$ = source.pluck('total');
  //   this.items$ = source.pluck('items');
  // }

  // search(terms: string) {
  //   this.searchTermStream.next(terms);
  // }

  // goToPage(page: number) {
  //   this.pageStream.next(page);
  // }
}