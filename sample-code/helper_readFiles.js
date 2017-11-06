
var g_fs = require( 'fs' );
var g_readline = require( 'readline' );

var exports = module.exports = {};


exports.readCommentsFiles = function( file_names, callback )
{
    var all_comments = [];
    var errors = '';
    iterateOver( file_names, function( file_name, report )
    {
        exports.readCommentsFile( file_name, function( read_error, comments )
        {
            if( read_error )
            {
                errors += "[" + file_name + "]\nerror:\n" + read_error + "\n";
            }
            else
            {
                all_comments = all_comments.concat( comments );
            }
            
            report();

        } );

    }, function()
    {
        if( errors.match( /\S/ ) )
        {
            callback( errors, {} );
        }
        else
        {
            callback( null, all_comments );
        }

    } );

}


exports.readCommentsFile = function( file_name, callback )
{
    // Expecting the format of each line to be:
    // <comment>,<expected_class>
    //
    var regEx = new RegExp( /^\s*(.*)\s*\,\s*(.*)\s*$/ );
    var result = [];
    var comment = '';
    var expected_class = '';
    
    var comments = [];
    var errors = '';
    
    var rl = g_readline.createInterface( { input: g_fs.createReadStream( file_name ) } );
	rl.on( 'line', function ( line )
	{
        if( line.match( /\S/ ) )
        {
            result = regEx.exec( line );
            
            if( ( null !== result ) && result.length > 2 )
            {
                comment = result[1];
                expected_class = result[2];
                if( !comment.match( /\S/ ) )
                {
                    errors += "Empty comment.  Line:\n" + line + "\n";
                }
                else if( !expected_class.match( /\S/ ) )
                {
                    errors += "Empty expected class.  Line:\n" + line + "\n";
                }
                else
                {
                    comments.push( { 'text' : comment, 'expected_class' : expected_class } );
                }
            }
            else
            {
                errors += "Unexpected line format:\n" + line + "\n";
            }
        }

	} ).on( 'close', function()
    {
        if( errors.match( /\S/ ) )
        {
            callback( errors, [] );
        }
        else
        {
            callback( null, comments );
        }

    } );

}


exports.readJSONCommentsFile = function( file_name, callback )
{
    g_fs.readFile( file_name, 'utf8', function( read_error, contents )
    {
        if( read_error )
        {
            callback( "Read file error.\nFile name: " + file_name + "\nError:\n" + read_error, [] );
        }
        else
        {
            callback( null, JSON.parse( contents ) );
        }

    } );

}


exports.readDictionaries = function( dictionaries_dir, callback )
{
    g_fs.readdir( dictionaries_dir, function( readdir_error, files )
    {
        if( readdir_error )
        {
            callback( "readdir error:\n" + readdir_error, {} );
        }
        else
        {
            var dictionaries_struct = {};
            var errors = '';

            iterateOver( files, function( file_name, report )
            {
                if( file_name.match( /.*\.csv$/ ) )
                {
                    readDictionaryFile( dictionaries_dir, file_name, function( readfile_error, dictionary_entries )
                    {
                        if( readfile_error )
                        {
                            errors += "Errors in dictionary:\n'" + file_name + "'\n" + readfile_error + "\n";
                            report();
                        }
                        else
                        {
                            Object.keys( dictionary_entries ).forEach( function( keyword )
                            {
                                if( !( keyword in dictionaries_struct ) )
                                {
                                    dictionaries_struct[ keyword ] = dictionary_entries[ keyword ];
                                }
                                else
                                {
                                    errors += "Repeated keyword across dictionaries.\n" +
                                              "Keyword: " + keyword + "\n" +
                                              "Dictionaries:\n" + 
                                              dictionaries_struct[ keyword ][ 'dictionary' ] + "\n" + 
                                              dictionaries_entries[ keyword ][ 'dictionary' ] + "\n";
                                }
                                
                            } );
                            
                            report();
                        }

                    } );
                }
                else
                {
                    report();
                }
                    
            }, function()
            {
                if( errors.match( /\S/ ) )
                {
                    callback( errors, {} );
                }
                else
                {
                    callback( null, dictionaries_struct );
                }                    
                    
            } );
                
        }
            
    } );
}


function iterateOver( list, iterator, callback )
{
	if( 0 === list.length )
	{
		callback();
	}

	var doneCount = 0;

    function report()
	{
		doneCount++;
        if( doneCount === list.length )
		{
			callback();
		}
    }
	
	list.forEach( function( item, index )
	{
		iterator( item, report );
	} );
}


function readDictionaryFile( dir_name, file_name, callback )
{
    if( !dir_name.match( /[\\\/]$/ ) )
    {
        dir_name = dir_name + '/';
    }

    var regEx = new RegExp( /^\s*.*?\s*\,\s*\d+\s*\,\s*(.*)\s*$/ );
    var result = [];
    var surface_str = '';
    var surface_arr = [];
    var base_keyword = '';
    var keyword = '';
    var dictionary_entries = {};
    var errors = '';
    
    var rl = g_readline.createInterface( { input: g_fs.createReadStream( dir_name + file_name ) } );
	rl.on( 'line', function ( line )
	{
        if( !line.match( /^\s*lemma\s*\,\s*poscode\s*\,\s*surface\s*$/i ) ) // Skip the first line
        {
            result = regEx.exec( line );
                
            if( ( null !== result ) && result.length > 1 )
            {
                surface_str = result[1];

                if( ( null !== surface_str ) && surface_str.match( /\S/ ) )
                {
                    surface_arr = surface_str.split( /\s*\,\s*/ );
                    base_keyword = surface_arr[0];
                    for( var i = 0; i < surface_arr.length; i++ )
                    {
                        keyword = surface_arr[i];
                    
                        if( !( keyword in dictionary_entries ) )
                        {
                            dictionary_entries[ keyword ] = {};
                            dictionary_entries[ keyword ][ 'base_keyword' ] = base_keyword;
                            dictionary_entries[ keyword ][ 'dictionary' ]   = file_name;
                        }
                        else
                        {
                            errors += "Repeated keyword in dictionary: " + keyword + "\n";
                        }
                    }
                }
                else
                {
                    errors += "No 'surface' entries found: " + line + "\n";
                }
            }
            else
            {
                errors += "Unexpected line format: " + line + "\n";
            }
        }

	} ).on( 'close', function()
    {
        if( errors.match( /\S/ ) )
        {
            callback( errors, {} );
        }
        else
        {
            callback( null, dictionary_entries );
        }

    } );
    
}

