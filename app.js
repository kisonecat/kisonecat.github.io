
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , jade = require('jade')
  , _ = require('underscore');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var jade_filters = require('./node_modules/jade/lib/filters');

jade_filters.latex = function(text) {
    text = text.replace(/\\cite{MR([0-9]+)}/g, function(match, text, urlId){
	return '<a href="http://www.ams.org/mathscinet-getitem?mr=' + text + '">[MR' + text + ']</a>';
    });

    text = text.replace( /--/g, '&ndash;' );
    text = text.replace( /\\"i/g, '&iuml;' );
    text = text.replace( /\\"o/g, '&ouml;' );
    text = text.replace( /\\H{o}/g, '&#337;' );
    text = text.replace( /~/g, '&nbsp;' );
    text = text.replace( /\\Z/g, '\\mathbb{Z}' );
    text = text.replace( /\\Q/g, '\\mathbb{Q}' );
    text = text.replace( /---/g, '&mdash;' );
    text = text.replace( /``/g, '&ldquo;' );
    text = text.replace( /''/g, '&rdquo;' );
    text = text.replace( /\\textit{([^}]*)}/g, '<em>$1</em>' );

    text = text.replace( /\\begin{theorem}/g, '\n\n\\begin{theorem}' );
    text = text.replace( /\\end{theorem}/g, '\\end{theorem}\n\n' );
    text = text.replace( /\\begin{question}/g, '\n\n\\begin{question}' );
    text = text.replace( /\\end{question}/g, '\\end{question}\n\n' );

    text = text.replace(/\n\n+/g, "\n\n" )
    var paragraphs = text.split( "\n\n" );
    return _.map( paragraphs, function(p) {
	p = p.replace( /\\begin{theorem}\[([^\]]+)\]/g, '<p class="theorem"><span class="theorem-title">Theorem.</span><span class="theorem-citation">($1)</span>' );
	p = p.replace( /\\end{theorem}/g, '</p>' );

	p = p.replace( /\\begin{question}\[([^\]]+)\]/g, '<p class="theorem"><span class="theorem-title">Question.</span><span class="theorem-citation">($1)</span>' );
	p = p.replace( /\\begin{question}/g, '<p class="theorem"><span class="theorem-title">Question.</span>' );
	p = p.replace( /\\end{question}/g, '</p>' );
	if (!p.match(/<p class="theorem>/))
	    return '<p>' + p + '</p>';
	else
	    return p;
    }).join('');
}

////////////////////////////////////////////////////////////////
// load course information

function Resource() {
    return;
}

function Course() {
    this.resourcesWithTag = function(tag) {
	return _.sortBy( _.filter( this.resources, function(resource) { return _.contains( resource.tags, tag ) } ), 'shortname' );
    }

    this.untaggedResources = function() {
	return _.sortBy( _.filter( this.resources, function(resource) { return resource.tags.length == 0; } ), 'shortname' );
    }

    this.resourceTags = function() {
	return _.uniq( _.flatten( _.collect( this.resources, function(resource) { return resource.tags } ) ) );
    }

    this.shortTitle = function() {
	var result = this.shortname.replace( '-', ' ' );
	result = result.replace( 'math', 'Math ' );
	result = result.replace( 'ross', 'Ross ' );
	result = result.replace( 'ibl', 'IBL' );
	result = result.replace( 'bros', 'Bros' );
	result = _.collect( result.split(' '), function(word) { return word.capitalize(); } ).join( ' ' );
	return result;
    }

    this.longname = function() {
	return this.shortTitle() + ": " + this.title;
    }

    return this;
}

var courses = new Array();

var glob = require("glob")

glob(path.join(__dirname, 'teaching/**/course.json'), {}, function (er, files) {
    files.forEach( function(filename) {
	var course = require( filename );
	course.directory = path.dirname( filename );
	course.url = course.directory.replace( __dirname, '' ) + '/';

	if (course.logo) {
	    var logoPath = course.url + course.logo;
	    app.get( logoPath, function ( req, res ) { res.sendfile( path.join( __dirname, logoPath ) ) } );
	}

	course.resources = new Array();
	require( path.join( course.directory, "resources.json" ) ).forEach( function(resource) {
	    resource = _.extend( new Resource(), resource );
	    resource.course = course;
	    resource.url = course.url + resource.shortname;
	    resource.preview = resource.filename.replace( '.pdf', '.png' );

	    var thumbnailPath = course.url + resource.filename.replace( '.pdf', '.png' );
	    var resourcePath = course.url + resource.filename;
	    app.get( thumbnailPath, function ( req, res ) { res.sendfile( path.join( __dirname, thumbnailPath ) ) } );
	    app.get( resourcePath, function ( req, res ) { res.sendfile( path.join( __dirname, resourcePath ) ) } );
	    
	    fs.exists(path.join( course.directory, resource.filename.replace( '.pdf', '.tex' ) ), function (exists) {
		if (exists) {
		    resource.source = resource.filename.replace( '.pdf', '.tex' );
		    var sourcePath = course.url + resource.filename.replace( '.pdf', '.tex' );
		    app.get( sourcePath, function ( req, res ) { res.sendfile( path.join( __dirname, sourcePath ) ) } );
		}
	    });

	    app.get( resource.url,
		     function ( req, res ) { res.render( 'teaching/resource',
							 { section: 'Teaching', course: course, resource: resource, title: resource.title } ); });
	    course.resources.push( resource );
	});

	course = _.extend(new Course(), course);
	courses.push( course );

	fs.exists(path.join( course.directory, "index.jade" ), function (exists) {
	    var view = 'teaching/course';
	    if (exists)
		view = path.join( course.directory, "index.jade" );

	    app.get( course.url, function ( req, res ) { res.render( view, { section: 'Teaching', course: course, title: course.title } ); });
	});
    });
})

app.get( '/teaching', function ( req, res ) { res.render( 'teaching/index', { section: 'Teaching', courses: courses, title: 'Teaching' } ); });
app.get( '/teaching/videos', function ( req, res ) { res.render( 'teaching/videos', { section: 'Teaching', courses: courses, title: 'Videos' } ); });

////////////////////////////////////////////////////////////////
// setup teaching statement

var fs = require('fs'), filename = path.join(__dirname, 'teaching/statement/statement.tex')
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    
    var body = data.match(/\\begin{document}([\s\S]*)/i)[1];
    body = body.replace( '\\end{document}', '' );
    body = body.replace( /%.*/g, '' );
    body = body.replace( '\\maketitle', '' );
    body = body.replace( /---/g, '&mdash;' );
    body = body.replace( /\\textit{([^}]*)}/g, '<em>$1</em>' );
    body = body.replace( /\\subsection\*{([^}]*)}/g, '<h3>$1</h3>' );
    body = body.replace( /``/g, '&ldquo;' );
    body = body.replace( /''/g, '&rdquo;' );

    body = body.replace( /\n\n/g, ' <br/> ' );
    body = body.replace( /\n/g, ' ' );
    body = _.collect( body.split( '<br/>' ), function( paragraph ) {
	if (!paragraph.match( /[A-z]/ )) return '';
	if (paragraph.match( '<h3>' ))
	    return paragraph + "\n";
	else
	    return '<p>' + paragraph.replace(/^\s+|\s+$/g, '') + '</p>\n';
	}).join( '' );
	
    app.get( '/teaching/statement', function ( req, res ) { res.render( 'teaching/statement', { section: 'Teaching', courses: courses, title: 'Teaching Statement', teachingStatement: body } ); });
    app.get( '/teaching/statement/teaching-statement.pdf', function ( req, res ) { res.sendfile( path.join(__dirname, 'teaching/statement/statement.pdf') ) });
    app.get( '/teaching/statement/teaching-statement.png', function ( req, res ) { res.sendfile( path.join(__dirname, 'teaching/statement/statement.png') ) });
});

