Our app is a platform for University of Toronto students to connect
and communicate with other students in their courses or programs.

## URL

https://floating-brook-03042.herokuapp.com/

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


### Overview of routes

/fetchUsers (Get)

Doesn't expect any data and returns a list of all users in the database



/Messages (Post)

Expects data as 
 {
  "groupId": groupId
 }
 
 Ex: 
 
 {
  "groupId": "5fc69ba84c82db94b79c764c"
 }
 
 
 
 groupId is representing the mongodb \_id corresponding to a group in the groups collection.
 
 The response object is an array of message objects for the corresponding group.
 
 
 
 /checkGroupAdded (Post)

Expects data as 
{
			"otherUserId": otherUserId,
			"currentUserId": currentUserId
}

Ex:

{
			"otherUserId": "5fced87818f58b18449d15d9",
			"currentUserId": "5fce8fff18f58b18449d15d8"
}


otherUserId is the _id of another user in the students collection of mongodb
currentUserId is the _id of the current user in the students collection of mongodb

If there exists a group in groups collection that has it's members property equal
to an array containg only the user id's of the two students, then the response value is 

{ "contains": true }

Otherwise, it returns 
{ "contains": false }


/addChat (Post)

Expects data as 

{
			"otherUserId": otherUserId,
			"otherUserName": otherUserName,
			"currentUserId": currentUserId,
			"currentUserName": currentUserName
		}
    
Ex: 
{
			"otherUserId": "5fced87818f58b18449d15d9",
			"otherUserName": "Shadman Aziz",
			"currentUserId": "5fce8fff18f58b18449d15d8",
			"currentUserName": "User"
		}

where otherUserId and otherUserName are the user id and name of the other user, and 
currentUserId and currentUserName are the user id and name of the current user

A group will be saved to the database in the groups collection with the following data

{
			name: otherUserName + "," + currentUserName,
			members: [{ "studentId": currentUserId }, { "studentId": otherUserId }],
			messages: []
}

The response object is this new group if the request was successful.



/fetchGroups (Post)

Expects data as 
{
			"id": id
}

Ex:
{
			"id": "5fce8fff18f58b18449d15d8"
}

where id is the \_id of the current user. (Again user id's are the default mongodb id's for the 
student objects in the student collection)

Response object is an array of arrays containing group id's with the corresponding group name.



/RemoveCourse (Delete)

Expects data as 
{ userId: userId
courseId: courseId }

Ex:
{ userId: "5fce8fff18f58b18449d15d8"
courseId: "5fc69ba84c82db94b79c764c" }

userId is the id of the current user as defined above.
courseId is the mongodb id of the course which can be found in the groups collection.

Returns the student object from the students collection with id given by userId. The groups array 
for the given student, will have had the courseId removed.


/fetchParticularUser (Post)

Expects data as 

{
 "senderID": userId
}

'SenderID' is the userID of the particular student we are looking to get back, the route returns the entire student object of 
the student with that particular Id.

Ex:
{
 "senderID": 5fce8fff18f58b18449d15d8
}

the response object is the entire student object with that particular ID.

/addGroup (Post)

Expects data as 

{
			"groupId": groupId,
			"userId": userId
}

Ex:
{
  "groupId": "5fc69ba84c82db94b79c764c",
  "userId": "5fce8fff18f58b18449d15d8"
}

where groupId and userId are the same as defined above. The response object is the corresponding
student object with it's groups array, having had groupId added to it.

/Chat (Post) 

Expects data as 
{
"groupId":groupId,
"sender": NameOfSender,
"senderID": IdOfSender,
text: message 
}

where "text" is the message the user is sending, "sender" is the name of the sender, 
"senderID" is the actual Id of the student sending the message and 
groupId is ID of the chat group where the message is being sent. This route adds 
the text to the list of messages for that particular chat group, while also keeping track of 
the sender students name and ID.

Ex: 
{
"groupId":"5fc69ba84c82db94b79c764c",
"sender": "user",
"senderID": "5fce8fff18f58b18449d15d8",
text: "hello guys" 
} 

the response sends the text message added, but main objective is to 
update the messages list for the group in the database.

/PostRegistration (Post)

Expects data as 
{ "userId": userId, 
"course": course }

Ex: 
{ "userId": "5fce8fff18f58b18449d15d8", 
"course": "CSC309" }

userId is as defined above. course is a string containing the name of a U of T course. If the groups collection has a 
group with name field given as course, then the response object will be the the student object corresponding to the given 
userId with it's groups array having added the groupId corresponding to the course string. If the given group cannot be found, 
an alert will be raised "Cannot find groupId"






 




