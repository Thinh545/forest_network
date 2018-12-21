const defaultState = {
    data: null
}

const blockchain = ( state = defaultState, action ) => {
    switch(action.type){
        case 'UPDATEBLOCKCHAINDATA':
            return { ...state, data: action.data }
        default:
            return state;
    }
};

export default blockchain;