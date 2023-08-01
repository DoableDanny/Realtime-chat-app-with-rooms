# eslint-config-eda

Linting configuration for Enspiral Dev Academy (EDA) challenges and projects.

## Installation

`npm i -D eslint prettier eslint-config-eda`

### Peer dependencies

If your npm version is between earlier than 7, it will not install peer-dependencies automatically, instead it will print a warning when you install eslint-config-eda

You can see your npm version with the `-v` or `--version` flag. This is what it looks like with npm v8.4.1

```sh
$ npm -v
8.4.1
```

if your version is between 5.2-6.x, you can run the following to install the peer dependencies of eslint-config-eda

```sh
$ npx install-peerdeps --dev eslint-config-eda
install-peerdeps v3.0.3
Installing peerdeps for eslint-config-eda@latest.
npm install eslint-config-eda@0.3.5 eslint@^8.8.0 eslint-plugin-import@^2.25.4 eslint-plugin-jest@^26.0.0 eslint-plugin-node@^11.1.0 eslint-plugin-prettier@^4.0.0 eslint-plugin-promise@^6.0.0 eslint-plugin-react@^7.28.0 --save-dev
```

## Usage

Add `eda` to the `extends` section of your configuration file (you can omit the `eslint-config-` prefix). This is a minimal `.eslintrc.json` file (it goes in the root of your project):

```json
{
  "extends": "eda"
}
```

if your project includes react and JSX syntax, extend the react ruleset instead:

```json
{
  "extends": "eda/react"
}
```

## Easy fixing in VS Code

If you're using VS Code and want to fix linting and formatting errors painlessly install:

- the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

and add these lines to your `settings.json`

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},

"editor.defaultFormatter": "esbenp.prettier-vscode",
"[javascript]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Now everytime you explicitly save the file (autosaving doesn't count), ESLint will fix as many errors as it can.

Tip: if you have syntax errors in the file, you'll need to fix them before your linting errors can be fixed for you.

## Finding all errors in your project

> These instructions assume that your source files are in folders in your project root called "server" and "client". Adjust accordingly

1. Add `"lint": "eslint client server"` to the `scripts` section of your `package.json` file
2. Add `"format": "prettier -w client server"` to the `scripts` section of your `package.json` file
3. Add a `.eslintignore` file to the root of your project with these contents: `bundle.js` (and any other files/folders you want ESLint to ignore)

Now you simply run `npm run lint` to see all of the linting errors in your project.

Pro tip: Run `npm run lint -- --fix` to instruct ESLint to fix as many of the errors as it can, you can also run `npm run format` to correct the formatting of your source files.