////////////////////////////////////////////////////////////////
// set up research projects

var projects = new Array();

var glob = require("glob")

function Project() {
    this.thumbnail = function() {
	if (this.file)
	    return this.url + this.file.replace( /.pdf$/, '.png' );
	else {
	    if (this.arxiv) {
		return this.url + this.arxiv + '.png';
	    } else 
		return null;
	}
    }

    this.fileWithPath = function() {
	if (this.arxiv)
	    return 'http://arxiv.org/pdf/' + this.arxiv + '.pdf';

	if (this.file)
	    return this.url + this.file;
	else
	    return null;
    }

    return this;
}

glob(path.join(__dirname, 'research/**/project.json'), {}, function (er, files) {
    files.forEach( function(filename) {
	var project = require( filename );
	project.directory = path.dirname( filename );
	project.url = project.directory.replace( __dirname, '' ) + '/';

	fs.readFile(path.join( project.directory, 'index.jade' ), 'utf8', function (err, data) {
	    if (err) throw err;
	    var fn = jade.compile(data);
	    project.jade = jade.compile(data);
	});

	fs.readFile(path.join( project.directory, 'summary.jade' ), 'utf8', function (err, data) {
	    if (!err) {
		var fn = jade.compile(data);
		project.summary = jade.compile(data);
	    }
	});

	project = _.extend(new Project(), project);
	projects.push( project );

	app.get( project.url, function ( req, res ) { res.render( 'research/project', { section: 'Research', project: project, title: project.title } ); });

	if (project.bibtex) {
	    fs.readFile(path.join( project.directory, project.bibtex ), 'utf8', function (err, data) {
		if (err) throw err;
		var parsedBibtex = require('bibtex-parser')(data);
		project.bibtex = parsedBibtex[Object.keys(parsedBibtex)[0]];
	    });	    
	}

	if (project.file) {
	    app.get( project.thumbnail(), function ( req, res ) { res.sendfile( path.join( __dirname, project.thumbnail() ) ) } );
	    app.get( project.fileWithPath(), function ( req, res ) { res.sendfile( path.join( __dirname, project.fileWithPath() ) ) } );
	}

	if (project.arxiv) {
	    app.get( project.thumbnail(), function ( req, res ) { res.sendfile( path.join( __dirname, project.thumbnail() ) ) } );
	    //app.get( project.fileWithPath(), function ( req, res ) { res.sendfile( path.join( __dirname, project.fileWithPath() ) ) } );
	}
    });
});

