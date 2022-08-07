# Ivory Employee Dashboard

# 📖 Overview
Ivory is a personal employee dashboard that consolidates multiple useful applications in a single place and provides additional functionalities that makes a complete and cohesive user experience.

# 🛠️ How it was built
Ivory was built entirely on AWS. The frontend was built using React and deployed using AWS Amplify. The backend adopts a microservice architecture using multiple AWS services that are loosely coupled. It also makes use of various external APIs such as JIRA, Azure's Graph API & Zoom. The application was built around a severless architecture making use of a number of Lambda functions.

## Application Architecture:
![](/images/ivory-architecture.png)

# 🏷️ Features
The application has 7 main features organized into multiple pages in the dashboard.

## Work
Users can view all their unread emails and upcoming meetings & events in the **work** page of the dashboard.
![](/images/work.png)

## Personal
Users can keep track of their personal items in the **personal** page of the dashboard. Users can create their own todos and complete them. They can also view all the JIRA tickets assigned to them and pending E-Tasks that still are incomplete.
![](/images/personal.png)

## Notes
Users can also take notes in the dashboard. They can also assign the notes to a particular meeting to be better organized.
![](/images/notes.png)

## Work from Home/Office
Users can also specify whether they are working from home or office. Depending on their selection, all their meetings for the day will be converted accordingly. For example, if meetings are set to be in person in a particular office location, toggling the button to work from home will automatically convert all meeting invites to a zoom link. The opposite will also happen if they opt for working from office when meetings are set to zoom links.

![](/images/wfh.png)

## Office occupancy
Based on the employees' choices, HR will be able to see charts and graphs of the office occupancy for the day and a trend for the last 5 working days.
![](/images/status.png)

View the deployment live: [here](https://master.d244xpuesvqu3t.amplifyapp.com/admin/office).

View the postman API documentation: [here](https://documenter.getpostman.com/view/16419990/UzJSHYG8).

---
> This project was built during the Goldman Sachs Intern Hackathon 2022. Ivory won the hackathon in 1st place! 🥳