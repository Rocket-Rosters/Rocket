import { useState, ReactNode, useEffect } from 'react';
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
// Define a TypeScript interface with four properties that will be used as props for the Card component.
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

// Define an asynchronous function that is used to fetch data from a server for a Next.js application.
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

export default function AdminPage() {
  return (
    <PageWrapper allowedRoles={['student']}>
      <>
        <Card title="Admin Page">
          <p>My Courses</p>
        </Card>
      </>
    </PageWrapper>
  );
}
