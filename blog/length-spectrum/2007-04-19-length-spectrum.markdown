---
layout: post
title: Spectral rigidity.
tags: questions mathematics
date: 2007-04-19 21:55:50 +0000
---

For $X$ a metric space, and $S \subset X$, define the *length spectrum of S* to be $D_S := \{ d(x,y) : x, y \in S \}$.  It might be better to call this the "distance spectrum" or "distance set."

<a href="http://www.math.uchicago.edu/~biringer/">Ian</a>, during his Pizza seminar, gave the following definition: a set $S \subset \R^n$ is a *$k$-distance set* if $D_S$ has cardinality no greater than $k$.  In words, the distances between points in a $k$-distance set take on no more than $k$ possible values.

The question that Ian answered is the following: how big can a $k$-distance set in $\R^n$ be?  Clever linear algebra shows that the size grows polynomially in $n$ with degree $k$.  A related exercise is the following: suppose $S \subset \R^n$ and $D_S$ is countable; prove that $S$ is countable.

Now here is my question: suppose $S \subset \R^n$ and $D_S$ is measurable with measure $m$.  Can one then bound the measure of $S$?  Ian asked this for the counting measure, but presumably one can get results for Lebesgue measure.  Likewise, one can ask this for spaces other than $\R^n$.

All this talk of spectra has gotten me thinking very vaguely about a bunch of stuff--some random ideas!  One context in which I have seen spectra is for lattices in Lie groups; I don't know, but *definitely ought to know* how much control the spectrum exerts on the lattice.  As a baby example, it is true that one can recover a lattice $\Lambda \subset \R^2$ from its length spectrum?  Similarly, a Riemannian manifold has a length spectrum, and the "marked length rigidity conjecture" asks how much of the Riemannian structure is related to this.  See @MR1919399 for more information.

Finally, it is possible to define a "spectral distance" (I'm mis-using so many word here!) between two lattices in a Lie group.  Namely, given $\Lambda_1, \Lambda_2 \subset G$, define $d(\Lambda_1, \Lambda_2) = d_{GH}(D_{\Lambda_1}, D_{\Lambda_2})$, i.e., the Hausdorff distance between their spectra.  Though you'd probably want something slightly more refined (to count multiplicities).  You could likewise say that two manifolds are "nearly isospectral" if their spectra are not so far apart in Gromov-Hausdorff distance.  I have no idea whether this is a good idea; it probably isn't.  In any case, Sunada @MR782558 constructs isospectral manifolds, and it would be interesting to know how easy it is to construct nearly isospectral manifolds.  A braver person than I might conjecture that two manifolds are isospectral if they are $\epsilon$-nearly isospectral for small enough $\epsilon$.

At last, can one detect arithmeticity of a lattice from its spectrum?  I suppose if I were really hip, I would ask: can a geometer hear arithmeticity?  I think Sunada's examples are all arithmetic?

