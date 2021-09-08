import { Component, Input, ViewChild } from '@angular/core';
import { OnRequestAppend, ITEM_TYPE, STATUS_TYPE, InfiniteGridStatus, OnRequestPrepend } from '@egjs/infinitegrid';
import { NgxInfiniteGridComponent } from 'projects/ngx-infinitegrid/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    "../../../../../../stories/templates/default.css",
  ],
})
export class AppComponent {
  @Input() key: any;
  ITEM_TYPE = ITEM_TYPE;
  randomTrackBy = () => this.key;
  items = this.getItems(0, 10);
  itemStatus: any[] = [];
  status: InfiniteGridStatus | null = null;
  @ViewChild("ig") ig!: NgxInfiniteGridComponent;
  saveStatus() {
    const status = this.ig.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS);
    const [startCursor, endCursor] = status.groupManager.itemCursors;

    this.itemStatus = this.items.slice(startCursor, endCursor + 1);
    this.status = status;
  }
  restoreStatus() {
    if (!this.status) {
      return;
    }
    this.key = Math.random();
    this.items = this.itemStatus;
  }
  getItems(nextGroupKey: number, count: number) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
      const nextKey = nextGroupKey * count + i;

      nextItems.push({ groupKey: nextGroupKey, key: nextKey });
    }
    return nextItems;
  }
  groupBy(_: any, item: any) {
    return item.groupKey;
  }
  trackBy(_: any, item: any) {
    return item.key;
  }
  onRequestPrepend(e: OnRequestPrepend) {
    if (e.isVirtual) {
      this.items = [
        ...this.getItems(+e.nextGroupKey!, 10),
        ...this.items,
      ];
      return;
    }
  }
  onRequestAppend(e: OnRequestAppend) {
    if (e.isVirtual) {
      this.items = [
        ...this.items,
        ...this.getItems(+e.nextGroupKey!, 10),
      ];
      return;
    }
    const nextGroupKey = (+e.groupKey! || 0) + 1;

    e.wait();
    e.currentTarget.appendPlaceholders(10, nextGroupKey);

    setTimeout(() => {
      e.ready();
      this.items = [
        ...this.items,
        ...this.getItems(nextGroupKey, 10),
      ];
    }, 100);
  }
}
