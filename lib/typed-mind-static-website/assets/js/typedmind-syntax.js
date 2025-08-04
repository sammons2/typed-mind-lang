/**
 * Prism.js syntax highlighting for TypedMind DSL
 */
(function() {
    if (typeof Prism === 'undefined') {
        console.warn('Prism.js not loaded, TypedMind syntax highlighting unavailable');
        return;
    }

    Prism.languages.typedmind = {
        'comment': {
            pattern: /#.*/,
            greedy: true
        },
        'string': {
            pattern: /"(?:[^"\\]|\\.)*"/,
            greedy: true
        },
        // Program entity
        'program': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*->)/m,
            alias: 'class-name'
        },
        // File entity with path
        'file': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*@)/m,
            alias: 'class-name'
        },
        // Function entity
        'function-entity': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*::)/m,
            alias: 'function'
        },
        // Class entity
        'class-entity': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*<:)/m,
            alias: 'class-name'
        },
        // DTO entity
        'dto': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*%)/m,
            alias: 'type'
        },
        // Asset entity
        'asset': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*~(?!>))/m,
            alias: 'constant'
        },
        // UIComponent entity
        'uicomponent': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*&!?)/m,
            alias: 'tag'
        },
        // RunParameter entity
        'runparameter': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*\$(?:env|iam|runtime|config))/m,
            alias: 'variable'
        },
        // Dependency entity
        'dependency': {
            pattern: /^[@A-Za-z][A-Za-z0-9_/@-]*(?=\s*\^)/m,
            alias: 'module'
        },
        // Constants entity
        'constants': {
            pattern: /^[A-Za-z][A-Za-z0-9_]*(?=\s*!)/m,
            alias: 'constant'
        },
        // Operators
        'operator': {
            pattern: /->|<-|@|::|<:|%|~>|<|>|&!?|\$(?:env|iam|runtime|config)|\^|!|=>/
        },
        // Keywords for longform syntax
        'keyword': {
            pattern: /\b(program|file|function|class|dto|asset|uicomponent|runparameter|dependency|constants|path|signature|description|extends|methods|fields|imports|exports|calls|affects|contains|containedBy|consumes|input|output|entryPoint|version|type|name|required|optional)\b/
        },
        // Version numbers
        'version': {
            pattern: /v\d+\.\d+\.\d+/,
            alias: 'number'
        },
        // Square bracket lists
        'list': {
            pattern: /\[[^\]]*\]/,
            inside: {
                'punctuation': /[\[\],]/,
                'identifier': /[A-Za-z][A-Za-z0-9_]*/
            }
        },
        // Field definitions
        'field': {
            pattern: /^\s*-\s*[A-Za-z][A-Za-z0-9_]*\??:\s*[A-Za-z][A-Za-z0-9_\[\]]*/m,
            inside: {
                'punctuation': /[-:?]/,
                'property': /^[^:]+/,
                'type': /[^:]+$/
            }
        },
        // Type signatures
        'signature': {
            pattern: /\([^)]*\)\s*=>\s*[A-Za-z][A-Za-z0-9_<>\[\]]*/,
            inside: {
                'punctuation': /[()=>]/,
                'type': /[A-Za-z][A-Za-z0-9_<>\[\]]*/
            }
        },
        // Longform blocks
        'block': {
            pattern: /\{[^}]*\}/,
            inside: {
                'punctuation': /[{}:,]/,
                'property': /[A-Za-z][A-Za-z0-9_]*/,
                'string': /"(?:[^"\\]|\\.)*"/,
                'keyword': /\b(type|description|name|signature|path|version|extends|methods|fields)\b/
            }
        }
    };

    // Register alias
    Prism.languages.tmd = Prism.languages.typedmind;
})();