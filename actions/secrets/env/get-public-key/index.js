import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';
import { debugJsonKeysAndValues, debug } from '../../../../func/log';


async function run() {
    const api = core.getInput('githubApi');
    const token = core.getInput('token');
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environmentName');
    try {
        const octokit = new Octokit({
            baseUrl: api,
            auth: token
          });
        const response = await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
            repository_id: repo,
            environment_name: env,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        if (core.isDebug()) {
            debug("Status: " + response.status);
            debug("URL: " + response.url);
            debugJsonKeysAndValues(response.headers);
        }
        core.setOutput("key", response.data.key);
        core.setOutput("keyId", response.data.key_id);
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();
