
var exports = module.exports = {};


exports.extractKeywords = function( nlu, comments, callback )
{
    if( 0 === comments.length )
    {
        callback( null, [] );
    }
    else
    {
        var comment = comments.pop();

        nlu.analyze( { 'text': comment.text.toLowerCase(),
                       'language': 'en',
                       'features' : { 'keywords': {} } }, function( error, response )
        {
            if( error )
            {
                callback( "NLU analyze error:\n" + error, [] );
            }
            else
            {
                var keywords = [];
                response.keywords.forEach( function( keyword_struct )
                {
                    keywords.push( keyword_struct.text )

                } );

                exports.extractKeywords( nlu, comments, function( rest_error, rest_results )
                {
                    if( rest_error )
                    {
                        callback( rest_error, [] );
                    }
                    else
                    {
                        callback( null, rest_results.concat( [ { 'comment'  : comment.text,
                                                                 'keywords' : keywords } ] ) );
                    }

                } );

            }        


        } );

    }
}


exports.extractEntities = function( nlu, model_id, comments, callback )
{
    if( 0 === comments.length )
    {
        callback( null, [] );
    }
    else
    {
        var comment = comments.pop();
        
        if( ( "result_class" in comment ) && ( "hi" === comment.result_class ) ) // Save yourself some time and NLU calls: don't bother to extract entities from social, "hi" comments
        {
            exports.extractEntities( nlu, model_id, comments, function( rest_error, rest_results )
            {
                if( rest_error )
                {
                    callback( rest_error, [] );
                }
                else
                {
                    comment[ 'entities' ] = {};
                    callback( null, rest_results.concat( [ comment ] ) );
                }

            } );
        }
        else
        {
            nlu.analyze( { 'text': comment.text.toLowerCase(),
                           'language': 'en',
                           'features' : { 'entities': { 'model' : model_id } } }, function( extract_error, response )
            {
                if( extract_error )
                {
                    callback( "NLU analyze error:\n" + error, [] );
                }
                else
                {
                    var entities = {};
                    response.entities.forEach( function( entities_struct )
                    {
                        if( !( entities_struct.type in entities ) )
                        {
                            entities[ entities_struct.type ] = [];
                        }
                        
                        if( -1 === entities[ entities_struct.type ].indexOf( entities_struct.text ) )
                        {
                            entities[ entities_struct.type ].push( entities_struct.text );
                        }

                    } );

                    exports.extractEntities( nlu, model_id, comments, function( rest_error, rest_results )
                    {
                        if( rest_error )
                        {
                            callback( rest_error, [] );
                        }
                        else
                        {
                            comment[ 'entities' ] = entities;
                            callback( null, rest_results.concat( [ comment ] ) );
                        }
                    } );

                }

            } );
        }
    }
}

