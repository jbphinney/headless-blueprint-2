import { ProjectTemplatePlugin } from './plugins/ProjectTemplatePlugin';
import { RelayStylePaginationPlugin } from './plugins/RelayStylePaginationPlugin';
import { setConfig } from '@faustwp/core';
import possibleTypes from './possibleTypes.json';
import templates from './wp-templates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  experimentalPlugins: [
    new ProjectTemplatePlugin(),
    new RelayStylePaginationPlugin(),
  ],
  possibleTypes,
  templates,
});

//Just adding a note to test previews, still testing
