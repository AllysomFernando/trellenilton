# Feature: Create Board

Scenario: User tries to create an unsupportable board
When: The board has less than 3 characters
Must: Alert the user that they cannot create a new board with less than 3 characters

Scenario: User tries to create a valid board
When: The board's name has at least 3 characters
Must: Display a success message

Scenario: User tries to create a valid board but the backend doesn't respond
When: The board's name has at least 3 characters
And: The backend is out of service
Must: Alert the user that we are having problems

# Feature: Display Boards

Scenario: User tries to visualize the board and he hasn't any board created yet.
When: Not has a board created yet.
Must: Show a message to the user alerting that the board wasn't created.
Then: Display a button to the user to create the board.

Scenario: User tries to visualize a board created but isn't showing to the user.
When: Backend is out of service.
Must: Alert the user that we are having problems.
Then: Display a loading component until the connection to the backend is established.

Scenario: User doesn't have a stablished connection and tries to see a board.
When: User doesn't have Ethernet.
Must: Display a loading component that we are trying to connect to the server.
Then: When the connection is back, refresh the page.


# Feature: Rename Board

Scenario: User tries to rename to an unsupportable board's name.
When: User tries to rename a board but the new name has less than 3 characters.
Must: Alert the user that we don't support a name less than 3 characters.

Scenario: User tries to rename a board but doesn't have a stablished connection.
When: User tries to rename a board but has lost the connection with the Ethernet when he tried to send the request.
Must: Display a loading component alerting him that he lost the connection, and the request was not sent.


# Feature: Archive Board

Scenario: User tries to archive a valid board but the backend doesn't respond
When: The board's name has at least 3 characters
And: The backend is out of service
Must: Alert the user that we are having problems


# Feature: Create profile

Scenario: User tries to create an unsupportable profile
When: The profile has less than 4 characters
Must: Alert the user that they cannot create a new profile with less than 4 characters

Scenario: User tries to create a supportable profile
When: The profile has at least 4 characters
Must: Display a success message

Scenario: User tries to create a supportable profile but the backend doesn't respond
When: The profile has at least 4 characters
And: The backend is out of service
Must: Alert the user that we are having problems


# Feature: Display profiles

Scenario: Display profiles inside a board
When: User access a board
Must: Displays all profile icons

# Feature: Archive Profile

Scenario: User tries to archive a profile
When: The user clicks on the button "Archive" in the profile configurations
Must: Change the value to stop showing that profile

Scenario: User tries to archive a profile
When: The user clicks on the button "Archive" in the profile configurations
And: The Backend is out of service
Must: Alert the user that we are having problems


# Feature: Change profile icon

Scenario: User tries to modify the icon
When: User clicks on a profile icon
Must: Display the available icons for the user to choose
When: User chooses an available icon
Then: Display a success alert
Then: Refetch the data


# Feature: Change profile name

Scenario: User tries to modify the profile name with less than 4 characters
When: The profile has less than 4 characters
Must: Alert the user that they cannot modify the profile with less than 4 characters


# Feature: Display profile icons

Scenario: The user's profile icon is not loaded.
When: The backend does not return the icon saved in our database.
Must: Display a loading component.
If then: Return null, display the default icon.
Else then: Display the user's profile icons saved.


# Feature: Create Column

Scenario: User tries to create a new column.
When: User clicks to add a new column.
Must: Display the create column modal.

Scenario: User tries to create a new column but the backend is out of service.
When: User clicks to add a new column.
Must: Display the create column modal.
And: The Backend is out of service.
Must: Alert the user that we are having problems.

Scenario: User tries to create a new column with the same name as another column.
When: User tries to create a new column with the same name as another column.
Must: Display an alert with the respective issue.


# Feature: Display columns

Scenario: User tries to visualize the columns but lost the connection.
When: User tries to visualize the columns but loses the connection with the Ethernet.
Must: Display a loading component alerting that we are trying to reconnect to our backend service.
If then: The connection is back, refresh the page and close the loading component, then display a new component alerting the user that we restored the connection to the backend service.
Else then: Display an error component, telling the user that we lost the connection with the Ethernet. Wait a moment and try again later.


# Feature: Change column ordering

Scenario: User tries to change the column ordering.
When: User clicks the respective arrows indicating the direction in which they want to move the column.
Must: Change the ordering of the columns according to the user's choice.

Scenario: User only has one column.
Then: No arrows appear to click.


# Feature: Archive Column

Scenario: User tries to archive a Column
When: The user clicks on the "Archive" button for the Column
And: The column is empty
Must: Change the value to stop showing that Column

Scenario: User tries to archive a Column
When: The user clicks on the "Archive" button for the Column
And: The column has cards in it
Must: Alert the user to clear the column before archiving it


# Feature: Rename Column

Scenario: The user tries to rename a column
When: He clicks above the name of the column
Must: Change the text to a text box with the current name, allowing the user to edit and press enter to save it

Scenario: The user tries to rename a column with a name that already exists on the board
When: He clicks above the name of the column
Must: Alert the user that they can't use that name because it already exists


# Feature: Create card

Scenario: The user tries to create a new card
When: He clicks on the add card button
And: He enters a valid card name
Must: Create a new card
Then: Refresh card data

Scenario: The user tries to create a new card with a name that already exists on the board
When: He clicks on the add card button
And: Enters a duplicate name for the card
Must: Display an "already exists" error


# Feature: Display cards

Scenario: Display cards inside a board within a column
When: User accesses a board
Must: Display the cards

Scenario: Display cards when losing the connection
When: User accesses a board
Must: Alert the user that we are having a problem with the database


# Feature: Rename Card

Scenario: The user tries to rename a card
When: He clicks above the name of the card
Must: Change the text to a text box with the actual name on it, allowing the user to edit and press enter to save it

# Feature: Archive Card

Scenario: User tries to archive a card
When: The user clicks on the button "Archive" on the card
Must: Change the value to stop showing that card

Scenario: User tries to archive a card
When: The user clicks on the button "Archive" on the card
And: The Backend is out of service
Must: Alert the user that we are having problems


# Feature: Insert card's description

Scenario: The user tries to add a description to the card
When: He clicks on the description text box
Must: Allow the user to insert a description in the card, pressing enter to save it


# Feature: Display card's information

Scenario: User try to visualize the card's information and he hasn't any card's created yet.
When: Not has a card created yet.
Must: Display the create component.
Then: Access card and insert the card's information.

Scenario: User try to visualize a card's information but isn't loading to the user.
When: Backend is out of service.
Must: Alert the user that we are having problems.
Then: Display a loading component until the connection to the backend is stablished.

Scenario: User's doesn't has a stablished connection and try to see the card's information.
When: User doesn't ethernet.
Must: Display a loading component that we are trying to connect to the server.
Then: When the connection is back refresh the page.

# Feature: Insert card's deadline

Scenario: User tries to add a new deadline to the card
When: He clicks on the button "New Deadline"
Then: User enters the date
If Then: The deadline is before the current date
Must: Display a message to the user saying he needs to set a later deadline
Else then: Display a success message
Then: Refresh the page to show the new changes
