# airtable-record-creator
This action will create a record when issue is opened

## example usage
```
on: issues
name: Create Airtable Records
jobs:
  airtable-record-creator:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: airtable-record-creator
      uses: bdougie/airtable-record-creator@master
      env:
        AIRTABLE_KEY: ${{ secrets.AIRTABLE_KEY }}
        AIRTABLE_BASE: ${{ secrets.AIRTABLE_BASE }}
```
