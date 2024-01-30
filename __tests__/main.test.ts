/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import { run } from '../src/main'

// Mock the action's main function
//const runMock = jest.spyOn(main, 'run')

// Other utilities
//const timeRegex = /^\d{2}:\d{2}:\d{2}/

// Mock the GitHub Actions core library
//let debugMock: jest.SpyInstance
//let errorMock: jest.SpyInstance
//let getInputMock: jest.SpyInstance
//let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

describe('When running the action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    //debugMock = jest.spyOn(core, 'debug').mockImplementation()
    //errorMock = jest.spyOn(core, 'error').mockImplementation()
    //getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    //setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  //const fakeSetOuput=core.setOutput as jest.MockedFunction<typeof core.setOutput>
  test('it should set the release-url output parameter', async () => {
    await run()

    expect(setOutputMock).toHaveBeenCalledWith('release-url', expect.anything())
  })
})
