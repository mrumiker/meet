Feature: Show/Hide Event Details

  Scenario: Events are collapsed by Default
    Given that the user has received a list of events,
    When the user has not selected an event,
    Then that event’s details are collapsed by default.

  Scenario: Click to Expand Event Details
    Given that the user has received a list of events,
    When the user selects an event,
    Then the event’s element expands to show its details.

  Scenario: Click to Collapse Event Details
    Given that the user has expanded an event element,
    When the user closes that event element,
    Then the event element collapses to hide its details.


