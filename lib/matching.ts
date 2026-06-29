import type { Job, JobPreferences, StudentProfile } from './types'

const PROFILE_FIELDS: (keyof StudentProfile)[] = [
  'full_name',
  'email',
  'phone',
  'location',
  'university',
  'degree',
  'study_year',
  'work_permit',
  'experience',
  'projects',
]

/**
 * Profile completion score 0-100 based on filled fields, skills, languages,
 * and whether a CV has been uploaded.
 */
export function profileCompletion(
  profile: Partial<StudentProfile> | null,
  hasCv: boolean,
): number {
  if (!profile) return hasCv ? 8 : 0
  const total = PROFILE_FIELDS.length + 3 // + skills + languages + cv
  let filled = 0
  for (const field of PROFILE_FIELDS) {
    const value = profile[field]
    if (typeof value === 'string' && value.trim().length > 0) filled += 1
  }
  if ((profile.skills?.length ?? 0) > 0) filled += 1
  if ((profile.languages?.length ?? 0) > 0) filled += 1
  if (hasCv) filled += 1
  return Math.round((filled / total) * 100)
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

/**
 * Heuristic match score used for instant filtering and as a deterministic
 * fallback when the AI service is unavailable.
 */
export function heuristicMatch(
  job: Job,
  profile: Partial<StudentProfile> | null,
  prefs: Partial<JobPreferences> | null,
): { score: number; missingSkills: string[] } {
  const profileSkills = new Set((profile?.skills ?? []).map(normalize))
  const jobSkills = job.skills ?? []

  const matched = jobSkills.filter((s) => profileSkills.has(normalize(s)))
  const missingSkills = jobSkills.filter((s) => !profileSkills.has(normalize(s)))

  // Skills weight: 60%
  const skillScore = jobSkills.length
    ? (matched.length / jobSkills.length) * 60
    : 30

  // Preference alignment: 40%
  let prefScore = 0
  let prefChecks = 0
  if (prefs) {
    if (prefs.cities?.length) {
      prefChecks += 1
      if (
        job.location &&
        prefs.cities.some((c) => normalize(job.location!).includes(normalize(c)))
      )
        prefScore += 1
    }
    if (prefs.work_mode?.length && job.work_mode) {
      prefChecks += 1
      if (prefs.work_mode.map(normalize).includes(normalize(job.work_mode)))
        prefScore += 1
    }
    if (prefs.employment_types?.length && job.employment_type) {
      prefChecks += 1
      if (
        prefs.employment_types
          .map(normalize)
          .includes(normalize(job.employment_type))
      )
        prefScore += 1
    }
    if (prefs.industries?.length && job.industry) {
      prefChecks += 1
      if (prefs.industries.map(normalize).includes(normalize(job.industry)))
        prefScore += 1
    }
  }
  const prefComponent = prefChecks ? (prefScore / prefChecks) * 40 : 20

  const score = Math.round(Math.min(100, skillScore + prefComponent))
  return { score, missingSkills }
}

export function matchColor(score: number) {
  if (score >= 75) return 'text-emerald-600'
  if (score >= 50) return 'text-blue-600'
  if (score >= 30) return 'text-amber-600'
  return 'text-muted-foreground'
}

export function matchLabel(score: number) {
  if (score >= 75) return 'Strong match'
  if (score >= 50) return 'Good match'
  if (score >= 30) return 'Possible match'
  return 'Low match'
}
