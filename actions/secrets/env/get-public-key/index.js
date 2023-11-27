import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';

async function run() {
    const api = core.getInput('githubApi');
    const token = core.getInput('token');
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environmentName');
    console.log("Using URL: " + api + "/repositories/" + repo + "/environments/" + env + "/secrets/public-key");
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
        console.log("Response: " + JSON.stringify(response));
        console.log("Key: " + response.data.key)
        console.log("ID: " + response.data.key_id)
        core.setOutput("key", response.data.key);
        core.setOutput("keyId", response.data.key_id);
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();
