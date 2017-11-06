
var g_watson = require( 'watson-developer-cloud' );                 
var g_nlc    = g_watson.natural_language_classifier( { url: '',      // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       username: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       password: '', // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       version:  'v1' } );

g_nlc.list( {}, function( error, nlc_results )
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

