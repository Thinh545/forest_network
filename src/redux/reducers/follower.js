let initialState = {
    followers: [
        {
            title: 'Họa mi 1',
            email: 'hoami@gmail.com'
        },
        {
            title: 'Họa mi 2',
            email: 'hoami@gmail.com'
        },
        {
            title: 'Họa mi 3',
            email: 'hoami@gmail.com'
        },
        {
            title: 'Họa mi 4',
            email: 'hoami@gmail.com'
        },
        {
            title: 'Họa mi 5',
            email: 'hoami@gmail.com'
        }
    ]
}

const follower = ( state = initialState, action ) => {
    switch(action.type){
        case 'FOLLOWER':
            return { ...state, followers: action.follower }
        default:
            return state
    }
}

export default follower;