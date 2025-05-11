import CityscapeGallery from "@/components/Created/ScrollAnimation/Content";
import ScrollContent from "@/components/Created/ScrollAnimation/Content";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Public Transport Complaints  ",
  description: " Report a problem. We'll get back to you.",
};

export default function Home() {
  return (
    <div className="container mt-8 mx-auto">

      <div
        className=" h-[550px] text-white mx-auto 
        flex flex-col gap-4 bg-[url('/joel-de-vriend-qZ6if8WXl7E-unsplash.jpg')]
         bg-cover bg-center bg-no-repeat    overflow-hidden rounded-3xl  justify-end p-8"
      >
        <h1 className="text-4xl font-bold">Public Transport Complaints</h1>
        <p className="text-lg">Report a problem. We&apos;ll get back to you.</p>
        <div>
          <Button className="mr-4 w-40 text-black  " >Submit a Complaint</Button>
          <Button className=" w-40 text-black  dark:text-white" variant="outline">View Complaints</Button>
        </div>
      </div>

      <CityscapeGallery />
      <div
        className=" h-[550px] text-white mx-auto 
        flex flex-col gap-4 bg-[url('/joel-de-vriend-qZ6if8WXl7E-unsplash.jpg')]
         bg-cover bg-center bg-no-repeat    overflow-hidden rounded-3xl  justify-end p-8"
      >
        <h1 className="text-4xl font-bold">Public Transport Complaints</h1>
        <p className="text-lg">Report a problem. We&apos;ll get back to you.</p>
        <div>
          <Button className="mr-4 w-40 text-black  " >Submit a Complaint</Button>
          <Button className=" w-40 text-black  dark:text-white" variant="outline">View Complaints</Button>
        </div>
      </div>

    </div>
  );
}
