import Navbar from "../components/Navbar"; 
import HeroSlider from "../components/HeroSlider";
import CategoriesGrid from "../components/CategoriesGrid.jsx";
import BestSellersGrid from "../components/BestSellersGrid.jsx";
import Footer from "../components/Footer.jsx";

function HomeView() {
    return (
    <div>
        <Navbar />
        <HeroSlider />
        <CategoriesGrid />
        <BestSellersGrid />
        <Footer />
    </div>
    );
}

export default HomeView;