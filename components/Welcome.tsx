import React from "react";
import Space from "@/components/Space";
export default function Welcome() {
  return (
    
    <>
    <Space />
    {/* <section className="bg-purple-50"> */}
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-right">
          {/* <h1 className="text-4xl font-extrabold text-purple-800 sm:text-5xl sm:text-center mb-2">
            Welcome to Rocket Rosters!
          </h1> */}
          <p className=" text-purple-600 sm:text-2xl lg:text-center mb-4">
            We're excited to have you onboard.
          </p>
          <iframe
            src="https://embed.lottiefiles.com/animation/94719"
            className="align-right"
          ></iframe>
        </div>
        
      </div>
      <div>
      <p className=" text-purple-600 sm:text-xl lg:text-center mt-8">
          In the meantime, feel free to explore our programs and resources.
        </p>
      </div>
      
      
    {/* </section> */}
    </>

  );
}
