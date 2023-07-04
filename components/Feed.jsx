'use client';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_card_list mt-16 prompt_layout">
      {data?.map((prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed relative">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for tags"
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
