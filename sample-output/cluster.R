
# Data frames...
#

# problem...
col_problem_action_comment_entities = c( "log in", "sign up", "connect", "connect", "load", "load | create", "import | create", "connect", "exceed", "connect", "connect", "train", "sign up", "create", "sign up", "create", "create", "create", "create", "create", "load", "exceed", "create", "create", "create", "log in", "create", "train", "load", "sign up", "create" )
col_problem_action_connect = c( 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_action_create = c( 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1 )
col_problem_action_exceed = c( 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_action_load = c( 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
col_problem_action_log_in = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_problem_action_sign_up = c( 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_problem_action_train = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 )
df_problem_action = data.frame( col_problem_action_connect, col_problem_action_create, col_problem_action_exceed, col_problem_action_load, col_problem_action_log_in, col_problem_action_sign_up, col_problem_action_train )

col_problem_obj_comment_entities = c( "account", "model | project", "notebook | project", "endpoint | model", "model | notebook", "model | endpoint", "notebook", "notebook", "notebook", "limit", "account", "model", "trial", "notebook", "account", "notebook", "notebook", "project", "project", "limit", "project", "account", "notebook", "model", "trial", "model", "account" )
col_problem_obj_account = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 )
col_problem_obj_endpoint = c( 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_obj_limit = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 )
col_problem_obj_model = c( 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0 )
col_problem_obj_notebook = c( 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 )
col_problem_obj_project = c( 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0 )
col_problem_obj_trial = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
df_problem_obj = data.frame( col_problem_obj_account, col_problem_obj_endpoint, col_problem_obj_limit, col_problem_obj_model, col_problem_obj_notebook, col_problem_obj_project, col_problem_obj_trial )

col_problem_tech_comment_entities = c( "object storage", "r", "machine learning", "object storage | r", "machine learning", "spark", "machine learning", "cloudant | spark", "cloudant", "spark", "machine learning", "machine learning", "r", "machine learning" )
col_problem_tech_cloudant = c( 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 )
col_problem_tech_machine_learning = c( 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1 )
col_problem_tech_object_storage = c( 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_tech_r = c( 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_problem_tech_spark = c( 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0 )
df_problem_tech = data.frame( col_problem_tech_cloudant, col_problem_tech_machine_learning, col_problem_tech_object_storage, col_problem_tech_r, col_problem_tech_spark )

# question...
col_question_obj_comment_entities = c( "trial", "collaborator | project", "notebook", "model", "notebook", "project", "trial", "notebook", "notebook", "notebook", "notebook", "project", "notebook", "name | notebook", "dataset", "shapefile", "model", "notebook", "notebook", "trial", "notebook", "project", "notebook", "notebook", "dataset", "shapefile", "model" )
col_question_obj_dataset = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
col_question_obj_model = c( 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 )
col_question_obj_notebook = c( 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0 )
col_question_obj_project = c( 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_question_obj_shapefile = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_question_obj_trial = c( 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 )
df_question_obj = data.frame( col_question_obj_dataset, col_question_obj_model, col_question_obj_notebook, col_question_obj_project, col_question_obj_shapefile, col_question_obj_trial )

col_question_action_comment_entities = c( "add", "load", "export", "import", "create", "import", "download", "export", "create", "access", "load", "create", "add", "recover", "load", "load", "download", "download", "import", "access", "import", "add", "recover", "load", "load" )
col_question_action_access = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_question_action_add = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 )
col_question_action_create = c( 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_download = c( 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_export = c( 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_import = c( 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 )
col_question_action_load = c( 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1 )
col_question_action_recover = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
df_question_action = data.frame( col_question_action_access, col_question_action_add, col_question_action_create, col_question_action_download, col_question_action_export, col_question_action_import, col_question_action_load, col_question_action_recover )

col_question_tech_comment_entities = c( "spark | machine learning | r", "machine learning", "r", "r", "r | machine learning", "machine learning", "r", "machine learning" )
col_question_tech_machine_learning = c( 1, 1, 0, 0, 1, 1, 0, 1 )
col_question_tech_r = c( 1, 0, 1, 1, 1, 0, 1, 0 )
df_question_tech = data.frame( col_question_tech_machine_learning, col_question_tech_r )

# docs...
col_docs_action_comment_entities = c( "load | create", "deploy", "analyze" )
col_docs_action_analyze = c( 0, 0, 1 )
col_docs_action_create = c( 1, 0, 0 )
col_docs_action_deploy = c( 0, 1, 0 )
col_docs_action_load = c( 1, 0, 0 )
df_docs_action = data.frame( col_docs_action_analyze, col_docs_action_create, col_docs_action_deploy, col_docs_action_load )

col_docs_tech_comment_entities = c( "spark", "machine learning", "node-red" )
col_docs_tech_machine_learning = c( 0, 1, 0 )
col_docs_tech_node_red = c( 0, 0, 1 )
col_docs_tech_spark = c( 1, 0, 0 )
df_docs_tech = data.frame( col_docs_tech_machine_learning, col_docs_tech_node_red, col_docs_tech_spark )


# Calc distance...
#
d_problem_action = dist( as.matrix( df_problem_action ), method = "binary" )
d_problem_obj = dist( as.matrix( df_problem_obj ), method = "binary" )
d_problem_tech = dist( as.matrix( df_problem_tech ), method = "binary" )

d_question_obj = dist( as.matrix( df_question_obj ), method = "binary" )
d_question_action = dist( as.matrix( df_question_action ), method = "binary" )
d_question_tech = dist( as.matrix( df_question_tech ), method = "binary" )

d_docs_action = dist( as.matrix( df_docs_action ), method = "binary" )
d_docs_tech = dist( as.matrix( df_docs_tech ), method = "binary" )


# Hierarchical clusters...
#
hc_problem_action = hclust( d_problem_action )
hc_problem_action$labels = col_problem_action_comment_entities
hc_problem_obj = hclust( d_problem_obj )
hc_problem_obj$labels = col_problem_obj_comment_entities
hc_problem_tech = hclust( d_problem_tech )
hc_problem_tech$labels = col_problem_tech_comment_entities

hc_question_obj = hclust( d_question_obj )
hc_question_obj$labels = col_question_obj_comment_entities
hc_question_action = hclust( d_question_action )
hc_question_action$labels = col_question_action_comment_entities
hc_question_tech = hclust( d_question_tech )
hc_question_tech$labels = col_question_tech_comment_entities

hc_docs_action = hclust( d_docs_action )
hc_docs_action$labels = col_docs_action_comment_entities
hc_docs_tech = hclust( d_docs_tech )
hc_docs_tech$labels = col_docs_tech_comment_entities


# Dendrograms...
#
dendr_problem_action = as.dendrogram( hc_problem_action )
dendr_problem_obj = as.dendrogram( hc_problem_obj )
dendr_problem_tech = as.dendrogram( hc_problem_tech )

dendr_question_obj = as.dendrogram( hc_question_obj )
dendr_question_action = as.dendrogram( hc_question_action )
dendr_question_tech = as.dendrogram( hc_question_tech )

dendr_docs_action = as.dendrogram( hc_docs_action )
dendr_docs_tech = as.dendrogram( hc_docs_tech )


# Colour the groups...
#
library(methods)
myColourHelper = setRefClass( "myColourHelper", fields = c( "colour_list", "colour_position", "beginnings", "beginnings_position" ), methods = list(

    initialize = function()
    {
        colour_list <<- list( "darkviolet", "darkslategray", "blue", "brown4", "darkolivegreen", "cadetblue4", "deeppink4", "gold4", "cyan4", "tomato", "tan", "slategrey", "palevioletred4", "palegreen4", "saddlebrown" )
        colour_position <<- 1
        beginnings <<- list()
        beginnings_position <<- 1
    },

    changeColours = function()
    {
        colour_position <<- colour_position + 1
        if( colour_position > length(colour_list) )
        {
            colour_position <<- 1
        }

        beginnings_position <<- beginnings_position + 1
        if( beginnings_position > length(beginnings) )
        {
            beginnings_position <<- 1
        }
    },

    getColour = function( label )
    {
        if( label == beginnings[beginnings_position] )
        {
            changeColours()
        }

        colour_list[ colour_position ]
    },

    listBeginnings = function( node )
    {
        if( is.leaf( node[[1]] ) )
        {
            beginnings[[length(beginnings)+1]] <<- attributes( node[[1]] )$label
        }
        else
        {
            listBeginnings( node[[1]] )
            listBeginnings( node[[2]] )
        }
    },

    colourGroups = function( node )
    {
        initialize()
        if( is.leaf( node[[1]] ) )
        {
            listBeginnings( node[[2]] )
        }
        else
        {
            listBeginnings( node )
        }
        node = dendrapply( node, function( node )
        {
            if( is.leaf( node ) )
            {
                a = attributes( node )
                colour = getColour( a$label )
                attr( node, "nodePar" ) = c( a$nodePar, lab.col = colour, pch = NA_integer_ )
            }
            node
        } )

        node
    }

) )

colour_helper = myColourHelper()

dendr_problem_action = colour_helper$colourGroups( dendr_problem_action )
dendr_problem_obj = colour_helper$colourGroups( dendr_problem_obj )
dendr_problem_tech = colour_helper$colourGroups( dendr_problem_tech )

dendr_question_obj = colour_helper$colourGroups( dendr_question_obj )
dendr_question_action = colour_helper$colourGroups( dendr_question_action )
dendr_question_tech = colour_helper$colourGroups( dendr_question_tech )

dendr_docs_action = colour_helper$colourGroups( dendr_docs_action )
dendr_docs_tech = colour_helper$colourGroups( dendr_docs_tech )



# Print plots...
#
pdf( "problem_action_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_problem_action, horiz=T )
pdf( "problem_obj_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_problem_obj, horiz=T )
pdf( "problem_tech_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_problem_tech, horiz=T )

pdf( "question_obj_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_question_obj, horiz=T )
pdf( "question_action_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_question_action, horiz=T )
pdf( "question_tech_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_question_tech, horiz=T )

pdf( "docs_action_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_docs_action, horiz=T )
pdf( "docs_tech_cluster.pdf" )
par( mar = c( 5, 2, 2, 12)+0.1 )
plot( dendr_docs_tech, horiz=T )

