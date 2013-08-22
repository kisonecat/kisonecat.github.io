(TeX-add-style-hook "syllabus"
 (lambda ()
    (TeX-add-symbols
     "peem"
     "ayem")
    (TeX-run-style-hooks
     "hyperref"
     "lmodern"
     "fontenc"
     "T1"
     "nopageno"
     "geometry"
     ""
     "latex2e"
     "handout12"
     "handout"
     "12pt")))

