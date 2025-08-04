import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
type Props = {
  description: string;
};

function ProgramDetailHighlight({ description }: Props) {
  return (
    <section className="my-4 w-full">
      <div className="bg-tw-blue text-white p-4">
        <FaQuoteLeft className="justify-self-start h-6 w-6" />
        <p className=" px-4 py-2">{description}</p>
        <FaQuoteRight className="justify-self-end h-6 w-6" />
      </div>
    </section>
  );
}

export default ProgramDetailHighlight;
