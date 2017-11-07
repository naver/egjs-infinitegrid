# Introduction to InfiniteGrid's Layouts



특징|Grid|Justified|LightBox|Frame|Facebook|Packing|
:---:|:---:|:---:|:---:|:---:|:---:|:---:|
Aspect ratio's distortion|maintain|maintain|low ~ middle| N x M |N x N|high
Size weight's distortion|sometimes high|min ~ max Size|sometimes high| N x M |N x N|low|
Maintain items' order|X|O|X|frame's order|X|X
Group's layout|dependent|independent|dependent|independent|dependent|independent
Bottom shape<br>after appending|block|flat|partial block|frame's shape|partial block|flat
Additonal<br>feature|fixed width.|caculate <br>the minimum <br>group's height.|fixed width.<br> substract torerance <br/>from height.|make shape.|emphasize specific items.|fixed goup's <br>width & height. <br> dynamic layout.

## Aspect ratio's distortion
* Items have a size(width, height) and check how much the aspect ratio is distorted.

## Size weight's distortion
* Items have a size(width, height), weight is width x height and check how much the weight is changed.
## Maintain items' order
* When you layout, check that the items are arranged in order.
## Group's layout
* Items are added in groups.
* When you layout, check how it affects previous group(dependent or independent).
## Bottom shape after appending
* After the items are appended, check the shape of the items at the bottom.

# Reference
* http://d2.naver.com/helloworld