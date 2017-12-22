all: $(patsubst %.tex,%.pdf,$(wildcard *.tex)) index.page

install: index.page
	cp index.page ../math131.page

index.page: $(wildcard *.tex) overview.page make-index
	cat overview.page > index.page
	./make-index $(patsubst %.tex,%.pdf,$(wildcard *.tex)) >> index.page

%.pdf: %.ps
	ps2pdf $< $@

%.ps: %.dvi
	dvips $< -o $@

%.dvi: %.tex
	latex $<
	latex $<

clean:
	rm -f *.aux *.log *.bbl *.blg *.brf *.cb *.ind *.idx *.ilg *.inx *.ps *.dvi *.toc *.out $(patsubst %.tex,%.pdf,$(wildcard *.tex))
