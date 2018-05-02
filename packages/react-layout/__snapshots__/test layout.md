# `test layout`

#### `should check fixed size`

```
"<div class=\"1\" style=\"height: 200px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div></div>"
```

#### `should check variable size`

```
"<div class=\"1\" style=\"height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\"></div></div>"
```

#### `should check display change none to block`

```
"<div class=\"1\" style=\"display: none; height: 1400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 0px; top: 200px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 600px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 700px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 900px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 1200px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 1300px;\"></div></div>"
```

```
"<div class=\"1\" style=\"display: block; height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\"></div></div>"
```

#### `test1`

```
"<div class=\"1\" style=\"height: 200px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div></div>"
```

#### `should check layout`

```
"<div class=\"1\" style=\"height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\"></div></div>"
```

#### `test2`

```
"<div class=\"1\" style=\"height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\"></div></div>"
```

#### `test3`

```
"<div class=\"1\" style=\"display: none; height: 1400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 0px; top: 200px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 600px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 0px; top: 700px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 900px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 1200px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 1300px;\"></div></div>"
```

```
"<div class=\"1\" style=\"display: block; height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 0px;\"></div><div style=\"width: 100px; height: 200px; position: absolute; left: 400px; top: 0px;\"></div><div style=\"width: 100px; height: 300px; position: absolute; left: 0px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 100px;\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 300px; top: 100px;\"></div></div>"
```

