#! /usr/bin/ruby

file = File.open('infinite-bridge.tex','w')

file.puts <<eof
\\documentclass[12pt]{article}

\\usepackage{fullpage}
\\usepackage{nopageno}
\\usepackage{pgf}
\\usepackage[margin=1cm]{geometry}

\\begin{document}

\\subsection*{\\sffamily Infinite Bridge Kit}
eof

width = 3.0
height = 7.0

for i in 1..60
  fraction = height * (1.0 - 1.0 / (2*i))
  file.puts <<eof
\\begin{pgfpicture}{0in}{0in}{#{width+1}cm}{#{height+1}cm}
  \\pgfsetlinewidth{1pt}
  \\pgfline{\\pgfxy(0,0)}{\\pgfxy(0,#{height})}
  \\pgfline{\\pgfxy(0,#{height})}{\\pgfxy(#{width},#{height})}
  \\pgfline{\\pgfxy(#{width},#{height})}{\\pgfxy(#{width},0)}
  \\pgfline{\\pgfxy(#{width},0)}{\\pgfxy(0,0)}
  \\pgfsetlinewidth{0.1pt}
  \\pgfline{\\pgfxy(0,#{fraction})}{\\pgfxy(#{width},#{fraction})}
  \\pgfputat{\\pgfxy(#{width/2},#{height/2})}{\\pgfbox[center,center]{\\sffamily\\Large #{i}}}
\\end{pgfpicture}
eof
end

file.puts <<eof
\\end{document}
eof

file.close
