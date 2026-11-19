# Initial Excel database import guide

## Before import
- Keep an untouched backup of the original Excel workbook.
- Confirm the data owner has authorized the import and access.
- Never email or publicly share a workbook containing National IDs or phone numbers.
- Work in a private environment with restricted administrator access.

## Recommended workflow
1. Save a working copy of the Excel file as `.xlsx` or `.csv`.
2. Match its columns to `templates/initial_members_import.csv`.
3. Preserve existing registration numbers exactly where they are valid.
4. Load rows into a staging table, not directly into `members`.
5. Validate National ID (16 digits) and telephone (10 digits) formats.
6. Detect duplicates by National ID and, where appropriate, name plus telephone. Do not automatically merge uncertain matches.
7. Keep incomplete historical rows; mark them `legacy_record=true` and `needs_review=true`.
8. Preview accepted, rejected and duplicate rows.
9. Obtain approval, then commit in a transaction.
10. Set the next registration number to one greater than the highest valid imported registration number.

## Location values
Province: Kigali City
District: Gasabo
Sector: Remera
Cells: Rukiri I, Rukiri II, Nyabisindu, Nyarutarama

Village names must be loaded from the approved official list for each cell. Do not guess or automatically assign a village.
