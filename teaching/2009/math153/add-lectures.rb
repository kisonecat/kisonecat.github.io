#! /usr/bin/ruby

require 'date'

def schooldays(start_day, finish_day)
  days = Array.new
  
  d1 = start_day
  d1 += 1 while (d1.wday != 1)
  d1.step(finish_day, 7) do |date|
    days << date
  end

  d1 = start_day
  d1 += 1 while (d1.wday != 3)
  d1.step(finish_day, 7) do |date|
    days << date
  end

  d1 = start_day
  d1 += 1 while (d1.wday != 5)
  d1.step(finish_day, 7) do |date|
    days << date
  end

  days.sort!

  return days
end

days = schooldays(Date::civil(2008, 9, 29), Date::civil(2008, 12, 5))

weeks = Array.new

for i in (0..9)
  week = [days[3*i], days[3*i+1], days[3*i+2]]
  weeks << week
end

i = 1
for week in weeks
  puts "Week #{i}"
  puts week
  i = i + 1
end

i = 1
for week in weeks
  for day in week
    filename = "lecture#{'%02d' % i}.tex"
    unless File.exist?(filename)
      file = File.new( filename, "w" )
      file.puts <<eof
\\documentclass[12pt]{article}
\\usepackage{fullpage}
\\usepackage{amsthm}
\\usepackage{amsmath}

\\newtheorem*{example}{Example}
\\newtheorem*{thm}{Theorem}

\\title{Lecture #{i}}
\\author{Math 153 Section 57}
\\date{#{day.strftime('%A %B %e, %Y')}}

\\begin{document}
\\maketitle

\\end{document}
eof
    else
      puts "File #{filename} already created."
    end
    i = i + 1
  end
end

file = File.new('lectures.html','w')

file.puts <<eof
<html>
<head><title>Lectures</title></head>
  <style type="text/css">
    margin-top: 3%; margin-right: 3%; margin-bottom: 3%; margin-left: 3%;
  </style>
<body>
<h1>Lectures</h1>
eof

i = 1
j = 1
for week in weeks
  file.puts "<h2>Week #{j}</h2>"
  file.puts "<ul>"
  for day in week
    pdf_filename = "lecture#{'%02d' % i}.pdf"
    html_filename = "lecture#{'%02d' % i}/"
    tex_filename = "lecture#{'%02d' % i}.tex"
    file.puts "<li><a href=\"#{html_filename}\">"
    file.puts "#{day.strftime('%A %B %e, %Y')} &mdash;"
    if File.open(tex_filename).read.match( /title{(.*)}/ )
      file.puts $1
    end
    file.puts "</a>"
    file.puts "(<a href=\"#{pdf_filename}\">PDF</a>)"
    file.puts "</li>"
    i = i + 1
  end
  file.puts "</ul>"
  j = j + 1
end

file.puts <<eof
</body>
</html>
eof
