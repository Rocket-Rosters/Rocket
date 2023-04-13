// import Avatar from '@/components/Avatar';
// import { User } from '@supabase/supabase-js';
// import { Auth } from '@supabase/auth-ui-react';
// import { useRouter } from 'next/router';
// import React, { useState, ReactNode, useEffect } from 'react';
// import { supabase } from '@/utils/supabase-client';
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
// import { ProfileDetails } from 'types';
// import { MyProfileContextProvider, useProfile } from '@/utils/useProfiles';
// import { UserContext } from '@/utils/useUser';

// interface Props {
//   title: string;
//   description?: string;
//   footer?: ReactNode;
//   children: ReactNode;
// }

// function Card({ title, description, footer, children }: Props) {
//   return (
//     <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
//       <div className="px-5 py-4">
//         <h3 className="text-2xl mb-1 font-medium">{title}</h3>
//         <p className="text-zinc-300">{description}</p>
//         {children}
//       </div>
//       <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
//         {footer}
//       </div>
//     </div>
//   );
// }

// function ProfilePage() {
//   const router = useRouter();
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
//   // const [user, setUser] = useState<User | null>(null);
//   const user = useUser();
//   const { profileDetails } = useProfile(user?.aud);

//   console.log(user);
//    console.log(profileDetails);

//   useEffect(() => {
//     if (user) {
//       router.replace('/profile');
//     }
//   }, [user]);

//   console.log(user);
//   console.log('avatar',avatarUrl);

//   // async function handleAvatarUpload(filePath) {
//   //   try {
//   //     const { data, error } = await supabase.storage
//   //       .from('avatars')
//   //       .upload(filePath.name, filePath);

//   //     if (error) {
//   //       throw error;
//   //     }

//   //     const avatarUrl = data.path;
//   //     const fullName = data.path;

//   //     const { error: profileError } = await supabase
//   //       .from('profiles')
//   //       .update({ avatar_url: avatarUrl })
//   //       .eq('id', user?.id);

//   //     if (profileError) {
//   //       throw profileError;
//   //     }

//   //     setAvatarUrl(filePath);
//   //   //   setAvatarUrl(avatarUrl);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }

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
//         .eq('id', user?.id);

//       if (profileError) {
//         throw profileError;
//       }

//       setAvatarUrl(avatarUrl);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   if (!user) {
//     // Redirect to login page or display error message
//     return <div>You must be logged in to view this page.</div>;
//   }

//   return (
//     <div>
//       <Card
//         title="Profile"
//         description=""
//         footer={<p></p>}
//       >
//         {/* <Avatar url={avatarUrl} size={150} onUpload={handleAvatarUpload} uid={user.id} /> */}
//         <img
//         src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
//         alt={avatarUrl ? 'Avatar' : 'No image'}
//         className="avatar image"
//         style={{ height: size, width: size }}
//       />
//       </Card>
//       <Card
//         title="Your Email"
//         description=""
//         footer={<p></p>}
//       >
//         <p className="text-xl mt-8 mb-4 font-semibold">
//           {user.email}
//         </p>
//       </Card>
//       <Card
//         title="Your Name"
//         description=""
//         footer={<p></p>}
//       >
//         <p className="text-xl mt-8 mb-4 font-semibold">
//           {/* display the user's full_name in this field from account */}
//           {profileDetails?.full_name}
//         </p>
//       </Card>
//     </div>
//   );
// }

// export default ProfilePage;

import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '../utils/supabase-client';
import { UserContextProvider } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';
import { ProfileContext } from '@/utils/useProfiles';
import { useUser } from '@supabase/auth-helpers-react';

interface CardProps {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: CardProps) {
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

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  uid: string;
}

export default function Avatar({ url, size = 150, onUpload, uid }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };
  const user = useUser();

  console.log(user?.id);

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
    } else {
      downloadImage(uid);
    }
  }, [url, uid]);

  async function downloadImage(uid = user?.id) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(`${uid}/avatar`);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/avatar`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      //@ts-ignore
      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Card title="Profile Image" description="" footer={<p></p>}>
        <img
          src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
          alt={avatarUrl ? 'Avatar' : 'No image'}
          className="avatar image"
          style={{ height: size, width: size }}
        />
        {uploading ? (
          'Uploading...'
        ) : (
          <>
            <label className="button primary block" htmlFor="single">
              Upload an avatar
            </label>
            <div className="visually-hidden">
              <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
          </>
        )}
      </Card>
      <div>
        <Card title="Your Email" description="" footer={<p></p>}>
          <p className="text-xl mt-8 mb-4 font-semibold">{user?.email}</p>
        </Card>
      </div>
    </div>
  );
}
