import React, {Component} from 'react';
import './SearchBar.css'
import SideBar from '../SideNav/SideNav';
import Students from './../Students/Students';
import Chat from '../Chat/Chat';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
                searchMode: true,
                currentUser: this.props.currentUser,
                //currentUser: {name: 'Jonathan Zak',
                                // courses: ['CSC300', 'CSC309', 'CSC311', 'CSC343', 'PHL245'],
                                // program: ['Computer Science Specialist'],
                                // hobbies: ['Rock climbing'],
                                // bio: 'Third year cs student. Looking to meet some new people!'},
                searchQuery: "",
                chats: this.props.currentUser.courses,
                //chats: ['CSC300', 'CSC309', 'CSC311', 'CSC343', 'PHL245'],
                students: [],
                studentsMasterList: [
                    {name: 'Jonathan Zak',
                    courses: ['CSC300', 'CSC309', 'CSC311', 'CSC343', 'PHL245'],
                    program: ['Computer Science Specialist'],
                    hobbies: ['Rock climbing'],
                    bio: 'Third year cs student. Looking to meet some new people!'},

                    {name: 'Shadman Aziz',
                    courses: ['Apm236', 'CSC309', 'Egy201', 'CSC343', 'CSC311'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'Meirbek Zeinulla',
                    courses: ['CSC458', 'CSC309', 'MAT235', 'CSC343', 'CSC263'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'Adi Thakur',
                    courses: ['Apm236', 'CSC309', 'Rel101', 'CSC343', 'Ast304'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'Cathy Aziz',
                    courses: ['CSC108', 'Rel101', 'Mat235', 'MAT137', 'BIO101'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'Jake Peralta',
                    courses: ['psy101', 'phl200', 'phl245', 'csc400', 'pey100'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'amy santiago',
                    courses: ['cog201', 'psy101', 'Egy201', 'CSC343', 'CSC311'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'},

                    {name: 'Phil dunphy',
                    courses: ['Apm236', 'Rel101', 'MAT157', 'MAT247', 'CSC311'],
                    program: ['Computer Science Major', 'Religion minor'],
                    hobbies: ['Looking sexy'],
                    bio: 'Leveling up in Fifa'}
                  ]
        };

    }

    componentDidMount(){
        //setChats

    }

    // setFilters = (event) => {
    //     const {course, program, hobby, students} = this.state

    //     event.preventDefault()
    //     {this.setState({searchMode: true, students: students.filter(student =>
    //         (student.courses.indexOf(course) > -1 || !course) &&
    //         (student.program.indexOf(program) > -1 || !program) &&
    //         (student.hobbies.indexOf(hobby) > -1 || !hobby)
    //         )})}
    // }

    // Update this.state.students to match search query.
    filterStudents = (event) => {

        event.preventDefault()
        this.setState({
            searchMode: true,
            students: this.searchResults()
        })
    }

    // Returns all students that match search query.
    searchResults = () => {

        let queryMatches = []
        const {studentsMasterList, searchQuery} = this.state

        studentsMasterList.forEach(student => {

            if (student.name.includes(searchQuery)              ||
                this.contains(student.courses, searchQuery)     ||
                this.contains(student.program, searchQuery)     ||
                this.contains(student.hobbies, searchQuery)     ||
                student.bio.includes(searchQuery)) {
                    queryMatches.push(student)
                }
        })
        return queryMatches
    }

    // Helper to match searchQuery.
    contains = (list, keyword) => {

        const keywordUpper = keyword.toUpperCase()
        let match = false

        list.forEach(item => {
            const itemUpper = item.toUpperCase()
            if (itemUpper.includes(keywordUpper)) {
                match = true
            }
        })
        return match
    }

    // Update this.state.searchQuery every input event.
    onChange = (event) => {
        this.setState({searchQuery: event.target.value.trim()})
    }

    addChat = (chatName) => {

        console.log("Chat: Adding Chat")

        console.log("ChatName:", chatName)
        const updatedChats = this.state.chats;
        updatedChats.push(chatName)
        console.log("Updated:", updatedChats)
        this.setState({chats: updatedChats})
        console.log("State", this.state)
    }

    toggleSearchMode = (searchMode) => {
        {console.log("searchMode: ", searchMode)}
        if (searchMode){
            {this.setState({searchMode: !this.state.searchMode})}
            }
    }

    render() {

        return (

            <div className="outerDiv">

                {/* Load icons for navbar */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                
                {/* Navbar */}
                <nav id="nav">
                    {/* Search Bar */}
                    <form onChange={this.onChange} onSubmit={this.filterStudents}>
                        <input type="text"></input>
                        <input class="submitQuery" type="submit" value="Ok"></input>
                    </form>       
                    {/* Navigation buttons */}
                    <a href="#" id="accountButton"><i className="fa fa-fw fa-user"></i>{this.state.currentUser.name}</a>
                    <a href="#"><i className="fa fa-fw fa-home"></i> Home</a>
                </nav>

                <aside id="sidebarContainer">
                    <SideBar toggleSearchMode={this.toggleSearchMode} searchMode={this.state.searchMode} chats={this.state.chats}/>
                </aside>

                <section id="fragmentContainer">
                    {this.state.searchMode ? <Students addChat={this.addChat} students={this.state.students}/>: <Chat/>}
                </section>

            </div>
        );
  }
}

export default SearchBar;
