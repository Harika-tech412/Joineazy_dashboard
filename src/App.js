import { AppProvider, useApp } from './context/AppContext';
import LoginScreen from './components/auth/LoginScreen';
import AppLayout from './components/layout/AppLayout';
import AdminSidebar from './components/layout/AdminSidebar';
import StudentSidebar from './components/layout/StudentSidebar';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';

function Shell() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <LoginScreen />;
  }

  const sidebar = currentUser.role === 'student' ? <StudentSidebar /> : <AdminSidebar />;

  return (
    <AppLayout sidebar={sidebar}>
      {currentUser.role === 'student' ? <StudentDashboard /> : <AdminDashboard />}
    </AppLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
