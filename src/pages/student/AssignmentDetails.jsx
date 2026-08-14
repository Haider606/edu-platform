import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  FileText,
  Info,
  Paperclip,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

/*
 * The assignment record is intentionally unavailable until the assignments
 * table exists. No submission upload is rendered because the submission
 * table and storage infrastructure have not been verified.
 */
const assignment = null;

function AssignmentShell({ data }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
              {data.status || "Assignment"}
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {data.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <BookIcon />
                {data.course || "Course"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UserRound size={15} />
                {data.teacher || "Teacher"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <InfoCard label="Due date" value={data.dueDate || "—"} />
            <InfoCard label="Maximum marks" value={data.maxMarks ?? "—"} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <ContentCard title="Description" icon={FileText}>
            <p className="text-sm leading-7 text-slate-600">
              {data.description || "Assignment description will appear here."}
            </p>
          </ContentCard>

          <ContentCard title="Instructions" icon={Info}>
            <div className="text-sm leading-7 text-slate-600">
              {data.instructions || "Assignment instructions will appear here when available."}
            </div>
          </ContentCard>

          <ContentCard title="Attachments" icon={Paperclip}>
            {data.attachments?.length ? (
              <div className="space-y-2">
                {data.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <FileText size={17} className="text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{attachment.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No attachments are available.</p>
            )}
          </ContentCard>
        </div>

        <aside className="space-y-6">
          <ContentCard title="Submission" icon={ClipboardList}>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">
                Assignment submission is not available yet.
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-700">
                The submission system has not been connected yet.
              </p>
            </div>
          </ContentCard>

          <ContentCard title="Submission information" icon={CalendarDays}>
            <dl className="space-y-3 text-sm">
              <InfoRow label="Status" value={data.submissionStatus || "Not submitted"} />
              <InfoRow label="Submitted at" value={data.submittedAt || "—"} />
              <InfoRow label="Marks" value={data.marks ?? "—"} />
            </dl>
          </ContentCard>
        </aside>
      </section>
    </div>
  );
}

function BookIcon() {
  return <ClipboardList size={15} />;
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-semibold text-slate-700">{value}</dd>
    </div>
  );
}

function ContentCard({ title, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={17} />
        </div>
        <h2 className="font-bold text-slate-950">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function AssignmentDetails() {
  const { id } = useParams();
  const [loading] = useState(false);
  const [error] = useState(null);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
        <div className="h-48 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-950">Assignment couldn't be loaded</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          We couldn't load this assignment right now. Please try again later.
        </p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ClipboardList size={28} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
            Assignment {id ? "Unavailable" : "Details"}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            Assignment not found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            The assignment you're looking for is unavailable.
          </p>

          <Link
            to="/student/assignments"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Assignments
          </Link>
        </div>
      </motion.div>
    );
  }

  return <AssignmentShell data={assignment} />;
}
