// import { useState, useEffect, ReactNode } from 'react';
// import { supabase } from '@/utils/supabase-client';
// import { v4 as uuidv4 } from 'uuid';

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

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     const { data, error } = await supabase.from('courses').select('*');

//     if (error) {
//       console.error(error);
//     } else {
//       setCourses(data);
//     }
//   };

//   const handleCreate = async (event) => {
//     event.preventDefault();

//     const id = uuidv4();

//     const { data, error } = await supabase.from('courses').insert({
//       id,
//       name,
//       start_date: startDate,
//       end_date: endDate,
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course created:', data);
//       setCourses([...courses, data[0]]);
//       setName('');
//       setStartDate('');
//       setEndDate('');
//     }
//   };

//   const handleUpdate = async (id: any, name: string, startDate: any, endDate: any) => {
//     const { data, error } = await supabase
//       .from('courses')
//       .update({ name, start_date: startDate, end_date: endDate })
//       .eq('id', id);

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course updated:', data);
//       const updatedCourses = courses.map((course) =>
//         course.id === id ? { ...course, name, start_date: startDate, end_date: endDate } : course
//       );
//       setCourses(updatedCourses);
//     }
//   };

//   const handleDelete = async (id) => {
//     const { data, error } = await supabase.from('courses').delete().eq('id', id);

//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Course deleted:', data);
//       const updatedCourses = courses.filter((course) => course.id !== id);
//       setCourses(updatedCourses);
//     }
//   };

//   return (
//     <div>
//       <h1 style={{ color: 'black' }}>Courses</h1>
//       <form onSubmit={handleCreate}>
//         <label htmlFor="name" style={{ color: 'black' }}>Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//           style={{ color: 'inherit' }}
//         />
  
//         <label htmlFor="startDate" style={{ color: 'black' }}>Start date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(event) => setStartDate(event.target.value)}
//           style={{ color: 'inherit' }}
//         />
  
//         <label htmlFor="endDate" style={{ color: 'black' }}>End date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(event) => setEndDate(event.target.value)}
//           style={{ color: 'inherit' }}
//         />
  
//         <button type="submit">Create course</button>
//       </form>
  
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Start date</th>
//             <th>End date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
  
//         <tbody>
//           {courses.map((course) => (
//             <tr key={course.id}>
//               <td>{course.name}</td>
//               <td>{course.start_date}</td>
//               <td>{course.end_date}</td>
//               <td>
//                 <button onClick={() => handleUpdate(course.id, 'New name', course.start_date, course.end_date)}>
//                   Update
//                 </button>
//                 <button onClick={() => handleDelete(course.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
  
// };

// export default CoursesPage;


import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
// import { Card } from './Card';

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

// function CoursesTable({ courses, handleUpdate, handleDelete }: any) {
//   return (
//     <table style={{ margin: 'auto', border: '2px solid purple' }}>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Start date</th>
//           <th>End date</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {courses.map((course: any) => (
//           <tr key={course.id}>
//             <td>{course.name}</td>
//             <td>{course.start_date}</td>
//             <td>{course.end_date}</td>
//             <td>
//               <button onClick={() => handleUpdate(course.id, 'New name', course.start_date, course.end_date)}>
//                 Update
//               </button>
//               <button onClick={() => handleDelete(course.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

