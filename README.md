# airtable-record-creator
This action will create a record when issue is opened

## example usage
```
workflow "create-airtable-record" {
  resolves = ["create airtable record"]
  on = "issues"
}

action "ccreate airtable recordr" {
  uses = "bdougie/airtable-record-creator@master"
  secrets = [
    "GITHUB_TOKEN",
    "AIRTABLE_TOKEN",
    "AIRTABLE_BASE",
  ]
}
```
