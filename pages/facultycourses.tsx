import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext
} from 'react';
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
}
// this will use the user?.id to get the courses from the database table called enrollment
// and then display them in a list

export default function FacultyCourses({ user }: { user: User }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('enrollment')
        .select('*')
        .eq('profile_id', user?.id);
      if (error) throw error;
      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper children={undefined} allowedRoles={['faculty']}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card title="Courses">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <div className="text-zinc-300">Loading...</div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {courses.map((course) => (
                  <div key={course.id} className="text-zinc-300">
                    {course.course_id}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );

} 
