import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { getUserById, submissionKey, USERS } from '../data/seedData';
import {
  loadAssignments,
  loadSessionUserId,
  loadSubmissions,
  saveAssignments,
  saveSessionUserId,
  saveSubmissions,
} from '../services/persistence';

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        assignments: action.assignments,
        submissions: action.submissions,
        currentUserId: action.currentUserId,
      };
    case 'LOGIN':
      return { ...state, currentUserId: action.userId };
    case 'LOGOUT':
      return { ...state, currentUserId: null };
    case 'SET_ASSIGNMENTS':
      return { ...state, assignments: action.assignments };
    case 'SET_SUBMISSIONS':
      return { ...state, submissions: action.submissions };
    default:
      return state;
  }
}

const initialState = {
  currentUserId: null,
  assignments: [],
  submissions: {},
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const assignmentsRef = useRef(state.assignments);
  const submissionsRef = useRef(state.submissions);
  assignmentsRef.current = state.assignments;
  submissionsRef.current = state.submissions;

  useEffect(() => {
    const assignments = loadAssignments();
    const submissions = loadSubmissions();
    const currentUserId = loadSessionUserId();
    dispatch({
      type: 'HYDRATE',
      assignments,
      submissions,
      currentUserId: currentUserId && getUserById(currentUserId) ? currentUserId : null,
    });
  }, []);

  const login = useCallback((userId) => {
    saveSessionUserId(userId);
    dispatch({ type: 'LOGIN', userId });
  }, []);

  const logout = useCallback(() => {
    saveSessionUserId(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const setAssignments = useCallback((next) => {
    const list = typeof next === 'function' ? next(assignmentsRef.current) : next;
    saveAssignments(list);
    dispatch({ type: 'SET_ASSIGNMENTS', assignments: list });
  }, []);

  const setSubmissions = useCallback((next) => {
    const map = typeof next === 'function' ? next(submissionsRef.current) : next;
    saveSubmissions(map);
    dispatch({ type: 'SET_SUBMISSIONS', submissions: map });
  }, []);

  const currentUser = useMemo(
    () => (state.currentUserId ? getUserById(state.currentUserId) : null),
    [state.currentUserId]
  );

  /** Assignments visible to the logged-in student */
  const studentAssignments = useMemo(() => {
    if (!currentUser || currentUser.role !== 'student') return [];
    return state.assignments.filter((a) => a.studentIds.includes(currentUser.id));
  }, [currentUser, state.assignments]);

  /** Assignments created by the logged-in admin */
  const adminAssignments = useMemo(() => {
    if (!currentUser || currentUser.role !== 'admin') return [];
    return state.assignments.filter((a) => a.createdBy === currentUser.id);
  }, [currentUser, state.assignments]);

  const getSubmission = useCallback(
    (assignmentId, studentId) => {
      const key = submissionKey(assignmentId, studentId);
      return state.submissions[key] ?? { submitted: false };
    },
    [state.submissions]
  );

  const studentProgress = useMemo(() => {
    if (!currentUser || currentUser.role !== 'student') {
      return { completed: 0, total: 0, percent: 0 };
    }
    const total = studentAssignments.length;
    const completed = studentAssignments.filter((a) =>
      getSubmission(a.id, currentUser.id).submitted
    ).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }, [currentUser, studentAssignments, getSubmission]);

  const createAssignment = useCallback(
    (payload) => {
      if (!currentUser || currentUser.role !== 'admin') return;
      const id = `asg-${Date.now()}`;
      const row = {
        id,
        title: payload.title.trim(),
        description: payload.description.trim(),
        dueDate: payload.dueDate,
        driveLink: payload.driveLink.trim(),
        createdBy: currentUser.id,
        studentIds: [...payload.studentIds],
      };
      setAssignments((prev) => [...prev, row]);
    },
    [currentUser, setAssignments]
  );

  const updateAssignment = useCallback(
    (id, payload) => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                title: payload.title.trim(),
                description: payload.description.trim(),
                dueDate: payload.dueDate,
                driveLink: payload.driveLink.trim(),
                studentIds: [...payload.studentIds],
              }
            : a
        )
      );
    },
    [setAssignments]
  );

  const deleteAssignment = useCallback(
    (id) => {
      setAssignments((prev) => prev.filter((a) => a.id !== id));
      setSubmissions((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (k.startsWith(`${id}_`)) delete next[k];
        });
        return next;
      });
    },
    [setAssignments, setSubmissions]
  );

  const confirmStudentSubmission = useCallback(
    (assignmentId, studentId) => {
      const key = submissionKey(assignmentId, studentId);
      setSubmissions((prev) => ({
        ...prev,
        [key]: { submitted: true, confirmedAt: new Date().toISOString() },
      }));
    },
    [setSubmissions]
  );

  const value = useMemo(
    () => ({
      users: USERS,
      currentUser,
      login,
      logout,
      assignments: state.assignments,
      submissions: state.submissions,
      studentAssignments,
      adminAssignments,
      getSubmission,
      studentProgress,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      confirmStudentSubmission,
    }),
    [
      currentUser,
      login,
      logout,
      state.assignments,
      state.submissions,
      studentAssignments,
      adminAssignments,
      getSubmission,
      studentProgress,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      confirmStudentSubmission,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
