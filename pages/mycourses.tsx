// import { useState, useEffect, ReactNode } from 'react';
// import { supabase } from '@/utils/supabase-client';
// import { v4 as uuidv4 } from 'uuid';

// interface Props {
//   title: string;
//   description?: string;
//   footer?: ReactNode;
//   children: ReactNode;
// }

// function Card({ title, description, footer, children }: Props) {
//   return (
//     <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
//       <div className="px-5 py-4">
//         <h3 className="text-2xl mb-1 font-medium">{title}</h3>
//         <p className="text-zinc-300">{description}</p>
//         {children}
//       </div>
//       <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
//         {footer}
//       </div>
//     </div>
//   );
// }

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     const { data, error } = await supabase.from('courses').select('*');

//     if (error) {
//       console.error(error);
//     } else {
//       setCourses(data);
//     }
//   };

//   const handleCreate = async (event) => {
//     event.preventDefault();

//     const id = uuidv4();

//     const { data, error } = await supabase.from('courses').insert({
//       id,
//       name,
//       start_date: startDate,
//       end_date: endDate,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course created:', data);
//       setCourses([...courses, data[0]]);
//       setName('');
//       setStartDate('');
//       setEndDate('');
//     }
//   };

//   const handleUpdate = async (id: any, name: string, startDate: any, endDate: any) => {
//     const { data, error } = await supabase
//       .from('courses')
//       .update({ name, start_date: startDate, end_date: endDate })
//       .eq('id', id);

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course updated:', data);
//       const updatedCourses = courses.map((course) =>
//         course.id === id ? { ...course, name, start_date: startDate, end_date: endDate } : course
//       );
//       setCourses(updatedCourses);
//     }
//   };

//   const handleDelete = async (id) => {
//     const { data, error } = await supabase.from('courses').delete().eq('id', id);

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course deleted:', data);
//       const updatedCourses = courses.filter((course) => course.id !== id);
//       setCourses(updatedCourses);
//     }
//   };

//   return (
//     <div>
//       <h1 style={{ color: 'black' }}>Courses</h1>
//       <form onSubmit={handleCreate}>
//         <label htmlFor="name" style={{ color: 'black' }}>Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//           style={{ color: 'inherit' }}
//         />

//         <label htmlFor="startDate" style={{ color: 'black' }}>Start date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(event) => setStartDate(event.target.value)}
//           style={{ color: 'inherit' }}
//         />

//         <label htmlFor="endDate" style={{ color: 'black' }}>End date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(event) => setEndDate(event.target.value)}
//           style={{ color: 'inherit' }}
//         />

//         <button type="submit">Create course</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Start date</th>
//             <th>End date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {courses.map((course) => (
//             <tr key={course.id}>
//               <td>{course.name}</td>
//               <td>{course.start_date}</td>
//               <td>{course.end_date}</td>
//               <td>
//                 <button onClick={() => handleUpdate(course.id, 'New name', course.start_date, course.end_date)}>
//                   Update
//                 </button>
//                 <button onClick={() => handleDelete(course.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

// };

// export default CoursesPage;

import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';
import Search, { facultyId, studentId } from './test';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}

