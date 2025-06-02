export const ReviewList: React.FC = () => {
  const reviews = [
    { id: 1, name: "Calvin Carlo", date: "6th May 2022", rating: 5 },
    { id: 2, name: "Jane Doe", date: "7th May 2022", rating: 5 },
    { id: 3, name: "John Smith", date: "8th May 2022", rating: 5 },
    { id: 4, name: "Alice Bob", date: "9th May 2022", rating: 5 },
  ];

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={`assets/images/client/0${review.id}.jpg`} className="h-11 w-11 rounded-full shadow" alt={review.name} />
              <div className="ms-3 flex-1">
                <a href="#" className="text-lg font-semibold hover:text-orange-500 duration-500">
                  {review.name}
                </a>
                <p className="text-sm text-slate-400">{review.date}</p>
              </div>
            </div>
            <a href="#" className="text-slate-400 hover:text-orange-500 duration-500 ms-5">
              <i className="mdi mdi-reply"></i> Reply
            </a>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow-sm dark:shadow-gray-800 mt-6">
            <ul className="list-none inline-block text-orange-400">
              {[...Array(review.rating)].map((_, i) => (
                <li key={i} className="inline">
                  <i className="mdi mdi-star text-lg"></i>
                </li>
              ))}
              <li className="inline text-slate-400 font-semibold">{review.rating.toFixed(1)}</li>
            </ul>
            <p className="text-slate-400 italic">" There are many variations of passages of Lorem Ipsum available, but most have suffered alteration... "</p>
          </div>
        </div>
      ))}
    </>
  );
};
