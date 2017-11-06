
var g_watson = require( 'watson-developer-cloud' );
var g_nlc    = g_watson.natural_language_classifier( { url: '',       // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       username: '',  // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       password: '',  // <- Get this from "Service credentials" section of your Watson NLC service in IBM Cloud dashboard
                                                       version: 'v1' } );

var g_fs = require('fs');
var g_params = { language: 'en',
                 name: 'CASCON-2017-Analyze-comments-NLC',  // <- Set this to whatever name you like
                 training_data: g_fs.createReadStream( '../sample-data/sample-NLC-training-data.csv' ) };

g_nlc.create( g_params, function( error, response )
{
  if( error )
  {
    console.log( error );
  }
  else
  {
    console.log( JSON.stringify( response, null, 3 ) );
  }
  
} );

