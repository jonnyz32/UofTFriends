/*
 * This code is provided solely for the personal and private use of students
 * taking the CSC309H course at the University of Toronto. Copying for purposes
 * other than this use is expressly prohibited. All forms of distribution of
 * this code, including but not limited to public repositories on GitHub,
 * GitLab, Bitbucket, or any other online platform, whether as given or with
 * any changes, are expressly prohibited.
*/

/* E4 server.js */
'use strict';
const log = console.log;
const path = require('path');

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID, Cursor } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Group, Student } = require('./models/UofTFriends.js');

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}




////// Get Users ///////////////

app.get('/fetchUsers', async (req, res) => {

	try {
		const users = await Student.find({})
		res.send(users)
	} 	
	catch (error) {
		log(error)
		if (isMongoError(error)){
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}

	}
})






////// Get chat messages
app.post('/Messages', async (req, res) => {

	// if (req.body.mode == "getMessages"){
		try{
			log("hello world")
			log("in get")
			log(req.body)
			const groupId = req.body.groupId
			console.log(groupId)
			const messages = await Group.findById(groupId, {messages: 1, _id: 0})
			// log(JSON.stringify(messages[0].messages))
			res.send(messages)

		}
		catch (error) {
			log(error)
			if (isMongoError(error)){
				res.status(500).send("Internal server error")
			}
			else {
				res.status(400).send("Bad request")
			}

		}

	})

	app.post('/checkGroupAdded', async (req, res) => {

		try{
			log("in addChat")
			log(req.body)
			const otherUserId = req.body.otherUserId
			const currentUserId = req.body.currentUserId
	
			const groups = await Group.find({})
			let contains = {"contains": false}
			groups.forEach(group => {
				if (group.members.length === 2){
					if ((group.members[0].studentId === otherUserId && group.members[1].studentId === currentUserId ) || 
					    (group.members[1].studentId === otherUserId && group.members[0].studentId === currentUserId )){
							contains.contains = true
						}
				}
			})

	
			
			res.send(contains)
		} catch (error) {
			log(error)
			if (isMongoError(error)){
				res.status(500).send("Internal server error")
			}
			else {
				res.status(400).send("Bad request")
			}
	
		}})
	

app.post('/addChat', async (req, res) => {

	try{
		log("in addChat")
		log(req.body)
		const otherUserId = req.body.otherUserId
		const otherUserName = req.body.otherUserName
		const currentUserId = req.body.currentUserId
		const currentUserName = req.body.currentUserName

		console.log("req.body", req.body)

		const group = new Group({
			        name: otherUserName + "," + currentUserName,
			        members: [{ "studentId": currentUserId }, { "studentId": otherUserId }],
			        messages: []
				})

		const groupResult = await group.save()
		res.send(groupResult)
	} catch (error) {
		log(error)
		if (isMongoError(error)){
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}

	}})

	app.post('/fetchGroups', async (req, res) =>{
		try{
			log("in fetchgroups")
			log(req.body)
			const id = req.body.id
			log("id:", id)

			let groups = await Student.findById(id, {groups: 1, _id: 0})
			groups = groups.groups
			log("groups", groups)

			let groupNames = []
			for (let i = 0; i < groups.length; i++){
				console.log("groups[i] is:" +groups[i])
				let name = await Group.findById(groups[i])
				console.log("name is "+name)
				let keyValue = [name._id, name.name]
				console.log(keyValue)
				groupNames.push(keyValue)
				}
				// name.forEach(element => {
				// 	console.log(element)
				// });
			log(groupNames)
			res.send(groupNames)


		} catch (error) {
			log(error)
			if (isMongoError(error)){
				res.status(500).send("Internal server error")
			}
			else {
				res.status(400).send("Bad request")
			}

		}
	})

	app.delete('/RemoveCourse', async (req, res) =>{
		try{
			log("in remove course")
			log(req.body)

			const userId = req.body.userId
			const courseId = req.body.courseId
			log("course:", courseId)


			const result = await Student.update(
				{ "_id": userId},
				{ $pull: { groups: {$in: [courseId] }}},
			)
			log("result", result)
			res.send(result)


		} catch (error) {
			log(error)
			if (isMongoError(error)){
				res.status(500).send("Internal server error")
			}
			else {
				res.status(400).send("Bad request")
			}

		}
	})






app.post('/addGroup', async (req, res) => {
	const groupId = req.body.groupId
	const userId = req.body.userId
	
	try {
		const result = await Student.updateOne({"_id": ObjectID(userId)}, {$addToSet: {groups: groupId} })
		res.send(result)
	}
	catch (error){
		log(error)
		if (isMongoError(error)){
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}

	}

})


app.post('/PostRegistration', async (req, res) => {

	try{
		let userId = req.body.userId
		let courseId = await Group.findOne({name:req.body.course}, {_id:1})
		console.log("id is", courseId._id)

		let result = await Student.updateOne({"_id": ObjectID(userId)}, {$addToSet: {groups: courseId._id} })

		res.send(courseId)

	} catch (error){
		log(error)
		if (isMongoError(error)){
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}

	}

})



app.post('/Chat', async (req, res) => {
	try{
		log("in chat Post")
		log("req.body inside chat"+JSON.stringify(req.body) +" sender "+req.body.sender +"message"+ req.body.message)
		const groupId = req.body.groupId
		// const groupToAdd = await Group.findById(groupId)
		// console.log(groupToAdd[0]._id)
		const messages = await Group.findOneAndUpdate({_id: groupId},{$push: {messages:{sender:req.body.sender,senderID:req.body.senderID,text:req.body.message}}},{new: true, useFindAndModify: false})
		log(JSON.stringify(messages))
		res.send(messages)

	}
	catch (error) {
		log(error)
		if (isMongoError(error)){
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}

	}

})



////// Add chat group
// app.post('/Home', async (req, res) => {
// 	try{
// 		log("hello world")
// 		log("in get")
// 		log(req.body)
// 		const studentId = req.body.name
// 		const currentUser = req.body.currentUser

// 		const group = new Group({
// 			        name: studentId,
// 			        members: [{studentId, currentUser}],
// 			        messages: []
// 				})

// 		let result = await group.save()
// 		res.send(result)
// 	} catch (error) {
// 		log(error)
// 		if (isMongoError(error)){
// 			res.status(500).send("Internal server error")
// 		}
// 		else {
// 			res.status(400).send("Bad request")
// 		}

// 	}

// 	}

// )

// app.post('/Home', async (req, res) => {

//     const group = new Group({
//         name: req.body.name,
//         members: req.body.members,
//         messages: req.body.messages

// 	})

// 	try {
// 		const result = await group.save()
// 		res.send(result)
// 	} catch (error) {
// 		if (isMongoError(error)){
// 			res.status(500).send("Internal server error")
// 		}
// 		else {
// 			res.status(400).send("Bad request")
// 		}

// 	}
// })



/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/../client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile("/index.html", {root: '/client/build'});
});


////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
