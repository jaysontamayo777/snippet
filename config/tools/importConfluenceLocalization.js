const cheerio = require('cheerio');
const _ = require('lodash');
const Confluence = require('confluence-api');
const jsonfile = require('jsonfile');

/* eslint-disable no-console */

// $ npm run const:localization -- --username USER --password PWD
const argv = require('minimist')(process.argv.slice(2));

const parserConfig = {
  langIndex: {
    'zh': 1,
    'en': 2
  },
  groupIdentifier: '#',
  confluence: {
    pageId: 145688325, 
    username: argv.username,
    password: argv.password,
    baseUrl: 'https://pm.axa-asia.com/wiki',
    version: 4 // Confluence major version, optional
  },
  outputDir: 'src/localization'
};

function parse(config, data, callback) {
  const $ = cheerio.load(data.body.value);
  const localeContainer = {};
  let group = '';

  _.keys(config.langIndex).forEach((configKey) => {
    const locale = localeContainer[configKey] = {};
    $('tr').each((i, el) => {
      const key = $($(el).find('td')[0]).text();
      const value = $($(el).find('td')[config.langIndex[configKey]]).text();

      if (key.length > 0) {
        if (key.indexOf(config.groupIdentifier) === 0) {
          group = key.toLowerCase().substring(1, key.length);
          locale[group] = {};
        } else {
          locale[group][key] = value;
        }
      }
    });
  });

  callback(null, localeContainer);
}

function getContent(config, callback) {
  const confluence = new Confluence(config.confluence);
  console.log('Retrieving data from localization confluence page..');
  confluence.getContentById(config.confluence.pageId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      console.log('Success retrieved data. Now parsing...');
      parse(config, data, callback);
    }
  });
}

function write(localeContainer, config, callback) {
  jsonfile.spaces = 2;
  _.keys(config.langIndex).forEach((configKey) => {
    const outFile = `${config.outputDir}/${configKey}.json`;
    console.log(`Exporting ${configKey}...`);
    jsonfile.writeFile(outFile, localeContainer[configKey], { spaces: 2 }, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, `Done export ${configKey}.json`);
      }
    });
  });
}

function constConfluence(config) {
  getContent(config, (parseErr, data) => {
    if (parseErr) {
      console.log(parseErr);
    } else {
      write(data, config, (writeErr, result) => {
        if (writeErr) {
          console.log(writeErr);
        } else {
          console.log(result);
        }
      });
    }
  });
}

function exec() {
  if (!argv.username || !argv.password ||
    _.isEmpty(argv.username) || _.isEmpty(argv.password)) {
    throw new Error('Username and password are required');
  }

  console.log('Getting username & password');
  parserConfig.confluence.username = argv.username;
  parserConfig.confluence.password = argv.password;
  constConfluence(parserConfig);
}

exec();
