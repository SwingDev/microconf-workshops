const lodash = require('lodash');

const storeGenerator = require('../store');
const setupProject = require('../../scripts/setup');

const DEFAULTS = {
  title: 'New Project',
  description: 'Awesome project in TypeScript and React'
};

module.exports = {
  description: 'Basic informations of your project',
  prompts: [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    default: DEFAULTS.title
  }, {
    type: 'input',
    name: 'description',
    message: 'What is the description of your project?',
    default: DEFAULTS.description
  }, {
    type: 'input',
    name: 'name',
    message: 'What is the name of your project (usually name of project\'s directory)?',
    default: lodash.kebabCase(DEFAULTS.title)
  }, {
    type: 'confirm',
    name: 'docker',
    default: true,
    message: 'Do you want to add Docker config files?',
  },
    ...storeGenerator.prompts
  ],
  actions: (data) => {
    const actions = [{
      type: 'modify',
      path: '../package.json',
      pattern: /react\-ts\-boilerplate/g,
      template: '{{name}}'
    }, {
      type: 'modify',
      path: '../package.json',
      pattern: /"description":\s"(.*?)"/g,
      template: '"description": "{{description}}"'
    }, {
      type: 'add',
      path: '../README.md',
      templateFile: './generators/setup/README.md.hbs',
      force: true
    }];

    if (data.docker) {
      actions.push({
        type: 'add',
        path: '../Dockerfile',
        templateFile: './generators/setup/Dockerfile.hbs',
      }, {
        type: 'add',
        path: '../docker-compose.template.yml',
        templateFile: './generators/setup/docker-compose.template.yml.hbs',
      });
    }

    if (storeGenerator.actions) {
      actions.push(...storeGenerator.actions(data));
    }

    actions.push((() => {
      return new Promise((resolve) => {
        setupProject(() => resolve('Setup project'));
      });
    }));

    return actions;
  }
}
