const {Toolkit} = require("actions-toolkit");
const Airtable = require("airtable");
const token = process.env.AIRTABLE_KEY;
const baseId = process.env.AIRTABLE_BASE;

async function createEventObject(body) {
  let obj = {};
  let arr1 = body.split("```")[1];
  let arr2 = arr1.split("\r\n");
  arr2.shift();
  arr2.pop();

  let arr3 = arr2.map(a => a.split(":"));
  arr3.map(a => (obj[`${a[0].replace(" ", "_").toLowerCase()}`] = a[1].trim()));

  return obj;
}

function createAirTableRecord(body, url) {
  const base = new Airtable({apiKey: token}).base("app9Mu6FlRuFmRWC1");

  return base("All IRL Events").create(
    {
      Event: body.event_name,
      Location: body.location,
      Starts: "10/10/2019",
      "GitHub Issue": url,
      Status: ["Approved"],
      "Event Type": ["Meetup"],
      Triage: "Under Consideration",
      "IRL Roadmap": "Coming Soon",
    }
  );
}

// Run your GitHub Action!
Toolkit.run(async tools => {
  const action = tools.context.payload.action;
  const issue = tools.context.payload.issue;
  const body = await createEventObject(issue.body);

  tools.log.success(action);

  if (action !== "opened") {
    tools.exit.neutral("Just checking for recent issues");
  }

  try {
    tools.log.success(body);
    tools.log.success(issue.url);

    const record = await createAirTableRecord(body, issue.url);

    // tools.log.success(`Airtable record #${recordId} created`);
    tools.log.success(record);
    tools.exit.success("Action is complete");
  } catch (err) {
    // Log the error message
    tools.log.error(`An error occurred while creatiring record.`);
    tools.log.error(err);

    // The error might have more details
    if (err.errors) tools.log.error(err.errors);

    // Exit with a failing status
    tools.exit.failure();
  }

  tools.exit.success("We did it!");
});
