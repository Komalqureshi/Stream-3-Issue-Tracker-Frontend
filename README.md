### Unicorn Attractor

Unicorn attractor is a company started that speacializes in providing IT solutions to its customers.
These project is ment to help the company track and manage issues that arise from the user base.
Any bugs and feature requests are submitted to the site and the Administrators can asign persons to follow up with the issue.

### UX

User who first visit the site meet a plain login form and an option to create a new account.
Once they're logged in, theirs a dashboard that contains statistical information based on previous issues reported and generally the records created by the system.Theres an Issues page where all the recieved issues are displayed in tabular form. Then theirs a MyIssues page that presents the issues that the currently logged in user has submitted.
Issues assigned to the currently logged in user are displayed in Assigned to me page.To create an issue, a user should click on the new issues button.
Theres a number of transitions to make navigations through the site smooth

### Features

Create Issue - Allows the user to create issues by filling out a form. The input is presented as is and these is achieved by the use of a WYSIWYG editor.

Comment - Allows users to leave comments on issues. User can provide possible workarounds or explain how theyve experienced similar issues

Upvote - Users can upvote issues to indicated that they have experenced such or want to experience such.
The more upvotes an issue gets. The higher its priority

Attempted solution - When creating an issue a user can add information about he/she tried to solve the problem. These lets the assignees understand the issue more

### Features left to implement

Pay to upvote feature request  - To upgrade the system and ad requested features, funding is needed. For that to happen, users can upvote a feature and for every feature they upvote, they should pay an amount.

### Technologies used

Django has been used to create a backed with RESTful API to access the data and authenticate users
The frontend is built on react and a number of javascript libraries to create a good user experience

### Testing

### Deployment

The frontend and backend are hosted seperately using Heroku
Theres two seperate git repos for the project, one for the backend and one for the front
The frontend is build version of the React development version which is available in this repo.
The backend settings for deployment are imported from the django-heroku module

### Credits

All the content from the site was custom created with a few references to the google issue tracker

### Media

No media files have been used for the project

### Acknowledgments


