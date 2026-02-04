import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JobListingsPage from '@/routes/JobListingsPage';
import RecruiterDashboard from '@/routes/RecruiterDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<JobListingsPage />} />
          <Route path='jobs' element={<JobListingsPage />} />
          <Route path='recruiter' element={<RecruiterDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