function CoursesTable({ courses, handleUpdate, handleDelete }: any) {
  return (
    <table
      style={{
        margin: 'auto',
        borderCollapse: 'collapse',
        border: '2px solid black',
        backgroundColor: '#E6E6FA',
        color: 'black',
        fontSize: '14px'
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              border: '1px solid purple',
              padding: '10px',
              backgroundColor: '#9370DB',
              color: 'white',
              fontSize: '14px'
            }}
          >
            Name
          </th>
          <th
            style={{
              border: '1px solid purple',
              padding: '10px',
              backgroundColor: '#9370DB',
              color: 'white',
              fontSize: '14px'
            }}
          >
            Start date
          </th>
          <th
            style={{
              border: '1px solid purple',
              padding: '10px',
              backgroundColor: '#9370DB',
              color: 'white',
              fontSize: '14px'
            }}
          >
            End date
          </th>
          {/* <th style={{ border: '1px solid purple', padding: '10px' }}>
            Attendance
          </th> */}
          {/* <th style={{ border: '1px solid purple', padding: '10px' }}>Students</th> */}
          <th
            style={{
              border: '1px solid purple',
              padding: '10px',
              backgroundColor: '#9370DB',
              color: 'white',
              fontSize: '14px'
            }}
          >
            Faculty
          </th>
          <th
            style={{
              border: '1px solid purple',
              padding: '10px',
              backgroundColor: '#9370DB',
              color: 'white',
              fontSize: '14px'
            }}
          >
            Meeting Pattern
          </th>
        </tr>
      </thead>
      <tbody>
        {/* name text not null,
    start_date date not null,
    end_date date not null,
    attendance jsonb null,
    students array null,
    faculty array null,
    id uuid not null default uuid_generate_v4 (),
    Meeting Pattern text null default 'M,TU,W,TH,F,SA,SU 12-1 am'::text, */}
        {courses.map((course: any) => (
          <tr key={course.id}>
            <td
              style={{
                border: '1px solid purple',
                padding: '10px',
                fontSize: '14px'
              }}
            >
              {course.name}
            </td>
            <td
              style={{
                border: '1px solid purple',
                padding: '10px',
                fontSize: '14px'
              }}
            >
              {course.start_date}
            </td>
            <td
              style={{
                border: '1px solid purple',
                padding: '10px',
                fontSize: '14px'
              }}
            >
              {course.end_date}
            </td>
            {/* <td style={{ border: '1px solid purple', padding: '10px' }}>
              {course.attendance}
            </td> */}
            {/* <td style={{ border: '1px solid purple', padding: '10px' }}>
              {course.students}
            </td> */}
            <td
              style={{
                border: '1px solid purple',
                padding: '10px',
                fontSize: '14px'
              }}
            >
              {course.faculty}
            </td>
            <td style={{ border: '1px solid purple', padding: '10px' }}>
              {course.meeting}
            </td>
            {/* <td style={{ border: '1px solid purple', padding: '10px' }}>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [faculty, setFaculty] = useState('');
  const [attendance, setAttendance] = useState('');
  const [students, setStudents] = useState('');
  const [meetingPattern, setMeetingPattern] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
      console.error(error);
    } else {
      setCourses(data);
    }
  };

  const handleCreate = async (event: any) => {
    event.preventDefault();

    const id = uuidv4();

    const { data, error } = await supabase.from('courses').insert({
      id,
      name,
      start_date: startDate,
      end_date: endDate,
      faculty: [facultyId],
      students: [studentId],
      meeting: meetingPattern
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Course created:', data);
      // setCourses([...courses, data[0]]);
      setName('');
      setStartDate('');
      setEndDate('');
    }
  };

  const handleUpdate = async (
    id: any,
    name: string,
    startDate: any,
    endDate: any
  ) => {
    const { data, error } = await supabase
      .from('courses')
      .update({ name, start_date: startDate, end_date: endDate })
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      console.log('Course updated:', data);
      const updatedCourses = courses.map((course: any) =>
        course.id === id
          ? { ...course, name, start_date: startDate, end_date: endDate }
          : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleDelete = async (id: any) => {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      console.log('Course deleted:', data);
      const updatedCourses = courses.filter((course: any) => course.id !== id);
      setCourses(updatedCourses);
    }
  };

  return (
    <PageWrapper allowedRoles={['student']}>
      <>
        <div>
          <Card title="My Courses" description="List of all my courses">
            {' '}
            <CoursesTable
              courses={courses}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />{' '}
          </Card>
        </div>
      </>
    </PageWrapper>
  );
};

export default MyCoursesPage;
function setfaculty(value: string): void {
  throw new Error('Function not implemented.');
}
