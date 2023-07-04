'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState('');
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(''), 1000);
  };

  return (
    <div className="prompt_card">
      <div
        className="flex justify-between items-start gap-5
      "
      >
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold font-poppins text-gray-900">
              {post.creator.username}
            </h3>
            <p className="text-xs text-gray-400 font-inter">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/icons/tick.svg'
                : '/assets/icons/icons/copy.svg'
            }
            alt="copied"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-poppins text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter cursor-pointer text-sm blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 border-t border-gray-300 pt-3">
          <p
            className="flex justify-between items-center gap-5 font-poppins green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="flex justify-between items-center gap-5 font-poppins orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
