
var g_nluV1 = require( 'watson-developer-cloud/natural-language-understanding/v1.js' );
var g_nlu   = new g_nluV1( { username: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             password: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             version_date : '2017-02-27'
                           } );
var g_model_id = ''; // <- Get this from Watson Knowledge Studio or using list-custom-models.js

var g_sample_comment = "";
g_sample_comment = "I am not able to register my account need your help"; // Sample of "problem" class
//g_sample_comment = "how do i save my data as a csv file?";                // Sample of "question" class

g_nlu.analyze( { 'text': g_sample_comment,
               'language': 'en',
               'features' : { 'entities': { 'model' : g_model_id } } }, function( error, nlu_results )
            {
    if( error )
    {
        console.log( error );
    }
    else
    {
        console.log( JSON.stringify( nlu_results, null, 3 ) );
    }

} );
