// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-03_classify.mp4
//

var g_watson = require( 'watson-developer-cloud' );                 
var g_nlc    = g_watson.natural_language_classifier( { url: '',      // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       username: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       password: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       version:  'v1' } );
var g_nlc_id = ''; // <- Get this from output of create-train-classifier.js, or from Watson NLC "toolkit", or from list-classifiers.js

var g_sample_comment = "";
g_sample_comment = "hi there!";                                           // Sample of "hi" class
//g_sample_comment = "I am not able to register my account need your help"; // Sample of "problem" class
//g_sample_comment = "how do i save my data as a csv file?";                // Sample of "question" class

g_nlc.classify( { text: g_sample_comment, classifier_id: g_nlc_id }, function( error, nlc_results )
{
    if( error )
    {
        console.log( error );
    }
    else
    {
        console.log( JSON.stringify( nlc_results, null, 3 ) );
    }

} );

