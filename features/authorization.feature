@login @authorization @CucumberScenario
Feature: Authorization::Login
    Scenario: Initial login to Github
        Given I login with "arthur.krivitsky@yandex.ru" login and "Developer2020" password to Github
        Then I wait until "Learn Git and GitHub without any code!" text will be displayed
        And I should see "123" in repositories section

        When I open "test-user-dev" repository
        Then I wait until "Initial commit" text will be displayed