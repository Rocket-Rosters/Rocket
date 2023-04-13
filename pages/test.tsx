import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';
export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('full_name', `%${searchTerm}%`);

    if (error) {
      console.log(error);
    } else {
      //@ts-ignore
      setSearchResults(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <ul>
        {searchResults.map((result) => (
          <li key={result?.faculty}>{result?.id}</li>
        ))}
      </ul>
    </div>
  );
}
