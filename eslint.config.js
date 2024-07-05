import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import parser from '@typescript-eslint/parser'

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      /* 指定如何解析语法 */
      parser: parser,
      globals: {
        ...globals.commonjs,
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    // recommended.plugins: ['prettier']
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // recommended.extends:['prettier']
      ...configPrettier.rules,
      // recommended.rules:
      ...pluginPrettier.configs.recommended.rules,
      //一些自己的自定义 rules
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      // eslint（https://eslint.bootcss.com/docs/rules/）
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符
    },
  },
]
