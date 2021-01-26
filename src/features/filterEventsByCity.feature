Feature: Filter Events by City

  Scenario: When user hasn't searched for a city, show upcoming events from all cities.
    Given the user hasn’t searched for any city
    When the user opens the app
    Then the user should see a list of 32 upcoming events.

  Scenario: User should see a list of suggestions when they search for a city
    Given the main page is open,
    When the user starts typing in the city text box
    Then the user should see a list of suggested cities that match what they’ve typed.

  Scenario: User can select a city from the suggested list.
    Given the user was typing the name of a city in the city text box
    And the list of suggested cities was showing
    When the user selects a city from the list
    Then their city should be changed to that city
    And the user should receive a list of upcoming events in that city.