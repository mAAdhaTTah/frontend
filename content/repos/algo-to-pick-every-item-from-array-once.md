---
description: Algo to pick every item from array once
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:36:21.000Z'
updatedAt: '2015-02-14T18:36:21.000Z'
blobs:
  - filename: pick-randomly-from-array.php
    code: "\t\t$num_posts = count( $languages );\n\n\t\t$this->gistpens = $this->factory->post->create_many( $num_posts, array(\n\t\t\t'post_type' => 'gistpens',\n\t\t), array(\n\t\t\t'post_title' => new WP_UnitTest_Generator_Sequence( 'Post title %s' ),\n\t\t\t'post_name' => new WP_UnitTest_Generator_Sequence( 'Post title %s' ),\n\t\t\t'post_content' => new WP_UnitTest_Generator_Sequence( 'Post content %s' )\n\t\t));\n\n\t\tforeach ( $this->gistpens as $gistpen_id ) {\n\t\t\t// Pick a random language\n\t\t\t$num_posts = $num_posts - 1;\n\t\t\t$lang_num = rand( 0, ( $num_posts ) );\n\n\t\t\t// Get the language's id\n\t\t\t$lang_id = $languages[$lang_num];\n\n\t\t\t// Remove the language and reindex the languages array\n\t\t\tunset( $languages[$lang_num] );\n\t\t\t$languages = array_values( $languages );"
    language: php
---

