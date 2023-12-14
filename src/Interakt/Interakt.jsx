import axios from 'axios';
import React, { useState } from 'react';

const Interakt = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual Interakt API key
      const apiKey =
        'VDZOUkt2aXlXa20tVkxzMzRfb2FsRTc2YzdIX1hxSHRUUGNGcC1pSXExMDo=';
      const apiUrl = 'https://app.interakt.co/api/v2/messages';
      //   const apiUrl = 'https://api.interakt.ai/v1/public/message';

      const data = {
        api_key: apiKey,
        phone: phoneNumber,
        channel: 'whatsapp',
        body: message,
      };

      const response = await axios.post(apiUrl, data);
      console.log(response.data);
      alert('WhatsApp message sent successfully!');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Failed to send the WhatsApp message.');
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Recipient Phone Number (with country code)'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder='Your WhatsApp Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send WhatsApp Message</button>
    </div>
  );
};

export default Interakt;
