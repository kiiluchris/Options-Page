import {importData, exportData} from './extension';

/**
 * Setup click listeners for the options.html
 * 
 * @export
 * @param {object} {cleanupKeys, filterKeys} Array of keys to be retained at the root of data, Object mapping object keys of arrays to keys by which contents are filtered
 */
export const setupOptionsListeners = ({cleanupKeys = [], filterKeys ={}}) => {
  document.querySelector('main button#import')
    .addEventListener('click', () => {
      importData({cleanupKeys, filterKeys}).catch(console.error);
    });
  document.querySelector('main button#export')
    .addEventListener('click', () => {
      exportData().catch(console.error);
    });
  document.querySelector('main button#merge')
    .addEventListener('click', () => {
      importData({cleanupKeys, filterKeys}, false).catch(console.error);
    });
};

export default setupOptionsListeners;
export const optionsUITemplatePath = __dirname + '../options.ejs';
export {importData, exportData};