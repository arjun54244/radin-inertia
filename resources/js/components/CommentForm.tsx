export const CommentForm: React.FC = () => {
  return (
    <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 mt-8">
      <h5 className="text-lg font-semibold">Leave A Comment:</h5>
      <form className="mt-8">
        <div className="grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 mb-5">
            <label htmlFor="name" className="font-semibold">Your Name:</label>
            <input id="name" name="name" type="text" placeholder="Name :" className="w-full mt-2 px-3 py-2 h-10 rounded border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-slate-900 dark:text-slate-200 outline-none ps-11" />
          </div>
          <div className="lg:col-span-6 mb-5">
            <label htmlFor="email" className="font-semibold">Your Email:</label>
            <input id="email" name="email" type="email" placeholder="Email :" className="w-full mt-2 px-3 py-2 h-10 rounded border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-slate-900 dark:text-slate-200 outline-none ps-11" />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="comments" className="font-semibold">Your Comment:</label>
          <textarea id="comments" name="comments" placeholder="Message :" className="w-full mt-2 px-3 py-2 h-28 rounded border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-slate-900 dark:text-slate-200 outline-none ps-11" />
        </div>
        <button type="submit" className="py-2 px-5 font-semibold tracking-wide text-base text-white bg-orange-500 rounded-md w-full duration-500">
          Send Message
        </button>
      </form>
    </div>
  );
};
