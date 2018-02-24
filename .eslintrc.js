module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "func-names": [0],
        "new-cap": [2, { newIsCap: true ,capIsNew: true, capIsNewExceptions: ['List', 'Map']}],
        "linebreak-style": [0],
        "brace-style": [2, "1tbs", { "allowSingleLine": false }],
        "camelcase": 2,
        "indent": [2, 4],
        "comma-spacing": [2, {
            "before": false,
            "after": true,
        }],
        "consistent-this": [1, "that"],
    },
}