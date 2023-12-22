import React from 'react'

const NxtWatchContext = React.createContext({
  lightTheme: true,
  changeThemeAndAttributes: () => {},
  changedAttributesOnThemeChange: () => {},
  likedList: [],
  disLikedList: [],
  savedList: [],
  addAsLikedVideos: () => {},
  addAsDislikedVideos: () => {},
  addOrRemoveAsOrFromSavedVideos: () => {},
})

export default NxtWatchContext
