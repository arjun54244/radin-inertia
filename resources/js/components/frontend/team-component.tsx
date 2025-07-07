const teamMembers = [
    {
        name: "Alexandra Thompson",
        post: "CEO & Founder",
        image: "/placeholder.svg?height=400&width=400",
        description:
            "Alexandra is a visionary leader with over 20 years of experience in technology and business strategy. She founded the company with a mission to revolutionize how teams collaborate and innovate. Under her leadership, we've grown from a startup to an industry leader, always maintaining our core values of innovation, integrity, and excellence.",
        featured: true,
    },
    {
        name: "Marcus Rodriguez",
        post: "Chief Technology Officer",
        image: "/placeholder.svg?height=300&width=300",
        description:
            "Marcus leads our technical vision and oversees all engineering initiatives. With expertise in AI, cloud architecture, and scalable systems, he ensures our platform remains cutting-edge and reliable.",
        featured: false,
    },
    {
        name: "Sarah Chen",
        post: "Head of Product Design",
        image: "/placeholder.svg?height=300&width=300",
        description:
            "Sarah brings user-centered design thinking to every product decision. Her background in psychology and design helps create intuitive experiences that users love.",
        featured: false,
    },
]

export default function Team({teams}: { teams?: any[] }) {
    const regularMembers = teamMembers.filter((member) => !member.featured)
    const safeTeams = teams ?? [];
    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-black"></div>
                        <h3 className="text-3xl md:text-4xl font-medium bold">Meet Our Team</h3>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-black to-orange-500"></div>
                    </div>
                    <p className="my-4  text-gray-500"> We're a passionate group of innovators, creators, and problem-solvers dedicated to building exceptional
                        experiences and driving meaningful change.</p>
                </div>

                {safeTeams.map((member, index) => (
                    <div className="mb-16" key={index}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex">
                                <div className="w-2 bg-gradient-to-b from-orange-500 via-orange-600 to-black flex-shrink-0"></div>
                                <div className="flex-1 p-8 md:p-12">
                                    <div className="flex flex-row md:flex-row gap-8 items-center lg:items-start">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-48 h-48 md:w-56 md:h-56 relative">
                                                <img
                                                    src={'/storage/'+ member.image || '/placeholder.svg?height=400&width=400'}
                                                    alt={member.name}
                                                    className="rounded-2xl object-cover shadow-lg"
                                                />
                                                <div className="absolute inset-0 rounded-2xl ring-4 ring-orange-200 ring-opacity-50"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-left lg:text-left">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                            <p className="text-xl text-orange-600 font-semibold mb-6">{member.post}</p>
                                            <p className="text-gray-700 text-lg leading-relaxed">{member.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
