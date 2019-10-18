import Home from './src/pages/home/Home.js'
import SignUp from './src/pages/Auth/SignUp.js'
import Login from './src/pages/Auth/Login.js'
import AddExpensive from './src/pages/Expensive/AddExpensive.js'
import UserHome from './src/pages/user/UserHome.js'

const ROUTES = [
    {
      path: "/home",
      name: "Home",
      component: Home,
      exact: true
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        exact: true
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        exact: true
      },
      {
        path: "/addexpensive",
        name: "AddExpensive",
        component: AddExpensive,
        exact: true
      },
      {
        path: "/userhome",
        name: "UserHome",
        component: UserHome,
        exact: true
      },
      
]
export default  ROUTES;