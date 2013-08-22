HANDOUTS=$(shell grep add-copyright *.tex | sed "s/:.*//g" | sed "s/\.tex/\.pdf/g" | tr "\n" " ")
ASSIGNMENTS=

all: install

install: $(HANDOUTS) handouts.html $(ASSIGNMENTS) assignments.html index.page
	cp index.page /aa/fowler/public_html/teaching/ibl-analysis.page

index.page: $(HANDOUTS) $(ASSIGNMENTS) overview.page make-mini-index
	cat overview.page > index.page
	echo "<h3>Handouts</h3>" >> index.page
	./make-mini-index $(HANDOUTS) >> index.page
	./make-mini-index $(ASSIGNMENTS) >> index.page

handouts.html: $(HANDOUTS)
	./make-index $(HANDOUTS) > handouts.html

assignments.html: $(ASSIGNMENTS)
	./make-index $(ASSIGNMENTS) > assignments.html

%.pdf: %.tex
	pdflatex $<
	pdflatex $<

clean:
	rm -f *.aux *.log *.bbl *.blg *.brf *.cb *.ind *.idx *.ilg  \
		*.inx *.ps *.dvi *.toc *.out
