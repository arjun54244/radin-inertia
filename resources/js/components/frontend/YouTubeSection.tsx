export default function YouTubeSection({ videoIds, title }: { videoIds: string[], title?: string }) {
  if (!videoIds.length) return null;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-10 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        {title || "YouTube Videos"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoIds.map((id) => (
          <div
            key={id}
            className="aspect-video w-full flex items-center justify-center overflow-hidden rounded-xl shadow-md transition-transform transform hover:scale-105 bg-black"
          >
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={`YouTube video ${id}`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
