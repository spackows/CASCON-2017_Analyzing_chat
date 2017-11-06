
var g_watson = require( 'watson-developer-cloud' );                 
var g_nlc    = g_watson.natural_language_classifier( { url: '',      // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       username: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       password: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       version:  'v1' } );
var g_nlc_id = ''; // <- Get this from output of create-train-classifier.js, or from Watson NLC "toolkit", or from list-classifiers.js

var g_readFiles    = require( './helper_readFiles.js' );
var g_bulkClassify = require( './helper_bulkClassify.js' );

var g_file_name = '../sample-data/sample-NLC-test-data.csv';

g_readFiles.readCommentsFile( g_file_name, function( read_error, comments )
{
    if( read_error )
    {
        console.log( "Reading comments files failed.  Error:\n" + read_error );
    }
    else
    {
        //console.log( JSON.stringify( comments, null, 3 ) );
        
        g_bulkClassify.classifyComments( g_nlc, g_nlc_id, comments, function( classify_error, nlc_results )
        {
            if( classify_error )
            {
                console.log( "Classifying comments failed.  Error:\n" + classify_error );
            }
            else
            {
                //console.log( JSON.stringify( nlc_results, null, 3 ) );
                
                console.log( scoreResults( nlc_results ) );
            }
            
        } );
    }

} );


function scoreResults( comments )
{
    var num_correct = comments.length;
    comments.forEach( function( comment )
    {
        if( comment.result_class !== comment.expected_class )
        {
            console.log( JSON.stringify( comment, null, 3 ) );
            num_correct--;
        }
        
    } );

    var total = comments.length;
    var percent_correct = ( 0 !== total ) ? ( Math.round( 100 * num_correct / total ) + '%' ) : '--';
    
    return "Total: " + total + "\nCorrect: " + num_correct + " ( " + percent_correct + " )";
}

