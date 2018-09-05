# `test layout`

#### `should check fixed size`

```
"<div class=\"test1\" style=\"position: relative;\">
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div></div>"
```

```
"<div class=\"test1\" style=\"position: relative; height: 100px;\">
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: 400px; top: 0px;\"></div></div>"
```

#### `should check align center`

```
"<div class=\"test1\" style=\"position: relative;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: -999999px; top: -999999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -999999px;\"></div></div>"
```

```
"<div class=\"test1\" style=\"position: relative; height: 600px;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 150px; top: 200px;\"></div></div>"
```

#### `should check getStatus and setStatus`

```
Object {
  "_infinite": Object {
    "endCursor": 0,
    "size": 500,
    "startCursor": 0,
  },
  "_renderer": Object {
    "_size": Object {
      "item": null,
      "view": 500,
      "viewport": 300,
    },
    "cssText": "height: 740px;",
  },
  "_state": Object {
    "datas": Object {
      ".0": Object {
        "column": 0,
        "el": null,
        "groupKey": 0,
        "itemIndex": 0,
        "key": ".0",
        "mount": true,
        "orgSize": Object {
          "height": 100,
          "width": 120,
        },
        "prevRect": Object {
          "left": 30,
          "top": 0,
        },
        "rect": Object {
          "left": 30,
          "top": 0,
        },
        "size": Object {
          "height": 100,
          "width": 120,
        },
      },
      ".1": Object {
        "column": 1,
        "el": null,
        "groupKey": 0,
        "itemIndex": 1,
        "key": ".1",
        "mount": true,
        "orgSize": Object {
          "height": 200,
          "width": 120,
        },
        "prevRect": Object {
          "left": 150,
          "top": 0,
        },
        "rect": Object {
          "left": 150,
          "top": 0,
        },
        "size": Object {
          "height": 200,
          "width": 120,
        },
      },
      ".2": Object {
        "column": 0,
        "el": null,
        "groupKey": 0,
        "itemIndex": 2,
        "key": ".2",
        "mount": true,
        "orgSize": Object {
          "height": 100,
          "width": 120,
        },
        "prevRect": Object {
          "left": 30,
          "top": 100,
        },
        "rect": Object {
          "left": 30,
          "top": 100,
        },
        "size": Object {
          "height": 100,
          "width": 120,
        },
      },
      ".3": Object {
        "column": 0,
        "el": null,
        "groupKey": 0,
        "itemIndex": 3,
        "key": ".3",
        "mount": true,
        "orgSize": Object {
          "height": 400,
          "width": 120,
        },
        "prevRect": Object {
          "left": 30,
          "top": 200,
        },
        "rect": Object {
          "left": 30,
          "top": 200,
        },
        "size": Object {
          "height": 400,
          "width": 120,
        },
      },
      ".4": Object {
        "column": 1,
        "el": null,
        "groupKey": 0,
        "itemIndex": 4,
        "key": ".4",
        "mount": true,
        "orgSize": Object {
          "height": 440,
          "width": 120,
        },
        "prevRect": Object {
          "left": 150,
          "top": 200,
        },
        "rect": Object {
          "left": 150,
          "top": 200,
        },
        "size": Object {
          "height": 440,
          "width": 120,
        },
      },
      ".5": Object {
        "column": 0,
        "el": null,
        "groupKey": 0,
        "itemIndex": 5,
        "key": ".5",
        "mount": true,
        "orgSize": Object {
          "height": 130,
          "width": 120,
        },
        "prevRect": Object {
          "left": 30,
          "top": 600,
        },
        "rect": Object {
          "left": 30,
          "top": 600,
        },
        "size": Object {
          "height": 130,
          "width": 120,
        },
      },
      ".6": Object {
        "column": 1,
        "el": null,
        "groupKey": 0,
        "itemIndex": 6,
        "key": ".6",
        "mount": true,
        "orgSize": Object {
          "height": 100,
          "width": 120,
        },
        "prevRect": Object {
          "left": 150,
          "top": 640,
        },
        "rect": Object {
          "left": 150,
          "top": 640,
        },
        "size": Object {
          "height": 100,
          "width": 120,
        },
      },
    },
    "endIndex": 0,
    "endKey": 0,
    "groupKeys": Object {
      "0": Object {
        "children": Array [],
        "groupKey": 0,
        "index": 0,
        "items": Array [
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 0,
            "key": ".0",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 0,
            },
            "rect": Object {
              "left": 30,
              "top": 0,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 1,
            "key": ".1",
            "mount": true,
            "orgSize": Object {
              "height": 200,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 0,
            },
            "rect": Object {
              "left": 150,
              "top": 0,
            },
            "size": Object {
              "height": 200,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 2,
            "key": ".2",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 100,
            },
            "rect": Object {
              "left": 30,
              "top": 100,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 3,
            "key": ".3",
            "mount": true,
            "orgSize": Object {
              "height": 400,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 200,
            },
            "rect": Object {
              "left": 30,
              "top": 200,
            },
            "size": Object {
              "height": 400,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 4,
            "key": ".4",
            "mount": true,
            "orgSize": Object {
              "height": 440,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 200,
            },
            "rect": Object {
              "left": 150,
              "top": 200,
            },
            "size": Object {
              "height": 440,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 5,
            "key": ".5",
            "mount": true,
            "orgSize": Object {
              "height": 130,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 600,
            },
            "rect": Object {
              "left": 30,
              "top": 600,
            },
            "size": Object {
              "height": 130,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 6,
            "key": ".6",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 640,
            },
            "rect": Object {
              "left": 150,
              "top": 640,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
        ],
        "outlines": Object {
          "end": Array [
            730,
            740,
          ],
          "start": Array [
            0,
            0,
          ],
        },
      },
    },
    "groups": Array [
      Object {
        "children": Array [],
        "groupKey": 0,
        "index": 0,
        "items": Array [
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 0,
            "key": ".0",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 0,
            },
            "rect": Object {
              "left": 30,
              "top": 0,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 1,
            "key": ".1",
            "mount": true,
            "orgSize": Object {
              "height": 200,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 0,
            },
            "rect": Object {
              "left": 150,
              "top": 0,
            },
            "size": Object {
              "height": 200,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 2,
            "key": ".2",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 100,
            },
            "rect": Object {
              "left": 30,
              "top": 100,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 3,
            "key": ".3",
            "mount": true,
            "orgSize": Object {
              "height": 400,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 200,
            },
            "rect": Object {
              "left": 30,
              "top": 200,
            },
            "size": Object {
              "height": 400,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 4,
            "key": ".4",
            "mount": true,
            "orgSize": Object {
              "height": 440,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 200,
            },
            "rect": Object {
              "left": 150,
              "top": 200,
            },
            "size": Object {
              "height": 440,
              "width": 120,
            },
          },
          Object {
            "column": 0,
            "el": null,
            "groupKey": 0,
            "itemIndex": 5,
            "key": ".5",
            "mount": true,
            "orgSize": Object {
              "height": 130,
              "width": 120,
            },
            "prevRect": Object {
              "left": 30,
              "top": 600,
            },
            "rect": Object {
              "left": 30,
              "top": 600,
            },
            "size": Object {
              "height": 130,
              "width": 120,
            },
          },
          Object {
            "column": 1,
            "el": null,
            "groupKey": 0,
            "itemIndex": 6,
            "key": ".6",
            "mount": true,
            "orgSize": Object {
              "height": 100,
              "width": 120,
            },
            "prevRect": Object {
              "left": 150,
              "top": 640,
            },
            "rect": Object {
              "left": 150,
              "top": 640,
            },
            "size": Object {
              "height": 100,
              "width": 120,
            },
          },
        ],
        "outlines": Object {
          "end": Array [
            730,
            740,
          ],
          "start": Array [
            0,
            0,
          ],
        },
      },
    ],
    "isUpdate": false,
    "layout": false,
    "processing": 0,
    "requestIndex": 0,
    "requestKey": 0,
    "startIndex": 0,
    "startKey": 0,
  },
  "_watcher": Object {
    "_prevPos": 0,
    "scrollPos": 0,
  },
}
```

