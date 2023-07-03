import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import ViewInvoice from './pages/ViewInvoice'
import InvoiceList from './pages/InvoiceList'
import PageNotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",element: <InvoiceList />,
  },
  {
    path: "/:id",element: <ViewInvoice />,
  },
  {
    path: '*', exact: true, element: <PageNotFound />
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
