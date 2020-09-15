'use strict';

const chalk = require('chalk');
const commander = require('commander');
const packageJson = require('../package.json');

const fs = require('fs-extra');
var vfs = require('vinyl-fs');
const path = require('path');
const inquirer = require('inquirer')
const semver = require('semver');
const download = require('download-git-repo');
const { exit } = require('process');

const {
  checkAppName,
  isSafeToCreateProjectIn,
  checkThatNpmCanReadCwd,
  checkForLatestVersion,
  checkNpmVersion,
  install
} = require('../utils/utils')

let projectName;

function init() {

  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
      projectName = name;
    })
    .option('--info', 'print environment debug info')
    .allowUnknownOption()
    .on('--help', () => {
      console.log(
        `    Only ${chalk.green('<project-directory>')} is required.`
      );
      console.log();
    })
    .parse(process.argv);

  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-Aplus-app')}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  // We first check the registry directly via the API, and if that fails, we try
  // the slower `npm view [package] version` command.
  //
  // This is important for users in environments where direct access to npm is
  // blocked by a firewall, and packages are provided exclusively via a private
  // registry.
  checkForLatestVersion()
    .catch(() => {
      try {
        return execSync('npm view create-aplus-app version').toString().trim();
      } catch (e) {
        return null;
      }
    })
    .then(latest => {
      if (latest && semver.lt(packageJson.version, latest)) {
        console.log();
        console.error(
          chalk.yellow(
            `You are running \`create-aplus-app\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n` +
            'We no longer support global installation of create-aplus-app.'
          )
        );
        console.log();
        console.log(
          'Please remove any global installs with one of the following commands:\n' +
          '- npm uninstall -g create-aplus-app'
        );
        console.log();
        process.exit(1);
      } else {
        createApp(
          projectName,
        );
      }
    });
}


function createApp(name) {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=10');
  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
        `Please update to Node 10 or higher for a better, fully supported experience.\n`
      )
    );
  }

  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);
  fs.ensureDirSync(name);          //ensureDir 确保目录的存在,如果目录结构不存在,就同步创建一个目录
  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1);
  }
  console.log();

  console.log(`Creating a new aplus-web app in ${chalk.green(root)}.`);
  console.log();

  const originalDirectory = process.cwd();
  process.chdir(root);
  if (!checkThatNpmCanReadCwd()) {
    process.exit(1);
  }

  const npmInfo = checkNpmVersion();
  if (!npmInfo.hasMinNpm) {
    if (npmInfo.npmVersion) {
      console.log(
        chalk.yellow(
          `You are using npm ${npmInfo.npmVersion} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to npm 6 or higher for a better, fully supported experience.\n`
        )
      );
    }
  }

  run(
    root,
    appName,
    originalDirectory,
  );
}

async function run(root, appName, originalDirectory,) {

  const { downloadOption } = await inquirer.prompt([
    {
      name: 'downloadOption',
      type: 'list',
      message: `Which part of APlus do you need to download ? Please choose:`,
      choices: [
        { name: 'aplus-web', value: 'aplus-web' },
        { name: 'aplus-server', value: 'aplus-server' },
        { name: 'Cancel', value: false }
      ],
    }
  ])

  if (!downloadOption) {
    return;
  }

  const { getWay } = await inquirer.prompt([
    {
      name: 'getWay',
      type: 'list',
      message: `The ${chalk.cyan(downloadOption)} code framework will be installed , please choose how to install it :`,
      choices: [
        { name: 'Deploy from github', value: 'github' },
        { name: 'Use template files in the NPM package', value: 'template' },
        { name: 'Cancel', value: false }
      ]
    }
  ])

  if (!getWay) {
    return;
  }

  if (getWay === 'github') {

    // const name = await inquirerProj(appName)

    await download(`github:espory/${downloadOption}`, './', err => {
      if (err) {
        console.error(chalk.red('\nError download'));
        exit(1);
      }
      console.log(`\nThe required ${chalk.yellow(downloadOption)} code framework has been ${chalk.yellow('successfully deployed')}`);
      console.log(`\n${chalk.green('Installing packages...')} This might take a couple of minutes.`);

      console.log()
      // 将node工作目录更改成构建的项目根目录下
      process.chdir(root);
      // 执行安装命令
      install(root, downloadOption);
    })


  } else {
    var cwd = path.join(__dirname, path.join('../template', downloadOption));

    // 从demo1目录中读取除node_modules目录下的所有文件并筛选处理
    vfs.src(['**/*', '!node_modules/**/*'], { cwd: cwd, dot: true })
      .pipe(vfs.dest(root))
      .on('end', function () {

        console.log(`\nThe required ${chalk.yellow(downloadOption)} code framework has been ${chalk.yellow('successfully deployed')}`);
        console.log(`\n${chalk.green('Installing packages...')} This might take a couple of minutes.`);
        console.log()
        // 将node工作目录更改成构建的项目根目录下
        process.chdir(root);
        // 执行安装命令
        install(root);
      })
      .resume();
  }
}

module.exports = {
  init,
};