
import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';
import Search, { facultyId, studentId } from './test';
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';

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

function CoursesTable({ courses }: any) {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProfiles() {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (error) {
        console.error(error);
      } else {
        setProfiles(profiles);
        console.log('profiles', profiles);
      }
    }

    fetchProfiles();
  }, []);

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
        {courses.map((course: any) => {
          console.log('course', String(course.faculty[0]));
            const profile = profiles.find((p) => p.id === String(course.faculty[0]));
            // const profile = profiles.find((p) => course.faculty.includes(p.id));
            console.log('profile', profile)
            const facultyName = profile
              ? profile.full_name
              : course.faculty;
            return (
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
            <td
              style={{
                border: '1px solid purple',
                padding: '10px',
                fontSize: '14px'
              }}
            >
              {facultyName}
            </td>
            <td style={{ border: '1px solid purple', padding: '10px' }}>
              {course.meeting}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}

const CoursesPage = () => {
  // i want to make a UUID usinf uuidv4
  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
      console.error(error);
    } else {
      // @ts-ignore
      setCourses(data);
    }
  };
  // for each faculty and student in the array insert new row into the enrollment table

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
