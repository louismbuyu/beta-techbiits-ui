import Nav from "./Nav";

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => {
        dispatch({type: TOGGLE_SIDE_BAR});
    },
    toggleAuthModal: (signupOrLogin) => {
        dispatch({type: UPDATE_AUTH_TYPE, signupOrLogin});
        dispatch({type: TOGGLE_AUTH_MODAL_VISIBILITY})
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Nav);