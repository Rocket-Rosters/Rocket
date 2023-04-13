// This is a custom hook that fetches the user's profile from the database
import { useEffect, useState, createContext, useContext } from 'react';

import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';

import { ProfileDetails } from 'types';

type ProfilecontextType = {
  accessToken: string | null;
  user: User | null;
  profileDetails: ProfileDetails | null;
  isLoading: boolean;
};

export const ProfileContext = createContext<ProfilecontextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyProfileContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails | null>(
    null
  );

  const getProfileDetails = () =>
    supabase.from('profiles').select('*').single();

  useEffect(() => {
    if (user && !isLoadingData && !profileDetails) {
      setIsloadingData(true);
      getProfileDetails().then((result) => {
        if (result.data) setProfileDetails(result.data as ProfileDetails);
        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setProfileDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    profileDetails,
    isLoading: isLoadingUser || isLoadingData
  };

  return <ProfileContext.Provider value={value} {...props} />;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileContextProvider');
  }
  return context;
};
