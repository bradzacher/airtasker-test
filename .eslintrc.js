const pseudoAllowedGlobals = ['name', 'status', 'location', 'open', 'close', 'event']
// the global list of restricted terms that airbnb uses
const restrictedGlobals = require('eslint-restricted-globals')
    // we remove some because of how the eslint TS parser interacts with eslint when using interfaces
    .filter(g => pseudoAllowedGlobals.indexOf(g) === -1)

module.exports = {
    'globals': { },
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'airbnb-base',
        'plugin:react/recommended'
    ],
    'parser': 'typescript-eslint-parser',
    'parserOptions': {
        'ecmaVersion': 6,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'typescript',
    ],
    'settings': {
        'import/resolver': 'webpack',
        'import/parsers': {
            'typescript-eslint-parser': [
                'ts',
                'tsx'
            ]
        }
    },
    'rules': {
        // when they enable configurability, we will enable this
        'typescript/type-annotation-spacing': 'off',
        'typescript/explicit-member-accessibility': 'error',
        'typescript/no-angle-bracket-type-assertion': 'error',

        'import/extensions': [
            'error',
            {
                'js': 'never',
                'ts': 'never',
                'json': 'always'
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': true,
                'peerDependencies': true,
                'optionalDependencies': true
            }
        ],
        'class-methods-use-this': [
            'off'
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'never'
            }
        ],
        'complexity': [
            'error',
            8
        ],
        'function-paren-newline': [
            'error',
            'consistent',
        ],
        // TODO - remove when fixed: https://github.com/eslint/typescript-eslint-parser/issues/344
        'indent-legacy': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'indent': 0,
        'linebreak-style': [
            'error',
            'unix'
        ],
        'max-depth': [
            'error',
            4
        ],
        'max-len': [
            'warn',
            {
                'code': 120,
                'tabWidth': 4,
                'ignoreComments': false,
                'ignoreUrls': true
            }
        ],
        'max-nested-callbacks': [
            'error',
            5
        ],
        'newline-before-return': [
            'error'
        ],
        'no-console': [
            'error',
            {
                'allow': [
                    'info',
                    'error',
                    'warn',
                    'time',
                    'timeEnd'
                ]
            }
        ],
        'no-extra-semi': [
            'error'
        ],
        'no-multi-spaces': [
            'warn',
            {
                'exceptions': {
                    'VariableDeclarator': true
                }
            }
        ],
        'no-param-reassign': 0,
        'no-plusplus': [
            'error',
            {
                'allowForLoopAfterthoughts': true
            }
        ],
        'no-prototype-builtins': [
            'off'
        ],
        'no-restricted-globals': [
            'error',
            'isFinite',
        ].concat(restrictedGlobals),
        'no-tabs': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unused-expressions': [
            'error',
            {
                'allowShortCircuit': true
            }
        ],
        'object-curly-newline': [
            'error',
            {
                'consistent': true
            },
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'spaced-comment': [
            'warn',
            'always',
            {
                'exceptions': [
                    '*'
                ]
            }
        ],

        // disabled because typescript linter will get them for us
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',

        // disabled because broken
        'space-infix-ops': 'off',

        // disabled because it doesn't work properly...
        'prefer-destructuring': 'off',
    }
}