app.get( '/research', function ( req, res ) { 
    var published = _.filter( projects, function(p) { return p.status == "published"; } );
    var unpublished = _.filter( projects, function(p) { return p.status != "published"; } );
    res.render( 'research/index', { section: 'Research',
				    unpublished: _.sortBy( unpublished, function(p) {return -p.year;} ),
				    published: _.sortBy( published, function(p) {return -p.year;} ),
				    title: 'Research' } );
});

var papers = new Array();
fs.readFile(path.join( __dirname, "research/papers.bib" ), 'utf8', function (err, data) {
    if (err) throw err;
    var bibtexs = require('bibtex-parser')(data);
    papers = _.sortBy( _.values( bibtexs ), 'YEAR' );
});	    
app.get( '/research/papers', function ( req, res ) { res.render( 'research/papers', { section: 'Research', papers: papers, title: 'Research' } ); });

////////////////////////////////////////////////////////////////
// setup research statement

var fs = require('fs'), filename = path.join(__dirname, 'research/statement/short-statement.tex')
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    
    var body = data.match(/\\begin{document}([\s\S]*)/i)[1];
    body = body.replace( '\\end{document}', '' );
    body = body.replace( /%.*/g, '' );
    body = body.replace( '\\maketitle', '' );
    body = body.replace( /---/g, '&mdash;' );
    body = body.replace( /\\textit{([^}]*)}/g, '<em>$1</em>' );
    body = body.replace( /\\subsection\*{([^}]*)}/g, '<h3>$1</h3>' );
    body = body.replace( /``/g, '&ldquo;' );
    body = body.replace( /''/g, '&rdquo;' );
    body = body.replace( /--/g, '&ndash;' );
    body = body.replace( /\\"i/g, '&iuml;' );
    body = body.replace( /\\'e/g, '&eacute;' );
    body = body.replace( /\\"o/g, '&ouml;' );
    body = body.replace( /\\H{o}/g, '&#337;' );
    body = body.replace( /~/g, '&nbsp;' );
    body = body.replace( /\\Z/g, '\\mathbb{Z}' );
    body = body.replace( /\\Q/g, '\\mathbb{Q}' );
    body = body.replace( /---/g, '&mdash;' );
    body = body.replace( /``/g, '&ldquo;' );
    body = body.replace( /''/g, '&rdquo;' );
    body = body.replace( /\\textit{([^}]*)}/g, '<em>$1</em>' );
    body = body.replace( /\\texttt{([^}]*)}/g, '<code>$1</code>' );
    body = body.replace( /\\href{http:\/\/kisonecat.com\/([^}]*)}{([^}]*)}/g, '<a href="/$1">$2</a>' );
    body = body.replace( /\\href{([^}]*)}{([^}]*)}/g, '<a href="$1">$2</a>' );

    body = body.replace( /\\begin{itemize}/g, '<ul>' );
    body = body.replace( /\\item/g, '</li><li>' );
    body = body.replace( /\\end{itemize}/g, '</li></ul>' );
    body = body.replace( /<ul>[ \n]*<\/li>/g, '<ul>' );

    body = body.replace( /\n\n/g, ' <br/> ' );
    body = body.replace( /\n/g, ' ' );
    body = _.collect( body.split( '<br/>' ), function( paragraph ) {
	if (!paragraph.match( /[A-z]/ )) return '';
	if (paragraph.match( '<h3>' ) || paragraph.match( '<ul>' ))
	    return paragraph + "\n";
	else
	    return '<p>' + paragraph.replace(/^\s+|\s+$/g, '') + '</p>\n';
	}).join( '' );
	
    app.get( '/research/statement', function ( req, res ) { res.render( 'research/statement', { section: 'Research', courses: courses, title: 'Research Statement', researchStatement: body } ); });
    app.get( '/research/statement/research-statement.pdf', function ( req, res ) { res.sendfile( path.join(__dirname, 'research/statement/statement.pdf') ) });
    app.get( '/research/statement/research-statement.png', function ( req, res ) { res.sendfile( path.join(__dirname, 'research/statement/statement.png') ) });
});

