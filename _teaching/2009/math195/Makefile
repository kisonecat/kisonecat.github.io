HANDOUTS=syllabus.pdf survey.pdf review1.pdf midterm1.pdf limits.pdf review2.pdf
ASSIGNMENTS=$(patsubst %.tex,%.pdf,$(wildcard homework*.tex))
LECTURES=lecture01.pdf lecture02.pdf lecture03.pdf lecture04.pdf lecture05.pdf lecture06.pdf lecture07.pdf lecture08.pdf lecture09.pdf lecture10.pdf lecture11.pdf lecture12.pdf lecture13.pdf lecture14.pdf lecture15.pdf lecture01 lecture02 lecture03 lecture04 lecture05 lecture06 lecture07 lecture08 lecture09 lecture10 lecture11 lecture12 lecture13 lecture14 lecture15


all: install

install: syllabus.pdf syllabus $(HANDOUTS) handouts.html $(ASSIGNMENTS) assignments.html $(LECTURES) lectures.html index.page
	cp index.page /aa/fowler/public_html/teaching/math195.page

index.page: $(HANDOUTS) $(ASSIGNMENTS) overview.page make-mini-index
	cat overview.page > index.page
	echo "<h3>Handouts</h3>" >> index.page
	./make-mini-index $(HANDOUTS) >> index.page
	echo "<h3>Assignments</h3>" >> index.page
	./make-mini-index $(ASSIGNMENTS) >> index.page

handouts.html: $(HANDOUTS)
	./make-index $(HANDOUTS) > handouts.html

assignments.html: $(ASSIGNMENTS)
	./make-homework-index $(ASSIGNMENTS) > assignments.html

lectures.html: $(LECTURES)
	ruby add-lectures.rb
#	./make-index $(LECTURES) > lectures.html

lecture%: lecture%.tex
	latex2html -split 0 -nonavigation -white -noinfo $<

syllabus: syllabus.tex
	latex2html -split 0 -nonavigation -white -notransparent -noinfo syllabus.tex
	echo "body { margin-top: 3%; margin-right: 3%; margin-bottom: 3%; margin-left: 3%; }" >> syllabus/syllabus.css

#%.dvi: %.tex
#	latex $<
#	latex $<

#%.ps: %.dvi
#	dvips $< -o $@

#%.pdf: %.ps
#	ps2pdf $< $@

%.pdf: %.tex
	pdflatex $<
	pdflatex $<

clean:
	rm -f *.aux *.log *.bbl *.blg *.brf *.cb *.ind *.idx *.ilg  \
		*.inx *.ps *.dvi *.toc *.out
