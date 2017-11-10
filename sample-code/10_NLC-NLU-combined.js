// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-10_NLC-and_NLU.mp4
//

// NLC
var g_watson = require( 'watson-developer-cloud' );                 
var g_nlc    = g_watson.natural_language_classifier( { url: '',      // Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       username: '', // Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       password: '', // Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       version:  'v1' } );
var g_nlc_id  = '599adax384-nlc-89';

// NLU
var g_nluV1 = require( 'watson-developer-cloud/natural-language-understanding/v1.js' );
var g_nlu   = new g_nluV1( { username: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             password: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             version_date : '2017-02-27'
                           } );
var g_model_id = ''; // <- Get this from Watson Knowledge Studio or using list-custom-models.js


var g_readFiles    = require( './helper_readFiles.js' );
var g_bulkClassify = require( './helper_bulkClassify.js' );
var g_bulkExtract  = require( './helper_bulkExtract.js' );

var g_file_names = [ '../sample-data/sample-NLC-training-data.csv', '../sample-data/sample-NLC-test-data.csv' ];

g_readFiles.readCommentsFiles( g_file_names, function( read_error, comments )
{
    if( read_error )
    {
        console.log( "Reading comments files failed.  Error:\n" + read_error );
    }
    else
    {
        g_bulkClassify.classifyComments( g_nlc, g_nlc_id, comments, function( classify_error, classified_comments )
        {
            if( classify_error )
            {
                console.log( "Classifying failed.  Error:\n" + classify_error );
            }
            else
            {
                g_bulkExtract.extractEntities( g_nlu, g_model_id, classified_comments, function( extract_error, results )
                {
                    if( extract_error )
                    {
                        console.log( "Extracting entities failed.  Error:\n" + classify_error );
                    }
                    else
                    {
                        console.log( JSON.stringify( results, null, 3 ) );
                    }
                    
                } );
            }

        } );

    }
    
} );

