#!/usr/bin/env node

const Octokit = require('@octokit/rest');
const argv = require('minimist')(process.argv.slice(2));
const logger = require('./lib/logger');

const mediaType = 'application/vnd.github.everest-preview+json';
const headers = { accept: mediaType };

(async () => {
  try {
    // We need a nwo parameter...
    if (!argv.nwo) {
      throw new Error('Required: name with owner (--nwo) parameter');
    }

    // Construct client
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // Send a repository dispatch event
    const { status } = await octokit.request({
      method: 'POST',
      url: `https://api.github.com/repos/${argv.nwo}/dispatches`,
      headers,
      data: {
        event_type: argv['event-type'] || 'trigger-repository-dispatch'
      }
    });

    // Check for success
    if (status === 204) {
      console.log('🚀');
    } else {
      throw new Error('Sorry, something was wrong with that request, are you sure that repo exists?');
    }
  } catch (e) {
    logger.error(e);
  }
})();
