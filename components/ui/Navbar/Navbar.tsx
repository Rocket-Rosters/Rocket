import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabase-client';
import Logo from '@/components/icons/Logo';
import { useUser } from '@/utils/useUser';

import s from './Navbar.module.css';
import { useEffect, useState } from 'react';

type User = {
  data: any;
};

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setDetails(data);
    };

    getUserDetails();
  }, [details, user]);

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex-grow justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/" className={s.link}>
                Home
              </Link>
              <Link href="/account" className={s.link}>
                Account
              </Link>
              {user?.role === 'authenticated' && details?.role === 'admin' ? (
                <Link href="/addcourse" className={s.link}>
                  Add Courses
                </Link>
              ) : null}
              {user?.role === 'authenticated' && details?.role === 'admin' ? (
                <Link href="/addannouncements" className={s.link}>
                  Post Announcements
                </Link>
              ) : null}
              {user?.role === 'authenticated' && details?.role === 'admin' ? (
                <Link href="/invitenewuser" className={s.link}>
                  Add Students
                </Link>
              ) : null}
              {user?.role === 'authenticated' && details?.role === 'student' ? (
                <Link href="/fileupload" className={s.link}>
                  Health Documents
                </Link>
              ) : null}
              {user?.role === 'authenticated' && details?.role === 'student' ? (
                <Link href="/announcements" className={s.link}>
                  Announcements
                </Link>
              ) : null}
              {user?.role === 'authenticated' && details?.role === 'faculty' ? (
                <Link href="/announcements" className={s.link}>
                  Announcements
                </Link>
              ) : null}
            </nav>
          </div>
          {/* @ts-ignore */}

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
