import React, {Component} from 'react';
import './SearchBar.css'
import SideBar from '../SideNav/SideNav';
import Students from './../Students/Students';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
                course: "",
                program: "",
                hobby: "",
                chats: [{name: 'CSC309'},
                          {name: 'CSC311'},
                          {name: 'CSC300'},
                          {name: 'PHL245'},
                          {name: 'CSC343'}],
                students: [
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
     
    
    setFilters = (event) => {
        const {course, program, hobby, students} = this.state
        event.preventDefault()
        {this.setState({students: students.filter(student => 
            (student.courses.indexOf(course) > -1 || !course) &&
            (student.program.indexOf(program) > -1 || !program) &&
            (student.hobbies.indexOf(hobby) > -1 || !hobby)
            )})}   
    }
    

    onChange = (event) => {
        {console.log("in onchange")}
        {this.setState({[event.target.name]: event.target.value})}
    }

    addChat = (chatName) => {
        {console.log(chatName)}
        const updatedChats = this.state.chats;
        updatedChats.push({name: chatName})
        {console.log(updatedChats)}
        this.setState({chats: updatedChats})
        {console.log(this.state)}
    }

    
    render() {
   
    return (
        
        <div className="outerDiv">
            <div className="SearchBar">
                <div className="inner">
                    <form id="SearchBarForm" onChange={this.onChange} onSubmit={this.setFilters}>
                        <input name="course" className="filterBar" type="text" placeholder="Course..." value={this.state.course.value}></input>
                        <input name="program" className="filterBar" type="text" placeholder="Program..." value={this.state.program.value}></input>
                        <input name="hobby" className="filterBar" type="text" placeholder="Hobby..." value={this.state.hobby.value}></input>
                        <input type="submit" id="button" value="Submit"></input>
                    </form>
                </div>
                    
                
            {/* {console.log(this.state.students)} */}
            </div>
            <div className="mainBody">
            <SideBar chats={this.state.chats}/>
            <Students addChat={this.addChat} students={this.state.students}/>
   
            </div>

            
        </div>

    
    
    );
  }
}

export default SearchBar;