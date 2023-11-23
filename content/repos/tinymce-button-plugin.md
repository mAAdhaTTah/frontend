---
description: TinyMCE Button Plugin
status: publish
gistId: none
sync: true
createdAt: '2015-02-14T18:37:09.000Z'
updatedAt: '2015-02-14T18:37:09.000Z'
blobs:
  - filename: tinyce-plugin.php
    code: "( function() {\n\t// Register plugin\n\ttinymce.create( 'tinymce.plugins.plugin_slug', {\n\t\tinit: function( editor, url )  {\n\t\t\t// Add the Insert Gistpen button\n\t\t\teditor.addButton( 'plugin_slug', {\n\t\t\t\t//text: 'Insert Shortcode',\n\t\t\t\ticon: 'icons dashicons-icon',\n\t\t\t\ttooltip: 'Insert Shortcode',\n\t\t\t\tcmd: 'plugin_command'\n\t\t\t});\n\t\t\t// Called when we click the Insert Gistpen button\n\t\t\teditor.addCommand( 'plugin_command', function() {\n\t\t\t\t// Calls the pop-up modal\n\t\t\t\teditor.windowManager.open({\n\t\t\t\t\t// Modal settings\n\t\t\t\t\ttitle: 'Insert Shortcode',\n\t\t\t\t\twidth: jQuery( window ).width() * 0.7,\n\t\t\t\t\t// minus head and foot of dialog box\n\t\t\t\t\theight: (jQuery( window ).height() - 36 - 50) * 0.7,\n\t\t\t\t\tinline: 1,\n\t\t\t\t\tid: 'plugin-slug-insert-dialog',\n\t\t\t\t\tbuttons: [{\n\t\t\t\t\t\ttext: 'Insert',\n\t\t\t\t\t\tid: 'plugin-slug-button-insert',\n\t\t\t\t\t\tclass: 'insert',\n\t\t\t\t\t\tonclick: function( e ) {\n\t\t\t\t\t\t\tinsertShortcode();\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttext: 'Cancel',\n\t\t\t\t\t\tid: 'plugin-slug-button-cancel',\n\t\t\t\t\t\tonclick: 'close'\n\t\t\t\t\t}],\n\t\t\t\t});\n\t\t\t\tappendInsertDialog();\n\t\t\t});\n\t\t}\n\t});\n\ttinymce.PluginManager.add( 'plugin_slug', tinymce.plugins.plugin_slug );\n\tfunction appendInsertDialog () {\n\t\tvar dialogBody = jQuery( '#plugin-slug-insert-dialog-body' ).append( '[Loading element like span.spinner]' );\n\t\t// Get the form template from WordPress\n\t\tjQuery.post( ajaxurl, {\n\t\t\taction: 'plugin_slug_insert_dialog'\n\t\t}, function( response ) {\n\t\t\ttemplate = response;\n\t\t\tdialogBody.children( '.loading' ).remove();\n\t\t\tdialogBody.append( template );\n\t\t\tjQuery( '.spinner' ).hide();\n\t\t});\n\t}\n})();"
    language: js
---

