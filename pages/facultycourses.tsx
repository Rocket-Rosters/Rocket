import { useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import {
  createServerSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import LoadingDots from '@/components/ui/LoadingDots';
import Button from '@/components/ui/Button';
import { useUser } from '@/utils/useUser';
import { postData } from '@/utils/helpers';
import { supabase } from '@/utils/supabase-client';
import { json } from 'stream/consumers';
import PageWrapper from '@/lib/pageWrapper';
// import { createServerSupabaseClient } from '@supabase/auth';
// import { supabase } from '@/utils/supabase-client';
// import PageWrapper from '@/lib/pageWrapper';
// import { useUser } from '@/utils/useUser';
// import { GetServerSidePropsContext } from 'next';

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

export default function FacultyCourses() {
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [courses, setCourses] = useState<any[]>([]);

  const getCourses = async (id: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('courses')
        .eq('id', id)
        .single();

      if (error) {
        console.log(error);
      } else {
        console.log({ profile });

        const courseIds = profile?.courses;
        console.log({ courseIds });
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .in('id', courseIds);

        if (coursesError) {
          console.log(coursesError);
        }
        if (coursesData) {
          setCourses(coursesData);
        }
      }
    } catch (error) {
      //@ts-expect-error
      console.log(error.message);
    }
  };

  interface Props {
    title: string;
    id: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
  }

  function Card({ id, title, description, footer, children }: Props) {
    function handleNavigate() {
      router.push(`/course/${id}`);
    }
    return (
      <div
        className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8"
        role="button"
        onClick={() => handleNavigate()}
      >
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
  useEffect(() => {
    setLoading(true);
    if (user) {
      setProfileId(user.id);
      getCourses(user.id);
    }
    setLoading(false);
  }, [user]);
  if (loading) return <LoadingDots />;
  return (
    <PageWrapper allowedRoles={['faculty']}>
      <>
        <div>
          <h1>Faculty Courses</h1>
          {/* <label htmlFor="profileId">Profile ID:</label>
          <input
            type="text"
            id="profileId"
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
          />
          <button onClick={getCourses}>Get Courses</button> */}
        </div>
        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <>
            {courses.map((course: any) => (
              <Card
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                footer={course.footer}
              >
                {/* Render any additional course information here */}
              </Card>
            ))}
          </>
        )}
      </>
    </PageWrapper>
  );
}
