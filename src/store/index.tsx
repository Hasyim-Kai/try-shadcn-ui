import { createContext, useContext, useReducer, Dispatch, ReactNode, Reducer } from 'react';
interface AppState {
    isNewColModalOpen: boolean;
}

const initialState: AppState = {
    isNewColModalOpen: false,
};

// Define your action types
type AppAction = {
    type: 'TOGGLE_NEW_COL_MODAL' | 'RESET' | 'ENABLE_MACHINE_REPORT_FORM' | 'DISABLE_MACHINE_REPORT_FORM';
    payload?: boolean;
};
type AppDispatch = Dispatch<AppAction>;
const AppContext = createContext<{
    state: AppState;
    dispatch: AppDispatch;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'TOGGLE_NEW_COL_MODAL':
            return { ...state, isNewColModalOpen: !state.isNewColModalOpen };
        default:
            return state;
    }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};