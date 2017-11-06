
var exports = module.exports = {};


exports.classifyComments = function( nlc, nlc_id, comments, callback )
{
    if( 0 === comments.length )
    {
        callback( null, [] );
    }
    else
    {
        var comment = comments.pop();
        nlc.classify( { text: comment.text, classifier_id: nlc_id }, function( classify_error, results )
        {
            if( classify_error )
            {
                callback( 'Classify error: ' + classify_error, [] );
            }
            else
            {
                exports.classifyComments( nlc, nlc_id, comments, function( rest_error, rest_results )
                {
                    if( rest_error )
                    {
                        callback( rest_error, [] );
                    }
                    else
                    {
                        callback( null, rest_results.concat( [ { 'text'           : comment.text,
                                                                 'expected_class' : comment.expected_class,
                                                                 'result_class'   : results.top_class } ] ) );
                    }

                } );
            }

        } );
    }
}

