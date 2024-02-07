import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token= core.getInput('repo-token')
    const tag=event.getCreatedTag()
    if (tag && version.isSemver(tag)){
       const changelog=await git.getChangesIntroducedByTag(tag)
    }
    core.setOutput('release-url', 'https://example.com')
  } catch (error) {
      core.setFailed(error as string)
  }
}

run()
