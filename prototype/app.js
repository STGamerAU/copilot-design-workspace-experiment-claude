// Prototype: one screen at a time, rendered from in-memory state.
// No storage: reloading resets to Screen 1.
// All copy and data come from project/user-flow.md and project/decisions.md.
(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // MOCK DATA. Edit here. All of it is fictional placeholder content.
  // Prototype "today" is fictional: Monday 11 November 2024.
  // ---------------------------------------------------------------------
  var MOCK = {
    // PLACEHOLDER: fictional site address.
    site: '12 Harbour Street',
    // PLACEHOLDER: fictional number from ACMA's reserved set for creative works.
    phone: '1800 975 707',
    current: { day: 'Thursday 14 November', window: '8am–12pm' },
    // Day groups in date order. Each window has a unique id.
    alternatives: [
      { day: 'Wednesday 13 November', windows: ['12pm–5pm'] },
      { day: 'Friday 15 November', windows: ['8am–12pm', '12pm–5pm'] },
      { day: 'Monday 18 November', windows: ['12pm–5pm'] },
      { day: 'Tuesday 19 November', windows: ['8am–12pm', '12pm–5pm'] }
    ]
  };

  // PLACEHOLDER copy (business content is not real). See decisions D8, D9.
  var COPY = {
    // PLACEHOLDER: call-back timeframe is not a real business rule.
    callbackPromise: 'We’ll call you within one business day.'
  };

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------
  var state = {
    screen: 'appointment', // appointment | choose | callback | review | changed
    current: MOCK.current, // becomes the new booking after confirmation (and stays so after Done)
    previous: null,        // set on confirmation
    selected: null         // { day, window } or null
  };

  var app = document.getElementById('app');

  // Single format for any specific window: day, date and window together.
  function fmt(a) { return a.day + ', ' + a.window; }

  // Window wording for the "what happens next" sentence only:
  // "12pm\u20135pm" -> "12pm and 5pm".
  function windowInWords(w) { return w.replace('\u2013', ' and '); }

  // ---------------------------------------------------------------------
  // DOM helpers
  // ---------------------------------------------------------------------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'onclick') node.addEventListener('click', attrs[k]);
      else if (k === 'onchange') node.addEventListener('change', attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function heading(text) {
    // tabindex=-1 so focus can be moved here on each screen change.
    return el('h1', { id: 'screen-heading', tabindex: '-1', text: text });
  }

  // A labelled appointment block: <dl><dt>label</dt><dd>time</dd></dl>
  function block(label, appt, extraClass) {
    return el('div', { 'class': 'block ' + (extraClass || '') }, [
      el('dl', {}, [
        el('dt', { text: label }),
        el('dd', { text: fmt(appt) })
      ])
    ]);
  }

  function button(text, onclick, secondary) {
    return el('button', {
      type: 'button',
      'class': 'btn' + (secondary ? ' secondary' : ''),
      onclick: onclick,
      text: text
    });
  }

  function go(screen) {
    state.screen = screen;
    render(true);
  }

  // ---------------------------------------------------------------------
  // Screens
  // ---------------------------------------------------------------------
  function screenAppointment() {
    var h = 'Your installation appointment';
    var site = el('div', { 'class': 'block' }, [
      el('dl', {}, [el('dt', { text: 'Site' }), el('dd', { text: MOCK.site })])
    ]);
    return {
      title: h,
      nodes: [
        heading(h),
        block('Current', state.current),
        site,
        button('Change appointment', function () { go('choose'); })
      ]
    };
  }

  function screenChoose() {
    var h = 'Choose a new time';
    var nodes = [heading(h), block('Current', state.current, 'compact')];

    // One fieldset per day (legend = day heading). All radios share one
    // name, so the browser treats them as a single-choice group.
    MOCK.alternatives.forEach(function (group, gi) {
      var fs = el('fieldset', {}, [
        el('legend', {}, [el('h2', { text: group.day })])
      ]);
      group.windows.forEach(function (win, wi) {
        var id = 'win-' + gi + '-' + wi;
        var input = el('input', { type: 'radio', name: 'window', id: id });
        if (state.selected && state.selected.day === group.day && state.selected.window === win) {
          input.checked = true;
        }
        input.addEventListener('change', function () {
          state.selected = { day: group.day, window: win };
          updateBar();
        });
        // Accessible name = "Friday 15 November, 8am–12pm" (hidden day
        // prefix; the visible day heading sits above the card).
        var label = el('label', { 'class': 'option', 'for': id }, [
          input,
          el('span', { 'class': 'card' }, [
            el('span', { 'class': 'mark', 'aria-hidden': 'true' }),
            el('span', {}, [
              el('span', { 'class': 'visually-hidden', text: group.day + ', ' }),
              el('span', { text: win })
            ])
          ])
        ]);
        fs.appendChild(label);
      });
      nodes.push(fs);
    });

    nodes.push(el('section', { 'class': 'callback' }, [
      el('h2', { text: 'None of these times suit?' }),
      el('p', {}, [el('a', {
        'class': 'phone',
        href: 'tel:' + MOCK.phone.replace(/\s/g, ''),
        text: MOCK.phone
      })]),
      button('Request a call-back', function () { go('callback'); }, true)
    ]));

    // Sticky action bar
    var summary = el('p', { 'class': 'summary', id: 'summary', hidden: '' });
    var back = button('Back', function () { go('appointment'); }, true);
    var cont = button('Continue', function () { go('review'); });
    cont.id = 'continue';
    var bar = el('div', { 'class': 'bar', id: 'bar' }, [
      el('div', { 'class': 'bar-inner' }, [
        summary,
        el('div', { 'class': 'actions' }, [back, cont])
      ])
    ]);
    nodes.push(bar);

    return { title: h, nodes: nodes, hasBar: true };
  }

  // Updates the summary and Continue state without re-rendering, so focus
  // stays on the radio the user just chose.
  function updateBar() {
    var summary = document.getElementById('summary');
    var cont = document.getElementById('continue');
    if (!summary || !cont) return;
    if (state.selected) {
      summary.textContent = 'Selected: ' + fmt(state.selected);
      summary.hidden = false;
      cont.disabled = false;
    } else {
      summary.hidden = true;
      cont.disabled = true;
    }
  }

  function screenCallback() {
    var h = 'Call-back requested';
    return {
      title: h,
      nodes: [
        heading(h),
        el('p', { text: COPY.callbackPromise }),
        el('p', { text: 'Your current appointment is unchanged.' }),
        block('Current', state.current),
        el('p', {}, [el('a', {
          'class': 'phone',
          href: 'tel:' + MOCK.phone.replace(/\s/g, ''),
          text: MOCK.phone
        })]),
        button('Back to your appointment', function () { go('appointment'); }),
        button('Choose a different time', function () { go('choose'); }, true)
      ]
    };
  }

  function screenReview() {
    var h = 'Review your change';
    var sel = state.selected;
    return {
      title: h,
      nodes: [
        heading(h),
        block('Current', state.current),
        block('New', sel),
        el('p', {
          text: 'Your technician will arrive between ' + windowInWords(sel.window) + ' on ' + sel.day +
            '. We’ll send these details to your email and mobile.'
        }),
        button('Confirm change', function () {
          state.previous = state.current;
          state.current = { day: sel.day, window: sel.window };
          state.selected = null;
          go('changed');
        }),
        button('Back', function () { go('choose'); }, true)
      ]
    };
  }

  function screenChanged() {
    var h = 'Your appointment has been changed';
    var now = state.current;
    return {
      title: h,
      nodes: [
        heading(h),
        block('Previous', state.previous),
        block('Now booked', now, 'success'),
        // Doubles as the mocked "confirmation sent" message (D5, D8).
        el('p', {
          text: 'Your technician will arrive between ' + windowInWords(now.window) + ' on ' + now.day +
            '. We’ve sent these details to your email and mobile.'
        }),
        // "Done" returns to Screen 1, which shows the new booking as the
        // current appointment so the flow can start again.
        button('Done', function () {
          state.previous = null;
          state.selected = null;
          go('appointment');
        })
      ]
    };
  }

  var SCREENS = {
    appointment: screenAppointment,
    choose: screenChoose,
    callback: screenCallback,
    review: screenReview,
    changed: screenChanged
  };

  // ---------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------
  function render(moveFocus) {
    var s = SCREENS[state.screen]();
    app.textContent = '';
    s.nodes.forEach(function (n) { app.appendChild(n); });
    app.className = s.hasBar ? 'has-bar' : '';
    document.title = s.title;
    if (state.screen === 'choose') updateBar();
    window.scrollTo(0, 0);
    // Move focus to the new screen's heading so screen readers announce it.
    if (moveFocus) document.getElementById('screen-heading').focus();
  }

  render(false);
})();