```
"<div class=\"test1\" style=\"height: 500px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 740px;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 150px; top: 640px;\"></div></div></div>"
```

#### `should check getStatus(startKey, endKey)`

```
"<div class=\"test1\" style=\"height: 500px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 730px;\">
<div data-groupkey=\"1\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"1\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"2\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"2\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div></div></div>"
```

```
"<div class=\"test2\" style=\"height: 500px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 740px;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"2\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"2\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div>
<div data-groupkey=\"4\" style=\"width: 120px; height: 100px; position: absolute; left: 150px; top: 640px;\"></div></div></div>"
```

```
"<div class=\"test3\" style=\"height: 500px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 730px;\">
<div data-groupkey=\"2\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"2\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"3\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div></div></div>"
```

#### `should check scroll`

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 1100px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 200px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 200px;\">item2</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 300px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 400px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 400px;\">item3</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 500px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 600px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 600px;\">item4</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 700px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 800px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 800px;\">item5</div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 1100px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 200px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 200px;\">item2</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 300px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 400px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 400px;\">item3</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 500px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 600px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 600px;\">item4</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 700px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 800px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 800px;\">item5</div></div></div>"
```

#### `should check layout method and event`

```
"<div class=\"test1\" style=\"position: relative; height: 740px;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 150px; top: 640px;\"></div></div>"
```

```
"<div class=\"test1\" style=\"position: relative; height: 740px;\">
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: 150px; top: 0px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 30px; top: 100px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: 30px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 440px; position: absolute; left: 150px; top: 200px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 130px; position: absolute; left: 30px; top: 600px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: 150px; top: 640px;\"></div></div>"
```

#### `should check test no item`

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\"></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 200px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 100px;\"></div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 0px;\"></div></div>"
```

