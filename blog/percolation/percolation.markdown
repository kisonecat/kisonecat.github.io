{{{
  "title": "Percolation.",
  "tags": ["personal", "questions", "mathematics"],
  "date": "2008-07-20T06:02:52+00:00"
}}}

  <p>I made a movie recently for my advisor.  The movie is so pretty, that I thought I'd share it here: may I present to you <b>randomly drawn dots, where two dots are the same color when they touch!</b></p>

<div class="displayedMedia"><iframe width="420" height="315" src="//www.youtube.com/embed/twjnAE3SjJw" frameborder="0" allowfullscreen></iframe></div>

<p>I'll be a bit more explicit: a dot is drawn at a random location; if it does not overlap any previous dots, it gets a new color.  Otherwise, the dot takes the color of the component it touches.  Sometimes a new dot connects many components, and in this case, the new component takes on the color of the largest among the old components.</p>

<p>There's a lot of neat questions to be asked about such a process: for instance, after drawing <em>n</em> dots, how many components should we expect to see?  As you can see in the movie, when you draw only a few dots, most of those dots are isolated and have their own color; but after drawing a ridiculously large number of dots, they are all connected and the same color.  And inbetween, something more interesting happens.</p>

<p>Here's an example of "something more interesting" taken from a <a href='chart-25000.png' title='25000 random dots'>larger picture</a> than the above movie:</p>

<div class="displayedMedia"><a href='chart-25000.png' title='25000 random dots'><img src='chart-25000-zoomed.png' alt='25000 random points (close up)' /></a></div>


