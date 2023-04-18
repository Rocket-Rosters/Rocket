
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CoursesPage = () => {
  // i want to make a UUID usinf uuidv4
  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [faculty, setFaculty] = useState('');
  const [attendance, setAttendance] = useState('');
  const [students, setStudents] = useState('');
  const [meetingPattern, setMeetingPattern] = useState('');
  // const id = uuidv4();

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
  // for each faculty and student in the array insert new row into the enrollment table
  const handleEnrollment = async (
    facultyId: any,
    studentId: any,
    CourseId: any
  ) => {
    facultyId.forEach(async (element: any) => {
      const { data, error } = await supabase.from('enrollment').insert({
        course_id: CourseId,
        profile_id: element,
        role: 'faculty'
      });
      if (error) {
        console.error(error);
      }
    });
    studentId.forEach(async (element: any) => {
      const { data, error } = await supabase.from('enrollment').insert({
        course_id: CourseId,
        profile_id: element,
        role: 'student'
      });
      if (error) {
        console.error(error);
      }
    });
  };

  const handleCreate = async (event: any) => {
    event.preventDefault();

    const { data, error } = await supabase.from('courses').insert({
      id,
      name,
      start_date: startDate,
      end_date: endDate,
      faculty: [facultyId],
      student: [studentId],
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
      setFaculty('');
      setStudents('');
      setMeetingPattern('');
      // id = uuidv4();
    }

    // for each faculty and student in the array insert new row into the enrollment table
    handleEnrollment(facultyId, studentId, id);
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
  // for all faculty and students in there array
  // const addEnrollment = async (courseId: any, studentId: any) => {

  return (
    <PageWrapper allowedRoles={['student']}>
      <>
        <div>
          <Card title="Courses" description="List of all courses">
            {' '}
            <CoursesTable courses={courses} />{' '}
          </Card>
        </div>
      </>
    </PageWrapper>
  );
};

export default CoursesPage;
function setfaculty(value: string): void {
  throw new Error('Function not implemented.');
}
