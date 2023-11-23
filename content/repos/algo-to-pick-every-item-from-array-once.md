---
description: Algo to pick every item from array once
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:36:21.000Z'
updatedAt: '2015-02-14T18:36:21.000Z'
blobs:
  - filename: pick-randomly-from-array.php
    code: "$num_posts = count( $languages );\n\n$this->gistpens = $this->factory->post->create_many( $num_posts, array(\n\t'post_type' => 'gistpens',\n), array(\n\t'post_title' => new WP_UnitTest_Generator_Sequence( 'Post title %s' ),\n\t'post_name' => new WP_UnitTest_Generator_Sequence( 'Post title %s' ),\n\t'post_content' => new WP_UnitTest_Generator_Sequence( 'Post content %s' )\n));\n\nforeach ( $this->gistpens as $gistpen_id ) {\n\t// Pick a random language\n\t$num_posts = $num_posts - 1;\n\t$lang_num = rand( 0, ( $num_posts ) );\n\n\t// Get the language's id\n\t$lang_id = $languages[$lang_num];\n\n\t// Remove the language and reindex the languages array\n\tunset( $languages[$lang_num] );\n\t$languages = array_values( $languages );"
    language: php
---

