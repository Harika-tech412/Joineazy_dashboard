/**
 * Mock users and seed assignments. Users are fixed for the demo;
 * assignments and submissions persist in localStorage after first load.
 */

export const USERS = [
  {
    id: 'a1',
    role: 'admin',
    name: 'Dr. Sarah Miller',
    email: 'sarah.miller@joineazy.edu',
  },
  {
    id: 'a2',
    role: 'admin',
    name: 'Prof. James Wong',
    email: 'james.wong@joineazy.edu',
  },
  {
    id: 's1',
    role: 'student',
    name: 'Alex Chen',
    email: 'alex.chen@student.joineazy.edu',
    advisorAdminId: 'a1',
  },
  {
    id: 's2',
    role: 'student',
    name: 'Jordan Lee',
    email: 'jordan.lee@student.joineazy.edu',
    advisorAdminId: 'a1',
  },
  {
    id: 's3',
    role: 'student',
    name: 'Riley Patel',
    email: 'riley.patel@student.joineazy.edu',
    advisorAdminId: 'a2',
  },
];

export const SEED_ASSIGNMENTS = [
  {
    id: 'asg-1',
    title: 'Data structures: BST traversal',
    description:
      'Implement in-order, pre-order, and post-order traversals with unit tests. Submit your repository link via the Drive folder.',
    dueDate: '2026-04-18',
    driveLink: 'https://drive.google.com/drive/folders/demo-bst',
    createdBy: 'a1',
    studentIds: ['s1', 's2'],
  },
  {
    id: 'asg-2',
    title: 'React dashboard prototype',
    description:
      'Build a responsive admin view with mocked data. Include a short README explaining component structure.',
    dueDate: '2026-04-22',
    driveLink: 'https://drive.google.com/drive/folders/demo-react',
    createdBy: 'a1',
    studentIds: ['s1', 's2'],
  },
  {
    id: 'asg-3',
    title: 'Algorithms problem set',
    description: 'Complete problems 1–5 from the shared PDF. Upload solutions as a single PDF to Drive.',
    dueDate: '2026-04-12',
    driveLink: 'https://drive.google.com/drive/folders/demo-algo',
    createdBy: 'a2',
    studentIds: ['s3'],
  },
];

/** Map key `${assignmentId}_${studentId}` -> { submitted, confirmedAt } */
export const SEED_SUBMISSIONS = {
  'asg-1_s1': { submitted: true, confirmedAt: '2026-04-02T14:30:00.000Z' },
  'asg-1_s2': { submitted: false },
  'asg-2_s1': { submitted: false },
  'asg-2_s2': { submitted: true, confirmedAt: '2026-04-04T09:00:00.000Z' },
  'asg-3_s3': { submitted: false },
};

export function getUserById(id) {
  return USERS.find((u) => u.id === id) ?? null;
}

export function submissionKey(assignmentId, studentId) {
  return `${assignmentId}_${studentId}`;
}
