export const switchEditMode = ( enableEdit ) => ({
    type: 'EDITINFO',
    enableEdit
});

export const updateUsername = ( username ) => ({
    type: 'UPDATEUSERNAME',
    username
});

export const updateChannel = ( channel ) => ({
    type: 'UPDATECHANNEL',
    channel
});

export const updateDescription = ( description ) => ({
    type: 'UPDATEDESCRIPTION',
    description
});

export const updateLocation = ( location ) => ({
    type: 'UPDATELOCATION',
    location
});

export const updateWebsite = ( website ) => ({
    type: 'UPDATEWEBSITE',
    website
});

export const updateAvatar = ( avatar ) => ({
    type: 'UPDATEAVATAR',
    avatar
});