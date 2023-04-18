// import { useState, ReactNode, useEffect } from 'react';
// import Link from 'next/link';
// import { GetServerSidePropsContext } from 'next';
// import {
//   createServerSupabaseClient,
//   User
// } from '@supabase/auth-helpers-nextjs';

// import LoadingDots from '@/components/ui/LoadingDots';
// import Button from '@/components/ui/Button';
// import { useUser } from '@/utils/useUser';
// import { useprofile } from '@/utils/useprofile';

// import { postData } from '@/utils/helpers';
// import { supabase } from '@/utils/supabase-client';
// import { json } from 'stream/consumers';

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

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const supabase = createServerSupabaseClient(ctx);
//   const {
//     data: { session }
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false
//       }
//     };

//   return {
//     props: {
//       initialSession: session,
//       user: session.user
//     }
//   };
// };
// // gets user data from databas OF PROFILE TABLE
// export default function Account({ user }: { user: User }) {
//   const [details, setDetails] = useState<any>([]);
//   const getUserDetails = () => supabase.from('profiles').select('*').single();
//   useEffect(() => {
//     getUserDetails().then(({ data }) => {
//       setDetails(data);
//       console.log(data);
//     });
//   }, []);

//   return (
//     <section className="bg-black mb-32">
//       <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
//         <div className="sm:flex sm:flex-col sm:items-center">
//           <h1 className="text-4xl font-extrabold text-white sm:text-6xl text-center">
//             Account
//           </h1>
//           <p className="mt-5 text-xl text-zinc-200 sm:text-2xl max-w-2xl mx-auto text-center">
//             We partnered with Stripe for a simplified billing.
//           </p>
//         </div>
//       </div>
//       <div className="p-4">
//         <Card
//           title="Your Email"
//           description="Please enter the email address you want to use to login."
//           footer={<p>We will email you to verify the change.</p>}
//         >
//           <p className="text-xl mt-8 mb-4 font-semibold">
//             {user ? user.email : undefined}
//           </p>
//         </Card>

//         <Card
//           title="Username"
//           description="Please enter the username you want to use to login."
//           footer={<p>We will email you to verify the change.</p>}
//         >
//           {Object.entries(details).map(([key, value]) => (
//             <div key={key} className="flex flex-col mt-4">
//               <label htmlFor={key} className="mb-2 font-medium">
//                 {key}
//               </label>
//               <input
//                 id={key}
//                 type="text"
//                 // @ts-ignore
//                 value={value ?? ''}
//                 onChange={(event) => {
//                   const newDetails = { ...details };
//                   newDetails[key] = event.target.value;
//                   setDetails(newDetails);
//                 }}
//                 className="bg-black text-white border border-white rounded-md py-2 px-3 mb-2"
//               />
//             </div>
//           ))}
//           <button
//             onClick={() => {
//               supabase
//                 .from('profiles')
//                 .update(details)
//                 .single()
//                 .then(({ data }) => {
//                   console.log(data);
//                 });
//             }}
//             className="bg-white text-black rounded-md py-2 px-3 mt-4"
//           >
//             Update
//           </button>
//         </Card>
//       </div>
//     </section>
//   );
// }
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
import Avatar from '@/components/Avatar';

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
// s/c render page on server side and then on client side
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

export default function Account({ user }: { user: User }) {
  const [details, setDetails] = useState<any>({
    id: user.id,
    email: user.email,
    username: '',
    first_name: '',
    last_name: '',
    full_name: '',
    avatar_url: '',
    website: '',
    role: 'user',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const getUserDetails = () =>
    supabase.from('profiles').select('*').eq('id', user.id).single();

  useEffect(() => {
    getUserDetails().then(({ data }) => {
      setDetails(data);
    });
  }, []);

  const handleUpdate = async () => {
    console.log('Previous details:', details);
    console.log('User ID:', user.id);

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(details)
      .eq('id', user.id)
      .single();

    if (error) {
      console.log(error);
    }
    alert('👾👾👾 Congrats! Your profile has been updated! 👾👾👾');
  };

  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:items-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl text-center">
            Account
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-2xl max-w-2xl mx-auto text-center">
            🚀 Lets get your account set up 🚀
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={<p>We will email you to verify the change.</p>}
        >
          <p className="text-xl mt-8 mb-4 font-semibold">
            {user ? user.email : undefined}
          </p>
        </Card>

        <Card
          title="Username"
          description="Please enter the username you want to use to login."
          footer={<p>We will email you to verify the change.</p>}
        >
          {details &&
            Object.entries(details).map(([key, value]) => {
              if (key === 'id' || key === 'email' || key === 'role' || key === 'website'|| key === 'avatar_url' || key === 'full_name'  ) return null;
              return (
                <div key={key} className="flex flex-col mt-4">
                  <label htmlFor={key} className="mb-2 font-medium">
                    {key}
                  </label>
                  <input
                    id={key}
                    type="text"
                    // @ts-ignore
                    value={value ?? ''}
                    onChange={(event) => {
                      const newDetails = { ...details };
                      newDetails[key] = event.target.value;
                      setDetails(newDetails);
                    }}
                    className="bg-black text-white border border-white rounded-md py-2 px-3 mb-2"
                  />
                </div>
              );
            })}
          <button
            onClick={() => {
              handleUpdate();
            }}
            className="bg-white text-black rounded-md py-2 px-3 mt-4"
          >
            Update
          </button>
        </Card>
      </div>
    </section>
  );
}
