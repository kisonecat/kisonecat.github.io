{{{
  "title": "Sharpness of the Hurwitz 84(g-1) theorem.",
  "tags": ["teaching", "mathematics"],
  "date": "2007-02-23T21:23:53+00:00"
}}}

  There are usually courses at Mathcamp about surfaces; there should be courses about orbifolds!  For instance, knowing that the smallest hyperbolic orbifold is the (2,3,7)-orbifold, having orbifold Euler characteristic $-1/84$, immediately gives that a closed hyperbolic surface of genus $g$ has no more than $84(g-1)$ isometries (preserving orientation); this is "Hurwitz' $84(g-1)$ theorem."

Just to show off this theorem, here is a cubical complex which is a surface with lots of symmetries (and the clever reader will recognize this as coming right out of Davis' construction of aspherical manifolds): consider the $n$-dimensional cube $I^n$, and let $e_1, \ldots, e_n$ be the $n$ edges around the origin, and $e_i e_j$ be the square face containing the edges $e_i$ and $e_j$.  Define a subcomplex $\Sigma^2_n \subset I^n$ consisting of the squares $e_1 e_2, e_2 e_3, \ldots, e_{n-1} e_n, e_n e_1$ and all squares in $I^n$ parallel to these.  Now $\Sigma^2_n$ is a orientable surface (the link of any vertex is an $n$-cycle, i.e., topologically an $S^1$).  Don't be fooled by the notation: $\Sigma^2_n$ has genus much larger than $n$.

In fact, let's calculate the genus.  Every vertex of $I^n$ is contained in $\Sigma^2_n$, and there are $2^n$ vertices in $I^n$.  Likewise, every edge in $I^n$ is contained in $\Sigma^2_n$, and there are $n 2^{n-1}$ edges in $I^n$.  Finally, there are $2^{n-2}$ squares parallel to each of $e_i e_j$, so there are $n 2^{n-2}$ square faces in $\Sigma^2_n$.  Thus, $$\chi(\Sigma^2_n) = 2^n - n 2^{n-1} + n 2^{n-2} = 2^{n} - n \cdot 2^{n-2},$$ and so $\Sigma^2_n$ is a surface of genus $g = 1 + 2^{n-3} (n - 4)$.  This is a maybe a good exercise for someone first learning about Euler characteristic, but not especially interesting...

So here's the punchline--or rather the punch-question--<strong>why is the genus growing exponentially in $n$?</strong>  <em>Because $\Sigma^2_n$ is very symmetric!</em>  And Hurwitz says to get so much symmetry, we need (linearly) as much genus.  And we can find exponentially many symmetries of $\Sigma^2_n$ without any work.  For starters, the group $(\Z/2\Z)^n$ acts on $\Sigma^2_n$ by reflecting through hyperplanes, as does the group $\Z/n\Z$ cyclically permuting the basis $e_1, \ldots, e_n$.  If we want to be precise, let $G_n$ be the resulting group of order $n 2^{n}$.  Quotienting $\Sigma^2_n$ by these symmetries gives an orbifold $\Sigma^2_n / G_n$, which one observes to be a square with cone points on each vertex (three with cone angle $\pi/2$ and one with cone angle $2 \pi/n$) and reflections in each of the four sides.  Thus, the orbifold Euler characteristic of $\Sigma^2_n / G_n$ is $3/4 + 1/n - 4/2 + 1 = 1/n - 1/4$, so the Euler characteristic of $\Sigma^2_n$ must be $(1/n - 1/4) \cdot n \cdot 2^{n} = 2^{n} - n \cdot 2^{n-2}$, just like we got before.  One might argue that this method was "easier" than the previous method for calculating $\chi(\Sigma^2_n)$, but that misses the point---I (and probably everyone else) calculated the number of edges of $I^n$ by using a group action, if only implicitly.

The point is, even without doing any calculations or thinking very hard, the number of symmetries of $\Sigma^2_n$ is growing exponentially in $n$, and therefore the genus must be growing exponentially in $n$ as well---the orbifold makes this reasoning precise.

There's a lot of stuff left to be discovered about the number of automorphisms of genus $g$ surfaces.  For instance, it's known that the $84(g-1)$ bound is attained for infinitely many genera, but there are also infinitely many genera for which it is not attained.  Let $N(g)$ be the maximal order of the automorphism group of a genus $g$ surface; Maclachlan and Accola proved (in 1968) that $N(g) \geq 8(g+1)$.  This bound is sharp, too.  There's a beautiful paper

> MR2132170

working out what happens in the arithmetic and non-arithmetic case.  Anyway, what is known about the set of $g$ for which $84(g-1)$ is attained?  <strong>What is the asymptotic density of this set?</strong>

