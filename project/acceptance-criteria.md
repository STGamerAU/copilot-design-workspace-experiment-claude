# Acceptance Criteria

Follows the approved interaction model (D7) and user flow. Each criterion can be checked as pass or fail.

Time format referred to below: `Thursday 14 November, 8am–12pm` (day, date, window).

## Screen 1: Your appointment

1. The current appointment's day, date and window are visible without scrolling on a 375px-wide viewport.
2. The appointment is labelled "Current".
3. "Change appointment" leads to Screen 2.
4. No "keep" or cancel action is offered.

## Screen 2: Choose a new time

5. The current appointment is shown as a compact reminder with the "Current" label.
6. Windows appear under day headings, one heading per day, in date order.
7. Each window is a single-choice option. Only one can be selected at a time.
8. The selected window is distinguished by something other than colour alone (for example a check mark or a border plus label).
9. "Continue" is disabled until a window is selected, and enabled after.
10. "Continue" leads to Screen 3 with the chosen window.
11. "None of these times suit?" is visible at the end of the list, with the phone number and a "Request a call-back" button.
12. "Back" leads to Screen 1.

## Screen 2b: Call-back requested

13. Activating "Request a call-back" shows the confirmation message with no form.
14. No visible label marks the call-back message as placeholder. Placeholder status appears only in documentation and code comments.
15. The screen states that the current appointment is unchanged and shows it.
16. The user can return to Screen 1 or Screen 2.

## Screen 3: Review

17. The current window is labelled "Current" and the selected window is labelled "New".
18. Strikethrough is not used anywhere in the prototype.
19. The "what happens next" text uses the future tense ("We'll send…") and names the new window and date.
20. "Confirm change" is the primary action and "Back" is also available.
21. "Back" returns to Screen 2 with the previously selected window still selected.
22. The appointment is not changed unless "Confirm change" is activated.

## Screen 4: Confirmed

23. The success heading is shown.
24. The old window is labelled "Previous" and the new one "Now booked".
25. The text matches D8 (past tense, "We've sent…"), with the window and date filled in correctly.
26. A mocked message states that a confirmation has been sent by email and mobile.
27. No action to change the appointment again is offered.

## Consistency

28. The selected window appears in the same format on Screens 2, 3 and 4. On Screen 2 this applies to the selected-window summary beside "Continue".
29. Wherever a specific window is shown, day, date and window appear together, including the current appointment on every screen and each card's accessible name on Screen 2.
30. The current appointment is the same on every screen until Screen 4.

## Accessibility (D6, D10)

31. Every interactive element is reachable and operable by keyboard alone, in a logical order.
32. Focus is always visible.
33. Text and interactive elements meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text and component boundaries).
34. Window options are exposed to screen readers as a labelled group, and each option's accessible name includes day, date and window.
35. The selected state is announced by a screen reader.
36. "Current", "New", "Previous" and "Now booked" are present as text, not only visually.
37. When a new screen or the call-back result appears, focus moves to its heading, so a screen reader announces the change.
38. Touch targets are at least 44×44 CSS pixels.
