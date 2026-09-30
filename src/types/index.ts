export type Language = 'hi' | 'mr' | 'en';

export type PerformanceMode = 'FULL' | 'BALANCED' | 'LITE';

export type MaterialCategory =
  | 'PCB'
  | 'CABLE'
  | 'BATTERY'
  | 'CRT'
  | 'LCD'
  | 'MOTOR'
  | 'MAGNET'
  | 'MIXED_PLASTIC'
  | 'OTHER';

export type LotCondition = 'Good' | 'Mixed' | 'Damaged' | 'Unknown';

export interface AIClassification {
  category: MaterialCategory;
  categoryName: string;
  confidence: number;
  features: string[];
  alternatives: { category: MaterialCategory; name: string; confidence: number }[];
  explanation: string;
}

export interface PriceEstimate {
  material: MaterialCategory;
  subcategory: string;
  weightKg: number;
  location: string;
  condition: LotCondition;
  lowRatePerKg: number;
  fairRatePerKg: number;
  highRatePerKg: number;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
  totalEstimatedFair: number;
  trendPct: number;
  factors: {
    label: string;
    impact: string;
    detail: string;
  }[];
}

export interface MaterialLot {
  id: string;
  collectorId: string;
  category: MaterialCategory;
  subcategory: string;
  weightKg: number;
  condition: LotCondition;
  locationName: string;
  gpsCoordinates?: { lat: number; lng: number };
  createdAt: string;
  photoUrl?: string;
  photoSvgType?: 'pcb' | 'cable' | 'battery' | 'crt' | 'motor';
  aiConfidence?: number;
  estimatedValue: number;
  quotedRatePerKg?: number;
  matchedRecyclerId?: string;
  status:
    | 'COLLECTED'
    | 'CLASSIFIED'
    | 'PRICED'
    | 'MATCHED'
    | 'HANDOVER_PENDING'
    | 'HANDOVER_COMPLETED'
    | 'PAID'
    | 'RECYCLED';
  handoverRef?: string;
  handoverTimestamp?: string;
  paymentMethod?: 'CASH' | 'UPI' | 'BANK';
  paymentReference?: string;
  paymentAmount?: number;
}

export interface Recycler {
  id: string;
  name: string;
  facility: string;
  registrationRef: string;
  authorized: boolean;
  validFrom: string;
  validUntil: string;
  materialsAccepted: MaterialCategory[];
  distanceKm: number;
  offeredRatePerKg: Record<MaterialCategory, number>;
  pickupAvailable: boolean;
  serviceArea: string;
  contact: string;
  rating: number;
  matchScore?: number;
  scoreBreakdown?: {
    materialMatch: number;
    authorization: number;
    distance: number;
    price: number;
    pickup: number;
  };
}

export interface PriceRecord {
  id: string;
  material: MaterialCategory;
  subcategory: string;
  location: string;
  currentAvgPrice: number;
  rangeMin: number;
  rangeMax: number;
  trendPct7d: number;
  trendPct30d: number;
  trendPct6m: number;
  unit: string;
  history7d: { day: string; price: number }[];
  history30d: { day: string; price: number }[];
  history6m: { month: string; price: number }[];
  recyclerOffersCount: number;
}

export interface Transaction {
  id: string;
  lotId: string;
  collectorId: string;
  collectorName: string;
  recyclerId: string;
  recyclerName: string;
  material: MaterialCategory;
  weightKg: number;
  ratePerKg: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'DISPUTED';
  paymentMethod: 'CASH' | 'UPI' | 'BANK';
  paymentRef: string;
  timestamp: string;
  handoverLocation: string;
  recyclerConfirmed: boolean;
}

export interface TraceabilityStep {
  stage:
    | 'COLLECTED'
    | 'LOT_CREATED'
    | 'PRICE_QUOTED'
    | 'RECYCLER_MATCHED'
    | 'HANDOVER'
    | 'PAYMENT'
    | 'RECYCLING_STATUS';
  label: string;
  timestamp: string;
  location: string;
  completed: boolean;
  details: string;
  actor: string;
  hash?: string;
}

export interface TraceabilityRecord {
  lotId: string;
  handoverRef: string;
  steps: TraceabilityStep[];
  material: MaterialCategory;
  weightKg: number;
  finalDestiny: string;
  recyclingFacility: string;
}

export interface Collector {
  id: string;
  name: string;
  operatingArea: string;
  preferredLanguage: Language;
  totalLotsSold: number;
  totalEarnings: number;
  pendingEarnings: number;
  joinedDate: string;
}

export interface SafetyGuide {
  id: string;
  icon: string;
  code: string;
  title: Record<Language, string>;
  warning: Record<Language, string>;
  audioScript: Record<Language, string>;
  hazardColor: 'signal-red' | 'safety-orange' | 'acid-green';
  actionAllowed: Record<Language, string>;
  actionProhibited: Record<Language, string>;
}

export interface AnomalyAlert {
  id: string;
  lotId: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  flagReason: string;
  quotedPrice: number;
  localMarketRange: { min: number; max: number };
  historicalMedian: number;
  deviationPct: number;
  material: MaterialCategory;
  recyclerName: string;
  timestamp: string;
  status: 'REQUIRES_VERIFICATION' | 'CLEARED' | 'ESCALATED';
  explanation: string;
}

export type TicketStatus =
  | 'PENDING_DISPATCH'
  | 'INVESTIGATION_ACTIVE'
  | 'RESOLVED_LEGITIMATE'
  | 'PRICE_CORRECTED'
  | 'FACILITY_FLAGGED';

export interface AuditorTicket {
  id: string;
  anomalyId: string;
  lotId: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  flagReason: string;
  material: MaterialCategory;
  subcategory: string;
  reportedWeightKg: number;
  verifiedWeightKg?: number;
  quotedRatePerKg: number;
  fairBenchmarkRate: number;
  totalQuotedAmount: number;
  collectorName: string;
  collectorContact: string;
  recyclerName: string;
  facilityLocation: string;
  coordinates: { lat: number; lng: number };
  distanceKm: number;
  assignedAuditor: string;
  auditorBadge: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt?: string;
  inspectionNotes?: string;
  scaleCalibrationValid?: boolean;
  materialPurityMatch?: boolean;
  correctiveRatePerKg?: number;
  actionTaken?: string;
}

export type UserRole = 'COLLECTOR' | 'RECYCLER' | 'ADMIN' | 'AUDITOR';

export interface UserAccount {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  badgeNumber?: string;
  wardArea: string;
  verified: boolean;
}

