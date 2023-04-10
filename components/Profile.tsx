import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@supabase/auth-ui-shared';



type ProfileData = {
  id: number;
  user_id: string;
  name: string;
  bio: string;
};

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const user = supabase.auth.user();
        if (user) {
          const { data, error } = await supabase
            .from<ProfileData>('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          if (data) {
            setProfileData(data);
          }
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfileData();
  }, [router]);

  async function handleUpdateProfile() {
    try {
      const user = supabase.auth.user();
      if (user && profileData) {
        const { error } = await supabase
          .from<ProfileData>('profiles')
          .update({ name: newName, bio: newBio })
          .eq('user_id', user.id);
        if (!error) {
            setProfileData({ ...profileData, name: newName, bio: newBio });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {profileData ? (
        <>
          <p>Name: {profileData.name}</p>
          <p>Bio: {profileData.bio}</p>
          <input
            type="text"
            placeholder="New Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}
