const { Toolkit } = require('actions-toolkit')

describe('Airtable Record Creator', () => {
  let action, tools

  // Mock Toolkit.run to define `action` so we can call it
  Toolkit.run = jest.fn((actionFn) => { action = actionFn })
  // Load up our entrypoint file
  require('.')

  beforeEach(() => {
    // Create a new Toolkit instance
    tools = new Toolkit()
    // Mock methods on it!
    tools.exit.success = jest.fn()
  })

  it('successfully fires when issue opened', () => {
    action(tools)
    expect(tools.exit.neutral).toHaveBeenCalledWith('"Just checking for recent issues')
  })

  it('exits successfully', () => {
    action(tools)
    expect(tools.exit.success).toHaveBeenCalled()
  })
})
