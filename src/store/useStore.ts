import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Assumptions, ScenarioKey } from '../types'
import prodAssumptionsJson from '../data/prodAssumptions.json'

const cloneAssumptions = (assumptions: Assumptions): Assumptions =>
  JSON.parse(JSON.stringify(assumptions)) as Assumptions

const mapProdAssumptions = (): Assumptions => {
  const p = prodAssumptionsJson as any

  return {
    revenue: {
      ticketPrice: Number(p?.revenue?.ticketPrice ?? 35),
      guestsPerEvent: Number(p?.revenue?.guestsPerEvent ?? 20),
      eventsPerWeek: Number(p?.revenue?.eventsPerWeek ?? 3),
      weeksPerMonth: Number(p?.revenue?.weeksPerMonth ?? 4),
      privatePerMonth: Number(p?.revenue?.privatePerMonth ?? 1),
      corporatePerMonth: Number(p?.revenue?.corporatePerMonth ?? 2),
      airbnbPerMonth: Number(p?.revenue?.airbnbPerMonth ?? 2),
      merchPerMonth: Number(p?.revenue?.merchPerMonth ?? 200),
      giftCardPerMonth: Number(p?.revenue?.giftCardPerMonth ?? 300),
      tipsPerGuest: Number(p?.revenue?.tipsPerGuest ?? 2),
    },
    cogs: {
      canvas: Number(p?.cogs?.canvas ?? 4),
      paint: Number(p?.cogs?.acrylicPaint ?? 0.9),
      brushes: Number(p?.cogs?.brushes ?? 0.4),
      palette: Number(p?.cogs?.paintPalette ?? 0.35),
      snacks: Number(p?.cogs?.snacks ?? 1),
      wine: Number(p?.cogs?.wineRefreshments ?? 2.5),
      cleaning: Number(p?.cogs?.cleaningSupplies ?? 0.4),
    },
    fixed: {
      rent: Number(p?.fixed?.rent ?? 3850),
      payroll: Number(p?.fixed?.breakdown?.Payroll?.['Total Payroll'] ?? 8600),
      marketing: 500,
      insurance: Number(p?.fixed?.breakdown?.['Insurance & Legal']?.Total ?? 600),
      utilities: Number(p?.fixed?.breakdown?.['Office Expenses']?.Internet ?? 100) + Number(p?.fixed?.breakdown?.['Office Expenses']?.Phone ?? 75),
      technology: Number(p?.fixed?.breakdown?.Technology?.['Total Technology'] ?? 1008),
      miscellaneous: Number(p?.fixed?.breakdown?.Transportation?.Total ?? 350) + Number(p?.fixed?.breakdown?.['Equipment (Capital Assets)']?.Total ?? 125) + Number(p?.fixed?.breakdown?.Miscellaneous?.Total ?? 255),
    },
    purchase: {
      purchasePrice: Number(p?.purchase?.purchasePrice ?? 55000),
      transferFee: Number(p?.purchase?.transferFee ?? 12500),
      refreshCost: Number(p?.purchase?.refreshCost ?? 2250),
    },
  }
}

const createDefaultScenarios = (): Record<ScenarioKey, Assumptions> => ({
  conservative: cloneAssumptions(mapProdAssumptions()),
  expected: cloneAssumptions(mapProdAssumptions()),
  optimistic: cloneAssumptions(mapProdAssumptions()),
})

type State = {
  scenarios: Record<ScenarioKey, Assumptions>
  active: ScenarioKey
  setActive: (k: ScenarioKey) => void
  updateAssumptions: (k: ScenarioKey, patch: Partial<Assumptions>) => void
  reset: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      scenarios: createDefaultScenarios(),
      active: 'expected',
      setActive: (k) => set({ active: k }),
      updateAssumptions: (k, patch) => set((state) => ({
        scenarios: { ...state.scenarios, [k]: { ...state.scenarios[k], ...patch } },
      })),
      reset: () => set({ scenarios: createDefaultScenarios() }),
    }),
    { name: 'psp-storage' }
  )
)
