{{{
  "title": "Kolmogorov complexity.",
  "tags": ["computer science"],
  "date": "2006-09-25T20:22:21+00:00"
}}}

  Here are some very ill-thought-out ideas on Kolmogorov complexity.

We define a metric on the space of bit-strings $\Sigma^\star$.  For a universal Turing machine $T$, let $d_T(x,y)$ be the "length" of the shortest program that outputs $y$ on input $x$, or outputs $x$ on input $y$.  This should measure how difficult it is to "relate" $x$ and $y$.

The ends of the metric space $(\Sigma^\star, d_T)$ should correspond to infinite random bitstrings, and because choosing a different univeral Turing machine just replaces this metric space with one quasi-isometric to it, the ends should be preserved, so there will still be a lot of infinite random bitstrings

But obviously I haven't thought about any of this very carefully: for instance, the triangle inequality probably only holds coarsely, because it depends on being able to concatenate programs.

Here's a similar question.  Usually, we start with a partial function $f : \Sigma^\star \to \Sigma^\star$ which tells how to translate descriptions into objects; Kolmogorov complexity is then defined as $C_f(x) = \min_{f(y) = x} |y|$.  Any universal Turing machine gives a measure of complexity with the same asymptotics, i.e., $C_g(x)$ and $C_f(x)$ differ by a constant that depends only on $f$ and $g$.  Suppose I have another function $h$ so that $C_h$ has the same asymptotics: what more can be said about $h$?

There's a stupid rigidity for computable functions (a computable function is still computable if its value is changed at finitely many places), and maybe these sort of questions could lead to a rigidity theorem for computability, a local Church-Turing thesis.

And having written this, I'm terrified at how similar I sound to Archimedes Plutonium.  Now I'll go to learn more about localization of spaces in the algebraic topology proseminar.

