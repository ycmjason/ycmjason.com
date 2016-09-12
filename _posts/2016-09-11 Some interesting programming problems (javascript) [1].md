---
layout: post
title: Some interesting programming problems (javascript) [1]
title: Some interesting programming problems (javascript)

---
I have been doing my internship at [Baylor University](http://www.baylor.edu/) at Waco for the past six weeks. And the coming week is the last week of my internship. It has been quite fun to do research here as my boss is very nice and not tough at all. I encounter some really interesting programming challenges during these weeks and here are some of them.

# Re-insert i-th element into an array before/after j-th element
## Obvious approach
The most obvious approach would be something like the following:
&#x60;&#x60;&#x60;javascript
function insertBefore(arr, i, j){
  if(i &lt; j){
    for(var c &#x3D; i; c &lt; j - 1; c++){
      swap(arr, c, c + 1);
    }
  }
  if(i &gt; j){
    for(var c &#x3D; i; c &gt; j; c--){
      swap(arr, c, c - 1);
    }
  }
  return arr;
}

&#x60;&#x60;&#x60;
To be fair, it is not very bad. But I am not a big fan of external operator. The more &#x60;for-loop&#x60; I see, the more irritated I feel. (despite the fact that it is usually more effective using external &#x60;for-loop&#x60;.)

## Functional approach
With a functional approach, I think the problem is solved more elegantly. (Of course you need to have a decent functional background in order to understand this.)

### Base case
Just like all the other functional approach, we start with the base case. Base case is the simplest form of the problem which we can write the solution right a way.

#### &#x60;i &#x3D;&#x3D; j - 1&#x60;
Consider &#x60;insertBefore([0, 1, 2, 3, 4, 5], 1, 2)&#x60;, &#x60;arr[1]&#x60; is already before &#x60;arr[2]&#x60;, so the &#x60;[0, 1, 2, 3, 4, 5]&#x60; itself is the solution of this problem; Therefore the base case is:
&#x60;&#x60;&#x60;javascript
function insertBefore(arr, i, j){
	if(i &#x3D;&#x3D; j - 1) return arr;
}
&#x60;&#x60;&#x60;

#### &#x60;i &#x3D;&#x3D; j&#x60;
Consider &#x60;insertBefore([0, 1, 2, 3, 4, 5], 1, 1)&#x60;. This case is tricky. Should the solution be &#x60;[0, 1, 2, 3, 4, 5]&#x60; or &#x60;[1, 0, 2, 3, 4, 5]&#x60;? &#x60;[1, 0, 2, 3, 4, 5]&#x60; doesn&#x27;t really make sense because &#x60;arr[1]&#x60; would become before &#x60;arr[0]&#x60; which is not desired; 

Therefore the combined base case would be:
&#x60;&#x60;&#x60;javascript
function insertBefore(arr, i, j){
	if(i &#x3D;&#x3D; j || i &#x3D;&#x3D; j - 1) return arr;
}
&#x60;&#x60;&#x60;

### Recursive case
After figuring out the base case, we have to figure out the recursive case. In the recursive case, we have to make a small step which transform the problem into a slightly smaller problem. In this case, the slightly smaller problem would be:
if &#x60;i &lt; j&#x60;, &#x60;insertBefore(swap(arr, i, i+1), i+1, j)&#x60;;
if &#x60;i &gt; j&#x60;, &#x60;insertBefore(swap(arr, i, i-1), i-1, j)&#x60;;

Swapping the element forward/backward by one, is an easier problem to solve as it is closer to &#x60;j&#x60;. 

### Final code
So to combine the base and recursive case, 
&#x60;&#x60;&#x60;javascript
var insertBefore &#x3D; function(arr, i, j){
  if(i &#x3D;&#x3D; j || i &#x3D;&#x3D; j - 1) return arr;
  else if(i &lt; j) return insertBefore(swap(arr, i, i+1), i+1, j);
  else if(i &gt; j) return insertBefore(swap(arr, i, i-1), i-1, j);
};
var insertAfter &#x3D; function(arr, i, j){
  if(i &#x3D;&#x3D; j || i &#x3D;&#x3D; j + 1) return arr;
  else if(i &lt; j) return insertAfter(swap(arr, i, i+1), i+1, j);
  else if(i &gt; j) return insertAfter(swap(arr, i, i-1), i-1, j);
};
&#x60;&#x60;&#x60;

&gt; to be continued...

