
var g_readFiles = require( './helper_readFiles.js' );

var g_file_name = ''; // <- Enter the name of the file containing output from 10_NLC-NLU-combinded.js
// g_file_name = '../sample-output/NLC-NLU-output.json'; // Alternatively, you can just use the sample output

var g_dictionaries_dir = '../custom-language-model/dictionaries';

g_readFiles.readJSONCommentsFile( g_file_name, function( read_json_error, comments )
{
    if( read_json_error )
    {
        console.log( "Reading comments file failed.  Error:\n" + read_json_error );
    }
    else
    {
        //console.log( JSON.stringify( comments, null, 3 ) );
        
        g_readFiles.readDictionaries( g_dictionaries_dir, function( read_dictionaries_error, dictionaries_struct )
        {
            if( read_dictionaries_error )
            {
                console.log( "Reading dictionary files failed.  Error:\n" + read_dictionaries_error );
            }
            else
            {
                //console.log( JSON.stringify( dictionaries_struct, null, 3 ) );

                comments.forEach( function( comment )
                {
                    comment[ 'normalized_entities' ] = getNormalizedentities( comment, dictionaries_struct );

                } );

                console.log( JSON.stringify( comments, null, 3 ) );

            }

        } );

    }
    
} );



function getNormalizedentities( comment, dictionaries_struct )
{
    // Expecting a structure like this:
    //
    //   {
    //     "text"           : "Hi can you tell me how to load a shape file?",
    //     "expected_class" : "question",
    //     "result_class"   : "question",
    //     "entities"       : { "action" : [ "loading", "blarg" ],
    //                          "obj"    : [ "shape file" ] }
    //  }
    //
    // Return a structure like this:
    //
    //  {
    //     "action"  : [ "load" ],
    //     "obj"     : [ "shapefile" ],
    //     "unknown" : { "action" : [ "blarg "] }
    //  }
    //
    
    var normalized_entities = {};

    var entities = ( 'entities' in comment ) ? comment.entities : {};
    Object.keys( entities ).forEach( function( entity_type )
    {
        normalized_entities[ entity_type ] = [];
        
        entities[ entity_type ].forEach( function( keyword )
        {
            if( !( keyword in dictionaries_struct) )
            {
                keyword = keyword.replace( /[^a-z ]/gi, '' );  // Sometimes funny punctuation is the only difference..
            }
            
            if( keyword in dictionaries_struct )
            {
                if( -1 === normalized_entities[ entity_type ].indexOf( dictionaries_struct[ keyword ][ 'base_keyword' ] ) )
                {
                    normalized_entities[ entity_type ].push( dictionaries_struct[ keyword ][ 'base_keyword' ] );
                }
            }
            else
            {
                if( !( 'unknown' in normalized_entities ) )
                {
                    normalized_entities[ 'unknown' ] = [];
                }
                
                if( -1 === normalized_entities[ 'unknown' ].indexOf( keyword ) )
                {
                    normalized_entities[ 'unknown' ].push( keyword );
                }
            }

        } );            

    } );
        
    return normalized_entities;
}

