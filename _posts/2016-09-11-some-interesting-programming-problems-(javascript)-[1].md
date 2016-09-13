---
layout: post
title: Some interesting programming problems (javascript) [1]

---
I have been doing my internship at [Baylor University](http://www.baylor.edu/) at Waco for the past six weeks. And the coming week is the last week of my internship. It has been quite fun to do research here as my boss is very nice and not tough at all. I encounter some really interesting programming challenges during these weeks and here are some of them.

## Re-insert i-th element into an array before/after j-th element

### Obvious approach
The most obvious approach would be something like the following:

```javascript
function insertBefore(arr, i, j){
  if(i < j){
    for(var c = i; c < j - 1; c++){
      swap(arr, c, c + 1);
    }
  }
  if(i > j){
    for(var c = i; c > j; c--){
      swap(arr, c, c - 1);
    }
  }
  return arr;
}
```

To be fair, it is not very bad. But I am not a big fan of external operator. The more `for-loop` I see, the more irritated I feel. (despite the fact that it is usually more effective using external `for-loop`.)

### Functional approach
With a functional approach, I think the problem is solved more elegantly. (Of course you need to have a decent functional background in order to understand this.)

#### Base case
Just like all the other functional approach, we start with the base case. Base case is the simplest form of the problem which we can write the solution right a way.

`i == j - 1`:
Consider `insertBefore([0, 1, 2, 3, 4, 5], 1, 2)`, `arr[1]` is already before `arr[2]`, so the `[0, 1, 2, 3, 4, 5]` itself is the solution of this problem; Therefore the base case is:
```javascript
function insertBefore(arr, i, j){
	if(i == j - 1) return arr;
}
```

`i == j`:
Consider `insertBefore([0, 1, 2, 3, 4, 5], 1, 1)`. This case is tricky. Should the solution be `[0, 1, 2, 3, 4, 5]` or `[1, 0, 2, 3, 4, 5]`? `[1, 0, 2, 3, 4, 5]` doesn't really make sense because `arr[1]` would become before `arr[0]` which is not desired; 

Therefore the combined base case would be:
```javascript
function insertBefore(arr, i, j){
	if(i == j || i == j - 1) return arr;
}
```

#### Recursive case
After figuring out the base case, we have to figure out the recursive case. In the recursive case, we have to make a small step which transform the problem into a slightly smaller problem. In this case, the slightly smaller problem would be:
if `i < j`, `insertBefore(swap(arr, i, i+1), i+1, j)`;
if `i > j`, `insertBefore(swap(arr, i, i-1), i-1, j)`;

Swapping the element forward/backward by one, is an easier problem to solve as it is closer to `j`. 

##### Final code
So to combine the base and recursive case, 
```javascript
var insertBefore = function(arr, i, j){
  if(i == j || i == j - 1) return arr;
  else if(i < j) return insertBefore(swap(arr, i, i+1), i+1, j);
  else if(i > j) return insertBefore(swap(arr, i, i-1), i-1, j);
};
var insertAfter = function(arr, i, j){
  if(i == j || i == j + 1) return arr;
  else if(i < j) return insertAfter(swap(arr, i, i+1), i+1, j);
  else if(i > j) return insertAfter(swap(arr, i, i-1), i-1, j);
};
```

> to be continued...

