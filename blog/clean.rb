


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

  content.gsub!( '<%= post_root %>', '' )

  output = <<EOF
{{{
  "title": "#{title}",
  "tags": [#{tags}],
  "date": "#{date}"
}}}

  #{content}
EOF
  
  f = File.open( "#{directory}/#{directory}.markdown", "w")
  f.puts output
  f.close
end
