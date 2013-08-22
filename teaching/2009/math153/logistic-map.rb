#! /usr/bin/ruby

outfile = File.open('logistic-map.tex','w')

outfile.puts <<eof
\\documentclass[10pt,letterpaper]{article}

\\title{Some interesting sequences}
\\author{Jim Fowler}

\\usepackage{fullpage}
\\usepackage{nopageno}
\\usepackage{multicol}
\\usepackage[margin=1cm]{geometry}
\\usepackage{amsmath}

\\begin{document}

\\section*{Some interesting sequences.}

\\begin{multicols}{4}
eof

def print_sequence( outfile, initial_value, f, letter, name, iterations)
  outfile.puts <<eof
\\hrule
\\hrule
\\begin{align*}
#{letter}_1 &= #{initial_value} \\\\
#{letter}_{n+1} &= #{name}
\\end{align*}
\\hrule
eof
#\\subsubsection*{$#{letter}_1 = #{initial_value}, #{letter}_{n+1} = #{name}$}
  v = initial_value
  outfile.puts "\\begin{align*}"
for i in 1..iterations
  outfile.puts "#{letter}_{#{i}} &= #{'%0.12f' % v} \\\\"
  v = f.call(v)
end
  outfile.puts "\\end{align*}"
end

def print_integer_sequence( outfile, initial_value, f, letter, name, iterations)
  outfile.puts <<eof
\\hrule
\\hrule
\\begin{align*}
#{letter}_1 &= #{initial_value} \\\\
#{letter}_{n+1} &= \\begin{cases}
d_n/2 & \\mbox{if $d_n$ even,} \\\\
3\\,d_n + 1 & \\mbox{if $d_n$ odd.}
\\end{cases}
\\end{align*}
\\hrule
eof
  v = initial_value
  outfile.puts "\\begin{align*}"
for i in 1..iterations
  outfile.puts "#{letter}_{#{i}} &= #{v} \\\\"
  puts "#{letter}_{#{i}} &= #{v} \\\\"
  v = f.call(v)
end
  outfile.puts "\\end{align*}"
end

print_sequence(outfile, 2.0, Proc.new { |x| x/2 + 1/x }, 'a', 'a_n/2 + 1/a_n', 40)

outfile.puts "\\vfill"
outfile.puts "\\columnbreak"

print_sequence(outfile, 0.3, Proc.new { |x| (x)*(1-x) }, 'b', 'b_n \, (1-b_n)', 40)

outfile.puts "\\vfill"
outfile.puts "\\columnbreak"

print_sequence(outfile, 0.3, Proc.new { |x| 3.5*(x)*(1-x) }, 'c', '3.5 \, c_n \, (1-c_n)', 40)

outfile.puts "\\vfill"
outfile.puts "\\columnbreak"

print_integer_sequence(outfile, 27, Proc.new { |x| if (x%2==0) then x/2 else (3*x+1) end }, 'd', '\begin{matrix} d_n/2 & \mbox{if even} \\\\ 3\,d_n + 1 & \mbox{if odd} \end{matrix}', 130)

outfile.puts "\\vfill"

outfile.puts <<eof
\\end{multicols}
\\end{document}
eof
