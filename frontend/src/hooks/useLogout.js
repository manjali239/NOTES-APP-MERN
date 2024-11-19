import { useAuthContext } from './useAuthContext'
import { useNotesContext } from './useNotesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchNotes } = useNotesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchNotes({ type: 'ADD_NOTES', payload: null })
  }

  return { logout }
}