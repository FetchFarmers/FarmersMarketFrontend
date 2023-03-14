import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      id: 1,
      question: 'What is sustainable agriculture?',
      answer: 'Sustainable agriculture is a method of farming that focuses on creating a system that can be maintained indefinitely without compromising the environment or future generations. It involves practices that protect the soil, water, and air while also promoting biodiversity and animal welfare.',
    },
    {
      id: 2,
      question: 'Where do you source your products?',
      answer: 'We source all of our products from local farmers and producers who share our commitment to sustainable and organic farming practices. We believe in supporting our local community and reducing our carbon footprint by minimizing transportation and packaging.',
    },
    {
      id: 3,
      question: 'Are your products organic?',
      answer: 'Yes, all of our products are either certified organic or grown using organic practices. We believe in providing our customers with the healthiest and most sustainable food options available.',
    },
    {
      id: 4,
      question: 'Do you offer delivery?',
      answer: 'Yes, we offer local delivery within a 10-mile radius of our store. We also offer nationwide shipping for select products.',
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
    },
    {
        id: 6,
        question: 'What is your policy on animal welfare?',
        answer: 'We believe in promoting animal welfare by supporting farmers and producers who use ethical and sustainable farming practices. Our products come from farms that provide humane and ethical treatment to animals, ensuring they are free from cruelty and abuse.'
      },
      {
        id: 7,
        question: 'What types of baked goods do you offer?',
        answer: 'We offer a variety of baked goods, including breads, pastries, cakes, and cookies. All of our baked goods are made using organic and natural ingredients, and we also offer gluten-free and vegan options.'
      },
      {
        id: 8,
        question: 'How do you ensure the quality and freshness of your products?',
        answer: 'We work closely with local farmers and producers to ensure that all of our products are of the highest quality and freshness. We carefully inspect and select each item that we sell, and we also use eco-friendly packaging to preserve the quality and freshness of our products.'
      },
      {
        id: 10,
        question: 'What is your return policy?',
        answer: 'We offer a 100% satisfaction guarantee on all of our products. If you are not completely satisfied with your purchase, please contact us and we will do our best to resolve the issue or provide a refund.'
      }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <ul className="faq-list">
        {questions.map((question, index) => (
          <li className="faq-item" key={question.id}>
            <button className="faq-question" onClick={() => handleQuestionClick(index)}>
              <span>{question.question}</span>
              <span className={`faq-icon ${activeIndex === index ? 'open' : 'closed'}`}></span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'open' : 'closed'}`}>{question.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
