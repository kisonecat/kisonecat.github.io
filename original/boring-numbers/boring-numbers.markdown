{{{
  "title": "Most numbers are boring, asymptotically speaking.",
  "tags": ["personal"],
  "date": "2006-12-10T08:03:55+00:00"
}}}

  <p>Let $f(n)$ be the number of Google hits for the integer $n$.  Then $f(578)$ is about 100 million, and $f(1156)$, that is, the number of hits for a number twice as big, is about 40 million, a bit less than half as big.  Doubling the input continues to halve the output: $f(2312)$ is about 20 million (half again!), and $f(4624)$ is about 8 million, and $f(9248)$ is about 4 million.</p>

<p>There are about half as many pages talking about numbers that are twice as big.  This is an example of a <a href="http://en.wikipedia.org/wiki/Power_law">power law</a>, and indeed, a log-log plot of $f$ looks linear to my blurry vision:</p>

<p>
<%= image("loglog.png" ) %>
</p>

<p>Doing a linear regression in <a href="http://www.r-project.org/">R</a> gives the red line, or in symbols, $$f(x) \approx 5,800,000,000 / x^{1.029}.$$
Rather humorously, this means that $f(a)/f(b) \approx b/a$.  In the end, this is not so surprising: <a href="http://en.wikipedia.org/wiki/Zipf's_law">Zipf's law</a> says that, in a corpus of naturally occuring text, the frequency of a word is inversely proportional to its rank; here, we have a similar phenomenon at work: <b>roughly, the popularity of a number is inversely proportional to its size.</b></p>

<p>In other words, while the number of integers expressible with fewer than $n$ bits grows exponentially in $n$, the number of pages discussing integers expressible with fewer than $n$ bits grows <b>linearly</b> in $n$; being silly, I'd say that this is an asymptotic version of the claim that most large numbers are uninteresting.  After all, <b>popular numbers have a lot of fan sites.</b></p>


