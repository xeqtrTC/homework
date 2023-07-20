import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import ViewDetails from './components/ViewDetails/ViewDetails';
import EditProduct from './components/EditProduct/EditProduct';
import AddProduct from './components/AddProduct/AddProduct';
import { ContextStateProvider } from './context/Context';
import CategoryList from './components/Categories/CategoryList';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={
          <Layout />
        }>
          <Route index element={<Homepage />} />
          <Route path='product/:id' element={<ViewDetails />} />
          <Route path='product/edit/:id' element={<EditProduct />} />
          <Route path='product/add' element={<AddProduct />} />
          <Route path='categories' element={<CategoryList />} />
          <Route path='*' element={<p>404</p>} />
        </Route>
      </Route>
    )
  )

  return (
   <RouterProvider router={router} />
  );
}

export default App;