#### `should check test one item`

```
"<div style=\"position: relative;\">
<div data-groupkey=\"1\" style=\"width: 200px; height: 200px; position: absolute; left: -999999px; top: -999999px;\">1</div></div>"
```

```
"<div style=\"position: relative; height: 200px;\"><div data-groupkey=\"1\" style=\"width: 200px; height: 200px; position: absolute; left: 0px; top: 0px;\">1</div></div>"
```

#### `should check test no item and onAppend`

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -999999px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: -999999px; top: -999999px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: -999999px; top: -999999px;\">item1</div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 1100px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\">item2</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 200px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 300px; position: absolute; left: 300px; top: 200px;\">item3</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 100px; position: absolute; left: 400px; top: 200px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 200px; position: absolute; left: 200px; top: 300px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 300px; position: absolute; left: 400px; top: 300px;\">item4</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 400px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 400px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 500px;\">item5</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 500px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 200px; position: absolute; left: 300px; top: 500px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 600px;\">item6</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 600px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 600px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 700px;\">item7</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 700px;\">item8</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 800px;\">item8</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 300px; position: absolute; left: 300px; top: 800px;\">item8</div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 1100px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\">item2</div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\">item2</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 200px;\">item3</div>
<div class=\"item\" data-groupkey=\"3\" style=\"width: 100px; height: 300px; position: absolute; left: 300px; top: 200px;\">item3</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 100px; position: absolute; left: 400px; top: 200px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 200px; position: absolute; left: 200px; top: 300px;\">item4</div>
<div class=\"item\" data-groupkey=\"4\" style=\"width: 100px; height: 300px; position: absolute; left: 400px; top: 300px;\">item4</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 400px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 400px;\">item5</div>
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 500px;\">item5</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 500px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 200px; position: absolute; left: 300px; top: 500px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 600px;\">item6</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 600px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 600px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 700px;\">item7</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 700px;\">item8</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 800px;\">item8</div>
<div class=\"item\" data-groupkey=\"8\" style=\"width: 100px; height: 300px; position: absolute; left: 300px; top: 800px;\">item8</div></div></div>"
```

#### `should check isEqaulSize option`

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 240px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 150px; height: 120px; position: absolute; left: 0px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 130px; height: 170px; position: absolute; left: 150px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 160px; height: 140px; position: absolute; left: 300px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 160px; height: 150px; position: absolute; left: 0px; top: 120px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 140px; height: 160px; position: absolute; left: 150px; top: 120px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 130px; height: 170px; position: absolute; left: 300px; top: 120px;\"></div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 200px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 190px; position: absolute; left: 100px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 140px; height: 180px; position: absolute; left: 200px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 150px; height: 170px; position: absolute; left: 300px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 100px; height: 160px; position: absolute; left: 400px; top: 0px;\"></div>
<div class=\"item\" data-groupkey=\"2\" style=\"width: 110px; height: 150px; position: absolute; left: 0px; top: 100px;\"></div></div></div>"
```

#### `should check one groupKey`

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\"></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 300px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 400px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\">item1</div></div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow: hidden scroll;\">
<div class=\"_eg-infinitegrid-container_\" style=\"height: 500px;\">
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 200px; position: absolute; left: 100px; top: 200px;\">item1</div>
<div class=\"item\" data-groupkey=\"1\" style=\"width: 100px; height: 300px; position: absolute; left: 300px; top: 200px;\">item1</div></div></div>"
```

