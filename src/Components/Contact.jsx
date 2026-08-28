// ─────────────────────────────────────────────────
// src/components/Contact.jsx
//
// Contact section with:
//   • Email, phone, location info
//   • Social links (LeetCode, GitHub, LinkedIn, X)
//   • Contact form with a simulated send
// ─────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';

// Social link buttons — add/remove objects here
const socialLinks = [
  { label: 'LeetCode', href: 'https://leetcode.com/u/Rohan_Hede/' },
  { label: 'GitHub',   href: 'https://github.com/Rohan302006' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rohan-hede' },
  { label: 'X',        href: 'https://x.com/RohanHede' },
];

function Contact() {
  const sectionRef = useRef(null);

  // Form state — one piece of state per input field
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });

  // Controls the submit button label and disabled state
  const [sending,  setSending]  = useState(false);
  // Controls whether the success message is visible
  const [success,  setSuccess]  = useState(false);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Update the matching field in formData when a user types
  function handleChange(e) {
    // e.target.name must match the keys in formData
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Handle form submit — simulates a network request with setTimeout
  function handleSubmit(e) {
    e.preventDefault();      // stop the default browser form POST
    setSending(true);        // show "Sending…"

    // Simulate a 1.5-second send delay, then show success
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' }); // clear form

      // Hide the success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  }

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag reveal-left">06 — Contact</span>
          <h2 className="section-title reveal-up">
            Let's Build<br /><em>Together</em>
          </h2>
        </div>

        <div className="contact-wrap">

          {/* ── Left: contact info ── */}
          <div className="contact-left reveal-left">
            <p>
              Have a project in mind? Looking for a developer to join your team?
              Or just want to say hi? My inbox is always open.
            </p>

            <div className="contact-info">
              <a href="mailto:hederohan5@gmail.com" className="cinfo-item cursor-target">
                <span className="cinfo-icon">✉</span>
                <span>hederohan5@gmail.com</span>
              </a>
              <a href="tel:+918329495200" className="cinfo-item cursor-target">
                <span className="cinfo-icon">☎</span>
                <span>+91 83294 95200</span>
              </a>
              <div className="cinfo-item">
                <span className="cinfo-icon">⌖</span>
                <span>Solapur, India</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="social-links">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn cursor-target"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: contact form ── */}
          {/* Note: React forms use onSubmit, not action="" */}
          <form className="contact-form reveal-right" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              {/* name="name" matches the key in formData */}
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="cursor-target"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="cursor-target"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Project inquiry…"
                value={formData.subject}
                onChange={handleChange}
                className="cursor-target"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project…"
                value={formData.message}
                onChange={handleChange}
                required
                className="cursor-target"
              />
            </div>

            <button
              type="submit"
              className="btn-primary full-width cursor-target"
              disabled={sending} // disable while sending
            >
              {/* Change button text based on state */}
              {sending ? 'Sending…' : 'Send Message'}
              {!sending && <span className="btn-arrow"> →</span>}
            </button>

            {/* Success message — shown for 5 seconds after send */}
            {success && (
              <div className="form-success show">
                ✓ Message sent! I'll get back to you within 24 hours.
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
