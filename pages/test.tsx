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
    // <div>
    //   <input
    //     type="text"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />
    //   <Button onClick={handleSearch}>Search</Button>
    //   <ul>
    //     {searchResults.map((result) => (
          
    //       <li key={result?.faculty}>{result?.id}</li>
          
    //     ))}
    //   </ul>
    // </div>
  //   <div>
  //     <input
  //       type="text"
  //       value={searchTerm}
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //     />
  //     <Button onClick={handleSearch}>Search</Button>
  //     <ul>
  //       {searchResults.map((result) => (
  //         <li key={result?.id}>
  //           <span style={{ color: 'purple' }}>{result?.full_name}</span>
  //           <br />
  //           ID: {result?.id}
  //           <br />
  //           Actions: [Add action buttons here]
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  <div>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button onClick={handleSearch}>Search</Button>
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
                  handleUpdate(
                    course.id,
                    'New name',
                    course.start_date,
                    course.end_date
                  )
                }
              >
                Add Student
              </Button>
              <Button
                style={{ padding: '5px', marginRight: '5px' }}
                onClick={() =>
                  handleUpdate(
                    course.id,
                    'New name',
                    course.start_date,
                    course.end_date
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
);
}
