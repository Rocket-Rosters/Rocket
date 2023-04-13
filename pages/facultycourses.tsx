import { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';
import Search, { facultyId, studentId } from './test';
import { GetServerSidePropsContext } from 'next';
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';


interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  user: User;
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

function CoursesTable({ courses, handleUpdate }: any) {
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
            Actions
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
              {course.course_id}
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
            <td style={{ border: '1px solid purple', padding: '10px' }}>
              <Button
                style={{ padding: '5px', marginRight: '5px' }}
                onClick={() =>
                  handleUpdate(
                    course.id,
                    'New name',
                    course.start_date,
                    course.end_date
                  )
                }
              >
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [meetingPattern, setMeetingPattern] = useState('');
  const [id, setId] = useState(uuidv4());
  const user = useUser();
  // console.log("User",user);
  useEffect(() => { 
    fetchCourses();
  }, []);
console.log("flag")
  const fetchCourses = async () => {
    console.log("FetchCourse",user);
    const { data, error } = await supabase
      .from('enrollment')
      .select('course_id')
      .eq('profile_id', user?.id);
      console.log(data)
      console.log(user?.id);
      console.log("papa");
    if (error) {
      console.error(error);
    }
  };

  // for each faculty and student in the array insert new row into the enrollment table

  const handleCreate = async (event: any) => {
    event.preventDefault();

    let id = uuidv4();

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
      id = uuidv4();
    }

    // for each faculty and student in the array insert new row into the enrollment table
  };

  const handleUpdate = async (id: any) => {
    const { data, error } = await supabase
      .from('courses')
      .update({ name, start_date: startDate, end_date: endDate })
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
    }
  };

  // for all faculty and students in there array
  // const addEnrollment = async (courseId: any, studentId: any) => {

  return (
    <PageWrapper allowedRoles={['admin']}>
      <>
        <div>
          <Card title="Courses" description="List of all courses">
            {' '}
            <CoursesTable courses={courses} handleUpdate={handleUpdate} />{' '}
          </Card>
          <Card title="Search" description="List of users">
            <Search></Search>
          </Card>

          <Card
            title="Create Course"
            description="Enter new course information"
          >
            {/* <h1 style={{ color: 'purple', marginBottom: '20px' }}>Make New Course</h1> */}
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="ID"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  ID:
                </label>
                <input
                  type="text"
                  id="ID"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',

                    border: '1px solid white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="name"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="startDate"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Start date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="endDate"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  End date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>
              {/* <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="attendance"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Attendance:
                </label>
                <input
                  type="text"
                  id="attendance"
                  value={attendance}
                  onChange={(event) => setAttendance(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div> */}
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="faculty"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Faculty:
                </label>
                <input
                  type="array"
                  id="faculty"
                  value={facultyId}
                  onChange={(event) => setFaculty(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="students"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Students:
                </label>
                <input
                  type="array"
                  id="students"
                  value={studentId}
                  onChange={(event) => setStudents(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  htmlFor="Meeting Pattern"
                  style={{ color: '#9370DB', marginRight: '10px' }}
                >
                  Meeting Pattern:
                </label>
                <input
                  type="text"
                  id="Meeting Pattern"
                  value={meetingPattern}
                  onChange={(event) => setMeetingPattern(event.target.value)}
                  style={{
                    color: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid white'
                  }}
                />
              </div>

              <Button
                type="submit"
                style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
              >
                Create course
              </Button>
            </form>
          </Card>

          <Card title="Courses" description="List of all courses">
            {' '}
            <CoursesTable courses={courses} handleUpdate={handleUpdate} />{' '}
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
