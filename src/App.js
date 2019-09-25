import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Title } from 'rbx';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

const Banner = ({ title } ) => (
  <Title>{ title || '[loading...]' }</Title>
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const Course = ({ course }) => (
  <Button>
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

const buttonColor = selected => (
  selected ? 'success' : null
);

const TermSelector = ({ state }) => (
  <Button.Group hasAddons>
    { Object.values(terms)
        .map(value =>
          <Button key={value}
            color={ buttonColor(value === state.term) }
            onClick={ () => state.setTerm(value) }>
            { value }
          </Button>
      )
    }
  </Button.Group>
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = courses.filter(course => term === getCourseTerm(course));

  return (
    <React.Fragment>
      <TermSelector state={ { term, setTerm } } />
      <Button.Group>
          { termCourses.map(course =>
              <Course key={ course.id } course={ course } />) }
        </Button.Group>
    </React.Fragment>
  );  
};

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  // const url = 'https://www.cs.northwestern.edu/academics/courses/394/data/cs-courses.php';
  const url = '/data/cs-courses.json';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);

  return (
    <Container>
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </Container>
  );
};

export default App;

// const schedule = {
//   "title": "CS Courses for 2018-2019",
//   "courses": [
//     {
//       "id": "F101",
//       "title": "Computer Science: Concepts, Philosophy, and Connections",
//       "meets": "MWF 11:00-11:50"
//     },
//     {
//       "id": "F110",
//       "title": "Intro Programming for non-majors",
//       "meets": "MWF 10:00-10:50"
//     },
//     {
//       "id": "F111",
//       "title": "Fundamentals of Computer Programming I",
//       "meets": "MWF 13:00-13:50"
//     },
//     {
//       "id": "W111",
//       "title": "Fundamentals of Computer Programming I",
//       "meets": "MWF 11:00-11:50"
//     },
//     {
//       "id": "F211",
//       "title": "Fundamentals of Computer Programming II",
//       "meets": "TuTh 12:30-13:50"
//     }
//   ]
// };

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
