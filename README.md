# generator staticapp

webpack template for static pages development based on [yeoman](http://yeoman.io/)

## Install

`yo` can generate this project `generator-staticapp`
```bash
npm install -g yo generator-staticapp
```

## Usage 

```bash
yo staticapp [options] <name>
```
The installer will automatically create subdirectory use the `name`

### options

```
  -h,   --help          # Print the generator's options and usage
        --skip-cache    # Do not remember prompt answers             Default: false
        --skip-install  # Do not automatically install dependencies  Default: false
        --html          # enable html                                Default: true
        --pug           # enable pug/jade                            Default: false
        --css           # enable css                                 Default: true
        --less          # enable Less                                Default: false
```

## Examples

```
$ yo staticapp myapp --pug --less
$ tree myapp
.
├── package-lock.json
├── package.json
├── pages
│   ├── about.html
│   ├── contact.pug
│   ├── css
│   │   ├── global.css
│   │   └── global.less
│   ├── imgs
│   │   └── webpack.png
│   ├── index.html
│   ├── js
│   │   └── time.js
│   └── layout.pug
└── webpack.config.js
```
