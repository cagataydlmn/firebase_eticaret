import { Route, Routes, Link, NavLink } from 'react-router-dom'
import Nav from './components/Nav';
import { Basket } from './pages/Basket';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import './style/style.scss';
import  AppProvider  from './context/AppContext';
import Search from './pages/Search';
import LikePage from './pages/LikePage';
import ProductDetail from './components/ProductDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import SignUp from './pages/SignUp';

function App() {
  
  window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  return (
    <AppProvider>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route path='/' element={<Home />}/>
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:category' element={<CategoryDetail />} />
          <Route path='/basket' element={<Basket/> }/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/like' element={<LikePage/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/products/:productId' element={<ProductDetail/>}/>
          <Route path='/search/products/:productId' element={<ProductDetail/>}/>
          <Route path='/categories/products/:productId' element={<ProductDetail/>}/>
          <Route path='/categories/:brand/products/:productId' element={<ProductDetail/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </AppProvider >
  );
}
export default App;