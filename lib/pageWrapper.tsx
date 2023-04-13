import { ReactNode, useContext, useEffect, useState } from 'react';
import { useUser } from '@/utils/useUser';
import { Context } from './providers/provider';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import LoadingDots from '@/components/ui/LoadingDots/LoadingDots';
interface PageProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function PageWrapper({ children, allowedRoles }: PageProps) {
  const { user } = useUser();
  const [allowed, setAllowed] = useState(false);
  //   console.log(user);
  const router = useRouter();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const getUserDetails = () =>
      // @ts-ignore
      supabase.from('profiles').select('*').eq('id', user.id).single();

    getUserDetails().then(({ data }) => {
      // @ts-ignore
      setDetails(data);
      console.log(data);
    });
  }, [user]);

  useEffect(() => {
    if (!details) {
      return;
    }
    // @ts-ignore
    let role = details.role;
    setAllowed(allowedRoles.includes(role));
    console.log(allowedRoles.includes(role));
  }, [details]);

  return (
    <div>
      {/* chidlren needs to be a single node (1 div, or component) */}
      {allowed ? (
        <>{children}</>
      ) : (
        <>
          <p>
            <LoadingDots />
          </p>
        </>
      )}
    </div>
  );
}
