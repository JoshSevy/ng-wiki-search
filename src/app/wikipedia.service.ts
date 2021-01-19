import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { pluck } from 'rxjs/operators'

interface WikiResponse {
  query: {
    search: {
      pageid: number;
      snippet: string;
      title: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  url: string = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space';

  constructor(private http: HttpClient) {}

  public search(term: string)  {
    return this.http.get<WikiResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      pluck('query', 'search')
    );
  }
}
