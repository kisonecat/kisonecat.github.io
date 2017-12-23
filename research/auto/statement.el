(TeX-add-style-hook "statement"
 (lambda ()
    (LaTeX-add-bibliographies
     "references")
    (LaTeX-add-environments
     "theorem"
     "corollary"
     "lemma"
     "remark"
     "example"
     "definition"
     "conjecture"
     "question")
    (TeX-add-symbols
     '("arxiv" 1)
     '("nomr" 1)
     '("mr" 1)
     "R"
     "Q"
     "N"
     "Z"
     "B")
    (TeX-run-style-hooks
     "biblatex"
     "style=numeric"
     "amssymb"
     "amsthm"
     "amsmath"
     "hyperref"
     ""
     "geometry"
     "bottom=1in"
     "top=0.5in"
     "right=1.5in"
     "left=1.5in"
     "latex2e"
     "amsart12"
     "amsart"
     "12pt")))

