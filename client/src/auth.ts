/*import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'



type AuthState = {
  user: {
    id: string
    username: string
    image: string
  } | null
}

var initialState: AuthState = { user: null }

const token = Cookies.get('access_token')
if (token) {
  var { username, id, image }: any = jwtDecode(token)

  initialState = {
    user: {
      username,
      id,
      image,
    },
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer
*/
export {}