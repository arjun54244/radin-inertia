import { BlogCommentType } from "@/types/blog";

interface CommentSectionProps {
  comments: BlogCommentType[];
}

export const BlogCommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-slate-800 dark:text-white">
        {comments.length} Comment{comments.length !== 1 && "s"}
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet.</p>
      ) : (
        <ul className="space-y-8">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4 items-start">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=random`}
                alt={comment.user.name}
                className="w-12 h-12 rounded-full shadow"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap text-sm text-slate-500 dark:text-slate-300">
                  <span className="text-orange-600 font-semibold dark:text-orange-500">{comment.user.name}</span>
                  {/* <span>{new Date(comment.created_at).toLocaleString()}</span> */}
                </div>
                <p className="mt-2 text-slate-700 dark:text-slate-200">{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
