A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
```html
<div class="app">
    <div class="item">item1</div>
    <div class="item">item2</div>
    <div class="item">item3</div>
    <div class="item">item4</div>
    <div class="item">item5</div>
</div>
```
```js
const ig = new eg.InfiniteGrid(".app", {
    isConstantSize: true,
    transitionDuration: 0.2,
});
ig.setLayout(eg.InfiniteGrid.GridLayout, {align: "center", margin: 3});
ig.layout(true);
```

## itemSelector [default="*"]
A selector to select card elements that make up the layout

## useRecycle [default=true]
Indicates whether keep the number of DOMs is maintained. If the useRecycle value is 'true', keep the number of DOMs is maintained. If the useRecycle value is 'false', the number of DOMs will increase as card elements are added. 

|useRecycle(true)|useRecycle(false)
|---|---|
|![](https://user-images.githubusercontent.com/3433062/43628822-5b2def70-9736-11e8-88a4-ada172eceaae.gif)|![](https://user-images.githubusercontent.com/3433062/43628824-5b5795be-9736-11e8-8fe0-46387595dd7a.gif)|

## isOverflowScroll [default=false]
Indicates whether overflow:scroll is applied

## horizontal [default=false]
Direction of the scroll movement (true: horizontal, false: vertical)

|horizontal(true)|horizontal(false)
|---|---|
|![](https://user-images.githubusercontent.com/3433062/43436981-c7680238-94c1-11e8-94ae-34398cef8ee6.gif)|![](https://user-images.githubusercontent.com/3433062/43436982-c7949e24-94c1-11e8-8655-a84e54622c8c.gif)|


## useFit [default=true]
The useFit option scrolls upwards so that no space is visible until an item is added

## isEqualSize [default=false]
Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved.

## isConstantSize [default=false]
Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved.


||None|   isEqualSize | isConstantSize |
|:---:|:-------:|:-------:|:-------:|
||![normal](https://user-images.githubusercontent.com/3433062/40041387-b98fc9e8-5858-11e8-979a-736126d15310.gif)|![isEqualSize](https://user-images.githubusercontent.com/3433062/40041386-b96580f2-5858-11e8-98a5-7c0383a872dc.gif)|![isConstantSize](https://user-images.githubusercontent.com/3433062/40041385-b93d2094-5858-11e8-9d18-77f95704a214.gif)|
|Performance boost| X | O | O|
|Variable Size| O | O | X|
|Constant Size| X | X | O|
|Block Error| Error | X | X|

## transitionDuration [default=0]
Indicates how many seconds a transition effect takes to complete.

<p align="center"><img src="https://user-images.githubusercontent.com/3433062/43044085-85d76a0e-8dda-11e8-80c2-0e42687ca3cb.gif"/>
</p>


## threshold [default=100]
The threshold size of an event area where card elements are added to a layout.


## attributePrefix [default="data-"]
The prefix to use element's data attribute.