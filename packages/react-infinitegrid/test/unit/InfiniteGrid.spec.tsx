import * as React from "react";
import * as ReactDOM from "react-dom";
import { GridLayout } from "../../src/react-infinitegrid";
import { getValue, wait } from "./TestHelper";

describe("test react-infinitegrid", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <style>
        .item {
            width: 100px;
        }
        .container {
            width: 400px;
        }
        </style>
        <div class="container"></div>`;
  });
  afterEach(() => {
    const container = document.querySelector(".container");

    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  });
  it("should check if setStatus method is called dynamically", async () => {
    // Given
    const ref = React.createRef<GridLayout>();
    ReactDOM.render(
      <GridLayout ref={ref} className="test">
        <div
          className="item item1"
          style={{ width: "100px", height: "100px" }}
        ></div>
        <div
          className="item item2"
          style={{ width: "100px", height: "120px" }}
        ></div>
        <div
          className="item item3"
          style={{ width: "100px", height: "80px" }}
        ></div>
        <div
          className="item item4"
          style={{ width: "100px", height: "120px" }}
        ></div>
        <div
          className="item item5"
          style={{ width: "100px", height: "140px" }}
        ></div>
      </GridLayout>,
      document.querySelector(".container")
    );

    await wait();

    const status = ref.current!.getStatus();

    // 0 [0, 0]
    // 1 [100, 0]
    // 2 [200, 0]
    // 3 [300, 0]
    // 4 [80, 200]
    const group = status._itemManager._data[0];
    const items = group.items;

    // Crooked
    group.outlines.start = [100, 0, 0, 50];
    items[0].rect.top = 100;
    items[0].prevRect.top = 100;
    items[3].rect.top = 150;
    items[3].prevRect.top = 150;


    // When
    ref.current.setStatus(status, true);

    await wait();

    // Then
    // [100, 0]
    expect(document.querySelector<HTMLElement>(".item1").style.top).to.be.equals("0px");
    // [200, 0]
    expect(document.querySelector<HTMLElement>(".item2").style.top).to.be.equals("0px");
    // [300, 50]
    expect(document.querySelector<HTMLElement>(".item3").style.top).to.be.equals("50px");
    // [0, 100]
    expect(document.querySelector<HTMLElement>(".item4").style.top).to.be.equals("100px");
    // [300, 100]
    expect(document.querySelector<HTMLElement>(".item5").style.top).to.be.equals("100px");
  });
});
