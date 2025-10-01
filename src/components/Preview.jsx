import { useState, useEffect } from "react";
export default function Preview({ company }) {
    const [heroWord, setHeroWord] = useState(getRandomHeroWord());
  const [htmlContent, setHtmlContent] = useState("");

   useEffect(() => {
    // Build the HTML content for sending
    const html = `
      <div>
        <section id="hero">
          <h1>${heroWord} delivery service in Dhaka</h1>
        </section>
        <section id="contact">
          <p>Company: ${company.name}</p>
          <p>Motto: ${company.motto}</p>
          <p>Phone: ${company.phone}</p>
          <p>Address: ${company.address}</p>
        </section>
      </div>
    `;
    setHtmlContent(html);
  }, [heroWord, company]);
  return (
     <div>
      <section id="hero">
        <h1>{heroWord} delivery service in Dhaka</h1>
      </section>

      <section id="contact">
        <p>Company: {company.name}</p>
        <p>Motto: {company.motto}</p>
        <p>Phone: {company.phone}</p>
        <p>Address: {company.address}</p>
      </section>

      <button onClick={sendToBackend}>Send to Backend</button>
    </div>
  )
}
