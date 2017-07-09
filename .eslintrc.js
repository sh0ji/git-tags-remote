module.exports = {
    extends: ['airbnb'],
    env: {
        node: true,
    },
    rules: {
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        indent: ['error', 4],
    },
};
