import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@/utils/useUser';
import PageWrapper from '@/lib/pageWrapper';

const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key');

export default function AnnouncementPage() {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { data, error } = await supabase.from('announcements').insert({
      title,
      content,
      user_id: user?.id,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Announcement created successfully:', data);
      setTitle('');
      setContent('');
    }
  };

  return (
    <PageWrapper allowedRoles={['admin']}>
      <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Create Announcement</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
        </>
    </PageWrapper>
  );
}