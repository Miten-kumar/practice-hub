import { useState, useMemo } from 'react';

interface User {
  id: number;
  name: string;
}

const SearchBox = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {

    return users.filter((u) => 
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search,users]); 


  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Type to search..." 
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;