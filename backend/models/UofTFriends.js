const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender: String,
    text: String,
})

const Group = new mongoose.Schema({
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
    durationMins: Int32
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

const Group = mongoose.model('Group', Group);
const Student = mongoose.model('Student', StudentModel)
const Course = mongoose.model('Course', CourseModel)

module.exports = { Group, Student, Course };
