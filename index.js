const { Toolkit } = require('actions-toolkit')
// const token = process.env.AIRTABLE_TOKEN

async function createEventObject(body) {
  let obj = {}
  let arr1 = body.split("```")[1]
  let arr2 = arr1.split("\r\n")
  arr2.shift()
  arr2.pop()

  let arr3 = arr2.map((a) => a.split(":"))
  arr3.map((a) => obj[`${a[0].replace(" ", "_").toLowerCase()}`] = a[1].trim())

  return arr3.map((a) => obj[`${a[0]}`] = a[1])
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action
  const issue = tools.context.payload.issue

  tools.log.success(action)
  tools.log.success(issue)

  if (action !== "opened") {
    tools.exit.neutral("Just checking for recent issues")
  }

  try {
    const issueUrl = issue.url
    const body = await createEventObject(issue.body)

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
