const defaultState = {
    data: null,
    secret: '',
    userInfo: {}
}

const blockchain = ( state = defaultState, action ) => {
    switch(action.type){
        case 'UPDATEBLOCKCHAINDATA':
            return { ...state, data: action.data }
        case 'UPDATESECRET':
            return { ...state, secret: action.secret }
        case 'UPDATEUSERINFO':
            return { ...state, userInfo: action.userInfo }
        default:
            return state;
    }
};

export default blockchain;