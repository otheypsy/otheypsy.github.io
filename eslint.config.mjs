import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            globals: {
                ...globals.browser,
                ...globals.es6,
            },

            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'eslint-comments': eslintCommentsPlugin,
            'eslint-plugin': eslintPluginPlugin,
            import: importPlugin,
            jsdoc: jsdocPlugin,
            'jsx-a11y': jsxA11yPlugin.flatConfigs.recommended.plugins['jsx-a11y'],
            react: reactPlugin,
            'react-hooks': fixupPluginRules(reactHooksPlugin),
        },
    },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    jsdocPlugin.configs['flat/recommended-typescript-error'],
    prettierRecommended,
    {
        rules: {
            'react/prop-types': 0,
        },
    },
)
