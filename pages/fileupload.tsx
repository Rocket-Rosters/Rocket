// import Files from '@/components/Files';



// export default function FileUploadPage() {
// return <Files uid={''} url={''} size={0} onUpload={function (url: string): void {
//     throw new Error('Function not implemented.');
// } } />;
// }

// import { useEffect, useState } from 'react';
// import { useSupabase } from 'use-supabase';

// export default function FileUploadPage() {
//   const { storage } = useSupabase();
//   const [files, setFiles] = useState(null);
// //   const [files, setFiles] = useState<FileObject[]>([]);


//   useEffect(() => {
//     async function fetchFiles() {
//       try {
//         const { data, error } = await storage.from('files').list('');
//         if (error) {
//           throw error;
//         }
//         setFiles(data.path);
//       } catch (error) {
//         console.log('Error fetching files:', error);
//       }
//     }
//     fetchFiles();
//   }, [storage]);

//   return (
//     <div>
//       <h1>List of uploaded files:</h1>
//       {files.map((file) => (
//         <div key={file.name}>
//           <a href={storage.from('files').getPublicUrl(file.name)} target="_blank" rel="noreferrer">
//             {file.name}
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import { StorageFile } from '@supabase/storage-js'
// import Files from '@/components/Files'

// export default function FileUpload() {
//   const { storage } = useSupabaseClient()
//   const [files, setFiles] = useState<StorageFile[]>([])
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => {
//     async function fetchFiles() {
//       const { data: files, error } = await storage.from('files').list()
//       if (error) {
//         console.error(error)
//       } else {
//         // setFiles(files)
//         console.log('files:', files)
//       }
//     }
//     fetchFiles()
//   }, [storage])

//   const uploadFiles: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Date.now()}.${fileExt}`
//       const filePath = `${fileName}`

//       let { error: uploadError } = await storage
//         .from('files')
//         .upload(filePath, file, { upsert: true })

//       if (uploadError) {
//         throw uploadError
//       }

//       const { data: newFiles, error: fetchError } = await storage.from('files').list()
//       if (fetchError) {
//         console.error(fetchError)
//       } else {
//         setFiles(newFiles)
//       }
//     } catch (error) {
//       alert('Error uploading files!')
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       {files.map((file) => (
//         <div key={file.id}>
//           <img src={file.data?.publicUrl} alt={file.name} />
//           {/* <Files uid={''} url={file.data.publicUrl} size={0} onUpload={function (url: string): void {
//             throw new Error('Function not implemented.')
//           } } /> */}
//         </div>
//       ))}
//       <div>
//         <label htmlFor="file-upload">Upload an image:</label>
//         <input
//           type="file"
//           id="file-upload"
//           accept="image/*"
//           onChange={uploadFiles}
//           disabled={uploading}
//         />
//         {uploading && <div>Uploading...</div>}
//       </div>
//     </div>
//   )
// }


// import React, { useEffect, useState, ChangeEventHandler } from 'react';
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
// import { StorageFile } from '@supabase/storage-js';

// export default function FileUpload() {
//   const supabase = useSupabaseClient();
//   const [files, setFiles] = useState<StorageFile[]>([]);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     async function fetchFiles() {
//       const { data: files, error } = await supabase.storage.from('files').list();
//       if (error) {
//         console.error(error);
//       } else {
//         // setFiles(files || []);
//       }
//     }
//     fetchFiles();
//   }, [supabase.storage]);

//   const uploadFiles: ChangeEventHandler<HTMLInputElement> = async (event) => {
//     try {
//       setUploading(true);

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.');
//       }

//       const file = event.target.files[0];
//       const fileExt = file.name.split('.').pop();
//       const fileName = `${Date.now()}.${fileExt}`;
//       const filePath = `${fileName}`;

//       let { error: uploadError } = await supabase.storage
//         .from('files')
//         .upload(filePath, file, { upsert: true });

//       if (uploadError) {
//         throw uploadError;
//       }

//       const { data: newFiles, error: fetchError } = await supabase.storage.from('files').list();
//       if (fetchError) {
//         console.error(fetchError);
//       } else {
//         setFiles(newFiles || []);
//       }
//     } catch (error) {
//       alert('Error uploading files!');
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       {files.map((file) => (
//         <div key={file.name}>
//           <img src={supabase.storage.from('files').getPublicUrl(file.name)} alt={file.name} />
//         </div>
//       ))}
//       <div>
//         <label htmlFor="file-upload">Upload an image:</label>
//         <input
//           type="file"
//           id="file-upload"
//           accept="image/*"
//           onChange={uploadFiles}
//           disabled={uploading}
//         />
//         {uploading && <div>Uploading...</div>}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import { Database } from '../utils/database.types'
// type Profiles = Database['public']['Tables']['profiles']['Row']

// export default function Files({
//   uid,
//   url,
//   size,
//   onUpload,
// }: {
//   uid: string
//   url: string
//   size: number
//   onUpload: (url: string) => void
// }) {
//   const supabase = useSupabaseClient<Database>()
//   const [fileUrl, setFileUrl] = useState<Profiles['avatar_url']>(null)
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => {
//     async function downloadImage(path: string) {
//       try {
//         const { data, error } = await supabase.storage.from('files').download(path)
//         if (error) {
//           throw error
//         }
//         const url = URL.createObjectURL(data)
//         setFileUrl(url)
//       } catch (error) {
//         console.log('Error downloading image: ', error)
//       }
//     }

//     if (url) downloadImage(url)
//   }, [url])

//   const uploadFiles: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${uid}.${fileExt}`
//       const filePath = `${fileName}`

//       let { error: uploadError } = await supabase.storage
//         .from('files')
//         .upload(filePath, file, { upsert: false })

//       if (uploadError) {
//         throw uploadError
//       }

//       onUpload(filePath)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       {fileUrl ? (
//         <img
//           src={fileUrl}
//           alt="File"
//           className="file image"
//         //   style={{ height: size, width: size }}
//         />
//       ) : (
//         <div className="file no-image" style={{ height: size, width: size }} />
//       )}
//       <div style={{ width: size }}>
//         <label className="button primary block" htmlFor="single">
//           {uploading ? 'Uploading ...' : 'Upload'}
//         </label>
//         <input
//           style={{
//             visibility: 'hidden',
//             position: 'absolute',
//           }}
//           type="file"
//           id="single"
//           accept="image/*"
//           onChange={uploadFiles}
//           disabled={uploading}
//         />
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { StorageFile } from '@supabase/storage-js'
import { Database } from '../utils/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Files({
  uid,
  onUpload,
}: {
  uid: string
  onUpload: (url: string) => void
}) {
  const supabase = useSupabaseClient()
  const { storage } = useSupabaseClient()
  const [files, setFiles] = useState<StorageFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    async function fetchFiles() {
      try {
        const { data: files, error } = await supabase.storage
          .from('files')
          .list(uid)

        if (error) {
          throw error
        }

        setFiles(files || [])
      } catch (error) {
        console.log('Error fetching files: ', error)
      }
    }

    fetchFiles()
  }, [storage, uid])

  const uploadFiles: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('files')
        .upload(filePath, file, { upsert: false })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName)
      setImageUrl(data.publicUrl)

      onUpload(filePath)
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #9370DB' }}>
        <thead>
          <tr style={{ backgroundColor: '#9370DB' }}>
            <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid white', color: 'white', borderRight: '2px solid white' }}>Health Documents</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.name} style={{ borderBottom: '1px solid #9370DB', backgroundColor: '#E6E6FA' }}>
              <td style={{ padding: '10px', borderRight: '2px solid #9370DB', color: 'black' }}>{file.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <label
          className="button primary"
          htmlFor="single"
          style={{ backgroundColor: '#9370DB', color: 'white', padding: '10px 20px', border: '2px solid #9370DB', cursor: 'pointer' }}
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadFiles}
          disabled={uploading}
        />
      </div>
    </div>
  );
}  