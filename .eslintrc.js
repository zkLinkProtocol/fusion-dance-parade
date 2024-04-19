module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'tailwindcss'],
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier', 'plugin:tailwindcss/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        //declaring 'next/core-web-vitals' and 'prettier' again in case
        //the two plugin:... configs above overrode any of their rules
        //Also, 'prettier' needs to be last in any extends array
        'next/core-web-vitals',
        'prettier',
      ],
      rules: {
        'tailwindcss/classnames-order': [
          'warn',
          {
            officialSorting: true,
          },
        ],
        'no-irregular-whitespace': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        'no-unsafe-optional-chaining': 'warn',
        '@typescript-eslint/require-await': 'warn',
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
        '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'off', // Ensure `import type` is used when it's necessary
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
      },
    },
  ],
}
