'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('../../yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(`${chalk.red('generator-koa-joi-swagger')}!!!`)
    )

    const prompts = [
      {
        type: 'input',
        name: 'serverName',
        message: 'Enter project name: ',
        default: 'koa_joi_swagger'
      },
      {
        type: 'input',
        name: 'serverVersion',
        message: 'Enter project version: ',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'serverDescription',
        message: 'Enter project description: '
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author: '
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email: '
      },
      {
        name: 'addTest',
        type: 'confirm',
        message: 'would you like to have test module included in the project?',
        default: true
      },
      {
        name: 'useTravis',
        type: 'confirm',
        message: 'would you like to have Travis included in the project?',
        default: false
      },
      {
        name: 'useAppveyor',
        type: 'confirm',
        message: 'would you like to have Appveyor included in the project?',
        default: false
      },
      {
        name: 'useDocker',
        type: 'confirm',
        message: 'would you like to have Docker included in the project?',
        default: false
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    let createDirName = 'koa_joi_swagger'
    if (this.props.serverName) {
      createDirName = this.props.serverName
    }
    this.fs.copy(
      this.templatePath('./koa_joi_swagger'),
      this.destinationPath(createDirName)
    )
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(`${createDirName}/.gitignore`)
    )
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${createDirName}/package.json`),
      {
        serverName: this.props.serverName,
        serverDescription: this.props.serverDescription,
        serverVersion: this.props.serverVersion,
        author: this.props.author,
        authorEmail: this.props.authorEmail
      }
    )
    if (this.props.addTest) {
      this.fs.copy(
        this.templatePath('test/*'),
        this.destinationPath(`${createDirName}/test/`)
      )
    }
    if (this.props.useTravis) {
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath(`${createDirName}/.travis.yml`)
      )
    }
    if (this.props.useAppveyor) {
      this.fs.copy(
        this.templatePath('appveyor.yml'),
        this.destinationPath(`${createDirName}/appveyor.yml`)
      )
    }
    if (this.props.useDocker) {
      this.fs.copy(
        this.templatePath('Dockerfile'),
        this.destinationPath(`${createDirName}/Dockerfile`)
      )
      this.fs.copy(
        this.templatePath('dockerignore'),
        this.destinationPath(`${createDirName}/.dockerignore`)
      )
    }
  }

  // install () {
  //   this.installDependencies()
  // }
}
