module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 3,
    },
    "env": {
        "node": true,
    },
    "rules": {
        "max-len": ["error", {"code": 100}],
        "camelcase": "off", // Off for destructuring
        "async-await/space-after-async": 2,
        "async-await/space-after-await": 2,
        "no-var": "off", // ES3
        "no-unused-vars": "off" // functions aren't used.
    },
    "plugins": ["async-await"],
};
