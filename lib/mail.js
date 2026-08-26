import nodemailer from 'nodemailer';

/** Escape user input for safe HTML insertion. */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const getTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

export async function sendLeadEmail(contact) {
  const transporter = getTransporter();
  if (!transporter) return false;

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const html = `
    <h2>New Lead from Website</h2>
    <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(contact.email || '—')}</p>
    <p><strong>Business:</strong> ${escapeHtml(contact.business || '—')}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(contact.message)}</p>
    <p><small>Received: ${new Date(contact.createdAt).toLocaleString()}</small></p>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `New lead — ${escapeHtml(contact.name)}`,
      html,
    });
    return true;
  } catch (e) {
    console.error('sendLeadEmail error', e);
    return false;
  }
}
