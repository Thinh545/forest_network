let initialState = {
    enableEdit: false,
    photoUrl: 'YoutubeAva.png',
    username: 'Youtube',
    channel: '@Youtube',
    description: 'Imagine if you couldn’t watch the videos you love. We support copyright reform with an Article 13 that works for everyone. #SaveYourInternet',
    location: 'San Bruno, CA',
    website: 'https://www.youtube.com',
    joinDate: 'Joined November 2007'
}

const editInfo = (state = initialState, action) => {
    switch (action.type) {
        case 'EDITINFO':
            return { ...state, enableEdit: action.enableEdit }
        case 'UPDATEUSERNAME':
            return { ...state, username: action.username }
        case 'UPDATECHANNEL':
            return { ...state, channel: action.channel }
        case 'UPDATEDESCRIPTION':
            return { ...state, description: action.description }
        case 'UPDATELOCATION':
            return { ...state, location: action.location }
        case 'UPDATEWEBSITE':
            return { ...state, website: action.website }
        default:
            return state
    }
}

export default editInfo;