import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  skills: string[];
  portfolioLink: string;
  resumeFile: string;
  resumeFileName: string;
  appliedAt: string;
  stage: 'Applied' | 'Reviewed' | 'Interview Scheduled' | 'Offer Sent';
  score?: number;
  notes?: string;
  interviewDate?: string;
  interviewTime?: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  department: string;
}

interface HireLinkContextType {
  jobs: Job[];
  applications: Application[];
  addApplication: (app: Omit<Application, 'id' | 'appliedAt' | 'stage'>) => string;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  getApplication: (id: string) => Application | undefined;
  moveApplicationStage: (id: string, newStage: Application['stage']) => void;
  scoreCandidate: (id: string, score: number) => void;
  addCandidateNotes: (id: string, notes: string) => void;
  scheduleInterview: (id: string, date: string, time: string) => void;
}

const HireLinkContext = createContext<HireLinkContextType | undefined>(undefined);

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    description:
      'We are looking for an experienced Frontend Engineer to join our growing team. You will work on building scalable, user-friendly applications.',
    department: 'Engineering',
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'New York, NY',
    description:
      'Lead product strategy and development. Work cross-functionally with engineering, design, and marketing teams.',
    department: 'Product',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    location: 'Remote',
    description: 'Design beautiful and intuitive user interfaces. Collaborate with product and engineering teams.',
    department: 'Design',
  },
];

export function HireLinkProvider({ children }: { children: React.ReactNode }) {
  const [jobs] = useState<Job[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hirelink_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load applications from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('hirelink_applications', JSON.stringify(applications));
    }
  }, [applications, isLoading]);

  const addApplication = (app: Omit<Application, 'id' | 'appliedAt' | 'stage'>): string => {
    const id = `APP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newApp: Application = {
      ...app,
      id,
      appliedAt: new Date().toISOString(),
      stage: 'Applied',
    };
    setApplications([...applications, newApp]);
    return id;
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, ...updates } : app)));
  };

  const getApplication = (id: string): Application | undefined => {
    return applications.find((app) => app.id === id);
  };

  const moveApplicationStage = (id: string, newStage: Application['stage']) => {
    updateApplication(id, { stage: newStage });
  };

  const scoreCandidate = (id: string, score: number) => {
    if (score < 1 || score > 5) return;
    updateApplication(id, { score });
  };

  const addCandidateNotes = (id: string, notes: string) => {
    updateApplication(id, { notes });
  };

  const scheduleInterview = (id: string, date: string, time: string) => {
    updateApplication(id, {
      interviewDate: date,
      interviewTime: time,
      stage: 'Interview Scheduled',
    });
  };

  const value: HireLinkContextType = {
    jobs,
    applications,
    addApplication,
    updateApplication,
    getApplication,
    moveApplicationStage,
    scoreCandidate,
    addCandidateNotes,
    scheduleInterview,
  };

  return <HireLinkContext.Provider value={value}>{children}</HireLinkContext.Provider>;
}

export function useHireLinkContext() {
  const context = useContext(HireLinkContext);
  if (!context) {
    throw new Error('useHireLinkContext must be used within HireLinkProvider');
  }
  return context;
}
