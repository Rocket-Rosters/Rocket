import { useMemo, useState } from 'react';
export interface Data {
  id: string;
  setId: (id: string) => void;
  role: RoleType;
  setRole: (role: RoleType) => void;
}
type RoleType = 'user' | 'admin' | 'student' | 'faculty' | '';
const AllData = () => {
  const [id, setId] = useState<string>('');
  const [role, setRole] = useState<RoleType>('');
  const provider = useMemo<Data>(
    () => ({ id, setId, role, setRole }),
    [id, setId, role, setRole]
  );
  return provider;
};
export default AllData;
