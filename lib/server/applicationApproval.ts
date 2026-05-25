import { randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { applications, students } from '@/lib/db/schema';
import { hashPassword } from '@/lib/server/auth';
import { sendLmsAccessEmail } from '@/lib/server/mailer';

type ApplicationData = {
  students?: Array<Record<string, unknown> & { firstName?: string; lastName?: string; admissionYearGroup?: string }>;
  guardians?: Array<Record<string, unknown> & { email?: string; phoneCode?: string; phone?: string }>;
  data?: ApplicationData;
  draft?: ApplicationData;
  application?: ApplicationData;
};

function generatePassword() {
  return `BIST-${randomBytes(4).toString('hex').toUpperCase()}`;
}

function getStudentName(student: { firstName?: string; lastName?: string }, index: number) {
  return [student.firstName, student.lastName].filter(Boolean).join(' ') || `Student ${index + 1}`;
}

function getApplicationData(data: unknown): ApplicationData {
  const applicationData = data as ApplicationData;
  return applicationData.data ?? applicationData.draft ?? applicationData.application ?? applicationData;
}

export async function approveApplication(id: string) {
  const db = getDb();
  const [application] = await db.select().from(applications).where(eq(applications.id, id)).limit(1);

  if (!application) throw new Error('Application not found.');

  const data = getApplicationData(application.data);
  const guardian = data.guardians?.[0];
  const guardianEmail = guardian?.email;

  if (!guardianEmail) throw new Error('Guardian email is required before approval.');

  await db.delete(students).where(eq(students.applicationId, id));

  const createdStudents = await Promise.all(
    (data.students?.length ? data.students : [{}]).map(async (student, index) => {
      const studentName = getStudentName(student, index);
      const admissionYearGroup = student.admissionYearGroup || 'Not selected';
      const password = generatePassword();
      const lmsPasswordHash = await hashPassword(password);

      await db.insert(students).values({
        applicationId: id,
        studentName,
        guardianEmail,
        admissionYearGroup,
        lmsPasswordHash,
      });

      await sendLmsAccessEmail({
        guardianEmail,
        studentName,
        admissionYearGroup,
        password,
      });

      return { studentName, guardianEmail, admissionYearGroup };
    }),
  );

  await db.update(applications).set({ status: 'approve', updatedAt: new Date() }).where(eq(applications.id, id));

  return createdStudents;
}

export async function approveAllApplications() {
  const db = getDb();
  const rows = await db.select({ id: applications.id }).from(applications);
  const results = [];

  for (const row of rows) {
    results.push(await approveApplication(row.id));
  }

  return results;
}
