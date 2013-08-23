
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

	course.resources = new Array();
	require( path.join( course.directory, "resources.json" ) ).forEach( function(resource) {
	    resource = _.extend( new Resource(), resource );
	    resource.course = course;
	    resource.url = course.url + resource.shortname;
	    resource.preview = resource.filename.replace( '.pdf', '.png' );

	    if (resource.logo) {
		var logoPath = course.url + resource.logo;
		app.get( logoPath, function ( req, res ) { res.sendfile( path.join( __dirname, logoPath ) ) } );
	    }

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
	else
	    return null;
    }

    this.fileWithPath = function() {
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
    });
});

app.get( '/research', function ( req, res ) { res.render( 'research/index', { section: 'Research', projects: projects, title: 'Research' } ); });

var papers = new Array();
fs.readFile(path.join( __dirname, "research/papers.bib" ), 'utf8', function (err, data) {
    if (err) throw err;
    var bibtexs = require('bibtex-parser')(data);
    papers = _.sortBy( _.values( bibtexs ), 'YEAR' );
});	    
app.get( '/research/papers', function ( req, res ) { res.render( 'research/papers', { section: 'Research', papers: papers, title: 'Research' } ); });

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
