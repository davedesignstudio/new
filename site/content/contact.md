+++
date = "2026-08-24T09:00:00-04:00"
title = "Contact"
url = "/contact"
eyebrow = "Start a project"
+++

Tell us what you are making. Carpentry, web, branding, or a project that needs all three. We read every note and reply with a clear next step.

<form name="project" method="POST" netlify>
  <label>Name
    <input type="text" name="name" required placeholder="Your name">
  </label>
  <label>Email
    <input type="email" name="email" required placeholder="you@studio.com">
  </label>
  <label>What are we building?
    <select name="type">
      <option value="carpentry">Carpentry design &amp; build</option>
      <option value="web">Web design</option>
      <option value="branding">Branding</option>
      <option value="both">Carpentry and digital together</option>
    </select>
  </label>
  <label>The brief
    <textarea name="message" rows="6" required placeholder="Room, site, brand, timeline, and anything already decided."></textarea>
  </label>
  <button type="submit">Send the brief</button>
</form>

Prefer email? Write [studio@philhowerandokrogly.com](mailto:studio@philhowerandokrogly.com).
