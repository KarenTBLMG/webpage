/* TensorBlack — Company page.
 *
 * The coverage filter is the only interaction on this page (design spec,
 * section 4). It responds to a click and nothing else: there is no
 * scroll-triggered behaviour anywhere on the site.
 *
 * Filtering DIMS the areas that do not match rather than removing them, so
 * the full breadth of coverage stays visible while the relevant set is
 * highlighted. Without this script every area simply renders undimmed, which
 * is the correct and complete state of the page.
 */
(function () {
  "use strict";

  var filters = document.getElementById("filters");
  var board = document.getElementById("board");
  var status = document.getElementById("board-status");
  if (!filters || !board || !status) return;

  var buttons = filters.querySelectorAll(".filter");
  var areas = board.querySelectorAll(".area");

  function labelFor(button) {
    return button.textContent.trim();
  }

  function apply(group, button) {
    var shown = 0;

    Array.prototype.forEach.call(areas, function (area) {
      var match = group === "all" || area.dataset.group === group;
      area.classList.toggle("is-dim", !match);
      if (match) shown++;
    });

    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute("aria-pressed", String(b === button));
    });

    // The board is a live region, so screen readers hear the change rather
    // than having to re-scan the grid to discover it.
    status.textContent = group === "all"
      ? "Showing all " + areas.length + " coverage areas."
      : "Highlighting " + shown + " of " + areas.length +
        " coverage areas: " + labelFor(button) + ".";
  }

  filters.addEventListener("click", function (e) {
    var button = e.target.closest(".filter");
    if (button) apply(button.dataset.filter, button);
  });

  // Announce the resting state without forcing a screen reader to hear it
  // on load: the text is set, the live region only speaks on later changes.
  status.textContent = "Showing all " + areas.length + " coverage areas.";
})();

/* Faculty roster filter.
 *
 * This one HIDES rather than dims, which is the opposite of the coverage
 * board and deliberate. The board argues breadth, so dimming keeps the whole
 * map visible. The roster is how a visitor reaches a particular person, so
 * narrowing it has to actually narrow it.
 *
 * The unfiltered order is curated by hand in the markup and is never sorted
 * here. See the comment above the roster in faculty.html.
 */
(function () {
  "use strict";

  var filters = document.getElementById("faculty-filters");
  var roster = document.getElementById("roster");
  var status = document.getElementById("roster-status");
  if (!filters || !roster || !status) return;

  var buttons = filters.querySelectorAll(".filter");
  var people = roster.querySelectorAll(".person");

  function apply(group, button) {
    var shown = 0;

    Array.prototype.forEach.call(people, function (person) {
      var match = group === "all" || person.dataset.group === group;
      person.classList.toggle("is-out", !match);
      if (match) shown++;
    });

    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute("aria-pressed", String(b === button));
    });

    status.textContent = group === "all"
      ? "Showing all " + people.length + " faculty."
      : "Showing " + shown + " of " + people.length + " faculty: " +
        button.textContent.trim() + ".";
  }

  filters.addEventListener("click", function (e) {
    var button = e.target.closest(".filter");
    if (button) apply(button.dataset.filter, button);
  });

  status.textContent = "Showing all " + people.length + " faculty.";
})();
