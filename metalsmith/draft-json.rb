#! /usr/bin/ruby

require 'json'

files = Dir.new(Dir.pwd).entries

resources = []

files.select{ |x|
  if x.match( /pdf$/ )
    resource = {}

    resource['title'] = x.gsub( '.pdf', '' )

    if files.include?( x.gsub( /\.pdf$/, '.tex' ) )
      if File.open( x.gsub( '.pdf', '.tex' ) ).readlines.join('').match( /\\title{([^}]+)}/ )
        resource['title'] = $1
      end
      resource['source'] = x.gsub( /\.pdf$/, '.tex' )
    end
    
    resource['shortname'] = x.gsub( /\.pdf$/, '' )
    resource['filename'] = x

    resource['description'] = ''

    resource['tags'] = []    
    resource['tags'] << 'syllabus' if resource['title'].downcase.match('syllabus')
    resource['tags'] << 'syllabus' if resource['title'].downcase.match('calendar')

    resource['tags'] << 'quiz' if resource['title'].downcase.match('quiz')
    resource['tags'] << 'lecture' if resource['title'].downcase.match('lecture')

    resource['tags'] << 'homework' if resource['title'].downcase.match('homework')
    resource['tags'] << 'homework' if resource['title'].downcase.match('problem set')
    resource['tags'] << 'exam' if resource['title'].downcase.match('exam')
    resource['tags'] << 'exam' if resource['title'].downcase.match('midterm')
    resource['tags'] << 'exam' if resource['title'].downcase.match('final')

    resource['tags'] << 'handout' if resource['tags'].length == 0

    resources << resource
  end
}

jj resources
