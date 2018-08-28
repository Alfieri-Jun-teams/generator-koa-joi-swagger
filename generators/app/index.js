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
  }

  // install () {
  //   this.installDependencies()
  // }
}
