{{{
  "title": "Political relationships hidden in markets.",
  "tags": ["economics", "personal"],
  "date": "2008-03-08T23:44:38+00:00"
}}}

  I'm again applying <a href="http://en.wikipedia.org/wiki/Granger_causality">Granger causality</a>  to time series data from <a href="http://intrade.com/">Intrade</a>.  This time, however, I connect box <i>A</i> to box <i>B</i> with a
<ul>
<li><font color="#009900">green</font> arrow if <i>A</i> becoming more likely causes <i>B</i> to become more likely, and with a</li>
<li><font color="#990000">red</font> arrow if <i>A</i> becoming more likely causes <i>B</i> to become less likely.</li>
</ul>
Shorter arrows suggest <b>stronger</b> relationships (technically, a lower <i>p</i>-value).

Running the algorithm on the market data since January 1, 2008 with a lag of two days produces the following graph:

<%= image('final3.png', 'Two day lag since January 1, 2008' ) %>

And so, we see that the market data is encoding some
<ul>
<li><b>tautologies</b> (McCain's nomination makes him more likely to be president, and McCain's being president makes it more likely that a Republican is president) but also some</li>
<li><b>conventional wisdom</b> (a recession makes Clinton more likely to be nominated, but Obama less likely to be nominated; perhaps the perception that Obama would fare better in the general election explains the red arrows from "Democrat President" to Clinton, and the green arrows from "Democrat President" to Obama).</li>
</ul>
It's amazing to me (and hopefully also to you) that the <b>relationships between the prices of these Intrade contracts</b> manages to encode popular sentiments.

