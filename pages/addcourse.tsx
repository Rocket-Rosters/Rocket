import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';

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

  const handleCreate = async (event) => {
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
      const updatedCourses = courses.map((course) =>
        course.id === id ? { ...course, name, start_date: startDate, end_date: endDate } : course
      );
      setCourses(updatedCourses);
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from('courses').delete().eq('id', id);

    if (error) {
      console.error(error);
    } else {
      console.log('Course deleted:', data);
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
    }
  };

  return (
    <div>
      <h1 style={{ color: 'black' }}>Courses</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="name" style={{ color: 'black' }}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{ color: 'inherit' }}
        />
  
        <label htmlFor="startDate" style={{ color: 'black' }}>Start date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          style={{ color: 'inherit' }}
        />
  
        <label htmlFor="endDate" style={{ color: 'black' }}>End date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          style={{ color: 'inherit' }}
        />
  
        <button type="submit">Create course</button>
      </form>
  
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.start_date}</td>
              <td>{course.end_date}</td>
              <td>
                <button onClick={() => handleUpdate(course.id, 'New name', course.start_date, course.end_date)}>
                  Update
                </button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default CoursesPage;