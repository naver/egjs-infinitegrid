import { Component, ViewChild } from '@angular/core';
import { NgxInfiniteGridComponent } from 'projects/ngx-infinitegrid/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('ig', { static: false }) ig: NgxInfiniteGridComponent;
  visibleItems = [];
  title = 'ngx-infinitegrid-app';
  start = 7;
  items = [
    {
      groupKey: 0,
      itemKey: 1,
      no: 0,
    },
    {
      groupKey: 0,
      itemKey: 2,
      no: 1,
    },
    {
      groupKey: 0,
      itemKey: 3,
      no: 2,
    },
    {
      groupKey: 1,
      itemKey: 4,
      no: 3,
    },
    {
      groupKey: 1,
      itemKey: 5,
      no: 4,
    },
    {
      groupKey: 1,
      itemKey: 6,
      no: 5,
    },
  ];
  loadItems(groupKey: number, num: number) {
    const items = this.items;
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push({
        groupKey,
        itemKey: start + i,
        no: start + i,
      });
    }
    this.items = [...items];
    this.start += num;
  }
  onAppend({ currentTarget, groupKey, startLoading }) {
    (window as any).a = this;
    if (currentTarget.isLoading()) {
      return;
    }
    startLoading();
    this.loadItems(parseFloat(groupKey || 0) + 1, 5);
  }
  onLayoutComplete({ isAppend, isLayout, endLoading, fromCache }) {
    if (!isLayout) {
      endLoading();
    }
  }
  onImageError({ totalIndex }) {
    this.items.splice(totalIndex, 1);
    this.items = [ ...this.items ];
  }
  groupBy(index: number, item: any): any {
    return item.groupKey;
  }
  trackBy(index: number, item: any): any {
    return item.itemKey;
  }
}
