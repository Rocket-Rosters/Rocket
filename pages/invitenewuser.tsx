import { ReactNode, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function InviteStudentsPage() {
  const [file, setFile] = useState<File | null>(null);
  // const [invitedCount, setInvitedCount] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target?.result;
      if (typeof data === 'string') {
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet);
  
        const emailColumn = 'email'; // Replace with the name of the column that contains the email addresses
        const emails = rows
          .map((row: any) => row[emailColumn])
          .filter((email: any) => email);
  
        console.log(emails);
  
        for (const email of emails) {
          // @ts-ignore
          const { error } = await supabase.auth.signUp({
            email,
            password: 'password'
          });
  
          if (error) {
            console.error(error);
          }
          // take the email and grab the user id from the database
          // then add the user id to the course_users table
          const { data, error:any  } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();
          if (error) {
            console.error(error);
          }
          console.log(data);

        }
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <Card
        title="Invite Students"
        description="Invite students to your course by uploading a spreadsheet with their email addresses."
      >
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="file">
              Select a file
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-60"
              />
            </div>
          </div>
        </form>
        
        {/* make a button that trigers handleFormSubmit */}
        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg px-4 py-2 text-sm font-medium text-white"
          onClick={handleFormSubmit}
        >
          Send Invite
        </button>
      </Card>
    </div>
  );
}

