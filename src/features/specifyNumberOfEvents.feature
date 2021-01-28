Feature: Specify Number of Events to Display

  Scenario: 32 Events are displayed by default
    Given that the user has not specified a preferred number of events,
    When the user receives a list of events,
    Then thirty two events will be listed by default.


  Scenario: The user may specify the number of events to display
    Given that the user has specified a preferred number of events,
    When the user receives a list of events,
    Then that number of events will be listed.
