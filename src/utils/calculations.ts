import { Assumptions } from '../types'

export function sumValues(obj: Record<string, number>): number {
  return Object.values(obj).reduce((s, v) => s + (typeof v === 'number' ? v : 0), 0)
}

export function eventsPerMonth(a: Assumptions){
  return a.revenue.eventsPerWeek * a.revenue.weeksPerMonth
}

export function ticketRevenue(a: Assumptions){
  return a.revenue.ticketPrice * a.revenue.guestsPerEvent * eventsPerMonth(a)
}

export function tipsRevenue(a: Assumptions){
  return a.revenue.tipsPerGuest * a.revenue.guestsPerEvent * eventsPerMonth(a)
}

export function privateRevenue(a: Assumptions){
  return a.revenue.privatePerMonth * a.revenue.ticketPrice * a.revenue.guestsPerEvent
}

export function corporateRevenue(a: Assumptions){
  return a.revenue.corporatePerMonth * a.revenue.ticketPrice * a.revenue.guestsPerEvent
}

export function airbnbRevenue(a: Assumptions){
  return a.revenue.airbnbPerMonth * a.revenue.ticketPrice * a.revenue.guestsPerEvent
}

export function merchandiseRevenue(a: Assumptions){
  return a.revenue.merchPerMonth
}

export function giftCardRevenue(a: Assumptions){
  return a.revenue.giftCardPerMonth
}

export function totalRevenue(a: Assumptions){
  return (
    ticketRevenue(a) + tipsRevenue(a) + privateRevenue(a) + corporateRevenue(a) + airbnbRevenue(a) + merchandiseRevenue(a) + giftCardRevenue(a)
  )
}

export function cogsPerEvent(a: Assumptions){
  const sum = Object.values(a.cogs).reduce((s, v) => s + v, 0)
  return sum * a.revenue.guestsPerEvent
}

export function monthlyCOGS(a: Assumptions){
  return cogsPerEvent(a) * eventsPerMonth(a)
}

export function grossProfit(a: Assumptions){
  return totalRevenue(a) - monthlyCOGS(a)
}

export function operatingExpenses(a: Assumptions){
  return sumValues(a.fixed)
}

export function netProfit(a: Assumptions){
  return grossProfit(a) - operatingExpenses(a)
}

export function totalInvestment(a: Assumptions){
  return a.purchase.purchasePrice + a.purchase.transferFee + a.purchase.refreshCost
}

export function breakEvenMonths(a: Assumptions){
  const monthly = netProfit(a)
  if (monthly <= 0) return Infinity
  return totalInvestment(a) / monthly
}

export function roiPercent(a: Assumptions){
  const annualProfit = netProfit(a) * 12
  if (totalInvestment(a) === 0) return Infinity
  return (annualProfit / totalInvestment(a)) * 100
}
