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
    octokit.request({
      method: 'POST',
      url: `https://api.github.com/repos/${argv.nwo}/dispatches`,
      headers,
      data: {
        event_type: argv['event-type'] || 'trigger-repository-dispatch'
      }
    });
  } catch (e) {
    logger.error(e);
  }
})();
