## Front End
[x] Create basic HTML UI
    [x] Allows user to create a task
        [x] user input field
        [x] submit btn
            [x] client POST
    [x] Have Complete or Delete option
        [x] Complete: have visual representation so change css, strike-through text
            [x] client PUT
        [x] Delete task when clicked deleteBtn
            [x] client DELETE
    [x] client GET on load to always see list

## Back End
[x] setup server
[x] connect to database
[x] create route to /list
    [x] connect to server.js
[x] submit btn POST request
[x] GET request for render
[x] delete btn DELETE request
[x] complete btn PUT request to change complete status



## Database
[x] create template database with columns
[x] Store task in database `weekend-to-do-app`
[x] Update complete status in database
[x] Delete should remove from database



## STRETCH w/ git branching
[] `feature-styling-bootstrap`
    [] buttons
    [] input fields 
    [] responsive to difference screen sizes
[] `feature-confirm-delete`
    [] delete confirmation popup?
[] `feature-ordering-task-query`
    [] query params to have request reverse order of to do list
[] `feature-time-completed`
    [] add date input when complete btn click
    [] display user friendly date on front end