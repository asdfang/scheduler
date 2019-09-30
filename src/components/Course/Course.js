import React from 'react';
import { Button } from 'rbx';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { timeParts, hasConflict, getCourseTerm } from './times';

const firebaseConfig = {
  apiKey: "AIzaSyBYHuSNw2bgARVZ_25uOWRkxJpQ91L7l1g",
  authDomain: "scheduler-efd15.firebaseapp.com",
  databaseURL: "https://scheduler-efd15.firebaseio.com",
  projectId: "scheduler-efd15",
  storageBucket: "",
  messagingSenderId: "60931890806",
  appId: "1:60931890806:web:385a1f850b8dfbf2e7c957"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const buttonColor = selected => (
  selected ? 'success' : null
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const Course = ({ course, state, user }) => (
  <Button color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }>
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

export { buttonColor };
export default Course;