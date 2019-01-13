const path = require('path')
const builder = require('@now/node');
const glob = require('@now/build-utils/fs/glob');

const workingDir = path.join(process.cwd(), 'nodejs');
const nowJson = require('./nodejs/now.json');

module.exports = async () => {
  const files = await glob('**', workingDir);

  for (const build of nowJson.builds) {
    const entries = Object.values(await glob(build.src, workingDir));

    for (const entrypoint of entries) {
      const output = await builder.build({
        files,
        entrypoint,
        workPath: workingDir,
        config: build.config
      });
      console.log(output);
    }
  }
}

if (require.main === module) {
  module.exports().catch(console.error);
}
