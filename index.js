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

    // template
    this.option('html', {
      desc: 'enable html',
      default: true,
    })
    this.option('pug', {
      desc: 'enable pug/jade',
      default: false,
    })

    // style
    this.option('css', {
      desc: 'enable css',
      default: true,
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

  _write(sourceFile, targetFile) {
    var ext = path.extname(sourceFile)

    // if is template
    if (['.html', '.json'].indexOf(ext) !== -1) {
      var template = fs.readFileSync(sourceFile, { encoding: 'utf-8' })
      var content = tmpl(template, this.options)
      return fs.writeFileSync(targetFile, content)
    } {
      // copyFileSync
      var content = fs.readFileSync(sourceFile)
      return fs.writeFileSync(targetFile, content)
    }
  }

  _glob(relativePath) {
    var self = this

    // template path
    var realpath = this.templatePath(relativePath)

    fs.readdirSync(realpath).forEach(function(subpath) {
      var relativeSubPath = path.join(relativePath, subpath)
      var realSubPath = self.templatePath(relativeSubPath)
      var stat = fs.lstatSync(realSubPath)

      var realTargetPath = self.destinationPath(relativeSubPath)
      if (stat.isFile()) {
        var ext = path.extname(realSubPath).slice(1)

        if (self.options[ext] || relativePath !== 'pages') {
          self._write(realSubPath, realTargetPath)
        }
      } else if (stat.isDirectory()) {
        if (!fs.existsSync(realTargetPath)) {
          fs.mkdirSync(realTargetPath)
        }

        self._glob(relativeSubPath)
      }
    })
  }

  writing() {
    this._glob('.')

    var pkgs = []
    if (this.options.less) {
      pkgs.push('less-loader')
    }
    if (this.options.pug) {
      pkgs.push('pug-html-loader')
    }
    this.npmInstall(pkgs, { 'save-dev': true })
  }

}
