export const SCHOOL_TYPES = ['GS', 'MS', 'RS', 'GY', 'IGS'] as const

// Mapping from old school type names to new abbreviations
const SCHOOL_TYPE_MAPPING: Record<string, SchoolType> = {
  'Grundschulen': 'GS',
  'Mittel-/Hauptschulen': 'MS',
  'Realschulen': 'RS',
  'Gymnasien': 'GY',
  'Int. Gesamtschulen': 'IGS',
  'Gesamt': 'IGS', // legacy mapping
}

// Reverse mapping from abbreviations to full names
export const SCHOOL_TYPE_LABELS: Record<SchoolType, string> = {
  'GS': 'Grundschulen',
  'MS': 'Mittelschulen',
  'RS': 'Realschulen',
  'GY': 'Gymnasien',
  'IGS': 'Int. Gesamtschule',
}

export type SchoolType = (typeof SCHOOL_TYPES)[number]
export type SchoolTypeFilter = SchoolType | 'All school types'
export type SchoolYear = string // e.g., "2024/25"

export type RetentionDatum = {
  syear: SchoolYear
  stype: SchoolType
  group: string
  number: number
  year: string
  n_overall: number
  percent: number
}

type RawRetentionDatum = {
  syear: string
  stype: string
  group: string
  number: number
  year: string
  n_overall: number
  percent: number
}

export type SchoolTypeOption = {
  key: SchoolTypeFilter
  label: string
}

export type DatasetSummary = {
  totalYears: number
  totalRetentions: number
  schoolTypes: SchoolType[]
  yearRange: string
  latestYear: SchoolYear
}

// School type options for filtering
export const SCHOOL_TYPE_OPTIONS: SchoolTypeOption[] = [
  { key: 'All school types', label: 'Alle Schultypen' },
  { key: 'GS', label: 'Grundschulen' },
  { key: 'MS', label: 'Mittelschulen' },
  { key: 'RS', label: 'Realschulen' },
  { key: 'GY', label: 'Gymnasien' },
  { key: 'IGS', label: 'Int. Gesamtschule' },
]

// Color scheme for school types
export const SCHOOL_TYPE_COLORS: Record<SchoolType, string> = {
  'GS': '#264653',            // blue
  'MS': '#2a9d8f',            // teal
  'RS': '#e9c46a',            // yellow
  'GY': '#f4a261',            // amber
  'IGS': '#e76f51',           // orange
}

// Chart configuration
export const CHART_WIDTH = 800
export const CHART_HEIGHT = 500
export const CHART_PADDING = {
  top: 40,
  right: 60,
  bottom: 80,
  left: 90,
}

// Transform and validate raw data
/**
 * Type guard to validate that a string is a valid SchoolType
 */
function isValidSchoolType(value: string): value is SchoolType {
  return SCHOOL_TYPES.includes(value as SchoolType)
}

/**
 * Maps old school type names to new abbreviations
 * Used for backward compatibility with data exports
 */
function mapSchoolType(oldName: string): SchoolType {
  return SCHOOL_TYPE_MAPPING[oldName] || (oldName as SchoolType)
}

let RETENTION_DATA: RetentionDatum[] = []

/**
 * Load retention data from JSON file
 */
export async function loadRetentionData(): Promise<RetentionDatum[]> {
  if (RETENTION_DATA.length > 0) {
    return RETENTION_DATA
  }

  const response = await fetch('/data/retention.json')
  const retentionData = await response.json() as RawRetentionDatum[]

  RETENTION_DATA = retentionData
    .filter((row) => {
      // Validate required fields exist
      if (!row.syear || !row.stype || row.number === undefined || row.n_overall === undefined) {
        console.warn('Invalid retention data row: missing required fields', row)
        return false
      }
      // Only include overall group data
      return row.group === 'Insgesamt'
    })
    .map((row) => {
      const mappedType = mapSchoolType(row.stype)
      return {
        syear: row.syear,
        stype: mappedType,
        group: row.group,
        number: row.number,
        year: row.year,
        n_overall: row.n_overall,
        percent: row.percent,
      }
    })
    .filter((row) => {
      // Validate mapped type is valid
      if (!isValidSchoolType(row.stype)) {
        console.warn('Invalid school type after mapping:', row.stype)
        return false
      }
      return true
    })

  return RETENTION_DATA
}

// Get unique school years sorted
export function getSchoolYears(data: RetentionDatum[]): SchoolYear[] {
  return Array.from(
    new Set(data.map((d) => d.syear))
  ).sort((a, b) => {
    const yearA = parseInt(a.split('/')[0])
    const yearB = parseInt(b.split('/')[0])
    return yearB - yearA // Most recent first
  })
}

// Filter retention data by school type
/**
 * Filters retention data by school type or returns all data
 * @param filter - School type abbreviation or 'All school types' for complete dataset
 * @returns Array of retention data for the specified school type(s)
 */
export function filterRetentionBySchoolType(data: RetentionDatum[], filter: SchoolTypeFilter): RetentionDatum[] {
  if (filter === 'All school types') {
    return data
  }
  return data.filter((d) => d.stype === filter)
}

// Get data for a specific school year
/**
 * Retrieves retention data for a specific school year
 * @param year - School year in format "YYYY/YY" (e.g., "2024/25")
 * @returns Array of retention data for all school types in that year
 */
export function getDataForYear(data: RetentionDatum[], year: SchoolYear): RetentionDatum[] {
  return data.filter((d) => d.syear === year)
}

// Get time series data for trend chart (all years, grouped by school type)
/**
 * Groups retention data by school type in chronological order
 * Used for rendering trend charts showing retention over time
 * @returns Map of school types to their historical retention data (sorted by year)
 */
export function getTimeSeriesData(data: RetentionDatum[]): Map<SchoolType, RetentionDatum[]> {
  const grouped = new Map<SchoolType, RetentionDatum[]>()
  
  SCHOOL_TYPES.forEach((type) => {
    const typeData = data.filter((d) => d.stype === type).sort((a, b) => {
      const yearA = parseInt(a.year)
      const yearB = parseInt(b.year)
      return yearA - yearB // Chronological order
    })
    grouped.set(type, typeData)
  })
  
  return grouped
}

// Format number with thousands separator
/**
 * Formats a number with German locale thousand separators
 * @param value - Numeric value to format
 * @returns Formatted string with locale-specific separators
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('de-DE')
}
