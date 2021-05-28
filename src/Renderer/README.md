## How to use
### Component
```js
import { VanillaRenderer, Renderer } from "@egjs/infinitegrid";

// Use VanillaRenderer or Renderer

// Component
class Component {
  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }
  // Sync items and elements
  render(items) {
    this.renderer.render(items);
  }

  // Force update if you want to show only part of it internally
  update() {
    // If true is returned, the update event is not called. (for vanilla)
    // If false is returned, the update event is called. (for framework)
    if (this.renderer.update()) {
      // vanilla
      this.render();
    }
  }

  // set renderer container for vanilla
  setContainer(container) {
    this.renderer.setContainer(container);
  }
}

```
### Vanilla
```js
const component = new Component(new VanillaRenderer());

// render item with element
component.render([
  { key: 1, element: element1 },
  { key: 2, element: element2 },
  { key: 3, element: element3 },
]);


component.update();
```

### Framework
```jsx
import * as React from "react";
import { Renderer } from "@egjs/infinitegrid";

class ReactComponent extends React.Component {
  containerRef = React.createRef();
  render() {
    const items = [
      { key: 1 },
      { key: 2 },
      { key: 3 },
    ];
    // render only items
    this.component?.render(items);
    return <div ref={this.containerRef} onClick={() => {
      this.component.update();
    }}>
    {items.map((item) => (<div key={item.key}>{item.key}</div>))}
  </div>;
  }
  componentDidUpdate() {
    // update elements in items
    this.renderer.updated(this.containerRef.current!.children);
  }
  componentDidMount() {
    const renderer = new Renderer();
    const component = new Component(renderer);

    this.renderer = renderer;
    this.component = component;

    component.render([
      { key: 1 },
      { key: 2 },
      { key: 3 },
    ]);
    renderer.updated(this.containerRef.current!.children);
    renderer.on("update", () => {
      this.forceUpdate();
    });
  }
}
```

