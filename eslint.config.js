// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'

export default [
  // Ignore built outputs
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', '.vite/**', '.turbo/**', '.next/**']
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (Flat config)
  ...tseslint.configs.recommended,

  // App source files
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    settings: {
      react: { version: 'detect' }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      // React 17+ (new JSX transform) doesn't require React in scope
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Good defaults
      'react/prop-types': 'off', // using TS instead
      'react/jsx-no-target-blank': 'warn',

      // Hooks rules (must-have)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript ergonomics
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ]
    }
  },

  // Disable rules that conflict with Prettier formatting
  prettier
]
