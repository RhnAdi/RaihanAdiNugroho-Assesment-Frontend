import { create } from 'zustand'

const useStore = create<{ bears: number, increasePopulation: () => void }>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}))

export default useStore