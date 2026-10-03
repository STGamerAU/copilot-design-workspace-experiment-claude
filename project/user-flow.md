# User Flow

Model A (linear stepped flow), per D7. Approved by the human designer. Updated to match the reviewed prototype build.

All content below is **placeholder / mocked**. Placeholder status is marked in documentation and code comments only, not visibly in the UI (D12).

## Time formats

Wherever a specific appointment window is shown, day, date and window appear together in one format:

`Thursday 14 November, 8am–12pm`

The exception is the "what happens next" sentence on Screens 3 and 4, which renders the window in words:

`between 12pm and 5pm on Friday 15 November`

On Screen 2, each window card sits under its day heading and shows only the window. The full format appears in the card's accessible name and in the "Selected:" summary.

## Mock data

Prototype "today" is fictional: Monday 11 November 2024.

**Current appointment**

- Thursday 14 November, 8am–12pm
- Site: 12 Harbour Street (fictional)

**Alternative windows (6 windows, 4 days)**

| Day | Windows |
| --- | --- |
| Wednesday 13 November | 12pm–5pm |
| Friday 15 November | 8am–12pm, 12pm–5pm |
| Monday 18 November | 12pm–5pm |
| Tuesday 19 November | 8am–12pm, 12pm–5pm |

The alternatives list does not change after a booking, so a just-booked window still appears in it on a second pass.

**Mocked contact details**

- Phone: 1800 975 707 (from the ACMA's reserved set of fictitious numbers for creative works)
- Email and mobile are mentioned in copy but not shown.

## Screen 1: Your appointment

- **Content:**
  - Heading "Your installation appointment".
  - The current appointment (day, date, window), labelled "Current".
  - The site address, labelled "Site".
- **Actions:**
  - "Change appointment" → Screen 2.
- After a completed change, "Done" on Screen 4 returns here and the new appointment is shown as "Current".

## Screen 2: Choose a new time

- **Content:**
  - A compact reminder of the current appointment, labelled "Current".
  - Windows grouped under day headings (in date order), each window a large single-choice card.
  - Once a window is chosen, a summary beside the buttons: "Selected: Friday 15 November, 12pm–5pm".
  - A footer section "None of these times suit?" showing the phone number (a tap-to-call link) and a "Request a call-back" button.
- **Actions:**
  - Select a window. "Continue" is disabled until one is chosen.
  - "Continue" → Screen 3.
  - "Back" → Screen 1.
  - "Request a call-back" → Screen 2b.
- A chosen window stays selected if the user leaves and returns to this screen (from Screen 3 or Screen 2b), until a change is confirmed.

## Screen 2b: Call-back requested (unhappy path a)

- **Content:**
  - Heading "Call-back requested".
  - "We'll call you within one business day." (placeholder timeframe)
  - "Your current appointment is unchanged."
  - The current appointment, labelled "Current".
  - The phone number (tap-to-call link).
- **Actions:**
  - "Back to your appointment" → Screen 1.
  - "Choose a different time" → Screen 2.
- No form.

## Screen 3: Review your change

- **Content:**
  - Two labelled blocks: "Current" (old window) and "New" (selected window).
  - Below them: "Your technician will arrive between [window in words] on [day date]. We'll send these details to your email and mobile." (D8 amendment)
- **Actions:**
  - "Confirm change" → Screen 4.
  - "Back" → Screen 2, selection kept (unhappy path b).
- Nothing changes until "Confirm change".

## Screen 4: Appointment changed

- **Content:**
  - Success heading "Your appointment has been changed".
  - Two labelled blocks: "Previous" and "Now booked".
  - "Your technician will arrive between [window in words] on [day date]. We've sent these details to your email and mobile." (D8). This sentence also serves as the mocked "confirmation sent" message (D5).
- **Actions:**
  - "Done" → Screen 1, showing the new appointment as "Current".
- No action on this screen to change the appointment again.

## Flow summary

```
1 Your appointment ──Change──▶ 2 Choose time ──Continue──▶ 3 Review ──Confirm──▶ 4 Changed
        ▲  ▲                    │   ▲  ▲                      │                      │
        │  └────────────────────│───│──│── Back (from 2) ─────│──────────────────────│
        │                       │   │  └──────── Back ────────┘  (selection kept)    │
        │                       │   └── "Choose a different time"                    │
        │                       └─Request call-back─▶ 2b Call-back requested         │
        │                                              │                              │
        └──── "Back to your appointment" (from 2b) ────┘                              │
        └──────────────────────────────── Done (new appointment shown as Current) ───┘
```
