import React from 'react';
import Subjectcard from './Subjectcard';

const subjectsData = [
  { id: 1, name: 'Math-IV' },
  { id: 2, name: 'Operating System' },
  { id: 3, name: 'Java' },
  { id: 4, name: 'Python' }
];

function Subjectwise({ selectedSubject }) {
  return (
    <div className='flex flex-wrap justify-start gap-4'>
      {subjectsData
        .filter(subject => subject.name === selectedSubject) // Filter subjects
        .map((subject) => (
          <Subjectcard key={subject.id} name={subject.name} />
        ))}
    </div>
  );
}

export default Subjectwise;
