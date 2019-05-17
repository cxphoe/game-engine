module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                // debug: true,
                useBuiltIns: 'usage',
                // forceAllTransforms: true,
                targets: {
                    browsers: [
                        'ie >= 9',
                        'chrome >= 62',
                    ],
                },
            },
        ],
        [
            '@babel/preset-react',
        ],
    ],
    plugins: [
        // This plugin transforms static class properties as well as properties declared with the property initializer syntax
        [
            '@babel/plugin-proposal-class-properties',
        ],
        // for import()
        [
            '@babel/plugin-syntax-dynamic-import',
        ],
    ],
};
