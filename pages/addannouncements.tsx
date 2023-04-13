import { ReactNode, useState } from 'react';
import { useUser } from '@/utils/useUser';
import PageWrapper from '@/lib/pageWrapper';
import { supabase } from '@/utils/supabase-client';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { createClient } from '@supabase/supabase-js';
interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

// Define the Card component that accepts an object with properties matching the Props interface and returns a React component.
function Card({ title, description, footer, children }: Props) {
  return (
    // Render a div with some classes and styles that wrap around the card content.
    <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        {/* Render the title of the card */}
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        {/* Render the description of the card (if it exists) */}
        <p className="text-zinc-300">{description}</p>
        {/* Render the children of the card (usually more React components) */}
        {children}
      </div>
      {/* Render the footer of the card (if it exists) */}
      <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}

// Auth middleware for role based access control
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Get the Supabase client from the `createServerSupabaseClient` function.
  const supabase = createServerSupabaseClient(ctx);
  // Get the session information of the user from the Supabase client.
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // If there is no session, redirect the user to `/signin`.
  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };

  // Otherwise, return the session and the user as props to the Next.js page.
  return {
    props: {
      initialSession: session,
      user: session.user
    }
  };
};

export default function AnnouncementPage() {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data, error } = await supabase.from('posts').insert({
      title,
      content
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Announcement created successfully:', data);
      // make a popup to indicate success

      setTitle('');
      setContent('');
    }
  };

  return (
    <PageWrapper allowedRoles={['admin']}>
      <>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Create Announcement</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 font-bold mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </>
    </PageWrapper>
  );
}
