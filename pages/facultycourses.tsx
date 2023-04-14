import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext
} from 'react';
import { supabase } from '@/utils/supabase-client';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';
import { GetServerSidePropsContext } from 'next';
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import CourseDetails from './course/[courseId]';
import CoursesPage from './addcourse';
import { userAgent } from 'next/server';
// import { useUser } from '@supabase/auth-helpers-react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}
// make a component called Popup that will make a popup when the user clicks button, When they click the background the popup will close

//@ts-ignore
function Popup({ showPopup, setShowPopup }) {
  const handleBackgroundClick = () => {
    setShowPopup(false);
  }

  return (
    <div
      className={`${showPopup ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30`}
      onClick={handleBackgroundClick}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gray-800 rounded-md shadow-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2 text-white">Popup Title</h1>
          <p className="text-gray-300">This is some text inside the popup window.</p>
          <Card
            title="Course Name"
            description=""
            footer={<p></p>}
          >
            <p className="text-xl mt-8 mb-4 font-semibold text-white">
              {/* display the user's full_name in this field from account */}
              adasdasdasdasdasdasdasd
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}






function Card({ title, description, footer, children }: Props) {
  return (
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="flex justify-center border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md ">
        {footer}
      </div>
    </div>
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
// this will use the user?.id to get the courses from the database table called enrollment
// and then display them in a list

export default function FacultyCourses({ user }: { user: User }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseName, setCourseName] = useState([]);
  const [courseStudents, setCourseStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses();
      await fetchCourseStudents();
      await fetchCourseName();
    };
    fetchData();
  }, []);
  
  // store each course in the database in the courses array

  async function fetchCourses() {
    try {
      setLoading(true);
      const { data, error: any } = await supabase
        .from('enrollment')
        .select('*')
        .eq('profile_id', user?.id);
      if (error) throw error;
      setCourses(data);

      console.log('courses:', data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  // based in the course id, get the students in the course
  async function fetchCourseStudents() {
    try {
      setLoading(true);
      if (courses.length > 0) {
        const { data, error: any } = await supabase
          .from('enrollment')
          .select('*')
          .eq('course_id', courses[0].course_id); // assuming you want to fetch students for the first course in the list
        if (error) throw error;
        console.log('course of students:', data);
        setCourseStudents(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // async function fetchCourseName() {
  //   try {
  //     setLoading(true);
  //     const { data, error: any } = await supabase
  //       .from('courses')
  //       .select('name')
  //       .eq('id', courses);
  //     if (error) throw error;
  //     setCourseName(data);
  //     console.log('course name:', data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  const fetchCourseName = async () => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
      console.error(error);
    } else {
      setCourses(data);
    }
  };


  return (
    <PageWrapper allowedRoles={['faculty']}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card title="Courses">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <div className="text-zinc-300">Loading...</div>
            ) : (
              <>
                {courses.map((course: any) => (
                  <div key={course.id}>
                    <Card title="" footer=<Button>Take Attendence</Button>>
                      <div className="text-zinc-300">{course.name}</div>
                      {/* <div className="text-zinc-300">{fetchCourseName(course.course_id)}</div> */}
                    </Card>
                  </div>
                ))}
              </>
            )}

            {error && <div className="text-zinc-300">{error}</div>}

            <div className="flex items-center justify-center mt-4 space-x-4">
              <Button
                onClick={() => {
                  fetchCourses();
                }}
              >
                Refresh Courses
              </Button>
            </div>
          </div>
        </Card>
        <Card title="Attendence">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <div className="text-zinc-300">Loading...</div>
            ) : (
              <>
                {courses.map((course: any) => (
                  <div key={course.id}></div>
                ))}
              </>
            )}

            {error && <div className="text-zinc-300">{error}</div>}

            <div className="flex items-center justify-center mt-4 space-x-4">
              <Button
                onClick={() => {
                  fetchCourses();
                }}
              >
                Refresh Courses
              </Button>
              {/* make a button that will make the popwimdow and in it say hello world */}
              <Button
                onClick={() => {
                  setShowPopup(true);
                }}
              >
                Take Attendence
              </Button>
              
              <Popup showPopup={showPopup} setShowPopup={setShowPopup} />

              
              

                



              

               
              
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
