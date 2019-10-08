import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter, OnDestroy, OnChanges,
  AfterViewInit, AfterViewChecked,
} from '@angular/core';

import NativeInfiniteGrid, {
  GridLayout,
  ILayout,
  IInfiniteGridGroup,
  categorize,
  ItemManager,
  InfiniteGridMethods,
  IItem,
  IInfiniteGridStatus,
  IInfiniteGridItem,
  StyleType,
  IGNORE_CLASSNAME,
  IInfiniteGridOptions,
} from '@egjs/infinitegrid';
import ListDiffer from '@egjs/list-differ';
import { TEMPLATE } from './consts';

@Component({
  selector: 'ngx-infinitegrid, [NgxInfiniteGrid]',
  template: TEMPLATE,
  styles: []
})
export class NgxInfinitegridComponent
  implements OnInit, AfterViewInit, AfterViewChecked,
  OnDestroy, OnChanges, InfiniteGridMethods {
  private ig!: NativeInfiniteGrid;

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
  private requestGroups: IInfiniteGridGroup[] = [];
  private visibleDiffer: ListDiffer<IItem> = new ListDiffer<IItem>([], item => item.itemKey);
  private nextFunction = () => { };

  constructor(private elRef: ElementRef) { }
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
    this.ig.sync(this.getElements(), this.requestGroups);

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
    }).on('render', ({ next, requestGroups }) => {
      if (requestGroups) {
        setTimeout(() => {
          this.nextFunction = next;
          this.requestGroups = requestGroups;
          this.updateVisibleItems(this.getVisibleItems());
          this.isChange = true;
        });
      } else {
        setTimeout(() => {
          this.nextFunction = next;
          this.isChange = true;
        });
      }
    }).on('append', e => {
      this.append.emit({ ...e, currentTarget: this });
    }).on('prepend', e => {
      this.prepend.emit({ ...e, currentTarget: this });
    }).on('imageError', e => {
      this.imageError.emit({ ...e, currentTarget: this });
    }).on('change', e => {
      this.change.emit({ ...e, currentTarget: this });
    }).on('layoutComplete', e => {
      this.layoutComplete.emit({ ...e, currentTarget: this });
    });
    const ig = this.ig;

    ig.setLayout(GridLayout, { ...this.layoutOptions });


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
    return this.ig.startLoading(isAppend, userStyle);
  }
  public endLoading(userStyle: StyleType = { display: 'none' }) {
    return this.ig.endLoading(userStyle);
  }
  public getItem(groupIndex: HTMLElement | number = 0, itemIndex?: number): IInfiniteGridItem | undefined {
    return this.ig.getItem(groupIndex, itemIndex);
  }
  public updateItem(groupIndex?: number, itemIndex?: number) {
    return this.ig.updateItem(groupIndex, itemIndex);
  }
  public updateItems() {
    return this.ig.updateItems();
  }
  public moveTo(index: number, itemIndex = 0) {
    return this.ig.moveTo(index, itemIndex);
  }
  public layout(isRelayout = true) {
    return this.ig.layout(isRelayout);
  }
  public getStatus(startKey?: string | number, endKey?: string | number): IInfiniteGridStatus {
    return this.ig.getStatus(startKey, endKey);
  }
  public setStatus(status: IInfiniteGridStatus, applyScrollPos = true, syncElements?: HTMLElement[]) {
    return this.ig.setStatus(status, applyScrollPos, syncElements);
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
    return this.ig.getRenderingItems(this.requestGroups).map(item => item.data);
  }
  private toItems() {
    return this.items.map(item => ({
      groupKey: item.groupKey,
      itemKey: item.itemKey,
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
