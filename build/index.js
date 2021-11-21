/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerPlugin
} = wp.plugins;
const {
  PluginSidebar,
  __experimentalMainDashboardButton: MainDashboardButton,
  __experimentalNavigationBackButton: NavigationBackButton,
  PluginDocumentSettingPanel,
  PluginMoreMenuItem,
  PluginPostPublishPanel,
  PluginPrePublishPanel,
  PluginSidebarMoreMenuItem
} = wp.editPost;
const {
  PanelBody,
  TextControl,
  MenuItem
} = wp.components;
const {
  useState,
  useEffect
} = wp.element;
const {
  useSelect,
  useDispatch
} = wp.data;
const {
  __
} = wp.i18n; // draggable Sidebar

function draggableSidebar() {
  let el = jQuery('.interface-interface-skeleton__sidebar');
  el.prepend("<div class='xs-draggable'></div>");
  jQuery('.xs-draggable').mousedown(function (e) {
    e.preventDefault();
    jQuery(document).mousemove(function (e) {
      jQuery('#position').html(e.pageX + ', ' + e.pageY);
      el.find('.edit-post-sidebar').css("width", jQuery(window).width() - (e.pageX + 2));
    });
  });
  jQuery(document).mouseup(function (e) {
    jQuery(document).unbind('mousemove');
  });
} // custom-link-in-toolbar.js
// wrapped into IIFE - to leave global space clean.


(function (window, wp) {
  jQuery(window).load(function ($) {
    var link_html = '<div id="xs-custom-toolbar">';
    var editorEl = jQuery('#editor');

    if (!editorEl) {
      return;
    } // inserting a id in the toolbar to initiate react component


    jQuery('.edit-post-header__toolbar').append(link_html);
    ReactDOM.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToolbarComponent, null), document.getElementById('xs-custom-toolbar')); // sidebar draggable

    draggableSidebar();
  }); // unsubscribe is a function - it's not used right now 
  // but in case you'll need to stop this link from being reappeared at any point you can just call unsubscribe();
})(window, wp); // Toolbar. This is custom component for editor header toolbar.


const ToolbarComponent = () => {
  // Source: https://wordpress.org/support/topic/getting-and-modifying-gutenberg-post-content-with-javascript/
  const changeTitle = () => {
    wp.data.dispatch('core/editor').editPost({
      title: "Changed me? Great!"
    }); // 
  };

  const insertContent = () => {
    // Insert COntent
    const newBlock = wp.blocks.createBlock("core/paragraph", {
      // creating block
      content: 'This is the content'
    });
    wp.data.dispatch("core/editor").insertBlocks(newBlock); // inserting above block here
  };

  const updateSelectedBlockMeta = () => {
    let clientId = wp.data.select("core/editor").getSelectedBlock().clientId;

    if (!clientId) {
      return;
    }

    wp.data.dispatch('core/editor').updateBlock(clientId, {
      attributes: {
        className: 'md-easin-class',
        style: {
          typography: {
            fontSize: '50px'
          }
        }
      }
    });
  };

  const updateExcerpt = () => {
    wp.data.dispatch('core/editor').editPost({
      excerpt: "Updated Excerpt? WOW!"
    });
  };

  const updateCustomField = () => {
    wp.data.dispatch('core/editor').editPost({
      meta: {
        _xs_text_metafield: 'Custom Field Updated. Awesome!'
      }
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: changeTitle
  }, "Change Title?"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: insertContent
  }, "Insert Content?"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: updateSelectedBlockMeta
  }, "Update Block Meta?"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: updateExcerpt
  }, "Update Excerpt?"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: updateCustomField
  }, "Update Custom-field?"));
}; // New Sidebar Panel, Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-sidebar-more-menu-item/


registerPlugin('myprefix-sidebar1', {
  icon: 'smiley',
  render: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginSidebarMoreMenuItem, {
      target: "myprefix-sidebar"
    }, __('Meta Options 1', 'textdomain')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginSidebar, {
      name: "myprefix-sidebar",
      title: __('Meta Options 11', 'textdomain')
    }, "Some Content"));
  }
}); // custom meta field on text change

const MyMenuItem = () => {
  const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta')['_xs_text_metafield'] // Custom meta selection
  );
  const {
    editPost
  } = useDispatch('core/editor');

  const handleText = value => {
    editPost({
      meta: {
        _xs_text_metafield: value
      }
    }); // custom meta update
  };

  return (// Source: https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: "Custom Field",
      value: meta,
      onChange: handleText
    })
  );
}; // Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-document-setting-panel/


const PluginDocumentSettingPanelDemo = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginDocumentSettingPanel, {
  name: "custom-panel",
  title: "Custom Panel",
  className: "custom-panel"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyMenuItem, null), " ");

registerPlugin('plugin-document-setting-panel-demo', {
  render: PluginDocumentSettingPanelDemo,
  icon: 'palmtree'
});
/* Custom menu item 
Source: https://developer.wordpress.org/block-editor/reference-guides/slotfills/plugin-more-menu-item/
*/

const MyButtonMoreMenuItemTest = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginMoreMenuItem, {
  icon: "palmtree",
  onClick: () => {
    alert('link Clicked');
  }
}, "Custom Menu Link");

registerPlugin('view', {
  render: MyButtonMoreMenuItemTest
}); // registerPlugin( 'myprefix-sidebar', {
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
}();
/******/ })()
;
//# sourceMappingURL=index.js.map