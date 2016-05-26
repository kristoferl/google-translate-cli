#!/usr/bin/env node --use_strict

const fs = require('fs');
const googleTranslate = require('google-translate');

function readConfig() {
  fs.readFile('config.json',  'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const config = JSON.parse(data);
    if(config.secret === 'INSERT YOUR OWN GOOGLE SECRET HERE') {
      throw new Error('You must put your Google secret in the config file');
    }
    translate(config);
  });
}

function translate(config) {
  const googleTranslateClient= googleTranslate(config.secret);
  const toTranslate = process.argv.slice(2).join(' ');
  if(toTranslate === '') {
    console.warn('<Nothing found to translate>');
  }
  googleTranslateClient.translate(toTranslate, config.from, config.to, (err, translation) => {
    if (err) {
      throw err;
    }
    console.log(translation.translatedText);
  });
}

readConfig();
