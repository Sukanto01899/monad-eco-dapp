import { faqs } from "@/data/faq";
import React from "react";
import AuthBtn from "../common/AuthBtn";

const How = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="py-6">
            Learn how to earn, stake, and manage your ECO tokens while
            contributing to a sustainable future.
          </p>
          <AuthBtn>Get Started</AuthBtn>
        </div>
        {/* Acc */}
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default How;
