import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-empty-pattern': 'off',
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
