import { SEED_ASSIGNMENTS, SEED_SUBMISSIONS } from '../data/seedData';

const ASSIGNMENTS_KEY = 'joineazy_assignments_v1';
const SUBMISSIONS_KEY = 'joineazy_submissions_v1';
const SESSION_USER_KEY = 'joineazy_current_user_id';

export function loadAssignments() {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    if (!raw) {
      const initial = [...SEED_ASSIGNMENTS];
      localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [...SEED_ASSIGNMENTS];
  }
}

export function saveAssignments(assignments) {
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

export function loadSubmissions() {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      const initial = { ...SEED_SUBMISSIONS };
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return { ...SEED_SUBMISSIONS };
  }
}

export function saveSubmissions(submissions) {
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
}

export function loadSessionUserId() {
  return localStorage.getItem(SESSION_USER_KEY);
}

export function saveSessionUserId(userId) {
  if (userId) localStorage.setItem(SESSION_USER_KEY, userId);
  else localStorage.removeItem(SESSION_USER_KEY);
}
