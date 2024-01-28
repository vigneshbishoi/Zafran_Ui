import * as actionTypes from "@actions/actionTypes";
const initialState = {
    user: {
        lang: "en",
    },
    register: {
        success: true,
        userData:{}
    },
};



export default(state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.REGISTER:
            return {
                register: action.data,
            };
        default:
            return state;
    }
};
