---
layout: post
title: Granger causality and Intrade data.
tags: economics personal computer science mathematics
date: 2008-03-06 19:31:09 +0000
---

<a href="http://en.wikipedia.org/wiki/Granger_causality">Granger causality</a> is a technique for determining whether one time series can be used to forecast another; since the <a href="http://intrade.com/">Intrade</a> market provides time series data for political questions, we can look at whether political outcomes can be used to forecast other political outcomes.

There's a library for the statistical package <a href="http://www.r-project.org/">R</a> to do the <a href="http://rss.acs.unt.edu/Rdoc/library/MSBVAR/html/granger.test.html">Granger test</a>, and <a href="http://intrade.com/">Intrade</a> produces <a href="http://en.wikipedia.org/wiki/Comma-separated_values">CSV</a> market data.  I fed the market data for various contracts since January 1, 2008 into R, and the output of that into <a href="http://www.graphviz.org/">GraphViz</a> to make a nice-looking visualization; in particular, I connect $a$ to $b$ if $a$ Granger-causes $b$ with $p$-value less than 0.05.  Darker arrows have smaller $p$-values.  This is all an <b>embarassing misuse of statistics</b> and $p$-values, but it is quick and easy to do, and the results are fun to see.

Here is the graph for a lag of one day (i.e., does yesterday's value of $a$ predict today's value of $b$):

<img src="final.png" title='One day lagged granger causality graph'>

Here is the graph for a lag of two days (i.e., can the two previous days of data for $a$ be used to forecast the next day of data for $b$):

<img src='final1.png' title='Two day lagged intrade granger causality graph'>

And here is the graph for a lag of three days:

<img src='final2.png' title='Three day lagged intrade granger causliaty graph'>

Don't take this too seriously.  And one <b>word of warning:</b> an arrow from $a$ to $b$ does <b>not</b> mean that if $a$ is more likely, then $b$ is more likely&mdash;rather, it ought to mean that past knowledge of $a$ can be used to forecast $b$.  I suppose it would be interesting to add some color for the direction of the relationship, and maybe I'll do that when I have another free hour.

