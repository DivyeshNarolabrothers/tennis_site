// import React from 'react'
// import { Accordion } from 'react-bootstrap'

// const FaqPage = () => {
//   return (
//     <div className='container'>
//      <Accordion defaultActiveKey="0">
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>Accordion Item #1</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="1">
//         <Accordion.Header>Accordion Item #2</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="2">
//         <Accordion.Header>Accordion Item #1</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="3">
//         <Accordion.Header>Accordion Item #2</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="4">
//         <Accordion.Header>Accordion Item #1</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="5">
//         <Accordion.Header>Accordion Item #2</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="6">
//         <Accordion.Header>Accordion Item #1</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="7">
//         <Accordion.Header>Accordion Item #2</Accordion.Header>
//         <Accordion.Body>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
      
//     </div>
//   )
// }

// export default FaqPage



// import React, { useState, useEffect } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import '../Faq/faq.css'

// const FaqPage = () => {
//   const [faqData, setFaqData] = useState([]);

//   useEffect(() => {
//     const fetchFAQs = async () => {
//       try {
//         const response = await fetch('http://35.200.147.33/api/faqs');
//         const data = await response.json();
//         setFaqData(data);
//       } catch (error) {
//         console.error('Error fetching FAQs:', error);
//       }
//     };

//     fetchFAQs();
//   }, []);

//   return (
//     <div className='container'>
//     <Accordion defaultActiveKey="0" style={{padding:'10px 0px'}}>
//       {faqData.map((faq, index) => (
//         <Accordion.Item eventKey={index.toString()} key={faq._id}>
//           <Accordion.Header style={{ color: 'black' }}>
//             {faq.question}
//           </Accordion.Header>
//           <Accordion.Body style={{ color: 'gray' }}>
//             {faq.answer}
//           </Accordion.Body>
//         </Accordion.Item>
//       ))}
//     </Accordion>
//     </div>
//   );
// };

// export default FaqPage;

import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'; // Import axios
import '../Faq/faq.css';

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('user_token');

        // Make API request using axios with Authorization header
        const response = await axios.get('http://35.200.147.33/api/users/faqs', {
          headers: { Authorization: `Bearer ${token}`}
        });

        setFaqData(response.data); // Set the FAQ data
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className='container'>
      <Accordion defaultActiveKey="0" style={{ padding: '10px 0px' }}>
        {faqData.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={faq._id}>
            <Accordion.Header style={{ color: 'black' }}>
              {faq.question}
            </Accordion.Header>
            <Accordion.Body style={{ color: 'gray' }}>
              {faq.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqPage;
