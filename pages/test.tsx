import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import PageWrapper from '@/lib/pageWrapper';

  export let studentId: any[] = [];
  export let facultyId = [];
export default function Search() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleStudents = (data: any) => {
    studentId.push(data);  
    console.log(data);
    console.log(studentId);
  }

  const handleFaculty = (data: any) => {
    facultyId.push(data);  
  }

  const handleClear = () => {
    setSearchTerm('');
    studentId = [];
    facultyId = [];
  }

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
    style={{ color: 'black' }}
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button onClick={handleSearch} style={{ padding: '1px', margin: '5px'}}>Search</Button>
  {searchResults.length > 0 && (
    <div style={{ backgroundColor: '#E6E6FA', color: 'black', border: '1px solid white' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
          <tr>
            <th style={{ border: '1px solid White', padding: '5px', backgroundColor: '#9370DB', color: 'white' }}>Name</th>
            <th style={{ border: '1px solid white', padding: '5px', backgroundColor: '#9370DB', color: 'white' }}>ID</th>
            <th style={{ border: '1px solid white', padding: '5px', backgroundColor: '#9370DB', color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result?.id}>
              <td style={{ border: '1px solid white', padding: '5px' }}>
                <span>{result?.full_name}</span>
              </td>
              <td style={{ border: '1px solid white', padding: '5px' }}>
                <span>{result?.id}</span>
              </td>
              <td style={{ border: '1px solid white', padding: '5px' }}>
              <Button
                style={{ padding: '5px', marginRight: '5px' }}
                onClick={() =>
                  handleStudents(
                    result?.id
                  )
                }
              >
                Add Student
              </Button>
              <Button
                style={{ padding: '5px', marginRight: '5px' }}
                onClick={() =>
                  handleFaculty(
                    result?.id
                  )
                }
              >
                Add Faculty
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
  </div>
  )}

