module.exports =
  target: node: true
  package:
    description: 'Runtime library for CaffeineScript'
    scripts:
      perf: "nn -s;mocha -u tdd perf"

  webpack:
    common: {}
    targets:
      index: {}
      v3: {}
