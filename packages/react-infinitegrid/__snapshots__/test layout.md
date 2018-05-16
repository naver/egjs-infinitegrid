# `test layout`

#### `should check fixed size`

```
"<div class=\"test1\" style=\"position: relative;\">
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 100px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div></div>"
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
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 200px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 400px; position: absolute; left: -999999px; top: -99999px;\"></div>
<div data-groupkey=\"0\" style=\"width: 120px; height: 100px; position: absolute; left: -999999px; top: -99999px;\"></div></div>"
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
"{\"state\":{\"groups\":[{\"groupKey\":0,\"outlines\":{\"start\":[0,0],\"end\":[730,740],\"startIndex\":0,\"endIndex\":6},\"items\":[{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_0\",\"groupKey\":0,\"itemIndex\":0,\"rect\":{\"top\":0,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":200},\"size\":{\"width\":120,\"height\":200},\"key\":\"__egjs_infinitegrid_0_1\",\"groupKey\":0,\"itemIndex\":1,\"rect\":{\"top\":0,\"left\":150},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_2\",\"groupKey\":0,\"itemIndex\":2,\"rect\":{\"top\":100,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":400},\"size\":{\"width\":120,\"height\":400},\"key\":\"__egjs_infinitegrid_0_3\",\"groupKey\":0,\"itemIndex\":3,\"rect\":{\"top\":200,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":440},\"size\":{\"width\":120,\"height\":440},\"key\":\"__egjs_infinitegrid_0_4\",\"groupKey\":0,\"itemIndex\":4,\"rect\":{\"top\":200,\"left\":150},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":130},\"size\":{\"width\":120,\"height\":130},\"key\":\"__egjs_infinitegrid_0_5\",\"groupKey\":0,\"itemIndex\":5,\"rect\":{\"top\":600,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_6\",\"groupKey\":0,\"itemIndex\":6,\"rect\":{\"top\":640,\"left\":150},\"mount\":true}],\"children\":[],\"index\":0}],\"groupKeys\":{\"0\":{\"groupKey\":0,\"outlines\":{\"start\":[0,0],\"end\":[730,740],\"startIndex\":0,\"endIndex\":6},\"items\":[{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_0\",\"groupKey\":0,\"itemIndex\":0,\"rect\":{\"top\":0,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":200},\"size\":{\"width\":120,\"height\":200},\"key\":\"__egjs_infinitegrid_0_1\",\"groupKey\":0,\"itemIndex\":1,\"rect\":{\"top\":0,\"left\":150},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_2\",\"groupKey\":0,\"itemIndex\":2,\"rect\":{\"top\":100,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":400},\"size\":{\"width\":120,\"height\":400},\"key\":\"__egjs_infinitegrid_0_3\",\"groupKey\":0,\"itemIndex\":3,\"rect\":{\"top\":200,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":440},\"size\":{\"width\":120,\"height\":440},\"key\":\"__egjs_infinitegrid_0_4\",\"groupKey\":0,\"itemIndex\":4,\"rect\":{\"top\":200,\"left\":150},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":130},\"size\":{\"width\":120,\"height\":130},\"key\":\"__egjs_infinitegrid_0_5\",\"groupKey\":0,\"itemIndex\":5,\"rect\":{\"top\":600,\"left\":30},\"mount\":true},{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_6\",\"groupKey\":0,\"itemIndex\":6,\"rect\":{\"top\":640,\"left\":150},\"mount\":true}],\"children\":[],\"index\":0}},\"startIndex\":0,\"endIndex\":0,\"startKey\":0,\"endKey\":0,\"processing\":0,\"layout\":false,\"datas\":{\"__egjs_infinitegrid_0_0\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_0\",\"groupKey\":0,\"itemIndex\":0,\"rect\":{\"top\":0,\"left\":30},\"mount\":true},\"__egjs_infinitegrid_0_1\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":200},\"size\":{\"width\":120,\"height\":200},\"key\":\"__egjs_infinitegrid_0_1\",\"groupKey\":0,\"itemIndex\":1,\"rect\":{\"top\":0,\"left\":150},\"mount\":true},\"__egjs_infinitegrid_0_2\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_2\",\"groupKey\":0,\"itemIndex\":2,\"rect\":{\"top\":100,\"left\":30},\"mount\":true},\"__egjs_infinitegrid_0_3\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":400},\"size\":{\"width\":120,\"height\":400},\"key\":\"__egjs_infinitegrid_0_3\",\"groupKey\":0,\"itemIndex\":3,\"rect\":{\"top\":200,\"left\":30},\"mount\":true},\"__egjs_infinitegrid_0_4\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":440},\"size\":{\"width\":120,\"height\":440},\"key\":\"__egjs_infinitegrid_0_4\",\"groupKey\":0,\"itemIndex\":4,\"rect\":{\"top\":200,\"left\":150},\"mount\":true},\"__egjs_infinitegrid_0_5\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":130},\"size\":{\"width\":120,\"height\":130},\"key\":\"__egjs_infinitegrid_0_5\",\"groupKey\":0,\"itemIndex\":5,\"rect\":{\"top\":600,\"left\":30},\"mount\":true},\"__egjs_infinitegrid_0_6\":{\"el\":null,\"orgSize\":{\"width\":120,\"height\":100},\"size\":{\"width\":120,\"height\":100},\"key\":\"__egjs_infinitegrid_0_6\",\"groupKey\":0,\"itemIndex\":6,\"rect\":{\"top\":640,\"left\":150},\"mount\":true}},\"isRemoved\":false},\"_infinite\":{\"startCursor\":0,\"endCursor\":0,\"size\":939},\"_watcher\":{\"_prevPos\":0,\"scrollPos\":0},\"_renderer\":{\"cssText\":\"position: relative; height: 740px;\",\"options\":{\"isOverflowScroll\":false,\"isEqualSize\":false,\"horizontal\":false,\"isConstantSize\":false},\"_size\":{\"viewport\":300,\"item\":null,\"view\":939}}}"
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

#### `should check scroll`

```
"<div style=\"height: 600px; position: relative; overflow-y: scroll; overflow-x: hidden;\">
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
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 800px;\">item5</div></div>"
```

```
"<div style=\"height: 600px; position: relative; overflow-y: scroll; overflow-x: hidden;\">
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
<div class=\"item\" data-groupkey=\"5\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 800px;\">item5</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 900px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 1000px;\">item6</div>
<div class=\"item\" data-groupkey=\"6\" style=\"width: 100px; height: 300px; position: absolute; left: 100px; top: 1000px;\">item6</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 1100px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 1200px;\">item7</div>
<div class=\"item\" data-groupkey=\"7\" style=\"width: 100px; height: 300px; position: absolute; left: 200px; top: 1200px;\">item7</div></div>"
```

