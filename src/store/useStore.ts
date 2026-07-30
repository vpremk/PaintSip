import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Assumptions, ScenarioKey } from '../types'
import defaultAssumptionsJson from '../data/defaultAssumptions.json'

const cloneAssumptions = (assumptions: Assumptions): Assumptions =>
  JSON.parse(JSON.stringify(assumptions)) as Assumptions

const createDefaultScenarios = (): Record<ScenarioKey, Assumptions> => ({
  conservative: cloneAssumptions(defaultAssumptionsJson as Assumptions),
  expected: cloneAssumptions(defaultAssumptionsJson as Assumptions),
  optimistic: cloneAssumptions(defaultAssumptionsJson as Assumptions),
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
