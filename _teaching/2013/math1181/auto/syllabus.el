(TeX-add-style-hook "syllabus"
 (lambda ()
    (TeX-add-symbols
     "peem"
     "ayem")
    (TeX-run-style-hooks
     "nopageno"
     "hyperref"
     "lmodern"
     "fontenc"
     "T1"
     "geometry"
     ""
     "latex2e"
     "handout12"
     "handout"
     "12pt")))
