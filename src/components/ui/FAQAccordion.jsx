"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQAccordion.module.css";

const faqs = [
  {
    question: "What is BuildVerse?",
    answer: "BuildVerse is an open-source platform that enables developers to showcase, discover, and collaborate on projects through a streamlined submission system, advanced search, GitHub integration, and a community-driven project gallery."
  },
  {
    question: "Who can contribute?",
    answer: "Anyone! Whether you are a beginner looking for your first open-source contribution or an experienced developer, you are welcome to contribute projects, fix bugs, or improve the platform."
  },
  {
    question: "How do I submit a project?",
    answer: "You can submit a project by forking the repository, creating a new folder with your project files under the Projects directory, and submitting a Pull Request. Please read our CONTRIBUTING.md file for the exact steps and folder structure requirements."
  },
  {
    question: "What are the contribution guidelines?",
    answer: "Our primary guidelines involve following the specific folder naming conventions, ensuring your project runs locally without errors, and maintaining a clean pull request history. Full details can be found in our CONTRIBUTING.md."
  },
  {
    question: "How does the project review process work?",
    answer: "Once you submit a Pull Request, the Project Admin will review it to ensure it meets our guidelines, runs correctly, and contains no malicious code. If changes are needed, feedback will be provided on the PR."
  },
  {
    question: "How can I update my submitted project?",
    answer: "Simply make the changes to your project folder in your forked repository and open a new Pull Request with a clear description of the updates you've made."
  },
  {
    question: "Can I contribute to an existing project?",
    answer: "Yes! If you want to improve a project submitted by someone else, you can fork the repo, make your improvements, and open a PR. We encourage collaboration and learning from one another."
  },
  {
    question: "Are only open-source projects accepted?",
    answer: "Yes, all projects submitted to BuildVerse must be open-source and include a valid license (such as MIT) to ensure the community can learn from and build upon them."
  },
  {
    question: "How do I report bugs or request new features?",
    answer: "You can use the 'Issues' tab on our GitHub repository. We have specific issue templates for Bug Reports and Feature Requests to make it easy for you to provide the necessary information."
  },
  {
    question: "Where can I find the documentation?",
    answer: "Our documentation is primarily hosted in the README.md and CONTRIBUTING.md files at the root of our GitHub repository. These cover everything from local setup to submission guidelines."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.accordionItem}>
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            {faq.question}
            <motion.div
              className={styles.iconWrapper}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={styles.accordionContent}>
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
