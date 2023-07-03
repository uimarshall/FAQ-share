'use client';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/create-prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      alert('Created Successfully!');
      router.push('/');
    } catch (e) {
      // throw Error(e.message);
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        title="Create"
        post={post}
        setPost={setPost}
        handleSubmit={createPrompt}
        submitting={submitting}
      />
    </div>
  );
};

export default CreatePrompt;
