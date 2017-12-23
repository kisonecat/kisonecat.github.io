---
layout: post
title: Culturomics
tags: linguistics history
date: 2010-12-18 09:02:45 +0000
---

<p>I have really fallen in love with <a href="http://ngrams.googlelabs.com/">Google Books Ngram Viewer</a>, so I thought I'd do a little ``<a href="http://www.sciencemag.org/content/early/2010/12/15/science.1199644">culturomics</a>'' myself.  Here's an image I made using <a href="http://ngrams.googlelabs.com/datasets">Google's data</a>:</p>

<div class="displayedMedia"><a href='raster-original.png' title='Numbers in Print'><img src='raster-small.png' alt='Numbers in Print' /></a></div>

<p>The brightness of the pixel at position $(x,y)$ is related to
how frequently ``$x$'' appears in books published in
the year $y$.  Specifically, if $p$ is the number of times ``$x$''
appears in print during year $y$, divided by the number of times any
number less than 2100 appears in print during that year, then $(1 -
p)^{1500}$ is the brightness of the pixel at $(x,y)$.</p>

<p>The dark, diagonal edge along the right hand side appears because
in year $y$ there are many published appearances of numbers near $y$.</p>

<div class="displayedMedia"><img src='dark-diagonal-edge.png' alt='Dark diagonal edge' /></div>

<p><b>World events have left their mark on the numbers appearing in books!</b>  For example, 1914 is still being talked about long after 1914, as evidenced by the darker line above 1914.</p>

<p>If we look at numbers just above 1000 and turn up the contrast a bit,</p>

<div class="displayedMedia"><img src='around-one-thousand.png' alt='Around one thousand' /></div>

<p>we see an echo of the dark diagonal, from people writing (or more likely, the OCR software reading) zero instead of nine in the year.  There's a dark column for the Norman conquest in 1066; a number like $2^{10} = 1024$ was not so important until the 20th century.</p>

<p>If we look at numbers just above 1300,</p>

<div class="displayedMedia"><img src='above-1300.png' alt='Above 1300' /></div>

<p>we can see an diagonal line from 1800s being read as 1300s, and a dark vertical line above 1453 (the ``end'' of the middle ages).  In the 18th century,</p>

<div class="displayedMedia"><img src='above-1700.png' alt='Above 1700' /></div>

<p>1776 is quite visible.  <b>And finally, a puzzle:</b></p>

<div class="displayedMedia"><img src='why-2044.png' alt='Why 2044' /></div>

<p>Why was ``2044'' so significant until the 1920s?</p>

<div class="displayedMedia"><a href="http://ngrams.googlelabs.com/graph?content=2043,2044,2045&year_start=1800&year_end=2000&corpus=0&smoothing=0"><img width="500px" src='2044-graph.png' alt='2043,2044,2045 in Google ngrams viewer' /></a></div>

<p>I'd love to know the answer to this question.  The only thing I can guess that might relate the year 1919 to the year 2044 is solar eclipses.</p>

