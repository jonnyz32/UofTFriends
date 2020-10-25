import React, {Component} from 'react';
import StudentItem from './StudentItem';
import './StudentItem.css';


class Students extends Component {

// props student name, avatar, courses, program, hobbies, bio

constructor(props) {
    super(props);
    this.state = {students: [
                  {name: 'Jonathan Zak',
                  courses: 'CSC300, CSC309, CSC311, CSC343, PHL245',
                  program: 'Computer Science Specialist',
                  hobbies: 'Rock climbing',
                  bio: 'Third year cs student. Looking to meet some new people!'},

                  {name: 'Shadman Aziz',
                  courses: 'Apm236, CSC309, Egy201, CSC343, CSC311',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'Meirbek Zeinulla',
                  courses: 'CSC458, CSC309, MAT235, CSC343, CSC263',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'Adi Thakur',
                  courses: 'Apm236, CSC309, Rel101, CSC343, Ast304',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'Cathy Aziz',
                  courses: 'CSC108, Rel101, Mat235, MAT137, BIO101',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'Jake Peralta',
                  courses: 'psy101, phl200, phl245, csc400, pey100',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'amy santiago',
                  courses: 'cog201, psy101, Egy201, CSC343, CSC311',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'},

                  {name: 'Phil dunphy',
                  courses: 'Apm236, Rel101, MAT157, MAT247, CSC311',
                  program: 'Computer Science Major/ Religion minor',
                  hobbies: 'Looking sexy',
                  bio: 'Leveling up in Fifa'}
                ]              
  };
}  


  render() {
   
    return (
        <div className="Students">
            {this.state.students.map((student) => <StudentItem name={student.name} 
                                                              courses={student.courses} 
                                                              program={student.program} 
                                                              hobbies={student.hobbies} 
                                                              bio={student.bio}/>)}


           

        </div>
    
    );
  }
}

export default Students;