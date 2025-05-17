import { Route, Switch } from "wouter";
import { CartProvider } from "./context/cart/CartProvider";
import { AuthProvider } from "./auth/AuthContext";
import { useAuth } from "./auth/useAuth";
import HomeView from "./views/HomeView";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";
import ShopView from "./views/Shop";
import ProductDetailsView from "./views/ProductDetailsView";
import CartView from "./views/CartView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import OrderView from "./views/OrderView";
import OrderDetails from "./views/OrderDetailsView";
import SuccessPaymentView from "./views/SuccessPaymentView";

function InnerAppWithCart() {
  const { user } = useAuth();
  const userId = user?.id || null;

  return (
    <CartProvider userId={userId}>
      <Switch>
        <Route path="/" component={HomeView} />
        <Route path="/shop" component={ShopView} />
        <Route path="/shop/product/:slug" component={ProductDetailsView} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/cart" component={CartView} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/orders" component={OrderView} />
        <Route path="/orders/:id" component={OrderDetails} />
        <Route path="/success" component={SuccessPaymentView} />
      </Switch>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerAppWithCart />
    </AuthProvider>
  );
}

export default App;
