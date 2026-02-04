import { useState } from 'react';
import { useHireLinkContext, type Application } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, Phone, Briefcase, Link as LinkIcon, Calendar } from 'lucide-react';
import InterviewScheduler from './InterviewScheduler';
import OfferLetter from './OfferLetter';

interface CandidateReviewPanelProps {
  application: Application;
}

export default function CandidateReviewPanel({ application }: CandidateReviewPanelProps) {
  const { scoreCandidate, addCandidateNotes, moveApplicationStage } = useHireLinkContext();
  const [notes, setNotes] = useState(application.notes || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showOfferLetter, setShowOfferLetter] = useState(false);

  const handleScoreChange = (score: number) => {
    scoreCandidate(application.id, score);
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    setHasChanges(true);
  };

  const handleSaveNotes = () => {
    addCandidateNotes(application.id, notes);
    setHasChanges(false);
  };

  const handleStageChange = (newStage: Application['stage']) => {
    moveApplicationStage(application.id, newStage);
  };

  return (
    <>
      {showScheduler && <InterviewScheduler application={application} onClose={() => setShowScheduler(false)} />}
      <div className='space-y-4'>
        {showOfferLetter && <OfferLetter application={application} onClose={() => setShowOfferLetter(false)} />}
        <Card className='p-4'>
          <div className='space-y-4'>
            {/* Header */}
            <div>
              <h3 className='text-lg font-bold text-foreground'>{application.candidateName}</h3>
            </div>

            {/* Contact Info */}
            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Mail className='h-4 w-4' />
                <a href={`mailto:${application.email}`} className='text-primary hover:underline truncate'>
                  {application.email}
                </a>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Phone className='h-4 w-4' />
                <a href={`tel:${application.phone}`} className='text-primary hover:underline'>
                  {application.phone}
                </a>
              </div>
              {application.portfolioLink && (
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <LinkIcon className='h-4 w-4' />
                  <a
                    href={application.portfolioLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline truncate'
                  >
                    Portfolio
                  </a>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Briefcase className='h-4 w-4' />
              <span className='text-sm'>{application.yearsOfExperience} years of experience</span>
            </div>

            {/* Skills */}
            {application.skills && application.skills.length > 0 && (
              <div>
                <p className='text-xs font-semibold text-muted-foreground mb-2'>Skills</p>
                <div className='flex flex-wrap gap-1'>
                  {application.skills.map((skill) => (
                    <Badge key={skill} variant='secondary'>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Rating */}
            <div className='space-y-2 pt-2 border-t border-border'>
              <p className='text-sm font-semibold text-foreground'>Rating</p>
              <div className='flex gap-1'>
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(score)}
                    className='p-1 rounded transition-colors'
                  >
                    <Star
                      className={`h-6 w-6 ${
                        application.score && application.score >= score
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Notes Section */}
        <Card className='p-4 space-y-3'>
          <div>
            <label className='text-sm font-semibold text-foreground'>Notes</label>
            <p className='text-xs text-muted-foreground'>Add your review notes</p>
          </div>
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder='Add notes about this candidate...'
            className='min-h-24 text-sm'
          />
          <Button size='sm' onClick={handleSaveNotes} disabled={!hasChanges} className='w-full'>
            Save Notes
          </Button>
        </Card>

        {/* Interview Info */}
        {application.interviewDate && application.interviewTime && (
          <Card className='p-4 space-y-2 border-accent/30 bg-accent/5'>
            <div className='flex items-center gap-2 text-sm font-semibold text-foreground'>
              <Calendar className='h-4 w-4 text-accent' />
              Interview Scheduled
            </div>
            <p className='text-sm text-muted-foreground'>
              {new Date(application.interviewDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {application.interviewTime}
            </p>
          </Card>
        )}

        {/* Stage Actions */}
        <Card className='p-4 space-y-3'>
          <p className='text-sm font-semibold text-foreground'>
            Current Stage: <span className='text-accent'>{application.stage}</span>
          </p>
          <div className='space-y-2'>
            {application.stage !== 'Reviewed' && (
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleStageChange('Reviewed')}
                className='w-full justify-start'
              >
                Move to Reviewed
              </Button>
            )}
            {application.stage !== 'Interview Scheduled' && (
              <Button
                size='sm'
                variant='outline'
                onClick={() => setShowScheduler(true)}
                className='w-full justify-start gap-2'
              >
                <Calendar className='h-4 w-4' />
                Schedule Interview
              </Button>
            )}
            {application.stage !== 'Offer Sent' && (
              <Button
                size='sm'
                variant='outline'
                onClick={() => setShowOfferLetter(true)}
                className='w-full justify-start'
              >
                Draft Offer Letter
              </Button>
            )}
            {application.stage !== 'Applied' && (
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleStageChange('Applied')}
                className='w-full justify-start'
              >
                Reset to Applied
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
