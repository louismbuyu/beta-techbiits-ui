import { createStore, action } from "easy-peasy";

const store = createStore({
    menu: {
        isMenuOpen: true,
        toggleMenu: action((state) => {
            state.isMenuOpen = !state.isMenuOpen;
        }),
        selectedMenuItem: '',
        setMenuItem: action((state, payload) => {
            state.isMenuOpen = false;
            state.selectedMenuItem = payload;
        })
    },
    auth: {
        currentUser: null,
        setCurrentUser: action((state, payload) => {
            state.currentUser = payload;
        }),
        isAuthModalOpen: false,
        toggleAuthModal: action((state) => {
            state.isAuthModalOpen = !state.isAuthModalOpen;
        }),
        authModalType: '',
        setAuthModalType: action((state, payload) => {
            state.authModalType = payload;
        }),
    },
});

export default store;