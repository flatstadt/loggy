[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![flatstadt](https://img.shields.io/badge/@-flatstadt-383636?style=flat-square&labelColor=8f68d4)](https://github.com/flatstadt/)


> Loggy, better than a simple console

Let's be honest. There are more wraps of the console than pieces of hay in a haystack. Loggy offers a simpler way to use the console. It allows logging inside groups, which comes in handy to filter through your browser console when you mess up Angular detection change. Loggy also lets you log methods and properties by simply adding a decorator. And all this, while maintaining the file name and line.

## Features

- ✅ Log by group
- ✅ Stylish log levels
- ✅ Log methods
- ✅ Log properties 

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)


## Installation

### NPM

`npm install @lapita/loggy --save`

### Yarn

`yarn add @lapita/loggy`

## Usage

Start using Loggy couldn't be simpler. You need to create a file, preferably inside your src folder. Inside this file, you need to set the log level first, and then create an instance of Loggy by calling `createLoggy`.

This creation method requires a single object which contains the list of groups you want for your project. Some examples are _login_, _authorization_, and so on. These groups will make easier to filter your browser Console when you need to look for specific information associated with a component.

```ts
import { createLoggy, setLogLevel } from '@lapita/loggy';

import { environment } from './environments/environment';

// Set the log level
setLogLevel(environment.logLevel);

// Instance loggy
export const {debug, log, info, warn, error} = createLoggy(
  {
    global: 'global stuff', 
    auth: 'authorization', 
    dashboard: 'dashboard'
  }
);

```

Loggy wraps five log levels. From lower to higher level, you'll find debug, log, info, warn, and error. There can be easily accessed by destructuring the return object. And you're ready to start using Loggy.

```ts
log.global('It preserves the line numbers', {obj: 'test'});
log.auth('auth failed');
log.dashboard('dashboard init');
```

Your IDE will suggest the available groups as soon as you type `log.`.

Logging a property can be done by adding a `@LoggyProperty`. You need to pass in a function pointing to the log and group you want to use. This way, you'll be preserving the line and file where the property lays.

```ts
@LoggyProperty((t) => log.global(t), {logValue: true, accessType: 'set'})
title = 'Loggy! Open the console.';
```
This decorator admits the following options, which are self-explanatory.
```ts
{
  logCalls: boolean;
  logValue: boolean;
  accessType: 'get' | 'set' | 'get/set';
  enable: boolean;
}

```
Logging a method can be done by adding a `@LoggyMethod`. You need to pass in a function pointing to the log and group you want to use as well.

```ts
@LoggyMethod((t) => log.global(t))
testMethod() {
  for (let index = 0; index < 1000000; index++) {
      const text = String(index);
      const number = +text;
  }
}
```
This decorator admits the following options, which, again, are pretty self-explanatory.
```ts
{
  logTime: true,
  logCalls: false,
  logContext: false,
  enable: true,
}
```
Addionally, it is possible to customize the log level colors as well as the separator between the group name and the actually log text. You need to pass in another argument while creating a new instace of Loggy.

```ts
{
  separator: '#',
  debug: 'background: white; color: black;',
  log: 'background: purple; color: white;',
  info: 'background: blue; color: white;',
  warn: 'background: orange; color: black;',
  error: 'background: red; color: white;',
};
```
