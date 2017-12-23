(TeX-add-style-hook "coxeter"
 (lambda ()
    (LaTeX-add-environments
     "thm"
     "lemma"
     "proposition"
     "corollary"
     "remark"
     "defn"
     "exercise")
    (TeX-add-symbols
     '("defnword" 1)
     "C"
     "R"
     "Q"
     "Z")
    (TeX-run-style-hooks
     "bbm"
     "add-copyright"
     "amsthm"
     "amsmath"
     "fullpage"
     ""
     "latex2e"
     "art12"
     "article"
     "12pt")))

