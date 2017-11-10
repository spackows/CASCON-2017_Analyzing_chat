// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-13_cluster-normalized-entities.mp4
//

var g_readFiles = require( './helper_readFiles.js' );

var g_file_name = ''; // <- Enter the name of the file containing output from 12_quick-normalize.js
g_file_name = '../sample-output/NLC-NLU-normalized.json'; // Alternatively, you can just use the sample output

g_readFiles.readJSONCommentsFile( g_file_name, function( read_error, comments )
{
    if( read_error )
    {
        console.log( "Reading comments file failed.  Error:\n" + read_error );
    }
    else
    {
        var data_frame_cols = generateDataFrameCols( comments );
        printDataFrameDefs( data_frame_cols );
        printDistanceFuncCall( data_frame_cols );
        printHClustCall( data_frame_cols );
        printDendrCall( data_frame_cols );
        printColouringCall( data_frame_cols );
        printPlot( data_frame_cols );

    }
    
} );


function generateDataFrameCols( comments )
{
    var columns = {};
    
    var unique_base_keywords = getUniqueBaseKeywords( comments );
    
    Object.keys( unique_base_keywords ).forEach( function( group )
    {
        Object.keys( unique_base_keywords[ group ] ).forEach( function( entity_type )
        {
            var base_keywords = Object.keys( unique_base_keywords[ group ][ entity_type ] );
            base_keywords.sort();
            
            comments.forEach( function( comment )
            {
                if( !inThisDataFrame( comment, group, entity_type, base_keywords ) )
                {
                    return;
                }

                if( !( group in columns ) )
                {
                    columns[ group ] = {};
                }
                
                if( !( entity_type in columns[ group ] ) )
                {
                    columns[ group ][ entity_type ] = {};
                }
                
                if( !( 'comment_entities' in columns[ group ][ entity_type ] ) )
                {
                    columns[ group ][ entity_type ][ 'comment_entities' ] = [];
                }
                
                columns[ group ][ entity_type ][ 'comment_entities' ].push( comment[ 'normalized_entities' ][ entity_type ].join( ' | ' ) );
                
                base_keywords.forEach( function( base_keyword ) 
                {
                    if( !( base_keyword in columns[ group ][ entity_type ] ) )
                    {
                        columns[ group ][ entity_type ][ base_keyword ] = [];
                    }
                    
                    if( -1 === comment[ 'normalized_entities' ][ entity_type ].indexOf( base_keyword ) )
                    {
                        columns[ group ][ entity_type ][ base_keyword ].push( '0' );
                    }
                    else
                    {
                        columns[ group ][ entity_type ][ base_keyword ].push( '1' );
                    }

                } );
                
            } );

            if( columns[ group ][ entity_type ][ 'comment_entities' ].length < 3 )
            {
                // Can't plot a cluster of less than 3 things..
                delete columns[ group ][ entity_type ];
            }

        } );

    } );

    return columns;
   
}


function getUniqueBaseKeywords( comments )
{
    var unique_base_keywords = {};
    unique_base_keywords[ 'problem' ]  = {};
    unique_base_keywords[ 'question' ] = {};
    unique_base_keywords[ 'docs' ]     = {};
    
    var group = '';
    var docs_comment = false;
    comments.forEach( function( comment )
    {
        if( !comment[ 'result_class' ].match( /problem|question/ ) )
        {
            return;
        }
        
        group = comment[ 'result_class' ];
        
        docs_comment = false;
        if( -1 !== Object.keys( comment[ 'normalized_entities' ] ).indexOf( 'docs' ) )
        {
            docs_comment = true;
        }
        
        normalized_entities = ( 'normalized_entities' in comment ) ? comment.normalized_entities : {};

        Object.keys( normalized_entities ).forEach( function( entity_type )
        {
            if( !entity_type.match( /tech|action|obj/ ) )
            {
                return;
            }
            
            if( !( entity_type in unique_base_keywords[ group ] ) )
            {
                unique_base_keywords[ group ][ entity_type ] = {};
            }
            
            if( docs_comment && !( entity_type in unique_base_keywords[ 'docs' ] ) )
            {
                unique_base_keywords[ 'docs' ][ entity_type ] = {};
            }
            
            normalized_entities[ entity_type ].forEach( function( base_keyword )
            {
                if( !( base_keyword in unique_base_keywords[ group ][ entity_type ] ) )
                {
                    unique_base_keywords[ group ][ entity_type ][ base_keyword ] = 0;
                }
                unique_base_keywords[ group ][ entity_type ][ base_keyword ] += 1;
                
                if( docs_comment )
                {
                    if( !( base_keyword in unique_base_keywords[ 'docs' ][ entity_type ] ) )
                    {
                        unique_base_keywords[ 'docs' ][ entity_type ][ base_keyword ] = 0;
                    }
                    unique_base_keywords[ 'docs' ][ entity_type ][ base_keyword ] += 1;
                }
                
            } );
            
        } );
        
    } );

    [ 'problem', 'question' ].forEach( function( group )
    {
        Object.keys( unique_base_keywords[ group ] ).forEach( function( entity_type )
        {
            Object.keys( unique_base_keywords[ group ][ entity_type ] ).forEach( function( base_keyword )
            {
                if( unique_base_keywords[ group ][ entity_type ][ base_keyword ] < 2 )
                {
                    delete unique_base_keywords[ group ][ entity_type ][ base_keyword ];
                }
                
            } );
           
        } );
        
    } );

    return unique_base_keywords;
}


