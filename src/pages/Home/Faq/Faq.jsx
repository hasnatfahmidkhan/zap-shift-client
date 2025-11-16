import { useState } from "react";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";

const faqDes = [
  {
    ques: "Is it suitable for all ages and body types?",
    ans: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    ques: "Does it really help with back pain and posture improvement?",
    ans: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    ques: "Does it have smart features like vibration alerts?",
    ans: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    ques: "How will I be notified when the product is back in stock?",
    ans: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="space-y-8">
      <div className="text-center md:w-2/3 mx-auto space-y-3 px-4">
        <h3 className="heading">Frequently Asked Question (FAQ)</h3>
        <p className="text-accent tracking-wide">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="space-y-4">
        {faqDes.map((faq, i) => (
          <div
            key={i}
            className={`collapse collapse-arrow border ${
              openIndex === i
                ? "bg-[#E6F2F3] border-[#067A87]"
                : "bg-base-100 border-base-300"
            }`}
          >
            <input
              onChange={() => setOpenIndex(i)}
              type="radio"
              name="my-accordion-2"
              checked={openIndex === i}
            />
            <div className="collapse-title font-bold text-secondary">
              {faq.ques}
            </div>
            <div className="collapse-content text-accent tracking-wide text-sm font-medium">
              {faq.ans}
            </div>
          </div>
        ))}
      </div>

      <PrimaryBtn >See More FAQ's</PrimaryBtn>
    </section>
  );
};

export default Faq;
