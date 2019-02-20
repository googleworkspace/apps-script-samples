module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
    },
    "env": {
        "node": true,
    },
    "rules": {
        "comma-dangle": ["error", "never"],
        "max-len": ["error", {"code": 100}],
        "camelcase": "off", // Off for destructuring
        "async-await/space-after-async": 2,
        "async-await/space-after-await": 2,
        "eqeqeq": 2,
        "guard-for-in": "off",
        "no-var": "off", // ES3
        "no-unused-vars": "off" // functions aren't used.
    },
    "plugins": ["async-await"]
};
