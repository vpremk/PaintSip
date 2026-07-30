import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Assumptions, ScenarioKey } from '../types'

const defaultAssumptions: Assumptions = {
  revenue: {
    ticketPrice: 35,
    guestsPerEvent: 20,
    eventsPerWeek: 3,
    weeksPerMonth: 4,
    privatePerMonth: 1,
    corporatePerMonth: 0,
    airbnbPerMonth: 0,
    merchPerMonth: 0,
    giftCardPerMonth: 0,
    tipsPerGuest: 0,
  },
  cogs: {
    canvas: 2,
    paint: 1.5,
    brushes: 0.5,
    palette: 0.2,
    snacks: 1.5,
    wine: 3,
    cleaning: 0.3,
  },
  fixed: {
    rent: 3800,
    payroll: 4000,
    marketing: 500,
    insurance: 400,
    utilities: 300,
    technology: 100,
    miscellaneous: 200,
  },
  purchase: {
    purchasePrice: 60000,
    transferFee: 1200,
    refreshCost: 5000,
  }
}

type State = {
  scenarios: Record<ScenarioKey, Assumptions>
  active: ScenarioKey
  setActive: (k: ScenarioKey) => void
  updateAssumptions: (k: ScenarioKey, patch: Partial<Assumptions>) => void
  reset: () => void
}

export const useStore = create<State>(persist((set, get) => ({
  scenarios: {
    conservative: defaultAssumptions,
    expected: defaultAssumptions,
    optimistic: defaultAssumptions,
  },
  active: 'expected',
  setActive: (k) => set({ active: k }),
  updateAssumptions: (k, patch) => set(state => ({
    scenarios: { ...state.scenarios, [k]: { ...state.scenarios[k], ...patch } }
  })),
  reset: () => set({ scenarios: { conservative: defaultAssumptions, expected: defaultAssumptions, optimistic: defaultAssumptions } })
}), { name: 'psp-storage' }))
