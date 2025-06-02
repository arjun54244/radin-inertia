import { Facebook, Instagram, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. R.S. Aggarwal",
    role: "Mentor",
    image: "https://radianbooks.in/Uploads/Team/1.webp",
  },
  {
    name: "Preeti Aggarwal",
    role: "Founder & CEO",
    image: "https://radianbooks.in/Uploads/Team/753913354_3.webp",
  },
  
  {
    name: "Deepak Aggarwal",
    role: "Co-Founder",
    image: "https://radianbooks.in/Uploads/Team/286367502_2.webp",
  },
];

const Team = () => {
  return (
    <div className="container relative md:mt-24 mt-16">
      <div className="grid grid-cols-1 justify-center text-center mb-4">
        <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Minds</h6>
        <h5 className="font-semibold text-3xl leading-normal my-4">
          Meet Our Team Members
        </h5>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="lg:col-span-4 md:col-span-6">
            <div className="group text-center">
              <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                <img src={member.image} alt={member.name} className="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500"></div>
                <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
                  <li className="inline">
                    <a href="#" className="size-8 inline-flex items-center justify-center rounded-full bg-orange-500 text-white">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </li>
                  <li className="inline">
                    <a href="#" className="size-8 inline-flex items-center justify-center rounded-full bg-orange-500 text-white">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </li>
                  <li className="inline">
                    <a href="#" className="size-8 inline-flex items-center justify-center rounded-full bg-orange-500 text-white">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="content mt-3">
                <a href="#" className="text-lg font-semibold hover:text-orange-500 duration-500">
                  {member.name}
                </a>
                <p className="text-slate-400">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;