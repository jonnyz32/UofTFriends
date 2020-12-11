const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender: String,
    senderID: String,
    text: String,
})

const GroupModel = new mongoose.Schema({
    name: String,
    members: [{ studentId: String }],
    messages: [Message]
})

const ToDoList = new mongoose.Schema({
    activity: String,
    time: Date
})

const CourseMeeting = new mongoose.Schema({
    meetingDay: String,
    durationMins: Number
})

const CourseModel = new mongoose.Schema({
    courseId: String,
    meetings: [CourseMeeting]
})

const StudentModel = new mongoose.Schema({

    username: String,
    password: String,
    name: String,

    // Maybe swap id strings with ObjectIds?
    // Stores ids to the enrolled courses.
    courses: [String],
    program: [String],
    year: Number,
    hobbies: [String],
    todoList: [ToDoList],
    bio: String,
    profilePic: String,
    // Stores ids to the enrolled groups.
    groups: [String],

    // If a brand new user.
    seenOnboarding: false,
    seenTutorial: false,
})

const ReportModel = new mongoose.Schema({
    msgID: String,
    msgBody: String,
    senderID: String,
    senderName: String,
    groupID: String
})

const Group = mongoose.model('Group', GroupModel);
const Student = mongoose.model('Student', StudentModel)
const Course = mongoose.model('Course', CourseModel)
const Report = mongoose.model('Report', ReportModel)

module.exports = { Group, Student, Course, Report };
