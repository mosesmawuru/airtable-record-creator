const { Toolkit } = require('actions-toolkit')
// const token = process.env.AIRTABLE_TOKEN

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action
  const issue = tools.context.payload.issue
  tools.log.success(issue)


  // if (action !== "opened") {
  //   tools.exit.neutral("Just checking for recent issues")
  // }

  try {
    // const results = await pinIssue(tools, issue.node_id, labeled)

    tools.log.success(`Issue #${issue.title} opened`)
    tools.exit.success("Action is complete")
  } catch (err) {
    // Log the error message
    tools.log.error(`An error occurred while pinning the issue.`)
    tools.log.error(err)

    // The error might have more details
    if (err.errors) tools.log.error(err.errors)

    // Exit with a failing status
    tools.exit.failure()
  }

  tools.exit.success('We did it!')
})