////////////////////////////////////////////////////////////////
// set up poet, the blogging platform
var Poet = require('poet');

app.get( '/blog', function ( req, res ) { res.render( 'blog/index', {title:'Blog'} ); });

var poet = Poet(app,{
    posts: './blog/',  // Directory of posts
    postsPerPage: 12,  // Posts per page in pagination
    routes: {
	'/blog/:post/': 'blog/post',
	'/blog/page/:page': 'blog/page',
	'/blog/tag/:tag': 'blog/tag',
	'/blog/category/:category': 'blog/category'
    },
    readMoreLink: function (post) {
	// readMoreLink is a function that
	// takes the post object and formats an anchor
	// to be used to append to a post's preview blurb
	// and returns the anchor text string
	return '<a href="' + post.url + '">Read More &raquo;</a>';
    },
    readMoreTag: '<!--more-->' // tag used to generate
    // the preview. More in 'preview' section
});

poet.init(function ( locals ) {
    // Some callback to run once everything is set up
    // The core storage is passed in as an argument,
    // where all the locals/middleware functions
    //and stores can be altered
});

app.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('blog/rss', { posts: posts });
});

app.locals({
    moment: require('moment'),
    poet: poet,
    courses: courses,
    projects: projects,
    _: _
});

////////////////////////////////////////////////////////////////
// set up the rest of express
app.use(express.favicon(path.join(__dirname, 'public/images/icons/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use('/blog', express.static(path.join(__dirname, 'blog')));

////////////////////////////////////////////////////////////////
// set up curriculum vitae

app.get( '/cv', function ( req, res ) { res.render( 'cv/index', { title: 'CV' } ); });

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
