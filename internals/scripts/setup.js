#!/usr/bin/env node

// @see: https://github.com/react-boilerplate/react-boilerplate/blob/master/internals/scripts/setup.js

'use strict';

const rimraf = require('rimraf');
const exec = require('child_process').exec;
const fs = require('fs');

const { addCheckMark } = require('../helpers');

process.stdin.resume();
process.stdin.setEncoding('utf8');

let clearRepo = true;

function cleanRepo(callback) {
  fs.readFile('.git/config', 'utf8', (err, data) => {
    if (!err) {
      const isClonedRepo = typeof data === 'string'
        && (data.match(/url\s*=/g) || []).length === 1
        && /SwingDev\/react-ts-boilerplate\.git/.test(data);

      if (isClonedRepo) {
        process.stdout.write('\nDo you want to clear old repository? [Y/n] ');
        process.stdin.resume();
        process.stdin.on('data', (data) => {
          const val = data.toString().trim();
          if (val === 'y' || val === 'Y' || val === '') {
            process.stdout.write('Removing old repository');
            rimraf('.git/', handleError);
            addCheckMark(callback);
          } else {
            dontClearRepo('', callback);
          }
        });
      } else {
        dontClearRepo('\n', callback);
      }
    } else {
      callback();
    }
  });
}

function dontClearRepo(nl, callback) {
  clearRepo = false;
  process.stdout.write(nl + 'Leaving your repository untouched');
  addCheckMark(callback);
}

function deleteInternals(directory, callback) {
  process.stdout.write('\nDeleting internals');
  rimraf(directory, callback);
}

function initGit(callback) {
  exec('git init && git add -A && git commit -m "Initial commit"', (error) => {
    handleError(error);
    addCheckMark(callback);
  });
}

function handleError(error) {
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(1);
  }
}

function endProcess() {
  process.stdout.write('\nDone!');
  process.exit(0);
}

module.exports = (callback) => {
  cleanRepo(() => {
    deleteInternals('./internals', (error) => {
      handleError(error);

      addCheckMark();

      if (clearRepo) {
        process.stdout.write('\nInitialising new repository');
        initGit(() => {
          callback();
          endProcess();
        });
      } else {
        callback();
        endProcess();
      }
    });
  });
};
