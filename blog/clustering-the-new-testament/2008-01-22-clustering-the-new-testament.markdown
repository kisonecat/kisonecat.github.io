---
layout: post
title: Clustering the New Testament.
tags: theology
date: 2008-01-22 06:23:43 +0000
---

During Bible study last week, it was mentioned that people have used statistics to "determine" authorship of books of the Bible.  Having a couple free hours last night, I tried my own experiment on the New Testament.

The procedure was easy: I downloaded the <a href="http://users.mstar2.net/broman/na26-l.zip">Nestle-Aland 26th edition of the New Testament</a>; each book in the New Testament became a vector $v$, with $v_w$ counting the number of times word $w$ appears in the book.  The cosine of the angle between two such vectors measured how similar the corresponding books are.  I packaged these cosines into a matrix, the $(i,j)$ entry of which measured how similar books $i$ and $j$ are.

Of course, this is a $27 \times 27$ matrix.  To turn these numbers into a nice picture, I projected the books onto a lower dimensional space spanned by the eigenvectors having the five largest eigenvalues (this is known as <a href="http://en.wikipedia.org/wiki/Principal_components_analysis">Principal Component Analysis</a>); I chose five dimensions, displayed using location (two dimensions) and color (three dimensions, namely hue, saturation, and luminosity).  The result is the following graph:

<div class="displayedMedia"><img src='new-testament.png' alt='New Testament Clustering' /></div>

The dots represent each book, and nearby dots of similar colors represent similar books.  Some things jump out right away:
<ul>
<li>The Gospels are all in the lower right hand corner.</li>
<li>Paul's epistles (and Peter's?) are mostly in the upper right hand corner.</li>
<li>Revelation is close to John.</li>
<li>Hebrews and James are close to each other? Why?</li>
</ul>
All told, I think this is a pretty good graphical display of the structure of the New Testament, especially considering we used nothing but the Greek text and linear algebra!

