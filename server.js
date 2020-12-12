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
const { Group, Student, Course } = require('./models/UofTFriends.js');

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

function handleError(res, error) {
	log(error)
	if (isMongoError(error)) {
		res.status(500).send("Internal server error")
	} else {
		res.status(400).send("Bad request")
	}
}

////// Get Users ///////////////

app.get('/fetchUsers', async (req, res) => {

	try {
		const users = await Student.find({})
		res.send(users)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/fetchParticularUser', async (req, res) => {

	try {
		const user = await Student.findById(req.body.senderID)
		res.send(user)
	} catch (error) {
		handleError(res, error)
	}
})

////// Get chat messages
app.post('/Messages', async (req, res) => {

	try {
		const groupId = req.body.groupId
		const messages = await Group.findById(groupId, { messages: 1, _id: 0 })
		res.send(messages)

	} catch (error) {
		handleError(res, error)
	}
})

app.post('/checkGroupAdded', async (req, res) => {

	try {
		const otherUserId = req.body.otherUserId
		const currentUserId = req.body.currentUserId

		const groups = await Group.find({})
		let contains = { "contains": false }
		groups.forEach(group => {
			if (group.members.length === 2) {
				if ((group.members[0].studentId === otherUserId && group.members[1].studentId === currentUserId) ||
					(group.members[1].studentId === otherUserId && group.members[0].studentId === currentUserId)) {
					contains.contains = true
				}
			}
		})

		res.send(contains)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/addChat', async (req, res) => {

	try {
		const otherUserId = req.body.otherUserId
		const otherUserName = req.body.otherUserName
		const currentUserId = req.body.currentUserId
		const currentUserName = req.body.currentUserName

		const group = new Group({
			name: otherUserName + "," + currentUserName,
			members: [{ "studentId": currentUserId }, { "studentId": otherUserId }],
			messages: []
		})

		const groupResult = await group.save()
		res.send(groupResult)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/fetchGroups', async (req, res) => {
	try {
		const id = req.body.id

		let groups = await Student.findById(id, { groups: 1, _id: 0 })
		groups = groups.groups

		let groupNames = []
		for (let i = 0; i < groups.length; i++) {
			let name = await Group.findById(groups[i])
			let keyValue = [name._id, name.name]
			groupNames.push(keyValue)
		}
		res.send(groupNames)

	} catch (error) {
		handleError(res, error)
	}
})

app.delete('/RemoveCourse', async (req, res) => {
	try {
		const userId = req.body.userId
		const courseId = req.body.courseId

		const result = await Student.update(
			{ "_id": userId },
			{ $pull: { groups: { $in: [courseId] } } },
		)
		res.send(result)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/addGroup', async (req, res) => {
	const groupId = req.body.groupId
	const userId = req.body.userId

	try {
		const result = await Student.updateOne({ "_id": ObjectID(userId) }, { $addToSet: { groups: groupId } })
		res.send(result)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/PostRegistration', async (req, res) => {

	try {
		let userId = req.body.userId
		let courseId = await Group.findOne({ name: req.body.course }, { _id: 1 })
		await Student.updateOne({ "_id": ObjectID(userId) }, { $addToSet: { groups: courseId._id } })

		res.send(courseId)
	} catch (error) {
		handleError(res, error)
	}
})

app.post('/Chat', async (req, res) => {
	try {
		const newMessages = {
			messages: {
				sender: req.body.sender,
				senderID: req.body.senderID,
				text: req.body.message
			}
		}
		const groupId = req.body.groupId
		const messages = await Group.findOneAndUpdate(
			{ _id: groupId },
			{ $push: newMessages },
			{ new: true, useFindAndModify: false })
		res.send(messages)

	} catch (error) {
		handleError(res, error)
	}
})

/**
 * Route for reporting a message.
 */
app.post('/reports', async (req, res) => {

	console.log("Req: Report Student.  Body:", req.body)
	const newReport = new Report(req.body)
	try {
		await newReport.save()
		res.status(200).send()
	} catch (error) {
		console.log(error)
		if (isMongoError(error)) {
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}
	}
})

/**
 * Route for getting reports.
 */
app.get('/reports', async (req, res) => {

	try {
		const reports = await Report.find()
		res.status(200).send(reports)
	} catch (error) {
		console.log(error)
		if (isMongoError(error)) {
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}
	}
})

/**
 * Route for deleting reports.
 */
app.delete('/reports/:id', async (req, res) => {

	const reportId = req.params.id
	try {
		await Report.findByIdAndDelete(reportId)
		res.status(200).send()
	} catch (error) {
		console.log(error)
		if (isMongoError(error)) {
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}
	}
})

/**
 * Route for deleting messages.
 */
app.delete('/messages/:group_id/:msg_id', async (req, res) => {

	const groupId = req.params.group_id
	const msgId = req.params.msg_id

	try {
		const group = await Group.findById(groupId)
		const removedMsg = group.messages.id(msgId).remove()
		await group.save()
		res.status(200).send(removedMsg)
	} catch (error) {
		console.log(error)
		if (isMongoError(error)) {
			res.status(500).send("Internal server error")
		}
		else {
			res.status(400).send("Bad request")
		}
	}
})

app.get('/Courses/:id', async (req, res) => {
	const id = req.params.id
	try {
		await Course.find({ "courseId": { "$regex": new RegExp(id) } }, function (err, courses) {
			if (err) {
				res.status(400).send('Bad Request')
			} else if (courses) {
				res.send(courses)
			}
		})
	} catch (error) {
		handleError(res, error)
	}
})


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
	// check for page routes that we expect in the frontend to provide correct status code.
	const goodPageRoutes = ["/", "/login", "/dashboard"];
	if (!goodPageRoutes.includes(req.url)) {
		// if url not in expected page routes, set status to 404.
		res.status(404);
	}

	// send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
