Our app is a platform for University of Toronto students to connect
and communicate with other students in their courses or programs.

## Getting Started

```
git clone https://github.com/csc309-fall-2020/team02.git
cd team02
npm install
npm start
```

## Usage

If you want to login as 
an existing user, you can choose from signing in as the admin or 
a regular user. To simplify things, we will show how to login as an admin
at the end. Here is how to login as a regular user.

To login as a regular user, type in the following credentials:
```
username: user
password: user
```

If you want to signup as a new user, type in your desired
username and password and then click the signup button.
You will then be brought to our signup page where you can choose a profile
picture and then input your program, year, and the courses in which 
you are currently enrolled. You will also have the option to list a 
couple of your hobbies as well as give yourself a brief bio.

After signing up as a new user or logging in as an existing one, you will be 
brought to the home page of our website. From here you can see a list of 
chats corresponding to the courses that you are currently enrolled in,
your current schedule for the day (based on the courses you are enrolled in), a to-do list which you can add to and remove as you please, and a search bar to 
find other students. Lets go over each of these functionalities.

### Chats

Clicking on a button in the sidebar will open up a chat view that lets you send and recieve messages from that person/group.
where you can send messages to that group/person.


### Searchbar

Here you can type in a name, a course, or a program to find students that meet those requirements.

Ex: Typing in CSC30, will show all students with courses containing 
the string CSC30 (CSC309, CSC300,...).

Add chat: Clicking on the chat button next to a student will add a chat 
to the sidebar for the corresponding student.

The navigation bar contains 3 links; Home, Settings, and Logout. We've already talked about the home page, and we'll breifly discuss logout later. Lets talk about the profile settings page.

### Profile Settings Page

From the profile settings page, you have the option to change your profile picture,
add or remove courses that you are currently enrolled in, and update your bio.


Now let's talk about the admin functionality. To login as a regular user, type in the following credentials:

Admin:

```
username: admin
password: admin
```

Once you are in the admin view, you will see a list of reported groups and students.
You can click on any group or student to get a quick description of their offense.
You will also be presented with the option to ban the user/group or dismiss their
offense.

With both types of users, admin or regular, we provide the option to logout of your account
via a button in the top right corner.