function CoursesTable({ courses, handleUpdate, handleDelete }: any) {
  return (
    <table style={{ margin: 'auto', borderCollapse: 'collapse', border: '2px solid black', backgroundColor: '#E6E6FA', color: 'black' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid purple', padding: '10px', backgroundColor: '#9370DB', color: 'white' }}>Name</th>
          <th style={{ border: '1px solid purple', padding: '10px', backgroundColor: '#9370DB', color: 'white' }}>Start date</th>
          <th style={{ border: '1px solid purple', padding: '10px', backgroundColor: '#9370DB', color: 'white' }}>End date</th>
          <th style={{ border: '1px solid purple', padding: '10px', backgroundColor: '#9370DB', color: 'white' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course: any) => (
          <tr key={course.id}>
            <td style={{ border: '1px solid purple', padding: '10px' }}>{course.name}</td>
            <td style={{ border: '1px solid purple', padding: '10px' }}>{course.start_date}</td>
            <td style={{ border: '1px solid purple', padding: '10px' }}>{course.end_date}</td>
            <td style={{ border: '1px solid purple', padding: '10px' }}>
              <Button style={{ padding: '5px', marginRight: '5px' }} onClick={() => handleUpdate(course.id, 'New name', course.start_date, course.end_date)}>
                Update
              </Button>
              <Button style={{ padding: '5px' }} onClick={() => handleDelete(course.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*');

    if (error) {
      console.error(error);
    } else {
      setCourses(data);
    }
  };

  const handleCreate = async (event: any) => {
    event.preventDefault();

    const id = uuidv4();

    const { data, error } = await supabase.from('courses').insert({
      id,
      name,
      start_date: startDate,
      end_date: endDate,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Course created:', data);
      setCourses([...courses, data[0]]);
      setName('');
      setStartDate('');
      setEndDate('');
    }
  };

  const handleUpdate = async (id: any, name: string, startDate: any, endDate: any) => {
    const { data, error } = await supabase
      .from('courses')
      .update({ name, start_date: startDate, end_date: endDate })
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      console.log('Course updated:', data);
      const updatedCourses = courses.map((course: any) =>
        course.id === id ? { ...course, name, start_date: startDate, end_date: endDate } : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleDelete = async (id: any) => {
    const { data, error } = await supabase.from('courses').delete().eq('id', id);

    if (error) {
      console.error(error);
    } else {
      console.log('Course deleted:', data);
      const updatedCourses = courses.filter((course: any) => course.id !== id);
      setCourses(updatedCourses);
    }
  };

  return (
    <div>
    <Card title="Create Course" description="Enter new course information">
      {/* <h1 style={{ color: 'purple', marginBottom: '20px' }}>Make New Course</h1> */}
      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ color: '#9370DB', marginRight: '10px' }}>
            Name:
          </label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} style={{ color: 'black', padding: '5px', borderRadius: '5px', border: '1px solid white' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="startDate" style={{ color: '#9370DB', marginRight: '10px' }}>
            Start date:
          </label>
          <input type="date" id="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)} style={{ color: 'black', padding: '5px', borderRadius: '5px', border: '1px solid white' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="endDate" style={{ color: '#9370DB', marginRight: '10px' }}>
            End date:
          </label>
          <input type="date" id="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)} style={{ color: 'black', padding: '5px', borderRadius: '5px', border: '1px solid white' }} />
        </div>
        <Button type="submit" style={{  padding: '10px', borderRadius: '5px', border: 'none' }}>
          Create course
        </Button>
      </form>
    </Card> 
    <Card title="Courses" description="List of all courses"> <CoursesTable courses={courses} handleUpdate={handleUpdate} handleDelete={handleDelete} /> </Card>
    </div>
       ); };

  export default CoursesPage;

  // <div>
    //   <h1 style={{ color: 'white' }}>Make New Course</h1>
    //   <form onSubmit={handleCreate}>
    //     <label htmlFor="name" style={{ color: 'white' }}>
    //       Name:
    //     </label>
    //     <input
    //       type="text"
    //       id="name"
    //       value={name}
    //       onChange={(event) => setName(event.target.value)}
    //       style={{ color: 'inherit' }}
    //     />

    //     <label htmlFor="startDate" style={{ color: 'white' }}>
    //       Start date:
    //     </label>
    //     <input
    //       type="date"
    //       id="startDate"
    //       value={startDate}
    //       onChange={(event) => setStartDate(event.target.value)}
    //       style={{ color: 'inherit' }}
    //     />

    //     <label htmlFor="endDate" style={{ color: 'white' }}>
    //       End date:
    //     </label>
    //     <input
    //       type="date"
    //       id="endDate"
    //       value={endDate}
    //       onChange={(event) => setEndDate(event.target.value)}
    //       style={{ color: 'inherit' }}
    //     />

    //     <button type="submit">Create course</button>
    //   </form>
