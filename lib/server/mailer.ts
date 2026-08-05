import nodemailer from 'nodemailer';
import path from 'node:path';

const EMAIL_LOGO_CID = 'bist-school-icon';

function getTransportConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  return { host, port, user, pass, from };
}

function createTransporter() {
  const { host, port, user, pass, from } = getTransportConfig();

  if (!host || !user || !pass || !from || !Number.isInteger(port) || port < 1 || port > 65535) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
}

function mailError(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
  console.error('SMTP delivery failed', { code, message: error instanceof Error ? error.message : 'Unknown SMTP error' });

  if (code === 'EAUTH') return new Error('SMTP authentication failed. Check SMTP_USER and SMTP_PASS.');
  if (code === 'ETIMEDOUT' || code === 'ESOCKET' || code === 'ECONNECTION') {
    return new Error('The email server could not be reached. Check SMTP_HOST, SMTP_PORT, and provider network access.');
  }
  return new Error('Unable to send the verification email. Please try again shortly.');
}

function logoMarkup() {
  return `<img src="cid:${EMAIL_LOGO_CID}" width="64" height="64" alt="BIST school icon" style="display:block;border:0;border-radius:18px;margin:0 auto 14px;" />`;
}

function logoAttachment() {
  return {
    filename: 'bist-school-icon.png',
    path: path.join(process.cwd(), 'public', 'email-school-icon.png'),
    cid: EMAIL_LOGO_CID,
  };
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

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: 'Your BIST admissions verification code',
      text: `Your BIST admissions verification code is ${code}. It expires in 60 seconds.`,
      attachments: [logoAttachment()],
      html: emailShell(`
        <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">Use the verification code below to continue your BIST admissions application. This code expires in 60 seconds.</p>
        <div style="margin:30px 0;padding:24px;border-radius:22px;background:#fff5f6;border:1px solid rgba(200,16,46,.16);text-align:center;">
          <div style="font-size:42px;letter-spacing:.24em;font-weight:900;color:#C8102E;">${code}</div>
        </div>
        <p style="margin:0;color:#71717a;font-size:14px;line-height:1.7;">If you did not request this code, you can safely ignore this email.</p>
      `),
    });
  } catch (error) {
    throw mailError(error);
  }
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
    attachments: [logoAttachment()],
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
    attachments: [logoAttachment()],
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

export async function sendLocalHireApplicationEmail({
  applicationType = 'Local Hire Application',
  fullName,
  email,
  phone,
  position,
  availability,
  message,
  cv,
}: {
  applicationType?: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  availability: string;
  message: string;
  cv: { filename: string; contentType: string; content: Buffer };
}) {
  const transporter = createTransporter();
  const { from } = getTransportConfig();
  const recipient = process.env.LOCAL_HIRE_APPLICATION_EMAIL || 'isksafh@gmail.com';
  const safeApplicationType = escapeHtml(applicationType);
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safePosition = escapeHtml(position);
  const safeAvailability = escapeHtml(availability);
  const safeMessage = escapeHtml(message || 'No additional message provided.');

  if (!transporter || !from) {
    console.log(`BIST ${applicationType.toLowerCase()} for ${fullName} <${email}>. CV: ${cv.filename}`);
    return { mode: 'console' as const };
  }

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: email,
    subject: `${applicationType} - ${fullName}`,
    text: [
      `Application type: ${applicationType}`,
      `Full name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Position: ${position}`,
      `Availability: ${availability}`,
      '',
      message || 'No additional message provided.',
    ].join('\n'),
    attachments: [
      logoAttachment(),
      {
        filename: cv.filename,
        content: cv.content,
        contentType: cv.contentType,
      },
    ],
    html: emailShell(`
      <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">A new ${safeApplicationType.toLowerCase()} has been submitted through the BIST website.</p>
      <div style="margin:28px 0;padding:24px;border-radius:24px;background:#f8fafc;border:1px solid #e4e4e7;">
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Application Type</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeApplicationType}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Candidate</div>
          <div style="font-size:20px;font-weight:900;color:#18181b;">${safeFullName}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Email</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeEmail}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Phone</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safePhone}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Position</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safePosition}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Availability</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeAvailability}</div>
        </div>
      </div>
      <div style="margin:0;padding:22px;border-radius:22px;background:#fff5f6;border:1px solid rgba(200,16,46,.16);">
        <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#C8102E;">Candidate Note</div>
        <p style="margin:10px 0 0;color:#52525b;font-size:15px;line-height:1.7;">${safeMessage}</p>
      </div>
      <p style="margin:22px 0 0;color:#71717a;font-size:14px;line-height:1.7;">The candidate CV is attached to this email.</p>
    `),
  });

  return { mode: 'email' as const };
}

