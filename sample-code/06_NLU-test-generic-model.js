
var g_nluV1 = require( 'watson-developer-cloud/natural-language-understanding/v1.js' );
var g_nlu   = new g_nluV1( { username: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             password: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             version_date : '2017-02-27'
                           } );

var g_readFiles   = require( './helper_readFiles.js' );
var g_bulkExtract = require( './helper_bulkExtract.js' );

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
        
        g_bulkExtract.extractKeywords( g_nlu, comments, function( extract_error, nlu_results )
        {
            if( extract_error )
            {
                console.log( "Extracting keywords failed.  Error:\n" + extract_error );
            }
            else
            {
                console.log( JSON.stringify( nlu_results, null, 3 ) );
            }
            
        } );

    }

} );


