import React from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/utils/supabase-client';

interface UserData {
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  website?: string | null;
  role?: string;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

const ImportUsers: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // @ts-ignore
    setFile(file);
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

        // dictionary of emails and ids
        const ids: any = [];

        for (const email of emails) {
          // @ts-ignore
          const { error } = await supabase.auth.signUp({
            email,
            password: 'password',
          });

          if (error) {
            console.error(error);
          }

          // take the email and grab the user id from the database
          // then add the user id to the course_users table
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();

          if (profileError) {
            console.error(profileError);
          }

          if (data) {
            ids.push({ email: email, id: data.id });
          }
        }

        // for each email in the dictionary use the ID and edit the profile table
        // and use the email to get all the data to edit the profile table from the json file
        for (const id of ids) {
          // read the JSON data for the user
          // @ts-ignore
          const userData: UserData = rows.find((row: any) => row[emailColumn] === id.email);

          const { data, error } = await supabase
            .from('profiles')
            .update({
              username: userData.username || null,
              first_name: userData.first_name || null,
              last_name: userData.last_name || null,
              full_name: userData.full_name || null,
              avatar_url: userData.avatar_url || null,
              website: userData.website || null,
              role: userData.role || 'user',
              address_line1: userData.address_line1 || null,
              address_line2: userData.address_line2 || null,
              city: userData.city || null,
              state: userData.state || null,
              postal_code: userData.postal_code || null,
              country: userData.country || null
            })
            .eq('id', id.id);

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
    <form onSubmit={handleFormSubmit}>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImportUsers; 