import { useAppContext } from '.';

export default function storeHelper() {
  const { dispatch } = useAppContext();
  const toggleNewColProjectModal = () => dispatch({ type: 'TOGGLE_NEW_COL_MODAL' })


  return {
    toggleNewColProjectModal
  }
}