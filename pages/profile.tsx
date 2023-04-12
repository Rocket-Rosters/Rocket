// import Avatar from '@/components/Avatar';
// import { User } from '@supabase/auth-helpers-nextjs';
// import React , { useState, ReactNode } from 'react';
// import { supabase } from '@/utils/supabase-client';

// interface Props {
//     title: string;
//     description?: string;
//     footer?: ReactNode;
//     children: ReactNode;
//   }

// function Card({ title, description, footer, children }: Props) {
//     return (
//       <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
//         <div className="px-5 py-4">
//           <h3 className="text-2xl mb-1 font-medium">{title}</h3>
//           <p className="text-zinc-300">{description}</p>
//           {children}
//         </div>
//         <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
//           {footer}
//         </div>
//       </div>
//     );
//   }

// function ProfilePage({ user }: { user: User }) {
//   const [avatarUrl, setAvatarUrl] = useState(null)
  
//   async function handleAvatarUpload(filePath) {
//     try {
//       const { data, error } = await supabase.storage
//         .from('avatars')
//         .upload(filePath.name, filePath);
  
//       if (error) {
//         throw error;
//       }
  
//       const avatarUrl = data.path;
  
//       const { error: profileError } = await supabase
//         .from('profiles')
//         .update({ avatar_url: avatarUrl })
//         .eq('id', user.id);
  
//       if (profileError) {
//         throw profileError;
//       }
  
//       setAvatarUrl(avatarUrl);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div>
//         <Card
//         title="Profile"
//         description=""
//         footer={<p></p>}
//         >
//       {/* <h1>Profile Page</h1> */}
//       <Avatar url={avatarUrl} size={150} onUpload={handleAvatarUpload} uid={user.id} />
//       </Card>
//       <Card
//           title="Your Email"
//           description="Please enter the email address you want to use to login."
//           footer={<p>We will email you to verify the change.</p>}
//         >
//           <p className="text-xl mt-8 mb-4 font-semibold">
//             {user ? user.email : undefined}
//           </p>
//         </Card>
//       {user ? user.email : undefined}
//     </div>
//   )
// }
// export default ProfilePage;

// async function handleAvatarUpload(filePath) { try { const { data, error } = await supabase.storage .from('avatars') .upload(filePath.name, filePath); if (error) { throw error; } const avatarUrl = data.path; const { error: profileError } = await supabase .from('profiles') .update({ avatar_url: avatarUrl }) .eq('id', user.id); if (profileError) { throw profileError; } setAvatarUrl(avatarUrl); } catch (error) { console.error(error); } }

import Avatar from '@/components/Avatar';
import { User } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import React, { useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

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

function ProfilePage() {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(null);
//   const [user, setUser] = useState<User | null>(null);
   const user = useUser();

  useEffect(() => {
    if (user) {
      router.replace('/profile');
    }
  }, [user]);

  async function handleAvatarUpload(filePath) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath.name, filePath);

      if (error) {
        throw error;
      }

      const avatarUrl = data.path;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user?.id);

      if (profileError) {
        throw profileError;
      }

      setAvatarUrl(filePath);
    //   setAvatarUrl(avatarUrl);
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) {
    // Redirect to login page or display error message
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div>
      <Card
        title="Profile"
        description=""
        footer={<p></p>}
      >
        <Avatar url={avatarUrl} size={150} onUpload={handleAvatarUpload} uid={user.id} />
      </Card>
      <Card
        title="Your Email"
        description="Please enter the email address you want to use to login."
        footer={<p>We will email you to verify the change.</p>}
      >
        <p className="text-xl mt-8 mb-4 font-semibold">
          {user.email}
        </p>
      </Card>
    </div>
  );
}

export default ProfilePage;
