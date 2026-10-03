# Human Design Decisions

Only decisions explicitly approved by the human designer are recorded here.

## D1. Prototype purpose

Test whether users can move their appointment confidently and correctly understand what changed (old time, new time, what happens next).

Comprehension and confidence are prioritised over speed.

### Hypotheses under test (not decisions or assumptions)

- The flow is linear (view → select → review → confirm → confirmed).
- Confidence comes mainly from confirmation clarity.

These are things the prototype is testing. Do not treat them as established.

## D2. Context of use

Mobile-first. The user arrives from an SMS or email link and is likely busy and between tasks.

## D3. Scope

One appointment at one site.

## D4. Unhappy paths in scope

- (a) None of the available times suit. The experience should offer a call-back request or a phone number.
- (b) Backing out at the review step.

Out of scope for now:

- slot taken during selection
- failed confirmation

## D5. Confirmation

- An on-screen confirmed state that clearly shows the old and new times.
- A mocked message stating that a confirmation email/SMS has been sent.

## D6. Accessibility

- Keyboard usable.
- Sufficient contrast.
- Sensible labels for screen readers.

## D7. Interaction model: Model A (linear stepped flow)

Four screens, one job each: Current appointment → Choose a new window → Review → Confirmed. "None of these times suit" branches off the window list.

Reason: D1 prioritises comprehension and confidence over speed; a dedicated review screen and one decision per screen suit that and give clean test observations.

Approved changes to Model A:

- Do not use strikethrough for the old time. Use explicit "Current" and "New" labels on the review step, and "Previous" and "Now booked" on the confirmed state. Reason: strikethrough is not reliably announced by screen readers and can read as "cancelled".
- Group windows under clear day headings. Reason: days are easier to compare.

## D8. "What happens next" wording (placeholder content, approved for the prototype)

"Your technician will arrive between [window] on [day date]. We've sent these details to your email and mobile."

Do not add anything about someone needing to be on site.

Reason: we have no supplied business rules on arrival or on-site requirements, so the wording stays minimal.

### Amendment to D8: wording on the Review screen

Because nothing has been sent before confirmation, the Review screen uses the future tense: "Your technician will arrive between [window] on [day date]. We'll send these details to your email and mobile."

The Confirmed screen uses the original D8 wording ("We've sent these details to your email and mobile.").

Reason: the Review screen must not claim something has already happened.

## D9. "None of these times suit" handling

Show the phone number plus a one-tap "Request a call-back" button, with no form. Tapping it shows a confirmation such as "We'll call you within one business day" (placeholder, to be labelled as such in the prototype) and clearly states the current appointment is unchanged.

Reason: satisfies D4(a) with the least effort for a busy mobile user, and keeps the prototype focused on the core flow.

## D10. Project requirements: contrast and touch targets

- Text and interactive elements meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text and component boundaries).
- Touch targets are at least 44×44 CSS pixels.

Reason: makes the D6 requirement for "sufficient contrast" testable, and suits a mobile-first context (D2).

## D11. "Keep this appointment" removed from Screen 1

Screen 1 has a single action, "Change appointment".

Reason: back-out behaviour is tested at the Review step (D4b), and the button led nowhere in the prototype.

## D12. Placeholder content marked in docs and code comments only

Placeholder content (including the call-back timeframe) is marked in documentation and code comments, not visibly in the UI.

Reason: visible placeholder labels would distract test participants.
