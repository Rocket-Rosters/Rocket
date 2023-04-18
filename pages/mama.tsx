import { useState, ReactNode, useEffect, SetStateAction } from 'react';
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
import Dropdown from '@/components/ui/Dropdown';
const options: any = [
  { value: 'option1', label: 'Here' },
  { value: 'option2', label: 'Absent' },
  { value: 'option3', label: 'Late' }
];

function DropdownPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelect(option: SetStateAction<null>) {
    setSelectedOption(option);
  }

  return (
    <div>
      <h1>Dropdown Example</h1>
      {/*@ts-ignore */}
      <Dropdown options={options} onSelect={handleSelect} />
      //@ts-ignore
      {/*@ts-ignore */}
      {selectedOption && <p>You selected {selectedOption.label}.</p>}
    </div>
  );
}

export default DropdownPage;
