import { GetStaticPropsResult } from 'next';

import Profile from '@/components/Profile';
import Avatar from '@/components/Avatar';



export default function ProfilePage() {
//   return <Profile />;
//   return <Avatar uid={''} url={null} size={0} onUpload={function (url: string): void {
//       throw new Error('Function not implemented.');
//   } } />;
return <Avatar uid="123" url="https://url.to/your/image.jpg" size={100} onUpload={function (url: string): void { }} />;
//   return <Avatar uid="123" url="https://url.to/your/image.jpg" size={100} onUpload={handleUpload} />
}
{/* <Avatar uid="123" url="https://url.to/your/image.jpg" size={100} onUpload={handleUpload} /> */}
