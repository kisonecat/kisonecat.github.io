require 'date'


Dir.glob('./*/pubDate') do |file_date|
  date = File.open(file_date).read.strip
  
  directory = ''
  if file_date.match( /.\/(.*)\/pubDate/ )
    directory = $1
  end
  
  puts directory

  title = File.open( "#{directory}/title" ).read.strip
  tags = File.open( "#{directory}/categories" ).read.strip.split(',').collect{ |x| "\"#{x.downcase}\"" }.join( ', ' )
  content = File.open( "#{directory}/content" ).read
  date = DateTime.parse(date)
  
  content.gsub!( '<%= post_root %>', '' )

  output = <<EOF
---
layout: post
title: #{title}
tags: #{tags.split(',').collect{ |x| eval(x.downcase) }.join(' ')}
date: #{date.strftime("%Y-%m-%d %H:%M:%S %z")}
---

#{content}
EOF

  `mkdir "../_posts/#{directory}"`
  f = File.open( "../_posts/#{directory}/#{date.strftime('%Y-%m-%d')}-#{directory}.markdown", "w")  
  f.puts output
  f.close
  Dir.glob("#{directory}/*.png") do |filename|
    puts `git mv "#{filename}" "../_posts/#{directory}/"`
  end
end
