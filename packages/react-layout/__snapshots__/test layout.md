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

#### `should check no children`

```
"<div></div>"
```

```
"<div style=\"height: 400px;\"><div style=\"width: 100px; height: 100px; position: absolute; left: 0px; top: 0px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"width: 100px; height: 100px; position: absolute; left: 100px; top: 0px;\"></div><div style=\"width: 100px; height: 400px; position: absolute; left: 200px; top: 0px;\"></div></div>"
```

#### `should check percentage(horizontal=true)`

```
"<div style=\"width: 906.667px;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 266.667px; height: 266.667px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 0px; top: 266.667px; width: 266.667px; height: 266.667px;\"></div><div style=\"position: absolute; left: 0px; top: 533.333px; width: 266.667px; height: 1066.67px;\"></div><div style=\"position: absolute; left: 266.667px; top: 0px; width: 320px; height: 320px;\"></div><div style=\"position: absolute; left: 266.667px; top: 320px; width: 320px; height: 1280px;\"></div><div style=\"position: absolute; left: 586.667px; top: 0px; width: 320px; height: 320px;\"></div><div style=\"position: absolute; left: 586.667px; top: 320px; width: 320px; height: 1280px;\"></div></div>"
```

```
"<div style=\"width: 906.667px;\"><div style=\"position: absolute; left: 0px; top: 0%; width: 266.667px; height: 266.667px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 0px; top: 16.6667%; width: 266.667px; height: 266.667px;\"></div><div style=\"position: absolute; left: 0px; top: 33.3333%; width: 266.667px; height: 1066.67px;\"></div><div style=\"position: absolute; left: 266.667px; top: 0%; width: 320px; height: 320px;\"></div><div style=\"position: absolute; left: 266.667px; top: 20%; width: 320px; height: 1280px;\"></div><div style=\"position: absolute; left: 586.667px; top: 0%; width: 320px; height: 320px;\"></div><div style=\"position: absolute; left: 586.667px; top: 20%; width: 320px; height: 1280px;\"></div></div>"
```

```
"<div style=\"width: 906.667px;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 266.667px; height: 16.6667%;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 0px; top: 266.667px; width: 266.667px; height: 16.6667%;\"></div><div style=\"position: absolute; left: 0px; top: 533.333px; width: 266.667px; height: 66.6667%;\"></div><div style=\"position: absolute; left: 266.667px; top: 0px; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 266.667px; top: 320px; width: 320px; height: 80%;\"></div><div style=\"position: absolute; left: 586.667px; top: 0px; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 586.667px; top: 320px; width: 320px; height: 80%;\"></div></div>"
```

```
"<div style=\"width: 906.667px;\"><div style=\"position: absolute; left: 0px; top: 0%; width: 266.667px; height: 16.6667%;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 0px; top: 16.6667%; width: 266.667px; height: 16.6667%;\"></div><div style=\"position: absolute; left: 0px; top: 33.3333%; width: 266.667px; height: 66.6667%;\"></div><div style=\"position: absolute; left: 266.667px; top: 0%; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 266.667px; top: 20%; width: 320px; height: 80%;\"></div><div style=\"position: absolute; left: 586.667px; top: 0%; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 586.667px; top: 20%; width: 320px; height: 80%;\"></div></div>"
```

```
"<div style=\"width: 906.667px;\"><div style=\"position: absolute; left: 0px; top: 0%; width: 266.667px; height: 16.6667%;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 0px; top: 16.6667%; width: 266.667px; height: 16.6667%;\"></div><div style=\"position: absolute; left: 0px; top: 33.3333%; width: 266.667px; height: 66.6667%;\"></div><div style=\"position: absolute; left: 266.667px; top: 0%; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 266.667px; top: 20%; width: 320px; height: 80%;\"></div><div style=\"position: absolute; left: 586.667px; top: 0%; width: 320px; height: 20%;\"></div><div style=\"position: absolute; left: 586.667px; top: 20%; width: 320px; height: 80%;\"></div></div>"
```

#### `should check percentage(horizontal=false)`

```
"<div style=\"height: 422.222px;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 222.222px; height: 222.222px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 222.222px; top: 0px; width: 222.222px; height: 222.222px;\"></div><div style=\"position: absolute; left: 444.444px; top: 0px; width: 55.5556px; height: 222.222px;\"></div><div style=\"position: absolute; left: 0px; top: 222.222px; width: 200px; height: 200px;\"></div><div style=\"position: absolute; left: 200px; top: 222.222px; width: 50px; height: 200px;\"></div><div style=\"position: absolute; left: 250px; top: 222.222px; width: 200px; height: 200px;\"></div><div style=\"position: absolute; left: 450px; top: 222.222px; width: 50px; height: 200px;\"></div></div>"
```

```
"<div style=\"height: 422.222px;\"><div style=\"position: absolute; left: 0%; top: 0px; width: 222.222px; height: 222.222px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 44.4444%; top: 0px; width: 222.222px; height: 222.222px;\"></div><div style=\"position: absolute; left: 88.8889%; top: 0px; width: 55.5556px; height: 222.222px;\"></div><div style=\"position: absolute; left: 0%; top: 222.222px; width: 200px; height: 200px;\"></div><div style=\"position: absolute; left: 40%; top: 222.222px; width: 50px; height: 200px;\"></div><div style=\"position: absolute; left: 50%; top: 222.222px; width: 200px; height: 200px;\"></div><div style=\"position: absolute; left: 90%; top: 222.222px; width: 50px; height: 200px;\"></div></div>"
```

```
"<div style=\"height: 422.222px;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 44.4444%; height: 222.222px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 222.222px; top: 0px; width: 44.4444%; height: 222.222px;\"></div><div style=\"position: absolute; left: 444.444px; top: 0px; width: 11.1111%; height: 222.222px;\"></div><div style=\"position: absolute; left: 0px; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 200px; top: 222.222px; width: 10%; height: 200px;\"></div><div style=\"position: absolute; left: 250px; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 450px; top: 222.222px; width: 10%; height: 200px;\"></div></div>"
```

```
"<div style=\"height: 422.222px;\"><div style=\"position: absolute; left: 0%; top: 0px; width: 44.4444%; height: 222.222px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 44.4444%; top: 0px; width: 44.4444%; height: 222.222px;\"></div><div style=\"position: absolute; left: 88.8889%; top: 0px; width: 11.1111%; height: 222.222px;\"></div><div style=\"position: absolute; left: 0%; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 40%; top: 222.222px; width: 10%; height: 200px;\"></div><div style=\"position: absolute; left: 50%; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 90%; top: 222.222px; width: 10%; height: 200px;\"></div></div>"
```

```
"<div style=\"height: 422.222px;\"><div style=\"position: absolute; left: 0%; top: 0px; width: 44.4444%; height: 222.222px;\"><img src=\"https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg\"></div><div style=\"position: absolute; left: 44.4444%; top: 0px; width: 44.4444%; height: 222.222px;\"></div><div style=\"position: absolute; left: 88.8889%; top: 0px; width: 11.1111%; height: 222.222px;\"></div><div style=\"position: absolute; left: 0%; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 40%; top: 222.222px; width: 10%; height: 200px;\"></div><div style=\"position: absolute; left: 50%; top: 222.222px; width: 40%; height: 200px;\"></div><div style=\"position: absolute; left: 90%; top: 222.222px; width: 10%; height: 200px;\"></div></div>"
```

