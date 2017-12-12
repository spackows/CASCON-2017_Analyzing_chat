// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-14_run-r-db2.mp4
//

var g_XMLHttpRequest = require( 'xmlhttprequest' ).XMLHttpRequest;
var g_btoa = require( 'btoa' );
var g_readFiles = require( './helper_readFiles.js' );

var g_dashDB_host   = '';     // Get this from "Service credentials" section of your Db2 Warehouse on Cloud service in IBM Cloud dashboard
var g_dashDB_r_port = '8443'; // *This is not the same port that you would connect SQL apps to (eg. NOT: 50000 or 50001).  This needs to be the port the RStudio web console uses (eg. for me, it was 8443).
var g_dashDB_uid    = '';     // Get this from "Service credentials" section of your Db2 Warehouse on Cloud service in IBM Cloud dashboard
var g_dashDB_pwd    = '';     // Get this from "Service credentials" section of your Db2 Warehouse on Cloud service in IBM Cloud dashboard

var g_file_name = ''; // <- Enter the name of the file containing output from 13_create-r-script.js
g_file_name = '../sample-output/cluster.R'; // Alternatively, you can just use the sample output

g_readFiles.readRScript( g_file_name, function( read_error, script )
{
    if( read_error )
    {
        console.log( "Reading script file failed.  Error:\n" + read_error );
    }
    else
    {
        //console.log( JSON.stringify( script, null, 3 ) );

        var plot_file_names = getPlotNames( script );
        
        console.log( "Estimated time: " + plot_file_names.length + "+ minutes ..." );

        runRScriptRemotely( script ).then( function( groups_details )
        {
            downloadPlots( plot_file_names );

        } ).catch( function( error )
        {
            console.log( error );
            
        } );
    }
    
} );


function getPlotNames( script )
{
    var plot_file_names = [];
    var regex = new RegExp( /svg\(\s*\"(.*?)\"/ig );
    var res = regex.exec( script );
    while( null !== res )
    {
        plot_file_names.push( res[1] );
        res = regex.exec( script );
    }
    
    return plot_file_names;
}


function runRScriptRemotely( r_script_contents )
{
    // REST API doc:
    // https://developer.ibm.com/static/site-id/85/api/db2wh/
    //
    // curl --user "<user-id>:<pwd>"
    //  -X POST "https://<host-name>:<port>/dashdb-api/rscript"
    //  -H "Content-Type: application/json"
    //  -d "{ \"rScript\" : \"version\" }"
    //
    
    console.log( "runRScriptRemotely ..." );

    var encoded_script = encodeURIComponent( r_script_contents ).replace( /'/g, "%27" ).replace( /"/g, "%22" );
    
    return new Promise( function( resolve, reject )
	{
        var url = 'https://' + g_dashDB_host + ':' + g_dashDB_r_port + '/dashdb-api/rscript';

        var request = new g_XMLHttpRequest();
        request.open( 'POST', url, true );
        request.setRequestHeader( 'Content-Type', 'application/json' );
        request.setRequestHeader( 'Authorization', 'Basic ' + g_btoa( g_dashDB_uid + ':' + g_dashDB_pwd ) );
        request.onreadystatechange = function()
        {
            if( 4 == request.readyState )
            {
                console.log( JSON.stringify( request, null, 3 ) );

                if( 200 == request.status )
                {
                    var result        = JSON.parse( request.responseText ).result;
                    var rScriptError  = result.rScriptError;
                    var file_name     = result.filename;
                    var rScriptOutput = result.rScriptOutput;
                    var timestamp     = result.timestamp;
                    
                    console.log( "rScriptError:\n" + rScriptError + "\n" );
                    console.log( "file_name:\n" + file_name + "\n" );
                    console.log( "rScriptOutput:\n" + rScriptOutput + "\n" );
                    console.log( "timestamp:\n" + timestamp + "\n" );
                    
                    resolve();

                }
                else
                {
                    reject( "runRScriptRemotely request error.\n" + JSON.stringify( request, null, 3 ) );
                }
            }
            
        };
        
        request.send( JSON.stringify( { "rScript" : encoded_script } ) );

    } );

}


function downloadPlots( plot_file_names )
{
    console.log( "downloadPlots:\n" + plot_file_names.join( "\n" ) );

    iterateOver( plot_file_names, function( file_name, report )
    {
        downloadRemoteFile( file_name ).then( deleteRemoteFile ).then( function()
        {
            report();

        } ).catch( function( error )
        {
            console.log( error );
            report();

        } );
        
    }, function()
    {
        console.log( "Downloads done." );
    } );
    
}


function downloadRemoteFile( file_name )
{
    // REST API doc:
    // https://developer.ibm.com/static/site-id/85/api/db2wh/
    //
    // curl --user "<user-id>:<pwd>"
    //  -X GET "https://<host-name>:<port>/dashdb-api/home/<file-name>" > test.svg
    //
    
    console.log( "downloadRemoteFile [ " + file_name + " ] ..." );

    var local_file_name = file_name;
    
    return new Promise( function( resolve, reject )
	{
        var url = 'https://' + g_dashDB_host + ':' + g_dashDB_r_port + '/dashdb-api/home/' + file_name;

        var request = new g_XMLHttpRequest();
        request.open( 'GET', url, true );
        request.setRequestHeader( 'Authorization', 'Basic ' + g_btoa( g_dashDB_uid + ':' + g_dashDB_pwd ) );
        request.onreadystatechange = function()
        {
            if( 4 == request.readyState )
            {
                if( 200 == request.status )
                {
                    var fs = require( 'fs' );
                    fs.writeFile( local_file_name, request.responseText, function ( write_error )
                    {
                        if( null !== write_error )
                        {
                            reject( "downloadRemoteFile [ " + file_name + " ] write error.\nFile name: " + local_file_name + "Error:\n" + write_error );
                        }
                        else
                        {
                            resolve( file_name );
                        }
                            
                    } );
                }
                else
                {
                    reject( "downloadRemoteFile [ " + file_name + " ] request error.\n" + JSON.stringify( request, null, 3 ) );
                }
            }
            
        };
        
        request.send();

    } );

}


function deleteRemoteFile( file_name )
{
    // REST API doc:
    // https://developer.ibm.com/static/site-id/85/api/db2wh/
    //
    // curl --user "<user-id>:<pwd>"
    //  -X DELETE "https://<host-name>:<port>/dashdb-api/home/<file-name>"
    //
    
    console.log( "deleteRemoteFile [ " + file_name + " ] ..." );

    return new Promise( function( resolve, reject )
	{
        var url = 'https://' + g_dashDB_host + ':' + g_dashDB_r_port + '/dashdb-api/home/' + file_name;

        var request = new g_XMLHttpRequest();
        request.open( 'DELETE', url, true );
        var btoa = require( 'btoa' );
        request.setRequestHeader( 'Authorization', 'Basic ' + btoa( g_dashDB_uid + ':' + g_dashDB_pwd ) );
        request.onreadystatechange = function()
        {
            if( 4 == request.readyState )
            {
                if( 200 == request.status )
                {
                    resolve();
                }
                else
                {
                    reject( "deleteRemoteFile [ " + file_name + " ] error.  Request:\n" + JSON.stringify( request, null, 3 ) );
                }
            }
        };
        
        request.send();

    } );

}


function iterateOver( list, iterator, callback )
{
	if( 0 === list.length )
	{
		callback();
	}

	var doneCount = 0;

    function report()
	{
		doneCount++;
        if( doneCount === list.length )
		{
			callback();
		}
    }
	
	list.forEach( function( item, index )
	{
		iterator( item, report );
	} );
}


