import { Marquee3D } from "@/components/Created/ReviewCard";
import CityscapeGallery from "@/components/Created/ScrollAnimation/Content";
import { TextAnimateDemo6 } from "@/components/Created/TextAnimateDemo";

import { TypingAnimationDemo } from "@/components/Created/TypingAnimationDemo";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public Transport Complaints",
  description: "Report a problem. We'll get back to you.",
};

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto mt-10">
        <div className="h-[600px] rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat relative shadow-xl"
          style={{ backgroundImage: "url('/joel-de-vriend-qZ6if8WXl7E-unsplash.jpg')" }}
        >
          <div className="absolute inset-0  backdrop-blur-sm flex flex-col justify-end p-10 gap-5 text-white">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              Public Transport Complaints
            </h1>
            <p className="text-xl opacity-90">
              Report a problem. We&apos;ll get back to you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="w-44 text-base font-semibold shadow-md hover:scale-105 transition">
                <Link href="/complaint/create">
                  Submit a Complaint
                </Link>
              </Button>
              <Button variant="outline" className="w-44 text-base font-semibold border-white text-black hover:bg-black hover:text-white hover:border transition">
                <Link href="/complaint">   View Complaints
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Process */}
      <section className="relative z-0 mt-20 overflow-hidden bg-gray-100 dark:bg-black py-20">
        {/* Background animation pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <AnimatedGridPattern />
        </div>

        {/* Content container */}
        <div className="relative z-10 container mx-auto flex flex-col gap-10 px-4 md:px-8">
          <TextAnimateDemo6>Step-by-Step Complaint Process</TextAnimateDemo6>
          <CityscapeGallery />
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="container mx-auto mt-20 text-center flex flex-col items-center gap-10">
        <TypingAnimationDemo>What People Are Saying</TypingAnimationDemo>
        <Marquee3D />
      </section>



    </main>
  );
}
