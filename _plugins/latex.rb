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
      content
    end
  end
end
