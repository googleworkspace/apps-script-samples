module.exports = {
  extends: 'google',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    node: true,
    'googleappsscript/googleappsscript': true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 100 }],
    'camelcase': ['error', {
      'ignoreDestructuring': true,
      'ignoreImports': true,
      'allow': ['access_type', 'redirect_uris'],
    }],
    'guard-for-in': 'off',
    'no-var': 'off', // ES3
    'no-unused-vars': 'off' // functions aren't used.
  },
  plugins: [
     'googleappsscript'
  ]
}
