import nodemailer from 'nodemailer';

function getTransportConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  return { host, port, user, pass, from };
}

function createTransporter() {
  const { host, port, user, pass, from } = getTransportConfig();

  if (!host || !user || !pass || !from) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function logoMarkup() {
  const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  const logoUrl = appUrl ? `${appUrl.replace(/\/$/, '')}/Logo.png` : '';

  return logoUrl
    ? `<img src="${logoUrl}" width="64" height="64" alt="BIST logo" style="display:block;border-radius:18px;margin:0 auto 14px;" />`
    : `<div style="width:64px;height:64px;border-radius:18px;background:#C8102E;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;margin:0 auto 14px;">BIST</div>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function emailShell(content: string) {
  return `
    <div style="margin:0;padding:32px;background:#f6fbff;font-family:Inter,Arial,sans-serif;color:#18181b;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:28px;overflow:hidden;box-shadow:0 24px 70px rgba(24,24,27,.10);">
        <div style="padding:34px 30px;text-align:center;background:linear-gradient(135deg,#C8102E 0%,#9B0D23 58%,#C9A84C 140%);color:#fff;">
          ${logoMarkup()}
          <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:800;opacity:.86;">British International School of Tabuk</div>
          <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:900;">BIST Admissions</h1>
        </div>
        <div style="padding:34px 30px;">
          ${content}
        </div>
        <div style="padding:22px 30px;background:#fafafa;border-top:1px solid #e4e4e7;color:#71717a;font-size:12px;line-height:1.7;">
          This message was sent by The British International School of Tabuk admissions system.
        </div>
      </div>
    </div>
  `;
}

export async function sendOtpEmail(email: string, code: string) {
  const transporter = createTransporter();
  const { from } = getTransportConfig();

  if (!transporter || !from) {
    console.log(`BIST admissions OTP for ${email}: ${code}`);
    return { mode: 'console' as const };
  }

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Your BIST admissions verification code',
    text: `Your BIST admissions verification code is ${code}. It expires in 10 minutes.`,
    html: emailShell(`
      <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">Use the verification code below to continue your BIST admissions application. This code expires in 10 minutes.</p>
      <div style="margin:30px 0;padding:24px;border-radius:22px;background:#fff5f6;border:1px solid rgba(200,16,46,.16);text-align:center;">
        <div style="font-size:42px;letter-spacing:.24em;font-weight:900;color:#C8102E;">${code}</div>
      </div>
      <p style="margin:0;color:#71717a;font-size:14px;line-height:1.7;">If you did not request this code, you can safely ignore this email.</p>
    `),
  });

  return { mode: 'email' as const };
}

export async function sendLmsAccessEmail({
  guardianEmail,
  studentName,
  admissionYearGroup,
  password,
}: {
  guardianEmail: string;
  studentName: string;
  admissionYearGroup: string;
  password: string;
}) {
  const transporter = createTransporter();
  const { from } = getTransportConfig();
  const lmsUrl = process.env.LMS_URL || process.env.NEXT_PUBLIC_LMS_URL || '#';
  const safeStudentName = escapeHtml(studentName);
  const safeAdmissionYearGroup = escapeHtml(admissionYearGroup);
  const safeGuardianEmail = escapeHtml(guardianEmail);
  const safePassword = escapeHtml(password);

  if (!transporter || !from) {
    console.log(`BIST LMS credentials for ${guardianEmail}: ${studentName} / ${password}`);
    return { mode: 'console' as const };
  }

  await transporter.sendMail({
    from,
    to: guardianEmail,
    subject: `BIST LMS access for ${studentName}`,
    text: `Congratulations. ${studentName} has been approved for ${admissionYearGroup}. You can login to the LMS with email ${guardianEmail} and password ${password}.`,
    html: emailShell(`
      <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">Congratulations, your BIST application has been approved. You can now login to the LMS using the credentials below.</p>
      <div style="margin:28px 0;padding:24px;border-radius:24px;background:#f8fafc;border:1px solid #e4e4e7;">
        <div style="margin-bottom:16px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Student</div>
          <div style="font-size:20px;font-weight:900;color:#18181b;">${safeStudentName}</div>
        </div>
        <div style="margin-bottom:16px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Admission Year Group</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeAdmissionYearGroup}</div>
        </div>
        <div style="margin-bottom:16px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Email</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeGuardianEmail}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Temporary Password</div>
          <div style="font-size:22px;font-weight:900;color:#C8102E;">${safePassword}</div>
        </div>
      </div>
      <a href="${lmsUrl}" style="display:inline-block;border-radius:999px;background:#C8102E;color:#fff;text-decoration:none;font-size:14px;font-weight:900;padding:14px 22px;box-shadow:0 14px 30px rgba(200,16,46,.22);">Login to LMS</a>
      <p style="margin:22px 0 0;color:#71717a;font-size:14px;line-height:1.7;">Please keep this password secure and update it after your first login.</p>
    `),
  });

  return { mode: 'email' as const };
}

export async function sendTeacherAccessEmail({
  teacherEmail,
  teacherName,
  password,
  assignedClasses,
}: {
  teacherEmail: string;
  teacherName: string;
  password: string;
  assignedClasses: string[];
}) {
  const transporter = createTransporter();
  const { from } = getTransportConfig();
  const portalUrl = process.env.TEACHER_PORTAL_URL || process.env.NEXT_PUBLIC_TEACHER_PORTAL_URL || `${process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || ''}/teacher`;
  const safeTeacherName = escapeHtml(teacherName);
  const safeTeacherEmail = escapeHtml(teacherEmail);
  const safePassword = escapeHtml(password);
  const safeClasses = assignedClasses.map(escapeHtml).join(', ');

  if (!transporter || !from) {
    console.log(`BIST teacher credentials for ${teacherEmail}: ${password} / classes: ${assignedClasses.join(', ')}`);
    return { mode: 'console' as const };
  }

  await transporter.sendMail({
    from,
    to: teacherEmail,
    subject: 'Your BIST Teacher Portal access',
    text: `Hello ${teacherName}. Your BIST Teacher Portal login is ${teacherEmail}. Password: ${password}. Assigned classes: ${assignedClasses.join(', ')}.`,
    html: emailShell(`
      <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">Hello ${safeTeacherName}, your BIST Teacher Portal account is ready. You can create learning materials for your assigned classes only.</p>
      <div style="margin:28px 0;padding:24px;border-radius:24px;background:#f8fafc;border:1px solid #e4e4e7;">
        <div style="margin-bottom:16px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Email</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeTeacherEmail}</div>
        </div>
        <div style="margin-bottom:16px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Temporary Password</div>
          <div style="font-size:22px;font-weight:900;color:#C8102E;">${safePassword}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Assigned Classes</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeClasses}</div>
        </div>
      </div>
      <a href="${portalUrl}" style="display:inline-block;border-radius:999px;background:#C8102E;color:#fff;text-decoration:none;font-size:14px;font-weight:900;padding:14px 22px;box-shadow:0 14px 30px rgba(200,16,46,.22);">Open Teacher Portal</a>
    `),
  });

  return { mode: 'email' as const };
}
