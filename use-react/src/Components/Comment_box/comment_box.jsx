function Comment_box({ children }) {
  return (
    <>
      <form id='comment-form' class='py-5'>
        <textarea
          id='comment-input'
          class='w-full p-3 border border-gray-300 rounded-md mb-3'
          rows='4'
          placeholder='Type your comment...'
        ></textarea>
        <button
          type='submit'
          class='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md'
        >
          Submit Review
        </button>
      </form>
      <div>
        {children}
      </div>
    </>
  );
}

export default Comment_box
