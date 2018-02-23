'use strict';
var Generator = require('yeoman-generator')
var path = require('path')
var fs = require('fs')
var tmpl = require('blueimp-tmpl')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.desc('create a webpack app for static pages development')

    this.argument('name', {
      description: 'The app name',
      required: true,
      type: String,
    })

    this.option('pug', {
      desc: 'enable pug/jade',
      default: false,
    })
    this.option('less', {
      desc: 'enable Less',
      default: false,
    })
  }

  destination() {
    // if appname inside current folder basename
    if (path.basename(this.destinationPath()) !== this.options.name) {
      if (!fs.existsSync(this.options.name)) {
        fs.mkdirSync(this.options.name)
      }
      this.destinationRoot(this.destinationPath(this.options.name))
    }
  }

  _write(filename, data) {
    var template = fs.readFileSync(this.templatePath(filename), { encoding: 'utf-8' })
    var content = tmpl(template, data)
    return fs.writeFileSync(this.destinationPath(filename), content)
  }

  writing() {
    this._write('package.json', {
      appname: this.options.name,
    })
  }

  installPug() {
    if (this.options.pug) {
      this.npmInstall(['pug-html-loader'], { 'save-dev': true });
    }
  }

  installLess() {
    if (this.options.less) {
      this.npmInstall(['less-loader'], { 'save-dev': true });
    }
  }

}
