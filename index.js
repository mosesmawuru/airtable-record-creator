const {Toolkit} = require("actions-toolkit");
const Airtable = require("airtable");
const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE;

async function createEventObject(body) {
  let obj = {};
  let arr1 = body.split("```")[1];
  let arr2 = arr1.split("\r\n");
  arr2.shift();
  arr2.pop();

  let arr3 = arr2.map(a => a.split(":"));
  arr3.map(a => (obj[`${a[0].replace(" ", "_").toLowerCase()}`] = a[1].trim()));

  return arr3.map(a => (obj[`${a[0]}`] = a[1]));
}

async function createAirTableRecord(obj, url) {
  const Airtable = require("airtable");
  const base = new Airtable({apiKey: token}).base(baseId);
  const body = await createEventObject(obj);
  let id = "sample";

  base("All IRL Events").create(
    {
      Event: body.event_name,
      Location: body.location,
      Starts: "10/10/2019",
      "GitHub Issue": url,
      Status: ["Under Consideration"],
      Triage: "Under Consideration",
      "IRL Roadmap": "Coming Soon",
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    },
  );
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action;
  const issue = tools.context.payload.issue;

  tools.log.success(action);
  tools.log.success(issue);

  if (action !== "opened") {
    tools.exit.neutral("Just checking for recent issues");
  }

  try {
    createAirTableRecord(issue.body, issue.url);

    // tools.log.success(`Airtable record #${recordId} created`);
    tools.exit.success("Action is complete");
  } catch (err) {
    // Log the error message
    tools.log.error(`An error occurred while pinning the issue.`);
    tools.log.error(err);

    // The error might have more details
    if (err.errors) tools.log.error(err.errors);

    // Exit with a failing status
    tools.exit.failure();
  }

  tools.exit.success("We did it!");
});