function inThisDataFrame( comment, group, entity_type, base_keywords )
{
    if( ( 'docs' !== group ) && ( group !== comment[ 'result_class' ] ) )
    {
        return false;
    }
    else if( ( 'docs' === group ) && ( !( 'docs' in comment[ 'normalized_entities' ] ) ) )
    {
        return false;
    }
    
    if( !( 'normalized_entities' in comment ) )
    {
        return false;
    }
    
    if( !( entity_type in comment[ 'normalized_entities' ] ) )
    {
        return false;
    }

    for( var i = 0; i < base_keywords.length; i++ )
    {
        if( -1 !== comment[ 'normalized_entities' ][ entity_type ].indexOf( base_keywords[i] ) )
        {
            return true;
        }
    }
    
    return false;
}


function printDataFrameDefs( data_frame_cols )
{
    console.log( '' );
    console.log( '# Data frames...' );
    console.log( '#' );
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        console.log( '# ' + group + '...' );
        
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            var base_keywords_arr = Object.keys( data_frame_cols[ group ][ entity_type ] );
            console.log( 'col_' + group + '_' + entity_type + '_' + base_keywords_arr[0].replace( /[\s\-]+/g, '_' ) + ' = c( "' + data_frame_cols[ group ][ entity_type ][ base_keywords_arr[0] ].join( '", "' ) + '" )' );
            for( var i = 1; i < base_keywords_arr.length; i++ )
            {
                var num_entries = data_frame_cols[ group ][ entity_type ][ base_keywords_arr[i] ].reduce( function( a, b ){ return a + b; }, 0 );
                if( num_entries > 0 )
                {
                    console.log( 'col_' + group + '_' + entity_type + '_' + base_keywords_arr[i].replace( /[\s\-]+/g, '_' ) + ' = c( ' + data_frame_cols[ group ][ entity_type ][ base_keywords_arr[i] ].join( ', ' ) + ' )' );
                }
            }
                
            var base_keywords_str = base_keywords_arr.slice(1).join( '|' );
            base_keywords_str = base_keywords_str.replace( /[\s\-]+/g, '_' );
            base_keywords_str = 'col_' + group + '_' + entity_type + '_' + base_keywords_str.replace( /\|/g, ', col_' + group + '_' + entity_type + '_' );
            console.log( 'df_' + group + '_' + entity_type + ' = data.frame( ' + base_keywords_str + ' )' );
            console.log( '' );
            
        } );

    } );
}


function printDistanceFuncCall( data_frame_cols )
{
    console.log( '' );
    console.log( '# Calc distance...' );
    console.log( '#' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'd_' + group + '_' + entity_type + ' = dist( as.matrix( df_' + group + '_' + entity_type + ' ), method = "binary" )' );

        } );
        
        console.log( '' );

    } );
}


function printHClustCall( data_frame_cols )
{
    console.log( '' );
    console.log( '# Hierarchical clusters...' );
    console.log( '#' );

    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'hc_' + group + '_' + entity_type + ' = hclust( d_' + group + '_' + entity_type + ' )' );
            console.log( 'hc_' + group + '_' + entity_type + '$labels = col_' + group + '_' + entity_type + '_comment_entities' );

        } );
        
        console.log( '' );

    } );
}


function printDendrCall( data_frame_cols )
{
    console.log( '' );
    console.log( '# Dendrograms...' );
    console.log( '#' );

    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'dendr_' + group + '_' + entity_type + ' = as.dendrogram( hc_' + group + '_' + entity_type + ' )' );

        } );
        
        console.log( '' );

    } );
}


