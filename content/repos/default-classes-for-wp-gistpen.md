---
description: Default Classes for WP-Gistpen
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:35:26.000Z'
updatedAt: '2015-02-14T18:35:26.000Z'
blobs:
  - filename: class.php
    code: "<?php\nnamespace WP_Gistpen;\n\n/**\n * This is the class description.\n *\n * @package    WP_Gistpen\n * @author     James DiGioia <jamesorodig@gmail.com>\n * @link       https://jamesdigioia.com/wp-gistpen/\n * @since      [current version]\n */\nclass Boilerplate {\n\n\t/**\n\t * The ID of this plugin.\n\t *\n\t * @since    [current version]\n\t * @access   private\n\t * @var      string    $plugin_name    The ID of this plugin.\n\t */\n\tprivate $plugin_name;\n\n\t/**\n\t * The version of this plugin.\n\t *\n\t * @since    [current version]\n\t * @access   private\n\t * @var      string    $version    The current version of this plugin.\n\t */\n\tprivate $version;\n\n\t/**\n\t * Initialize the class and set its properties.\n\t *\n\t * @since    [current version]\n\t * @var      string    $plugin_name       The name of this plugin.\n\t * @var      string    $version    The version of this plugin.\n\t */\n\tpublic function __construct( $plugin_name, $version ) {\n\n\t\t$this->plugin_name = $plugin_name;\n\t\t$this->version = $version;\n\n\t}\n}"
    language: php
  - filename: test.php
    code: "<?php\n\nclass WP_Gistpen_Sample_Test extends WP_Gistpen_UnitTestCase {\n\n\tfunction setUp() {\n\t\tparent::setUp();\n\t}\n\n\tfunction test_sample() {\n\t\t// replace this with some actual testing code\n\t\t$this->markTestIncomplete( \"This test is incomplete.\" );\n\t}\n\n\tfunction tearDown() {\n\t\tparent::tearDown();\n\t}\n}"
    language: php
---

