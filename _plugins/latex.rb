module Jekyll
  class LatexConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /^\.tex$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      title = ''
      if content.match( /\\title{([^}]*)}/ )
        title = $1
      end

      content.gsub!(/\\cite{MR([0-9]+)}/, '<a href="http://www.ams.org/mathscinet-getitem?mr=\1">[MR\1]</a>')
      
      content.gsub!( /%.*/, '' );
      
      if content.match(/\\begin{document}/)
        lines = content.split("\n")
        start = lines.index{ |x| x.match(/\\begin{document}/) } + 1
        content = lines[start..-1].join("\n")
        
        content.gsub!( /\\end{document}/, '' );          
      end
      
      content.gsub!( /\\"i/, '&iuml;' );
      content.gsub!( /\\"o/, '&ouml;' );
      content.gsub!( /\\H{o}/, '&#337;' );
      content.gsub!( /~/, '&nbsp;' );
      content.gsub!( /\\Z/, '\\mathbb{Z}' );
      content.gsub!( /\\Q/, '\\mathbb{Q}' );
      content.gsub!( /---/, '&mdash;' );
      content.gsub!( /--/, '&ndash;' );      
      content.gsub!( /``/, '&ldquo;' );
      content.gsub!( /''/, '&rdquo;' );
      content.gsub!( /\\'e/, '&eacute;' );
      content.gsub!( /\\textit{([^}]*)}/, '<em>\1</em>' );
      content.gsub!( /\\texttt{([^}]*)}/, '<code>\1</code>' );      
      content.gsub!( /\\href{([^}]*)}{([^}]*)}/, '<a href="\1">\2</a>' );      
      content.gsub!( /\\begin{itemize}/, '<ul>' );
      content.gsub!( /\\item/, '</li><li>' );
      content.gsub!( /\\end{itemize}/, '</li></ul>' );
      content.gsub!( /<ul>[ \n]*<\/li>/, '<ul>' );
      content.gsub!( /\\"u/, '&uuml;' );
      
      content.gsub!( /\\begin{theorem}/, "\n\n\\begin{theorem}" );
      content.gsub!( /\\end{theorem}/, "\\end{theorem}\n\n" );
      content.gsub!( /\\begin{question}/, "\n\n\\begin{question}" );
      content.gsub!( /\\end{question}/, "\\end{question}\n\n" );
      content.gsub!( /\\begin{proof}/, "\n\n\\begin{proof}" );
      content.gsub!( /\\end{proof}/, "\\end{proof}\n\n" );

      content.gsub!(/\n\n+/, "\n\n" )

      paragraphs = content.split( "\n\n" )
      result = paragraphs.collect!{ |p|
	p.gsub!( /\\begin{theorem}\[([^\]]+)\]/, '<p class="theorem"><span class="theorem-title">Theorem.</span><span class="theorem-citation">(\1)</span>' )
        p.gsub!( /\\begin{theorem}/, '<p class="theorem"><span class="theorem-title">Theorem.</span>')
        
	p.gsub!( /\\end{theorem}/, '</p>' );

	p.gsub!( /\\begin{question}\[([^\]]+)\]/, '<p class="theorem"><span class="theorem-title">Question.</span><span class="theorem-citation">(\1)</span>' );
	p.gsub!( /\\begin{question}/, '<p class="theorem"><span class="theorem-title">Question.</span>' );
	p.gsub!( /\\end{question}/, '</p>' );
	p.gsub!( /\\begin{proof}\[([^\]]+)\]/, '<p class="theorem"><span class="theorem-title">\1</span>' );
	p.gsub!( /\\begin{proof}/, '<p class="theorem"><span class="theorem-title">Proof.</span>' );
	p.gsub!( /\\end{proof}/, '&nbsp;&#8718;</p>' );
        
        p.gsub!( /\\subsection\*{([^}]*)}/, '<h3>\1</h3>' );
        p.gsub!( /\\section\*{([^}]*)}/, '<h2>\1</h2>' );
        p.gsub!( /\\maketitle/, '<h1>' + title + '</h1>' );
        
        if not p.match(/<p class="theorem">/) and not p.match(/<ul>/) and not p.match(/<h3>/) and not p.match(/<h2>/) and not p.match(/<h1>/)
	  p = '<p>' + p + '</p>'
        end

        p
      }
            
      return result.join('')
    end
  end
end
