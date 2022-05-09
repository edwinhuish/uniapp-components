const files = require.context('.', true, /\.vue$/)

files.keys().forEach(filename => {
  const module = files(filename).default

  if (module.name) {
    exports[module.name] = module
  }
})
