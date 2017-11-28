
# Data frames...
#

# problem...
col_problem_action_comment_entities = list( "1"="log in", "2"="sign up", "3"="connect", "4"="connect", "5"="load", "6"="load | create", "7"="import | create", "8"="connect", "9"="exceed", "10"="connect", "11"="connect", "12"="train", "13"="sign up", "14"="create", "15"="sign up", "16"="create", "17"="create", "18"="create", "19"="create", "20"="create", "21"="load", "22"="exceed", "23"="create", "24"="create", "25"="create", "26"="log in", "27"="create", "28"="train", "29"="load", "30"="sign up", "31"="create" )
col_problem_action_connect = c( 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_action_create = c( 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1 )
col_problem_action_exceed = c( 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_action_load = c( 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
col_problem_action_log_in = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_problem_action_sign_up = c( 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_problem_action_train = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 )
df_problem_action = data.frame( col_problem_action_connect, col_problem_action_create, col_problem_action_exceed, col_problem_action_load, col_problem_action_log_in, col_problem_action_sign_up, col_problem_action_train )

col_problem_obj_comment_entities = list( "1"="account", "2"="model | project", "3"="notebook | project", "4"="endpoint | model", "5"="model | notebook", "6"="model | endpoint", "7"="notebook", "8"="notebook", "9"="notebook", "10"="limit", "11"="account", "12"="model", "13"="trial", "14"="notebook", "15"="account", "16"="notebook", "17"="notebook", "18"="project", "19"="project", "20"="limit", "21"="project", "22"="account", "23"="notebook", "24"="model", "25"="trial", "26"="model", "27"="account" )
col_problem_obj_account = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 )
col_problem_obj_endpoint = c( 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_obj_limit = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 )
col_problem_obj_model = c( 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0 )
col_problem_obj_notebook = c( 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 )
col_problem_obj_project = c( 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0 )
col_problem_obj_trial = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
df_problem_obj = data.frame( col_problem_obj_account, col_problem_obj_endpoint, col_problem_obj_limit, col_problem_obj_model, col_problem_obj_notebook, col_problem_obj_project, col_problem_obj_trial )

col_problem_tech_comment_entities = list( "1"="object storage", "2"="r", "3"="machine learning", "4"="object storage | r", "5"="machine learning", "6"="spark", "7"="machine learning", "8"="cloudant | spark", "9"="cloudant", "10"="spark", "11"="machine learning", "12"="machine learning", "13"="r", "14"="machine learning" )
col_problem_tech_cloudant = c( 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 )
col_problem_tech_machine_learning = c( 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1 )
col_problem_tech_object_storage = c( 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_problem_tech_r = c( 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_problem_tech_spark = c( 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0 )
df_problem_tech = data.frame( col_problem_tech_cloudant, col_problem_tech_machine_learning, col_problem_tech_object_storage, col_problem_tech_r, col_problem_tech_spark )

# question...
col_question_obj_comment_entities = list( "1"="trial", "2"="collaborator | project", "3"="notebook", "4"="model", "5"="notebook", "6"="project", "7"="trial", "8"="notebook", "9"="notebook", "10"="notebook", "11"="notebook", "12"="project", "13"="notebook", "14"="name | notebook", "15"="dataset", "16"="shapefile", "17"="model", "18"="notebook", "19"="notebook", "20"="trial", "21"="notebook", "22"="project", "23"="notebook", "24"="notebook", "25"="dataset", "26"="shapefile", "27"="model" )
col_question_obj_dataset = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
col_question_obj_model = c( 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 )
col_question_obj_notebook = c( 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0 )
col_question_obj_project = c( 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_question_obj_shapefile = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 )
col_question_obj_trial = c( 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 )
df_question_obj = data.frame( col_question_obj_dataset, col_question_obj_model, col_question_obj_notebook, col_question_obj_project, col_question_obj_shapefile, col_question_obj_trial )

col_question_action_comment_entities = list( "1"="add", "2"="load", "3"="export", "4"="import", "5"="create", "6"="import", "7"="download", "8"="export", "9"="create", "10"="access", "11"="load", "12"="create", "13"="add", "14"="recover", "15"="load", "16"="load", "17"="download", "18"="download", "19"="import", "20"="access", "21"="import", "22"="add", "23"="recover", "24"="load", "25"="load" )
col_question_action_access = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 )
col_question_action_add = c( 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 )
col_question_action_create = c( 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_download = c( 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_export = c( 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
col_question_action_import = c( 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 )
col_question_action_load = c( 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1 )
col_question_action_recover = c( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 )
df_question_action = data.frame( col_question_action_access, col_question_action_add, col_question_action_create, col_question_action_download, col_question_action_export, col_question_action_import, col_question_action_load, col_question_action_recover )

col_question_tech_comment_entities = list( "1"="spark | machine learning | r", "2"="machine learning", "3"="r", "4"="r", "5"="r | machine learning", "6"="machine learning", "7"="r", "8"="machine learning" )
col_question_tech_machine_learning = c( 1, 1, 0, 0, 1, 1, 0, 1 )
col_question_tech_r = c( 1, 0, 1, 1, 1, 0, 1, 0 )
df_question_tech = data.frame( col_question_tech_machine_learning, col_question_tech_r )

# docs...
col_docs_action_comment_entities = list( "1"="load | create", "2"="deploy", "3"="analyze" )
col_docs_action_analyze = c( 0, 0, 1 )
col_docs_action_create = c( 1, 0, 0 )
col_docs_action_deploy = c( 0, 1, 0 )
col_docs_action_load = c( 1, 0, 0 )
df_docs_action = data.frame( col_docs_action_analyze, col_docs_action_create, col_docs_action_deploy, col_docs_action_load )

col_docs_tech_comment_entities = list( "1"="spark", "2"="machine learning", "3"="node-red" )
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
hc_problem_action$labels = names( col_problem_action_comment_entities )
hc_problem_obj = hclust( d_problem_obj )
hc_problem_obj$labels = names( col_problem_obj_comment_entities )
hc_problem_tech = hclust( d_problem_tech )
hc_problem_tech$labels = names( col_problem_tech_comment_entities )

hc_question_obj = hclust( d_question_obj )
hc_question_obj$labels = names( col_question_obj_comment_entities )
hc_question_action = hclust( d_question_action )
hc_question_action$labels = names( col_question_action_comment_entities )
hc_question_tech = hclust( d_question_tech )
hc_question_tech$labels = names( col_question_tech_comment_entities )

hc_docs_action = hclust( d_docs_action )
hc_docs_action$labels = names( col_docs_action_comment_entities )
hc_docs_tech = hclust( d_docs_tech )
hc_docs_tech$labels = names( col_docs_tech_comment_entities )



# Cluster groups...
#
ct_problem_action = cutree( hc_problem_action, h=0.5 )
ct_problem_obj = cutree( hc_problem_obj, h=0.5 )
ct_problem_tech = cutree( hc_problem_tech, h=0.5 )

ct_question_obj = cutree( hc_question_obj, h=0.5 )
ct_question_action = cutree( hc_question_action, h=0.5 )
ct_question_tech = cutree( hc_question_tech, h=0.5 )

ct_docs_action = cutree( hc_docs_action, h=0.5 )
ct_docs_tech = cutree( hc_docs_tech, h=0.5 )


groups_problem_action = tapply( names( ct_problem_action ), ct_problem_action, c )
groups_problem_obj = tapply( names( ct_problem_obj ), ct_problem_obj, c )
groups_problem_tech = tapply( names( ct_problem_tech ), ct_problem_tech, c )

groups_question_obj = tapply( names( ct_question_obj ), ct_question_obj, c )
groups_question_action = tapply( names( ct_question_action ), ct_question_action, c )
groups_question_tech = tapply( names( ct_question_tech ), ct_question_tech, c )

groups_docs_action = tapply( names( ct_docs_action ), ct_docs_action, c )
groups_docs_tech = tapply( names( ct_docs_tech ), ct_docs_tech, c )


sizes_problem_action = unlist( lapply( groups_problem_action, length ) )
sizes_problem_obj = unlist( lapply( groups_problem_obj, length ) )
sizes_problem_tech = unlist( lapply( groups_problem_tech, length ) )

sizes_question_obj = unlist( lapply( groups_question_obj, length ) )
sizes_question_action = unlist( lapply( groups_question_action, length ) )
sizes_question_tech = unlist( lapply( groups_question_tech, length ) )

sizes_docs_action = unlist( lapply( groups_docs_action, length ) )
sizes_docs_tech = unlist( lapply( groups_docs_tech, length ) )



# Name each cluster group with the most common entity in the group ...
#
individualEntities = function( entities ){ unlist( strsplit( entities, " | ", fixed=TRUE ) ) }
getGroupEntities   = function( group, entities_list ){ unlist( lapply( group, function( id ){ unlist( lapply( entities_list[[ id ]], individualEntities ) ) } ) ) }
topEntity          = function( group, entities_list ){ names( which.max( table( getGroupEntities( group, entities_list ) ) ) ) }

group_names_problem_action = lapply( groups_problem_action, function( group ){ topEntity( group, col_problem_action_comment_entities ) } )
group_names_problem_obj = lapply( groups_problem_obj, function( group ){ topEntity( group, col_problem_obj_comment_entities ) } )
group_names_problem_tech = lapply( groups_problem_tech, function( group ){ topEntity( group, col_problem_tech_comment_entities ) } )

group_names_question_obj = lapply( groups_question_obj, function( group ){ topEntity( group, col_question_obj_comment_entities ) } )
group_names_question_action = lapply( groups_question_action, function( group ){ topEntity( group, col_question_action_comment_entities ) } )
group_names_question_tech = lapply( groups_question_tech, function( group ){ topEntity( group, col_question_tech_comment_entities ) } )

group_names_docs_action = lapply( groups_docs_action, function( group ){ topEntity( group, col_docs_action_comment_entities ) } )
group_names_docs_tech = lapply( groups_docs_tech, function( group ){ topEntity( group, col_docs_tech_comment_entities ) } )



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



# Colour the dendrograms...
#
inGroup     = function( group, index ){ length( which( group == index ) ) > 0 }
whichGroup  = function( group_list, index ){ which( lapply( group_list, function( group ){ inGroup( group, index ) } ) == TRUE ) } 
colourDendr = function( dendr, group_list, colour_list, entities_list )
{
    dendr = dendrapply( dendr, function( node )
    {
        if( is.leaf( node ) )
        {
            a = attributes( node )
            colour = colour_list[[ whichGroup( group_list, a$label ) ]]
            attr( node, "nodePar" ) = c( a$nodePar, lab.col = colour, pch = NA_integer_ )
            attributes( node )$label = entities_list[[a$label]]
        }
        node
    } )
}

colours_problem_action = rainbow( length( groups_problem_action ) )
colours_problem_obj = rainbow( length( groups_problem_obj ) )
colours_problem_tech = rainbow( length( groups_problem_tech ) )

colours_question_obj = rainbow( length( groups_question_obj ) )
colours_question_action = rainbow( length( groups_question_action ) )
colours_question_tech = rainbow( length( groups_question_tech ) )

colours_docs_action = rainbow( length( groups_docs_action ) )
colours_docs_tech = rainbow( length( groups_docs_tech ) )


dendr_problem_action = colourDendr( dendr_problem_action, groups_problem_action, colours_problem_action, col_problem_action_comment_entities )
dendr_problem_obj = colourDendr( dendr_problem_obj, groups_problem_obj, colours_problem_obj, col_problem_obj_comment_entities )
dendr_problem_tech = colourDendr( dendr_problem_tech, groups_problem_tech, colours_problem_tech, col_problem_tech_comment_entities )

dendr_question_obj = colourDendr( dendr_question_obj, groups_question_obj, colours_question_obj, col_question_obj_comment_entities )
dendr_question_action = colourDendr( dendr_question_action, groups_question_action, colours_question_action, col_question_action_comment_entities )
dendr_question_tech = colourDendr( dendr_question_tech, groups_question_tech, colours_question_tech, col_question_tech_comment_entities )

dendr_docs_action = colourDendr( dendr_docs_action, groups_docs_action, colours_docs_action, col_docs_action_comment_entities )
dendr_docs_tech = colourDendr( dendr_docs_tech, groups_docs_tech, colours_docs_tech, col_docs_tech_comment_entities )



# Print plots...
#
svg( "problem_action_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_problem_action, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_problem_action ), names.arg = rev( group_names_problem_action ), col = rev( colours_problem_action ), horiz=TRUE, las=1 )


svg( "problem_obj_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_problem_obj, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_problem_obj ), names.arg = rev( group_names_problem_obj ), col = rev( colours_problem_obj ), horiz=TRUE, las=1 )


svg( "problem_tech_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_problem_tech, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_problem_tech ), names.arg = rev( group_names_problem_tech ), col = rev( colours_problem_tech ), horiz=TRUE, las=1 )



svg( "question_obj_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_question_obj, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_question_obj ), names.arg = rev( group_names_question_obj ), col = rev( colours_question_obj ), horiz=TRUE, las=1 )


svg( "question_action_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_question_action, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_question_action ), names.arg = rev( group_names_question_action ), col = rev( colours_question_action ), horiz=TRUE, las=1 )


svg( "question_tech_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_question_tech, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_question_tech ), names.arg = rev( group_names_question_tech ), col = rev( colours_question_tech ), horiz=TRUE, las=1 )



svg( "docs_action_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_docs_action, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_docs_action ), names.arg = rev( group_names_docs_action ), col = rev( colours_docs_action ), horiz=TRUE, las=1 )


svg( "docs_tech_cluster.svg", height=5, width=10 )
par( mfrow = c( 1, 2 ) )
par( cex = 0.75 )

par( mar = c( 4, 2, 2, 18 ) + 0.1 )
plot( dendr_docs_tech, horiz=T, cex.lab=0.75, main=NULL )
abline( v="0.5", col="red", lty=2 )

par( mar = c( 4, 0, 2, 4 ) + 0.1 )
barplot( rev( sizes_docs_tech ), names.arg = rev( group_names_docs_tech ), col = rev( colours_docs_tech ), horiz=TRUE, las=1 )



