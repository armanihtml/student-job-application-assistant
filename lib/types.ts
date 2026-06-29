export type UserRole = 'student' | 'admin'

export type ApplicationStatus =
  | 'Draft'
  | 'Reviewed'
  | 'Applied'
  | 'Rejected'
  | 'Interview'
  | 'Offer'

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'Draft',
  'Reviewed',
  'Applied',
  'Rejected',
  'Interview',
  'Offer',
]

export interface AppUser {
  id: string
  email: string | null
  full_name: string | null
  role: UserRole
  gdpr_consent: boolean
  gdpr_consent_at: string | null
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string
  user_id: string
  full_name: string | null
  email: string | null
  phone: string | null
  location: string | null
  university: string | null
  degree: string | null
  study_year: string | null
  work_permit: string | null
  languages: string[]
  skills: string[]
  experience: string | null
  projects: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Cv {
  id: string
  user_id: string
  file_name: string
  file_path: string
  file_size: number | null
  is_primary: boolean
  created_at: string
}

export interface JobPreferences {
  id: string
  user_id: string
  role_types: string[]
  industries: string[]
  cities: string[]
  work_mode: string[]
  employment_types: string[]
  salary_min: number | null
  salary_max: number | null
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string | null
  work_mode: string | null
  employment_type: string | null
  industry: string | null
  description: string | null
  requirements: string[]
  skills: string[]
  salary_min: number | null
  salary_max: number | null
  deadline: string | null
  source: string | null
  apply_url: string | null
  posted_at: string
  is_active: boolean
}

export interface Application {
  id: string
  user_id: string
  job_id: string | null
  job_title: string | null
  company: string | null
  status: ApplicationStatus
  match_score: number | null
  match_explanation: string | null
  missing_skills: string[]
  draft_answers: Record<string, string> | null
  notes: string | null
  approved_by_user: boolean
  applied_at: string | null
  created_at: string
  updated_at: string
}

export interface CoverLetter {
  id: string
  user_id: string
  application_id: string | null
  job_id: string | null
  content: string
  cv_suggestions: string | null
  created_at: string
  updated_at: string
}

export interface Reminder {
  id: string
  user_id: string
  application_id: string | null
  title: string
  due_date: string
  is_done: boolean
  notify_email: boolean
  created_at: string
}
