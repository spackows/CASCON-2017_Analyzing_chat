// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-07_list-custom-models.mp4
//

var g_nluV1 = require( 'watson-developer-cloud/natural-language-understanding/v1.js' );
var g_nlu   = new g_nluV1( { username: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             password: '', // <- Get this from "Service credentials" section of your Watson NLU service in IBM Cloud dashboard
                             version_date : '2017-02-27'
                           } );

g_nlu.listModels( {}, function( error, response )
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

