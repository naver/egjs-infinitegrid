/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import * as React from "react";
import VanillaInfiniteGrid, {
  InfiniteGridOptions, InfiniteGridFunction,
  Renderer,
  InfiniteGridItemInfo, ITEM_TYPE,
  InfiniteGridMethods,
  withInfiniteGridMethods,
  getRenderingItems,
  mountRenderingItems,
} from "@egjs/infinitegrid";
import { ReactInfiniteGridProps } from "./types";
import { REACT_INFINITEGRID_PROPS, REACT_INFINITEGRID_EVENT_MAP } from "./consts";
import { isFunction } from "./utils";

export abstract class InfiniteGrid<T extends InfiniteGridOptions>
  extends React.Component<T & ReactInfiniteGridProps & { [key: string]: any }> {
  public static GridClass: InfiniteGridFunction;
  @withInfiniteGridMethods
  private _grid!: VanillaInfiniteGrid;
  private _wrapperRef = React.createRef<HTMLDivElement>();
  private _containerRef = React.createRef<HTMLDivElement>();
  private _renderer!: Renderer;

  public render() {
    const attributes: { [key: string]: any } = {};
    const props = this.props;
    const GridClass = (this.constructor as typeof InfiniteGrid).GridClass;
    const defaultOptions = GridClass.defaultOptions;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Tag = props.tag as any || "div";

    for (const name in props) {
      if (name in defaultOptions || REACT_INFINITEGRID_PROPS.indexOf(name as any) > -1) {
        continue;
      }
      attributes[name] = props[name];
    }

    return <Tag ref={this._wrapperRef} {...attributes}>
      {this._renderContainer()}
    </Tag>;
  }
  public componentDidMount() {
    const GridClass = (this.constructor as typeof InfiniteGrid).GridClass;
    const defaultOptions = GridClass.defaultOptions;
    const options: Partial<InfiniteGridOptions> = {};
    const props = this.props;
    const containerElement = this._containerRef.current;

    for (const name in defaultOptions) {
      if (name in props) {
        (options as any)[name] = (props as any)[name];
      }
    }
    if (containerElement) {
      options.container = containerElement;
    }
    this._renderer = new Renderer();
    options.renderer = this._renderer;
    const grid = new GridClass(this._wrapperRef.current!, options);

    for (const eventName in REACT_INFINITEGRID_EVENT_MAP) {
      const nativeEventName = (REACT_INFINITEGRID_EVENT_MAP as any)[eventName];

      grid.on(nativeEventName, (e: any) => {
        const callback = this.props[eventName];

        callback && callback(e);
      });
    }

    this._grid = grid;
    this._renderer.on("update", () => {
      this.setState({});
    });

    mountRenderingItems(this._getItemInfos(), {
      grid,
      useFirstRender: props.useFirstRender,
      useLoading: props.loading,
      usePlaceholder: props.placeholder,
      horizontal: props.horizontal,
      status: props.status,
    });
    this._renderer.updated();
  }

  public componentDidUpdate() {
    const GridClass = (this.constructor as typeof InfiniteGrid).GridClass;
    const propertyTypes = GridClass.propertyTypes;
    const props = this.props;
    const grid = this._grid;

    for (const name in propertyTypes) {
      if (name in props) {
        (grid as any)[name] = (props as any)[name];
      }
    }
    this._renderer.updated();
  }

  public componentWillUnmount() {
    this._grid.destroy();
  }

  private _getItemInfos(): InfiniteGridItemInfo[] {
    const props = this.props;
    const children = React.Children.toArray(props.children) as React.ReactElement[];
    const attributePrefix = props.attributePrefix || VanillaInfiniteGrid.defaultOptions.attributePrefix;
    const itemBy = props.itemBy || ((item: React.ReactElement) => item.key);
    const groupBy = props.groupBy || ((item: React.ReactElement) => item.props[`${attributePrefix}groupkey`]);

    return children.map((child, i) => {
      return {
        groupKey: groupBy(child, i),
        key: itemBy(child, i),
        data: {
          jsx: child,
        },
      };
    });
  }
  private _renderContainer() {
    const props = this.props;
    const visibleChildren = this._getVisibleChildren();
    const container = props.container;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ContainerTag = props.containerTag as any || "div";

    if (container === true) {
      return <ContainerTag ref={this._containerRef}>
        {visibleChildren}
      </ContainerTag>;
    } else {
      return visibleChildren;
    }
  }
  private _getVisibleChildren() {
    const props = this.props;
    const placeholder = props.placeholder;
    const loading = props.loading;
    const visibleItems = getRenderingItems(this._getItemInfos(), {
      grid: this._grid,
      status: props.status,
      horizontal: props.horizontal,
      useFirstRender: props.useFirstRender,
      useLoading: props.loading,
      usePlaceholder: props.placeholder,
    });

    return visibleItems.map((item) => {
      if (item.type === ITEM_TYPE.VIRTUAL) {
        return React.cloneElement(isFunction(placeholder) ? placeholder(item) : placeholder, { key: item.key });
      } else if (item.type === ITEM_TYPE.LOADING) {
        return React.cloneElement(isFunction(loading) ? loading(item) : loading, { key: item.key });
      } else {
        return item.data.jsx;
      }
    });
  }
}
export interface InfiniteGrid<T extends InfiniteGridOptions> extends InfiniteGridMethods<InfiniteGrid<T>> { }
