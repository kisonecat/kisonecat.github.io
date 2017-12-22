{{{
  "title": "Classifying manifolds is impossible.",
  "tags": ["mathematics"],
  "date": "2007-02-12T16:35:45+00:00"
}}}

  At a recent Pizza Seminar, Matt Day gave a lovely talk explaining why it isn't possible to classify 4-manifolds.

An algorithm for deciding whether two closed 4-manifolds are homeomorphic gives an algorithm for deciding whether a closed 4-manifold is simply connected, and therefore (since every finitely presented group is the fundamental group of a 4-manifold), and algorithm for deciding when a group is trivial.  Here's the reduction: we are given a 4-manifold $M$, and we compute its signature $\sigma(M)$.  By Freedman, there are no more than two closed simply connected 4-manifolds, $M_1$ and $M_2$, having the same signature as $M$; we construct $M_1$ and $M_2$, and we use the homeomorphism decision procedure to test if $M \cong M_1$ or $M \cong M_2$.

Since there is no algorithm for deciding when a group is trivial, there can not be an algorithm for deciding when two closed 4-manifolds are homeomorphic.

Here is a paper discussing some of these issues:

> MR2234702

In particular, that paper discusses Novikov's proof that $S^n$ cannot be recognized for $n \geq 5$.

