'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data); // fetch all posts by user and store in the state of the component.
    };
    if (session?.user.id) fetchPosts(); // fetch posts only if the user is logged in.
  }, [session?.user.id]); // re-fetch posts if the user id changes. This will stop re-rendering of the component.

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async () => {};

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to my profile page!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProfilePage;
