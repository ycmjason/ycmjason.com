---
layout: post
title: Relaunching Mahjong Calculator
---

[Mahjong Calculator](http://mahjongcalculator.ycmjason.com), one of my proudest projects, has been shut down because the network cables were unplugged from my previous servers. A few supporters/users have asked me to relaunch it for it is so convenient.

After almost 3 months of shutdown, I have rehost the app on [heroku](https://heroku.com). Luckily everything runs ideally. No massive code has been changed in order to deploy on heroku.

There is only one issue for hosting on heroku. That is, the app will shut itself down after 30 minutes of inactivity as I am using the [free dyno](https://devcenter.heroku.com/articles/dyno-types). This introduce potential issues to the users as all the game data will be erased as they are stored in the memory. 

There are two solutions that I can think of now:

1. Save the game data to a database
  - This solution will work great but require quite a massive change in the app. I prefer not to touch the code anymore as it works perfect now.
2. Host the app on a hobby dyno on heroku
  - Hobby dynos don't sleep, meaning that it wouldn't erase the game data after inactivity. Hobby dynos cost USD$7.00 per month which is actually quite affordable. However, mahjong calculator doesn't sell ads so it couldn't really self sustained.

Maybe I will keep it as it is now. If I have heard too many problems cause by the issue, I might consider one of the solutions above.
