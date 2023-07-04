'use client';
import Form from '@components/Form';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditPrompt = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [loading, setLoading] = useState(true);

  // const [id, setId] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const fetchPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
      setLoading(false);
    };
    if (promptId) fetchPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    if (!post.prompt || !post.tag) {
      alert('Please fill all the fields');
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/ json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      // alert('Created Successfully!');
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
        title="Edit"
        post={post}
        setPost={setPost}
        handleSubmit={updatePrompt}
        submitting={submitting}
      />
    </div>
  );
};

export default EditPrompt;
