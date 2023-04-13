import { useEffect, useState } from 'react';
import PageWrapper from '@/lib/pageWrapper';
import { useRouter } from 'next/router';
export default function CourseDetails() {
  const router = useRouter();
  const courseId = router.query.courseId;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);

  async function getCourse() {
    // fetch course details
    // set the important course details
    // set students
    setCourse({});
    // gets list of stuent IDs
    // loop throgh and get studen't details from profile table
    setStudents([]);
  }

  function StudentCard({ student }: any) {
    return (
      //display name and email
      <div>
        <p>{student.name}</p>
        <button
          onClick={() => {
            let _students = presentStudents;
            setPresentStudents([..._students, student]);
          }}
        >
          Mark Present
        </button>
      </div>
    );
  }
  useEffect(() => {
    setLoading(true);
    console.log(courseId);
    getCourse();
    setLoading(false);
  }, [courseId]);

  return (
    <PageWrapper allowedRoles={['admin', 'faculty']}>
      <h1>Course Details</h1>
      <p>Course ID: {courseId}</p>
      {/* show course details */}
      {/* show students */}
      {presentStudents.length > 0 ? (
        <div>
          <button>submit attendance</button>
        </div>
      ) : (
        <></>
      )}
      {students.length === 0 ? (
        <p>No students enrolled</p>
      ) : (
        <>
          {students.map((item) => {
            return <StudentCard student={item} />;
          })}
        </>
      )}
    </PageWrapper>
  );
}
