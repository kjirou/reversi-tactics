module.exports = function generateModhaTestTemplate(data) {
  return [
    'import assert from \'assert\';',
    '',
    'import ' + data.noExtensionFileName + ' from \'' + data.noExtensionFilePath + '\';',
    '',
    '',
    'describe(\'' + data.noExtensionFilePath + '\', () => {',
    '',
    '  it(\'should be\', () => {',
    '  });',
    '});'
  ].join('\n');
};
