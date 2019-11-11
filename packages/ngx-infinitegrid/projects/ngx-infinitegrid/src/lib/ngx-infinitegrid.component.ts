import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter, OnDestroy, OnChanges,
  AfterViewInit, AfterViewChecked,
} from '@angular/core';

import NativeInfiniteGrid, {
  GridLayout,
  ILayout,
  categorize,
  ItemManager,
  IItem,
  IInfiniteGridStatus,
  IInfiniteGridItem,
  StyleType,
  IGNORE_CLASSNAME,
  IInfiniteGridOptions,
  INFINITEGRID_EVENTS,
} from '@egjs/infinitegrid';
import ListDiffer from '@egjs/list-differ';
import { TEMPLATE } from './consts';
import { InfiniteGridType } from './types';

@Component({
  selector: 'ngx-infinitegrid, [NgxInfiniteGrid]',
  template: TEMPLATE,
  styles: []
})
export class NgxInfiniteGridComponent
  implements OnInit, AfterViewInit, AfterViewChecked,
  OnDestroy, OnChanges, InfiniteGridType<NgxInfiniteGridComponent> {
  private ig!: NativeInfiniteGrid;

  @Input() public trackBy: ((index: number, item: any) => any) = ((_, item) => item.key);
  @Input() public groupBy: ((index: number, item: any) => any) = ((_, item) => item.groupKey);
  @Input() public items: IItem[] = [];
  @Input() public status!: IInfiniteGridStatus;
  @Input() public loading!: HTMLElement;
  @Input() public useFirstRender = false;
  @Input() public layoutType: new () => ILayout = GridLayout;
  @Input() public options: Partial<IInfiniteGridOptions> = {};
  @Input() public layoutOptions: Partial<ILayout['options']> = {};

  @Output() public append: EventEmitter<any> = new EventEmitter();
  @Output() public prepend: EventEmitter<any> = new EventEmitter();
  @Output() public imageError: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-native
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @Output() public layoutComplete: EventEmitter<any> = new EventEmitter();
  @Output() public visibleChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('wrapper', { static: false }) wrapperRef: ElementRef;
  @ViewChild('container', { static: false }) containerRef: ElementRef;

  public visibleItems: IItem[] = [];

  private layoutState = '';
  private isChange = false;
  private visibleDiffer: ListDiffer<IItem> = new ListDiffer<IItem>([], item => item.itemKey);
  private nextFunction = () => { };

  constructor(public elRef: ElementRef) { }
  ngOnInit() {
    const groups = categorize(this.items);

    if (this.status) {
      const { startCursor, endCursor } = this.status._infinite;

      this.updateVisibleItems(ItemManager.pluck(groups.slice(startCursor, endCursor + 1), 'items').map(item => item.data));
    } else if (this.useFirstRender && groups[0]) {
      this.updateVisibleItems(groups[0].items.map(item => item.data));
    }
  }
  ngOnChanges(changes) {
    const ig = this.ig;
    if (!ig) {
      return;
    }
    const result = ig.beforeSync(this.toItems());

    this.layoutState = result === 'relayout' ? result : this.layoutState || result;
    this.updateVisibleItems(this.getVisibleItems());
    this.isChange = true;

    if (changes.loading) {
      ig.setLoadingBar({
        append: this.loading,
        prepend: this.loading,
      });
    }
  }
  ngAfterViewChecked() {
    if (!this.isChange) {
      return;
    }
    this.isChange = false;
    this.ig.sync(this.getElements());

    const layoutState = this.layoutState;
    if (layoutState) {
      this.layoutState = '';
      this.ig.layout(layoutState === 'relayout');
    }
    this.nextFunction();
    this.nextFunction = () => { };
  }
  ngAfterViewInit() {
    const ref = this.wrapperRef || this.elRef;

    this.ig = new NativeInfiniteGrid(ref.nativeElement, {
      ...this.options,
      renderExternal: true,
    }).on('render', ({ next }) => {
      setTimeout(() => {
        this.nextFunction = next;
        this.updateVisibleItems(this.getVisibleItems());
        this.isChange = true;
      });
    });
    const ig = this.ig;

    INFINITEGRID_EVENTS.forEach(name => {
      if (!this[name]) {
        return;
      }
      ig.on(name, e => {
        this[name].emit({ ...e, currentTarget: this });
      });
    });
    ig.setLayout(this.layoutType, { ...this.layoutOptions });


    if (this.loading) {
      ig.setLoadingBar({
        prepend: this.loading,
        append: this.loading,
      });
    }
    if (this.status) {
      ig.setStatus(this.status, true, this.getElements());
    } else {
      ig.beforeSync(this.toItems());
      ig.layout(true);
    }
  }
  ngOnDestroy() {
    this.ig.destroy();
  }

  public isLoading() {
    return this.ig.isLoading();
  }
  public isProcessing() {
    return this.ig.isProcessing();
  }
  public startLoading(isAppend?: boolean, userStyle: StyleType = { display: 'block' }) {
    this.ig.startLoading(isAppend, userStyle);
    return this;
  }
  public endLoading(userStyle: StyleType = { display: 'none' }) {
    this.ig.endLoading(userStyle);
    return this;
  }
  public getItem(groupIndex: HTMLElement | number = 0, itemIndex?: number): IInfiniteGridItem | undefined {
    return this.ig.getItem(groupIndex, itemIndex);
  }
  public updateItem(groupIndex?: number, itemIndex?: number) {
    this.ig.updateItem(groupIndex, itemIndex);
    return this;
  }
  public updateItems() {
    this.ig.updateItems();
    return this;
  }
  public moveTo(index: number, itemIndex = 0) {
    this.ig.moveTo(index, itemIndex);
    return this;
  }
  public layout(isRelayout = true) {
    this.ig.layout(isRelayout);
    return this;
  }
  public getStatus(startKey?: string | number, endKey?: string | number): IInfiniteGridStatus {
    return this.ig.getStatus(startKey, endKey);
  }
  public setStatus(status: IInfiniteGridStatus, applyScrollPos = true, syncElements?: HTMLElement[]) {
    this.ig.setStatus(status, applyScrollPos, syncElements);
    return this;
  }
  public getItems(includeCached = false): IInfiniteGridItem[] {
    return this.ig.getItems(includeCached);
  }
  public getGroupKeys(includeCached?: boolean) {
    return this.ig.getGroupKeys(includeCached);
  }
  public getLoadingBar(isAppend?: boolean) {
    return this.ig.getLoadingBar(isAppend);
  }
  private getElements() {
    const ref = this.containerRef || this.wrapperRef || this.elRef;

    const elements = [].slice.call(ref.nativeElement.children);

    if (this.loading) {
      return elements.filter(el => {
        return el.className.indexOf(IGNORE_CLASSNAME) < 0;
      });
    }
    return elements;
  }
  private getVisibleItems() {
    return this.ig.getRenderingItems().map(item => item.data);
  }
  private toItems() {
    const groupBy = this.groupBy;
    const trackBy = this.trackBy;
    return this.items.map((item, i) => ({
      groupKey: groupBy(i, item),
      itemKey: trackBy(i, item),
      data: item,
    }));
  }
  private updateVisibleItems(items: IItem[]) {
    const { added, changed, removed } = this.visibleDiffer.update(items);

    this.visibleItems = items;
    if (added.length || changed.length || removed.length) {
      this.visibleChange.emit(items);
    }
  }
}
