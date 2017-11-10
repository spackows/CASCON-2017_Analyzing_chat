// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-09_test-custom-model.mp4
//

var g_nluV1 = require( 'watson-developer-cloud/natural-language-understanding/v1.js' );
var g_nlu   = new g_nluV1( { username: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             password: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             version_date : '2017-02-27'
                           } );
var g_model_id = ''; // <- Get this from Watson Knowledge Studio or using list-custom-models.js

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
        
        g_bulkExtract.extractEntities( g_nlu, g_model_id, comments, function( extract_error, results )
        {
            if( extract_error )
            {
                console.log( "Extracting entities failed.  Error:\n" + extract_error );
            }
            else
            {
                console.log( JSON.stringify( results, null, 3 ) );
            }
            
        } );
    }

} );

