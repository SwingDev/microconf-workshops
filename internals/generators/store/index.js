const exec = require('child_process').exec;

const { addCheckMark } = require('../../helpers');

const DEPENDENCIES = [
  'redux',
  'react-redux',
  'typescript-fsa',
  'typescript-fsa-reducers'
];

const DEV_DEPENDECIES = [
  '@types/react-redux',
  '@types/redux-logger',
  'redux-logger'
];

const installDeps = (devDeps, onSuccess) => {
  const deps = (devDeps) ? DEV_DEPENDECIES : DEPENDENCIES;

  exec(`yarn add ${deps.join(' ')}${(devDeps) ? ' -D' : ''}`, (error, result) => {
    if (error) {
      throw error;
    }

    addCheckMark();

    process.stdout.write('\n');
    process.stdout.write(result);

    if (onSuccess) {
      onSuccess(result);
    }
  });
};

const reduxActions = [{
  type: 'add',
  path: '../src/store/index.ts',
  templateFile: './generators/store/store.ts.hbs'
}, {
  type: 'add',
  path: '../src/store/reducers.ts',
  templateFile: './generators/store/reducers.ts.hbs'
}, {
  type: 'add',
  path: '../src/store/users/reducer.ts',
  templateFile: './generators/store/users.reducer.ts.hbs'
}, {
  type: 'add',
  path: '../src/store/users/actions.ts',
  templateFile: './generators/store/users.actions.ts.hbs'
}, {
  type: 'add',
  path: '../src/index.tsx',
  templateFile: './generators/store/root.tsx.hbs',
  force: true
}, () => {
  process.stdout.write('\nInstalling Redux dependencies');

  return new Promise((resolve, reject) => {
    installDeps(true, () => {
      installDeps(false, () => {
        resolve('Installed Redux dependecies')
      });
    });
  });
}];

module.exports = {
  description: 'State management',
  prompts: [{
    type: 'list',
    name: 'library',
    message: 'Select state management library',
    default: 'Redux',
    choices: () => ['Redux', 'Other'],
  }],
  actions: (data) => {
    const actions = [];

    switch (data.library) {
      case 'Redux':
        actions.push(...reduxActions);
        break;

      default:
        break;
    }

    return actions;
  }
};
