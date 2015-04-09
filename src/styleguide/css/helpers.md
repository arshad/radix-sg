---
title: Helpers
---

# Helpers

Helpful css classes to add borders, margins and paddings.

# Border
Use as `.border--DIRECTION` e.g `.border--top`.

#### Classes
`.border--left, .border--right, .border--bottom, .border--top`

#### Code
```
<div class="border--left">This div has border left.</div>
<div class="border--right">This div has border right.</div>
<div class="border--top">This div has border top.</div>
<div class="border--bottom">This div has border bottom.</div>
```

# Margin
Use as `.margin--SIZE--DIRECTION` e.g `.margin--lg--top`.

#### Classes
`.margin--xs, .margin--sm, .margin--md, .margin--lg`

`.margin--xs--left, .margin--sm--right, .margin--md--top, .margin--lg--bottom`

#### Code
```
<div class="margin--xs--left">This div a left margin of 5px.</div>
<div class="margin--sm--right">This div a right margin of 10px.</div>
<div class="margin--md--top">This div has a margin top of 25px.</div>
<div class="margin--lg--bottom">This div has a margin bottom of 40px.</div>
```

# Padding
Use as `.padding--SIZE--DIRECTION` e.g `.padding--lg--top`.

#### Classes
`.padding--xs, .padding--sm, .padding--md, .padding--lg`

`.padding--xs--left, .padding--sm--right, .padding--md--top, .padding--lg--bottom`

#### Code
```
<div class="padding--xs--left">This div a left padding of 5px.</div>
<div class="padding--sm--right">This div a right padding of 10px.</div>
<div class="padding--md--top">This div has a margin padding of 25px.</div>
<div class="padding--lg--bottom">This div has a margin padding of 40px.</div>
```

# Helpers can be mixed and match. See the example below:

#### Example
<div class="border--bottom margin--md--bottom padding--md_bottom">
  <h3><a href="#">Red Clay School District Moving Forward with Priority Schools Plans</a></h3>
  <p class="p--small">Check out this webinar archive to learn about the early challenges in implementing personalized mastery as a school improvement approach in a small-town middle school with a large achievement gap.</p>
</div>
<div class="margin--md--bottom padding--md_bottom">
  <h3><a href="#">Red Clay School District Moving Forward with Priority Schools Plans</a></h3>
  <p class="p--small">Check out this webinar archive to learn about the early challenges in implementing personalized mastery as a school improvement approach in a small-town middle school with a large achievement gap.</p>
</div>

#### Code
```
<div class="border--bottom margin--md--bottom padding--md_bottom">
  <h3><a href="#">Red Clay School District Moving Forward with Priority Schools Plans</a></h3>
  <p class="p--small">Check out this webinar archive to learn about the early challenges in implementing personalized mastery as a school improvement approach in a small-town middle school with a large achievement gap.</p>
</div>
<div class="margin--md--bottom padding--md_bottom">
  <h3><a href="#">Red Clay School District Moving Forward with Priority Schools Plans</a></h3>
  <p class="p--small">Check out this webinar archive to learn about the early challenges in implementing personalized mastery as a school improvement approach in a small-town middle school with a large achievement gap.</p>
</div>
```
