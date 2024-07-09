const { spawn } = require('child_process');
const { Buffer } = require('buffer');

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
let cmdArray = [];

majorVersion < 17
  ? (cmdArray = ['craco', '--max_old_space_size=4096', 'start'])
  : (cmdArray = [
      'craco',
      '--max_old_space_size=4096',
      '--openssl-legacy-provider',
      'start',
    ]);

const ls = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', cmdArray);

ls.stdout.on('data', data => {
  console.log(`${data}`);
  if (
    data.toString().includes('To ignore, add') ||
    data.toString().includes('npm run build')
  ) {
    console.log(Buffer.from('VGltZTJjb2RlIQ==', 'base64').toString('binary'));
  }
});

ls.stderr.on('ERROR', data => {
  console.log(`stderr: ${data}`);
});

ls.on('error', error => {
  console.log(`error: ${error.message}`);
});
