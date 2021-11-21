const { registerPlugin } = wp.plugins;
const { PluginSidebar, __experimentalMainDashboardButton: MainDashboardButton, __experimentalNavigationBackButton: NavigationBackButton, PluginDocumentSettingPanel, PluginMoreMenuItem, PluginPostPublishPanel, PluginPrePublishPanel, PluginSidebarMoreMenuItem  } = wp.editPost;
const  {PanelBody, TextControl, MenuItem } = wp.components
const { useState, useEffect } = wp.element;
const { useSelect, useDispatch } = wp.data
const { __ } = wp.i18n;


// draggable Sidebar
function draggableSidebar() {
  let el = jQuery('.interface-interface-skeleton__sidebar');
  el.prepend("<div class='xs-draggable'></div>");
  
  jQuery('.xs-draggable').mousedown(function(e) {
      e.preventDefault();
      jQuery(document).mousemove(function(e) {
          jQuery('#position').html(e.pageX + ', ' + e.pageY);
          el.find('.edit-post-sidebar').css("width", jQuery(window).width() - (e.pageX + 2));
      })
  });
  
  jQuery(document).mouseup(function(e) {
      jQuery(document).unbind('mousemove');
  });
}

// custom-link-in-toolbar.js
// wrapped into IIFE - to leave global space clean.
( function( window, wp ){


  jQuery(window).load(function($) {
      var link_html = '<div id="xs-custom-toolbar">';

      var editorEl = jQuery('#editor');
      if( !editorEl ){
          return;
      }

      // inserting a id in the toolbar to initiate react component
      jQuery('.edit-post-header__toolbar').append(link_html);
      ReactDOM.render(<ToolbarComponent />, document.getElementById('xs-custom-toolbar'));


      // sidebar draggable
      draggableSidebar();

  })
  // unsubscribe is a function - it's not used right now 
  // but in case you'll need to stop this link from being reappeared at any point you can just call unsubscribe();

} )( window, wp )



// Toolbar. This is custom component for editor header toolbar.
const ToolbarComponent = () => {
  // Source: https://wordpress.org/support/topic/getting-and-modifying-gutenberg-post-content-with-javascript/
  const changeTitle = () => {
    wp.data.dispatch('core/editor').editPost({title: "Changed me? Great!"}) // 
  }

  const insertContent = () => {
    // Insert COntent
    const newBlock = wp.blocks.createBlock( "core/paragraph", { // creating block
      content: 'This is the content',
    });
    wp.data.dispatch( "core/editor" ).insertBlocks( newBlock); // inserting above block here
  }

  const updateSelectedBlockMeta = () => {
      let clientId = wp.data.select( "core/editor" ).getSelectedBlock().clientId;
      if(!clientId) {return;}
      wp.data.dispatch( 'core/editor' ).updateBlock( clientId, {
              attributes: {
                  className: 'md-easin-class',
                  style: {
                      typography: {
                          fontSize: '50px'
                      }
                  }
              }
      } );
  }

  const updateExcerpt = () => {
    wp.data.dispatch('core/editor').editPost({excerpt: "Updated Excerpt? WOW!"})
  }

  const updateCustomField = () => {
    wp.data.dispatch('core/editor').editPost({ meta: { _myprefix_text_metafield: 'Custom Field Updated. Awesome!' } })
  }

  return (
    <>
      <button onClick={changeTitle}>Change Title?</button>
      <button onClick={insertContent}>Insert Content?</button>
      <button onClick={updateSelectedBlockMeta}>Update Block Meta?</button>
      <button onClick={updateExcerpt}>Update Excerpt?</button>
      <button onClick={updateCustomField}>Update Custom-field?</button>
    </>
  )
}

// New Sidebar Panel, Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar-more-menu-item/
registerPlugin( 'myprefix-sidebar1', {
    icon: 'smiley',
    render: () => {
      return (
        <>
          <PluginSidebarMoreMenuItem
            target="myprefix-sidebar"
          >
            {__('Meta Options 1', 'textdomain')}
          </PluginSidebarMoreMenuItem>

          <PluginSidebar
            name="myprefix-sidebar"
            title={__('Meta Options 11', 'textdomain')}
          >
            Some Content
          </PluginSidebar>
        </>
      )
    }
  })

// custom meta field on text change
const MyMenuItem = () => {
    const meta = useSelect(
        (select) =>
          select('core/editor').getEditedPostAttribute('meta')['_myprefix_text_metafield'] // Custom meta selection
      );
      const { editPost } = useDispatch('core/editor');

    const handleText = (value) => {
        editPost({ meta: { _myprefix_text_metafield: value } }) // custom meta update
    }
 
    return (
        // Source: https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
        <TextControl
            label="Custom Field"
            value={ meta }
            onChange={ handleText }
        />
    );
};

// Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-document-setting-panel/
const PluginDocumentSettingPanelDemo = () => (
    <PluginDocumentSettingPanel
        name="custom-panel"
        title="Custom Panel"
        className="custom-panel"
    >
        <MyMenuItem /> {/* added react component */}
    </PluginDocumentSettingPanel>
);
 
registerPlugin( 'plugin-document-setting-panel-demo', {
    render: PluginDocumentSettingPanelDemo,
    icon: 'palmtree',
} );



/* Custom menu item 
Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-more-menu-item/
*/
const MyButtonMoreMenuItemTest = () => (
    <PluginMoreMenuItem
        icon='palmtree'
        onClick={ () => {
            alert( 'link Clicked' );
        } }
    >
        Custom Menu Link
    </PluginMoreMenuItem>
);
 
registerPlugin( 'view', { render: MyButtonMoreMenuItemTest } );



// registerPlugin( 'myprefix-sidebar', {
//     icon: 'smiley',
//     render: () => {
//       return (
//         <>
//           <PluginSidebar
//             title={__('Meta Options', 'textdomain')}
//           >
//              <PanelBody>{ __( 'My sidebar content Easin' ) }</PanelBody>
//           </PluginSidebar>
//         </>
//       )
//     }
//   })

//   const MyPluginSidebarfdas = () => (
//     <PluginSidebar name="my-sidebar" title="My sidebar title eas" icon='palmtree'>
//         <PanelBody>{ __( 'My sidebar content' ) }</PanelBody>
//     </PluginSidebar>
// );

// registerPlugin( 'view-testfdsaafdsafd', { render: MyPluginSidebarfdas } );

  
// replace main dashboard logo, Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/main-dashboard-button/
// const MainDashboardButtonTest = () => (
//     <MainDashboardButton>
//         <button onClick={
//         () => {
//             wp.data.dispatch('core/editor').editPost({title: 'Changed Title'})
//         }
//     }>Change Title?</button>
    
//     </MainDashboardButton>
// );
 
// registerPlugin( 'fdsafdsafdas', {
//     render: MainDashboardButtonTest,
// } );