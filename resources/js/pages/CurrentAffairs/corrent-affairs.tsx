import CurrentAffair from "@/components/frontend/CurrentAffair";
import FrontendLayout from "@/layouts/frontend-layout";

interface CurrentAffairType {
    english: string;
    hindi: string;
}

interface Props {
    correntaffer: CurrentAffairType;
}

export default function CurrentAffairsPage({ correntaffer }: Props) {
    console.log(correntaffer);
    return (
        <>
            <FrontendLayout>
                <section className="relative md:pt-45">
                    <div className="container-fluid relative z-10 py-8 px-4 mx-auto lg:max-w-screen-xl sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-x-5 gap-y-7 items-center justify-center">
                            
                            <CurrentAffair
                                title="Current Affairs (English)"
                                image="https://radianbooks.in/img/current-af/eng.png"
                                link="/current-affairs/english"
                            />
                            <CurrentAffair
                                title="Current Affairs (हिन्दी)"
                                image="https://radianbooks.in/img/current-af/hi.png"
                                link="/current-affairs/hindi"
                            />
                        </div>
                    </div>
                </section>
            </FrontendLayout>
        </>
    );
}