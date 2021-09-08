import { Component, Input } from '@angular/core';
import { OnRequestAppend, ITEM_TYPE } from '@egjs/infinitegrid';


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
  getItems(nextGroupKey: number, count: number) {
    const nextItems = [];
    const nextKey = nextGroupKey * count;

    for (let i = 0; i < count; ++i) {
      nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
  }
  groupBy(_: any, item: any) {
    return item.groupKey;
  }
  trackBy(_: any, item: any) {
    return item.key;
  }
  onRequestAppend(e: OnRequestAppend) {
    const nextGroupKey = (+e.groupKey! || 0) + 1;

    e.wait();
    e.currentTarget.appendPlaceholders(10, nextGroupKey);

    setTimeout(() => {
      e.ready();
      this.items = [
        ...this.items,
        ...this.getItems(nextGroupKey, 10),
      ];
    }, 2000);
  }
}
