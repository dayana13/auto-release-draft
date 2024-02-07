import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as github from './github'

export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')

    const tag = event.getCreatedTag()
    var releaseUrl = ''

    if (tag && version.isSemver(tag)) {
      const changelog = await git.getChangesIntroducedByTag(tag)
      releaseUrl = await github.createReleaseDraft(tag, token, changelog as string)
    }

    core.setOutput('release-url', releaseUrl)
  } catch (error) {
    core.setFailed(error as string)
  }
}

run()
