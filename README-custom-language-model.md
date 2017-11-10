# Creating the custom language model

**Note:** As described in [the disclaimer](https://github.com/spackows/CASCON-2017_Analyzing_chat/blob/master/README.md), this is not the best practice for creating a robust, enterprise-solution custom language model.  Instead, this is the fastest way possible to go from "no custom language model" to "having a custom language model".

<p>&nbsp;</p>

### Step 1

Log in to the Watson Knowledge Studio (when you sign up, they send you an email with info about your server and how to log in.)

<p>&nbsp;</p>

### Step 2

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_1_type-system.mp4'>demo video</a>]

On the **Type System** page, create the type system by adding the following Entity types:

  - action
  - docs
  - obj
  - persona
  - tech

  These don't need Roles or Subtypes.. they just need to exist.

<p>&nbsp;</p>

### Step 3

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_2_documents.mp4'>demo video</a>]

On the **Documents** page:

  1. Click *Import Document Set* and then upload all the files in the `custom-language-model/document-set` directory.

  2. Click *Create Annotation Set* and then create an annotation set containing all the files you just uploaded.

<p>&nbsp;</p>

### Step 4

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_3_dictionaries.mp4'>demo video</a>]

On the **Dictionaries** page, import all the files in the `custom-language-model/dictionaries` directory.

<p>&nbsp;</p>

### Step 5

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_4_dictionary-pre-annotator.mp4'>demo video</a>]

On the **Annotator Component** page, create a "Dictionary pre-annotator":

  1. When prompted to create a "Dictionary Mapping", associate each entity type name with the dictionary of the same name, and then click *Create & Run*.

  2. When prompted to specify what to pre-annotate, check the box beside the annotation set you just created, and then click *Run*.<br/><p>It takes a few minutes to complete.</p>

<p>&nbsp;</p>

### Step 6

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_5_human-annotation.mp4'>demo video</a>]

After the pre-annotation is finished, on the **Human Annotation** page, perform human annotation:

  1. Click *Add Task*.

  2. When prompted, add your annotation set to this task, then click *Create Task*.

  3. Double-click on the new "task" to work with it, and then under the "Action" menu item, click *Annotate*.  This will open a new browser tab.

  4. In the new tab, verify that the dictionary pre-annotator worked properly:<br/><p>The files from the annotation set (those sample data files from the `custom-language-model/document-set` directory) will be displayed.  Click one of them to view the job the dictionary pre-annotator did.  If the dictionary pre-annotator worked properly, you should see some words highlighted in different colours.</p>

  5. If it looks like the dictionary pre-annotator worked properly, close the text file, click *Submit All*.  Then close that new tab.<br/><p>(That's right, you didn't actually do any human annotating.. I did say this is the fast way to get a custom language model built, not the best way - for a given value of "best".)</p>

  6. Back on the **Human Annotation** page, click *Refresh*, check the box beside your annotation set name, and then click *Accept*.

<p>&nbsp;</p>

### Step 7

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_6_create-machine-learning-annotator.mp4'>demo video</a>]

On the **Annotator Component** page, create a Machine Learning annotator:

  1. Click *Create Annotator* and then select the Machine Learning type of annotator.

  2. When prompted, check the box beside your annotation set again, and then click *Next*

  3. On the next panel, accept the default choice to reuse the mapping used for the dictionary pre-annotator, and click *Train & Evaluate*.<br/><p>It will take a few minutes for the annotator to be ready.</p>

<p>&nbsp;</p>

### Step 8

[<a href='https://raw.githubusercontent.com/spackows/CASCON-2017_Analyzing_chat/master/demo-videos/custom-language-model_7_deploy.mp4'>demo video</a>]

When the Machine Learning annotator is done training, deploy the model:

  1. Click "Details" on the Machine Learning annotator card.

  2. On the Machine Learning Model details page, click *Take Snapshot*.

  3. Click *Deploy*.

  4.  Select "Natural Language Understanding" as the type of service to deploy to, then click *Next*.

  5.  Follow the prompts to select your Region, your Space, and your NLU Service Instance from the drop-down lists, then click *Deploy*.

  6. Although it will take a few minutes to deploy, you can see the model ID displayed in a modal window.

<p>&nbsp;</p>

Now you're ready to work with file 07_NLU-list-custom-models.js!


