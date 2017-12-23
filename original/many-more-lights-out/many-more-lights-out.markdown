{{{
  "title": "Many more Lights Out",
  "tags": ["mathematics"],
  "date": "2010-07-17T00:05:32+00:00"
}}}

  <p>A very long while ago I posted some <a href="/~fowler/blog/posts/solutions-to-lights-out/">solutions to Lights Out</a>; back then, I solved the $n$-by-$n$ board by row-reducing an $n^2$-by-$n^2$ matrix.</p>

<p>Since then, both <a href="https://pantherfile.uwm.edu/okun/www/">Boris Okun</a> and <a href="http://www.facebook.com/bwerness">Brent Werness</a> pointed out to me that I should've solved Lights Out by using a <em>scanning algorithm</em>: propagating the button presses down one row at a time, and exponentiating the propagation matrix to make sure that I don't get stuck at the last row.</p>

<p>This is much faster.</p>

<p>With this method, here is a (scaled down, auto-leveled) 2000-by-2000 solution:</p>
<div class="displayedMedia"><a href='lights-2000.png' title='Solution to 2000x2000 Lights Out'><img src='small-2000.png' alt='Solution to 2000x2000 Lights Out' /></a></div>

<p>And here is a (very much scaled-down, auto-leveled) 5000-by-5000 solution:</p>
<div class="displayedMedia"><a href='lights-5000.png' title='Solution to 5000x5000 Lights Out'><img src='small-5000.png' alt='Solution to 5000x5000 Lights Out' /></a></div>


