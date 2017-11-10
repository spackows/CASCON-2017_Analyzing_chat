// demo video: https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/call-11_create-html-dashboard.mp4
//

var g_readFiles = require( './helper_readFiles.js' );

var g_file_name = ''; // <- Enter the name of the file containing output from 10_NLC-NLU-combined.js
//g_file_name = '../sample-output/NLC-NLU-output.json'; // Alternatively, you can just use the sample output

g_readFiles.readJSONCommentsFile( g_file_name, function( read_error, json_comments )
{
    if( read_error )
    {
        console.log( "Reading comments file failed.  Error:\n" + read_error );
    }
    else
    {
        printTop();
        
        json_comments.forEach( function( comment )
        {
            printComment( comment );

        } );
        
        printBottom();
    }
    
} );


function printTop()
{
    var html = "" +
"<html>\n" +
"<head>\n" +
"<style>\n" +
"body { margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; font-family: 'Arial', Gadget, sans-serif; font-size: 80%; }\n" +
".grad { background: rgb( 113, 153, 190 ); background: -webkit-gradient( linear, left top, left bottom, from( rgb( 156, 187, 220 ) ), to( rgb( 30, 40, 59 ) ) ) fixed; }\n" +
"#left { margin: 0px; padding: 0px; position: absolute; top: 20px; left: 0px; right: 170px; bottom: 20px; overflow-y: auto;}\n" +
"#right { margin: 0px; padding: 0px; position: absolute; top: 20px; right: 20px; font-size: 90%; }\n" +
".hi { color: blue; border-right: 3px solid blue; }\n" +
".question { color: green; border-right: 3px solid green; }\n" +
".problem { color: red; border-right: 3px solid red; }\n" +
".comment_div { margin: 20px; padding: 10px; border-radius: 8px; background: rgb( 242, 243, 238 ); color: rgb( 30, 40, 59 ); }\n" +
".class_name { float: right; border: none; margin: 0px 0px 5px 5px; padding: 0px; font-style: italic; }\n" +
"p { margin: 10px 0px 0px 0px }\n" +
"ul { margin: 0px; padding: 0px 10px 0px 0px; list-style: none; }\n" +
"li { margin: 10px 8px 0px 0px; padding: 3px 5px 3px 5px; display: inline-block; color: white; }\n" +
".action { background: rgb( 11, 92, 44 ); }\n" +
".obj { background:  rgb( 58, 36, 75 ); }\n" +
".tech { background:  rgb( 39, 64, 124 ); }\n" +
".persona { background:  rgb( 171, 106, 222 ); }\n" +
".unknown { background: grey; }\n" +
".docs { background: #AB987A; }\n" +
"</style>\n" +
"<script>\n" +
"function showHide( class_name, display )\n" +
"{\n" +
"    var comments = document.getElementsByClassName( class_name );\n" +
"    for( var i = 0; i < comments.length; i++ )\n" +
"    {\n" +
"        comments[i].style.display = display;\n" +
"    }\n" +
"}\n" +
"</script>\n" +
"</head>\n" +
"<body class='grad'>\n" +
"<div id='left'>";

    console.log( html );

}


function printComment( comment )
{
    // Expecting a structure like this:
    //
    //   {
    //  "text": "Hi can you tell me how to load a shape file?",
    //  "expected_class": "question",
    //  "result_class": "question",
    //  "entities": {
    //     "action": [
    //        "load"
    //     ],
    //     "obj": [
    //        "shape file"
    //     ]
    //  }
    //

    var html = '';
    
    var comment_text = ( 'text' in comment ) ? comment.text : '';
    
    if( comment_text.match( /\S/ ) )
    {
        var class_name   = ( 'result_class' in comment ) ? comment.result_class : 'unknown';
        var entities = ( 'entities' in comment ) ? comment.entities : {};
        
        html += "<div class='comment_div " + class_name + "'>" +
                "<div class='class_name " + class_name + "'>" + class_name + "</div>" +
                "<p>" + comment_text + "</p>" +
                "<ul class='entities'>";

        var entity_types = Object.keys( entities );
        entity_types.sort();
        entity_types.forEach( function( entity_type )
        {
            var keywords = entities[ entity_type ];
            keywords.sort();
            keywords.forEach( function( keyword )
            {
                html += "<li class='" + entity_type + "'>" + keyword + "</li>";

            } );            

        } );
        
        html += "</ul></div>";
        
        console.log( html );
    }    
}


function printBottom()
{
    var html = "" +
"</div>\n" +
"<table id='right'>\n" +
"<tr><th>Show&nbsp;&nbsp;</th><th>Hide</th></tr>\n" +
"<tr><td><input type='radio' id='show_hi'       name='show_hide_hi'       onchange='showHide( \"hi\",       \"block\" );' checked></td><td><input type='radio' name='show_hide_hi'       onchange='showHide( \"hi\",       \"none\" );'><td>Hi</td></tr>\n" +
"<tr><td><input type='radio' id='show_question' name='show_hide_question' onchange='showHide( \"question\", \"block\" );' checked></td><td><input type='radio' name='show_hide_question' onchange='showHide( \"question\", \"none\" );'><td>Questions</td></tr>\n" +
"<tr><td><input type='radio' id='show_problem'  name='show_hide_problem'  onchange='showHide( \"problem\",  \"block\" );' checked></td><td><input type='radio' name='show_hide_problem'  onchange='showHide( \"problem\",  \"none\" );'><td>Problems</td></tr>\n" +
"<tr><td><input type='radio' id='show_entities' name='show_hide_entities' onchange='showHide( \"entities\", \"block\" );' checked></td><td><input type='radio' name='show_hide_entities' onchange='showHide( \"entities\", \"none\" );'><td>Entities</td></tr>\n" +
"</table>\n" +
"</body>\n" +
"</html>";

    console.log( html );
   
}


