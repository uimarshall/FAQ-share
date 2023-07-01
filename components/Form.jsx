import Link from 'next/link';

const Form = ({ title, post, setPost, handleSubmit, submitting }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{title} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {title} and share all your FAQ with others, let&apos;s all leverage the
        power of any AI-powered platform!
      </p>
      <form
        onSubmit={handleSubmit}
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="text-gray-400 font-roboto font-semibold text-base">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your AI Prompt here..."
            required
            className="form_textarea"
          />
        </label>
        {/* Tag */}
        <label htmlFor="">
          <span className="text-gray-400 font-roboto font-semibold text-base">
            Tag (#webdevelopment, #random, #productdesign, #valentine, )
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag..."
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-5">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1 text-sm bg-primary-orange rounded-full text-white font-semibold"
          >
            {submitting ? `${title}...` : title}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
