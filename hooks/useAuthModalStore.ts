import { create } from 'zustand'

interface IAuthStore  { 
    open: boolean, 
    view : 'Login' | 'SignUp' | 'ResetPassword',
    isOpen: () => void,
    changeView : (view : 'Login' | 'SignUp' | 'ResetPassword') => void
}

const useAuthModalStore = create<IAuthStore>((set) => ({
  open: false,
  view: 'Login',
  isOpen: () => set((state) => ({ open: !state.open })),
  changeView : (view : 'Login' | 'SignUp' | 'ResetPassword') => set((state) => ({ view }))
}))

export default useAuthModalStore