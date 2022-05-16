// Productivo
//const WS = "https://d3vqm8bgekjwzd.cloudfront.net";
// Local
//const WS = "http://localhost:3001";
// Login
const WS = "http://localhost:8081";



export const addUserPost = WS + "/user/add"
export const modUserPut = WS + "/user/mod"
export const delUserDelete = WS + "/user/delete"
export const allFavCharacter = WS + "/character/allFavCharacter"
export const addFavCharacter = WS + "/character/addFavCharacter"


export const loginUserPost = WS + "/user/login"


export const getCharactersGET = (page) => { return WS + `/character/all?page=${page}` }
export const getinfoCharacterGET = () => { return WS + `/character/infoCharacter` } 