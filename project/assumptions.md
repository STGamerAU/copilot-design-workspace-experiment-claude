# Assumptions and Open Questions

Assumptions are for the prototype only. They are **not** validated business rules.

## Assumptions

- **A1 (assumption):** Appointments are offered as arrival windows (e.g. 8am to 12pm, 12pm to 5pm), not exact times.
- **A2 (assumption):** Rescheduling is free, takes effect immediately, and has no notice cutoff or limit on changes.
- **A3 (assumption):** A list of alternative windows is available from mock data.
- **A4 (assumption, note only):** The person rescheduling may not be the on-site contact. Not designed for yet.
- **A5 (assumption):** The reason for rescheduling is unknown and is not captured.

## Open questions

- What does the user need to know before committing (install window, technician arrival window, whether someone must be on site, what happens to the current slot)?
- What does the user need in order to carry the confirmation with them (email/SMS only, calendar entry)?
- How many alternatives are shown, and how far into the future?
- Is there any brand, design system or platform constraint?
- Who will test the prototype, and how?
- How should an appointment that is too close to change be handled? (Currently out of scope under A2.)
