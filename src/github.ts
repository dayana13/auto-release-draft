
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as version from './version'
import * as markdown from './markdown'


export async function createReleaseDraft (versionTag:string, repoToken:string, changeLog:string):Promise<string>{

    const octokit= github.getOctokit(repoToken)

    const { owner, repo } = github.context.repo;

        const release = await octokit.rest.repos.createRelease({
            owner: owner,
            repo: repo,
            tag_name: versionTag,
            name: version.removePrefix(changeLog),
            body: markdown.toUnorderedList(changeLog),
            draft: true, 
            prerelease: version.isPrerelease(versionTag)
        });

        if (release.status != 201) {
            throw new Error(`Failed to create the release: ${release.status}`)
          }
        
          core.info(`Created release draft ${release.data.name}`)
        
          return release.data.html_url

}