// Single source of truth for program status. Update dates/status here only.

export const FINALS = {
  name: 'IN-SPACe National Finals',
  place: 'Narayani River Bank, Kushinagar, Uttar Pradesh',
  short: 'Kushinagar, UP',
  start: new Date('2026-11-17T00:00:00+05:30'),
  label: 'Nov 17–20, 2026',
};

export const milestones = [
  {
    id: 'pdr',
    code: 'PDR',
    title: 'Preliminary Design Review',
    date: new Date('2025-11-01T00:00:00+05:30'),
    dateLabel: 'Nov 2025',
    status: 'done',
    detail: 'System architecture and subsystem definitions approved for both programs.',
    programs: ['Rocket', 'CanSat'],
  },
  {
    id: 'cdr',
    code: 'CDR',
    title: 'Critical Design Review',
    date: new Date('2026-09-20T00:00:00+05:30'),
    dateLabel: 'Sept 20, 2026',
    status: 'done',
    detail: 'Rocket cleared: detailed drawings and manufacturing plan approved by IN-SPACe. CanSat CDR in progress.',
    programs: ['Rocket'],
  },
  {
    id: 'frr',
    code: 'FRR',
    title: 'Flight Readiness Review',
    date: new Date('2026-10-21T00:00:00+05:30'),
    dateLabel: 'Oct 21, 2026',
    status: 'next',
    detail: 'Virtual review of the integrated rocket, motor procurement and full-system trials.',
    programs: ['Rocket'],
  },
  {
    id: 'finals',
    code: 'Launch',
    title: 'National Finals',
    date: FINALS.start,
    dateLabel: FINALS.label,
    status: 'upcoming',
    detail: 'Rocket flight to 1 km apogee and CanSat deployment at 1,000 m with NavIC telemetry, Kushinagar.',
    programs: ['Rocket', 'CanSat'],
  },
];

/* Next milestone that has not happened yet (falls back to finals). */
export const nextMilestone = (now = new Date()) =>
  milestones.find((m) => m.date > now) || milestones[milestones.length - 1];

export const daysUntil = (date, now = new Date()) =>
  Math.max(0, Math.ceil((date - now) / 86400000));

export const programStatus = {
  rocket: 'CDR cleared',
  cansat: 'PDR cleared',
};
