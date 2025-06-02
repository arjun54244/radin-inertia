import React from "react";

interface Testimonial {
  id: string;
  title: string;
  youtubeUrl: string;
}

interface YouTubeTestimonialsProps {
  testimonials: Testimonial[];
}

const YouTubeTestimonialsGrid: React.FC<YouTubeTestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-200"
          >
            <div className="relative w-full">
              <iframe
                className="w-full h-[400px] md:h-[600px] lg:h-[600px] rounded-t-3xl"
                src={`https://www.youtube.com/embed/${new URL(testimonial.youtubeUrl).searchParams.get("v")}`}
                title={testimonial.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-3 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeTestimonialsGrid;
