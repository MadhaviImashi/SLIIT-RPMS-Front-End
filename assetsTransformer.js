const path = require('path');

const AssetTransformer = {
  process(src, filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  }
};

export default AssetTransformer;
