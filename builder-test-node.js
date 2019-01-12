const path = require('path')
const builder = require('@now/node');
const glob = require('@now/build-utils/fs/glob');

const workingDir = path.join(process.cwd(), 'nodejs');
const nowJson = require('./nodejs/now.json');

module.exports = async () => {
  for (build of nowJson.builds) {
    const output = await builder.build({
      files: glob(build.src),
      workPath: workingDir,
      config: build.config
    });
    console.log(output);
  }
}

if (require.main === module) {
  module.exports();
}
