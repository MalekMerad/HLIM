import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

/* Components import */
import Navbar from './component/Navbar';
import Footer from './component/Footer';
/* Pages import */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse'
import Product from './pages/Product';
import LangSelector from './component/LangSelector';



const Layout = ()=>{
return (
    <>
      <Navbar/>
      <Outlet/>
      <LangSelector/>
      <Footer/>
    </>
  )  
}


const router = createBrowserRouter([
  {
      path : '/',
      element : <Layout/>,
      children : [
                    {
                        path : '/',
                        element : <Home/>
                    },
                    {
                      path : 'browse',
                      element : <Browse/>
                    },
                    {
                      path : 'post/:id',
                      element : <Product/>
                    }
                ]
  },
  {
      path : '/login',
      element : <Login/>
  },
  {
      path : '/register',
      element : <Register/>
  },
])


function App() {


  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
