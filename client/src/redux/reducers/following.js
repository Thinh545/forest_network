let initialState = {
    followings: [
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

const following = ( state = initialState, action ) => {
    switch(action.type){
        case 'FOLLOWING':
            return { ...state, followings: action.following }
        default:
            return state
    }
}

export default following;