function printColouringCall( data_frame_cols )
{
    console.log( '' );
    console.log( '# Colour the groups...' );
    console.log( '#' );

    printColourHelper();
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'dendr_' + group + '_' + entity_type + ' = colour_helper$colourGroups( dendr_' + group + '_' + entity_type + ' )' );

        } );
        
        console.log( '' );

    } );
    
}


function printColourHelper()
{
    console.log( 'library(methods)' );
    console.log( 'myColourHelper = setRefClass( "myColourHelper", fields = c( "colour_list", "colour_position", "beginnings", "beginnings_position" ), methods = list(' );
    console.log( '' );
    console.log( '    initialize = function()' );
    console.log( '    {' );
    console.log( '        colour_list <<- list( "darkviolet", "darkslategray", "blue", "brown4", "darkolivegreen", "cadetblue4", "deeppink4", "gold4", "cyan4", "tomato", "tan", "slategrey", "palevioletred4", "palegreen4", "saddlebrown" )' );
    console.log( '        colour_position <<- 1' );
    console.log( '        beginnings <<- list()' );
    console.log( '        beginnings_position <<- 1' );
    console.log( '    },' );
    console.log( '' );
    console.log( '    changeColours = function()' );
    console.log( '    {' );
    console.log( '        colour_position <<- colour_position + 1' );
    console.log( '        if( colour_position > length(colour_list) )' );
    console.log( '        {' );
    console.log( '            colour_position <<- 1' );
    console.log( '        }' );
    console.log( '' );
    console.log( '        beginnings_position <<- beginnings_position + 1' );
    console.log( '        if( beginnings_position > length(beginnings) )' );
    console.log( '        {' );
    console.log( '            beginnings_position <<- 1' );
    console.log( '        }' );
    console.log( '    },' );
    console.log( '' );
    console.log( '    getColour = function( label )' );
    console.log( '    {' );
    console.log( '        if( label == beginnings[beginnings_position] )' );
    console.log( '        {' );
    console.log( '            changeColours()' );
    console.log( '        }' );
    console.log( '' );
    console.log( '        colour_list[ colour_position ]' );
    console.log( '    },' );
    console.log( '' );
    console.log( '    listBeginnings = function( node )' );
    console.log( '    {' );
    console.log( '        if( is.leaf( node[[1]] ) )' );
    console.log( '        {' );
    console.log( '            beginnings[[length(beginnings)+1]] <<- attributes( node[[1]] )$label' );
    console.log( '        }' );
    console.log( '        else' );
    console.log( '        {' );
    console.log( '            listBeginnings( node[[1]] )' );
    console.log( '            listBeginnings( node[[2]] )' );
    console.log( '        }' );
    console.log( '    },' );
    console.log( '' );
    console.log( '    colourGroups = function( node )' );
    console.log( '    {' );
    console.log( '        initialize()' );
    console.log( '        if( is.leaf( node[[1]] ) )' );
    console.log( '        {' );
    console.log( '            listBeginnings( node[[2]] )' );
    console.log( '        }' );
    console.log( '        else' );
    console.log( '        {' );
    console.log( '            listBeginnings( node )' );
    console.log( '        }' );
    console.log( '        node = dendrapply( node, function( node )' );
    console.log( '        {' );
    console.log( '            if( is.leaf( node ) )' );
    console.log( '            {' );
    console.log( '                a = attributes( node )' );
    console.log( '                colour = getColour( a$label )' );
    console.log( '                attr( node, "nodePar" ) = c( a$nodePar, lab.col = colour, pch = NA_integer_ )' );
    console.log( '            }' );
    console.log( '            node' );
    console.log( '        } )' );
    console.log( '' );
    console.log( '        node' );
    console.log( '    }' );
    console.log( '' );
    console.log( ') )' );
    console.log( '' );
    console.log( 'colour_helper = myColourHelper()' );
    console.log( '' );
}


function printPlot( data_frame_cols )
{
    console.log( '' );
    console.log( '' );
    console.log( '# Print plots...' );
    console.log( '#' );

    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'pdf( "' + group + '_' + entity_type + '_cluster.pdf" )' );
            console.log( 'par( mar = c( 5, 2, 2, 12)+0.1 )' );
            console.log( 'plot( dendr_' + group + '_' + entity_type + ', horiz=T )' );

        } );
    
        console.log( '' );

    } );

}

