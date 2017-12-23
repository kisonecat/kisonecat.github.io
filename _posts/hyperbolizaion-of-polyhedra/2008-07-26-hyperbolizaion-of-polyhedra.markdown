---
layout: post
title: Hyperbolization of Polyhedra
tags: talks mathematics
date: 2008-07-26 15:14:56 +0000
---

I gave a talk in the <b>Farb and Friends Student Seminar</b> (back in March!) on:

> MR1131435

This is an <b>awesome paper</b>&mdash;well-worth a few words on every blog!

The construction is way easier than you might think.  The ingredients:
<ul>
<li>A model space $X$ with a map $f : X \to \Delta^n$</li>
<li>Any simplicial complex $K$ with a nondegenerate (edge-non-collapsing) map $K \to \Delta^n$ (if having a map to $\Delta^n$ seems like a bother, note that the barycentric subdivision $K'$ comes with a map to $\Delta^n$ for free).</li>
</ul>
Let $X_J = f^{-1}(J)$ for $J$ a subcomplex of $\Delta^n$; we think of this as decomposing $X$ into pieces resembling a simplex.

Now the construction is easy: replace each simplex in $K$ with a corresponding piece of $X$.  Or more formally, build the fiber product of $X$ and $\|K\|$ over $\Delta^n$; this fiber product is denoted by $X \tilde{\Delta} K$ in the paper.  From this, we get a natural map $f_K : X \tilde{\Delta} K \to K$.

The vague upshot is this: features of $X$ translate into features of $X \tilde{\Delta} K$, while nonetheless preserving features of $K$.  Here are a couple of examples of how assumptions on $X$ lead to consequence for $X \tilde{\Delta} K$.
<ul>
<li>If $X$ is path-connected, and for each codimension 1 face $\alpha$ of $\Delta^n$, we have $X_{\alpha} \neq \varnothing$, then $\pi_1(f_K) : \pi_1(X \tilde{\Delta} K) \to \pi_1(K)$ is a surjection.</li>
<li>If $X$ and $K$ are PL-manifolds, and $\dim X_J = \dim J$, and $\partial X_J = X_{\partial J}$, then $X \tilde{\Delta} K$ is a PL-manifold.</li>
</ul>