export async function sendAlumniSuccessStoryEmail({
  fullName,
  email,
  graduationYear,
  currentLocation,
  currentRole,
  storyTitle,
  story,
  permission,
  photos = [],
}: {
  fullName: string;
  email: string;
  graduationYear: string;
  currentLocation: string;
  currentRole: string;
  storyTitle: string;
  story: string;
  permission: string;
  photos?: Array<{ filename: string; contentType: string; content: Buffer }>;
}) {
  const transporter = createTransporter();
  const { from } = getTransportConfig();
  const recipient = process.env.ALUMNI_SUCCESS_STORY_EMAIL || 'isksafh@gmail.com';
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeGraduationYear = escapeHtml(graduationYear);
  const safeCurrentLocation = escapeHtml(currentLocation || 'Not provided');
  const safeCurrentRole = escapeHtml(currentRole || 'Not provided');
  const safeStoryTitle = escapeHtml(storyTitle);
  const safeStory = escapeHtml(story);
  const safePermission = escapeHtml(permission);
  const photoCountText = photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'} attached` : 'No photos attached';

  if (!transporter || !from) {
    console.log(`BIST alumni success story from ${fullName} <${email}>: ${storyTitle}. ${photoCountText}.`);
    return { mode: 'console' as const };
  }

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: email,
    subject: `Alumni Success Story - ${fullName}`,
    text: [
      `Full name: ${fullName}`,
      `Email: ${email}`,
      `Graduation/leaving year: ${graduationYear}`,
      `Current location: ${currentLocation || 'Not provided'}`,
      `Current role: ${currentRole || 'Not provided'}`,
      `Permission: ${permission}`,
      `Photos: ${photoCountText}`,
      '',
      `Story title: ${storyTitle}`,
      '',
      story,
    ].join('\n'),
    attachments: [
      logoAttachment(),
      ...photos.map((photo) => ({
        filename: photo.filename,
        content: photo.content,
        contentType: photo.contentType,
      })),
    ],
    html: emailShell(`
      <p style="margin:0;color:#52525b;font-size:16px;line-height:1.7;">A BIST alumnus has shared a success story through the website.</p>
      <div style="margin:28px 0;padding:24px;border-radius:24px;background:#f8fafc;border:1px solid #e4e4e7;">
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Alumnus</div>
          <div style="font-size:20px;font-weight:900;color:#18181b;">${safeFullName}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Email</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeEmail}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Graduation / Leaving Year</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeGraduationYear}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Current Location</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeCurrentLocation}</div>
        </div>
        <div>
          <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#a1a1aa;">Current Role / Study</div>
          <div style="font-size:16px;font-weight:800;color:#27272a;">${safeCurrentRole}</div>
        </div>
      </div>
      <div style="margin:0 0 18px;padding:22px;border-radius:22px;background:#fff5f6;border:1px solid rgba(200,16,46,.16);">
        <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#C8102E;">${safeStoryTitle}</div>
        <p style="margin:10px 0 0;color:#52525b;font-size:15px;line-height:1.7;white-space:pre-line;">${safeStory}</p>
      </div>
      <p style="margin:0;color:#71717a;font-size:14px;line-height:1.7;"><strong>Sharing permission:</strong> ${safePermission}</p>
      <p style="margin:10px 0 0;color:#71717a;font-size:14px;line-height:1.7;"><strong>Photos:</strong> ${photoCountText}</p>
    `),
  });

  return { mode: 'email' as const };
}
