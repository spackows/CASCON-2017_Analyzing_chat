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
        printGroups( data_frame_cols );
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
            var entities_str = 'col_' + group + '_' + entity_type + '_' + base_keywords_arr[0].replace( /[\s\-]+/g, '_' ) + ' = list( ';
            for( var i = 0; i < data_frame_cols[ group ][ entity_type ][ base_keywords_arr[0] ].length; i++ )
            {
                entities_str += '"' + ( i + 1 ) + '"="' + data_frame_cols[ group ][ entity_type ][ base_keywords_arr[0] ][ i ] + '", ';
            }
            entities_str = entities_str.replace( /, $/, '' );
            console.log( entities_str + ' )' );
            
            
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
    console.log( '' );
    console.log( '# Hierarchical clusters...' );
    console.log( '#' );

    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'hc_' + group + '_' + entity_type + ' = hclust( d_' + group + '_' + entity_type + ' )' );
            console.log( 'hc_' + group + '_' + entity_type + '$labels = names( col_' + group + '_' + entity_type + '_comment_entities )' );

        } );
        
        console.log( '' );

    } );
}


function printGroups( data_frame_cols )
{
    console.log( '' );
    console.log( '' );
    console.log( '# Cluster groups...' );
    console.log( '#' );

    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'ct_'      + group + '_' + entity_type + ' = cutree( hc_' + group + '_' + entity_type + ', h=0.5 )' );

        } );
        
        console.log( '' );

    } );
    
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'groups_'  + group + '_' + entity_type + ' = tapply( names( ct_' + group + '_' + entity_type + ' ), ct_' + group + '_' + entity_type + ', c )' );

        } );
        
        console.log( '' );

    } );
    
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'sizes_'   + group + '_' + entity_type + ' = unlist( lapply( groups_'  + group + '_' + entity_type + ', length ) )' );

        } );
        
        console.log( '' );

    } );
    
    console.log( '' );
    console.log( '' );
    
    console.log( '# Name each cluster group with the most common entity in the group ...' );
    console.log( '#' );
    console.log( 'individualEntities = function( entities ){ unlist( strsplit( entities, " | ", fixed=TRUE ) ) }' );
    console.log( 'getGroupEntities   = function( group, entities_list ){ unlist( lapply( group, function( id ){ unlist( lapply( entities_list[[ id ]], individualEntities ) ) } ) ) }' );
    console.log( 'topEntity          = function( group, entities_list ){ names( which.max( table( getGroupEntities( group, entities_list ) ) ) ) }' );
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'group_names_' + group + '_' + entity_type + ' = lapply( groups_' + group + '_' + entity_type + ', function( group ){ topEntity( group, col_' + group + '_' + entity_type + '_comment_entities ) } )' );
        } );

        console.log( '' );
        
    } );
    
    console.log( '' );
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
    console.log( '' );
    console.log( '# Colour the dendrograms...' );
    console.log( '#' );
    
    console.log( 'inGroup     = function( group, index ){ length( which( group == index ) ) > 0 }' );
    console.log( 'whichGroup  = function( group_list, index ){ which( lapply( group_list, function( group ){ inGroup( group, index ) } ) == TRUE ) } ' );
    console.log( 'colourDendr = function( dendr, group_list, colour_list, entities_list )' );
    console.log( '{' );
    console.log( '    dendr = dendrapply( dendr, function( node )' );
    console.log( '    {' );
    console.log( '        if( is.leaf( node ) )' );
    console.log( '        {' );
    console.log( '            a = attributes( node )' );
    console.log( '            colour = colour_list[[ whichGroup( group_list, a$label ) ]]' );
    console.log( '            attr( node, "nodePar" ) = c( a$nodePar, lab.col = colour, pch = NA_integer_ )' );
    console.log( '            attributes( node )$label = entities_list[[a$label]]' );
    console.log( '        }' );
    console.log( '        node' );
    console.log( '    } )' );
    console.log( '}' );
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'colours_' + group + '_' + entity_type + ' = rainbow( length( groups_' + group + '_' + entity_type + ' ) )' );

        } );
        
        console.log( '' );

    } );
    
    console.log( '' );
    
    Object.keys( data_frame_cols ).forEach( function( group )
    {
        Object.keys( data_frame_cols[ group ] ).forEach( function( entity_type )
        {
            console.log( 'dendr_' + group + '_' + entity_type + ' = colourDendr( dendr_' + group + '_' + entity_type + ', groups_' + group + '_' + entity_type + ', colours_' + group + '_' + entity_type + ', col_' + group + '_' + entity_type + '_comment_entities )' );

        } );

        console.log( '' );
        
    } );
    
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
            console.log( 'svg( "' + group + '_' + entity_type + '_cluster.svg", height=5, width=10 )' );
            console.log( 'par( mfrow = c( 1, 2 ) )' );
            console.log( 'par( cex = 0.75 )' );
            console.log( '' );
            console.log( 'par( mar = c( 4, 2, 2, 18 ) + 0.1 )' );
            console.log( 'plot( dendr_' + group + '_' + entity_type + ', horiz=T, cex.lab=0.75, main=NULL )' );
            console.log( 'abline( v="0.5", col="red", lty=2 )' );
            console.log( '' );
            console.log( 'par( mar = c( 4, 0, 2, 4 ) + 0.1 )' );
            console.log( 'barplot( rev( sizes_' + group + '_' + entity_type + ' ), names.arg = rev( group_names_' + group + '_' + entity_type + ' ), col = rev( colours_' + group + '_' + entity_type + ' ), horiz=TRUE, las=1 )' );
            console.log( '' );
            console.log( '' );
        } );
    
        console.log( '' );

    } );

}

