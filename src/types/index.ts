export type ScenarioKey = 'conservative' | 'expected' | 'optimistic'

export interface RevenueAssumptions {
  ticketPrice: number
  guestsPerEvent: number
  eventsPerWeek: number
  weeksPerMonth: number
  privatePerMonth: number
  corporatePerMonth: number
  airbnbPerMonth: number
  merchPerMonth: number
  giftCardPerMonth: number
  tipsPerGuest: number
}

export interface COGSPerGuest {
  canvas: number
  paint: number
  brushes: number
  palette: number
  snacks: number
  wine: number
  cleaning: number
}

export interface FixedExpenses {
  rent: number
  payroll: number
  marketing: number
  insurance: number
  utilities: number
  technology: number
  miscellaneous: number
}

export interface Purchase {
  purchasePrice: number
  transferFee: number
  refreshCost: number
}

export interface Assumptions {
  revenue: RevenueAssumptions
  cogs: COGSPerGuest
  fixed: FixedExpenses
  purchase: Purchase
}
