import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumb currentPage="About Us" />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
              <div className="space-y-2 flex flex-col items-center justify-center sm:block">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-red-600">
                  Welcome to TechLand
                </h3>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Our Story
                </h1>
              </div>
              
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p className="indent-4">
                  At TechLand, our mission is to make cutting-edge electronics
                  accessible to everyone through a seamless and reliable online
                  shopping experience. We are a passionate team driven by
                  innovation, quality, and customer satisfaction.
                </p>
                <p>
                  From the latest gadgets to essential tech gear, we carefully
                  curate our catalog to meet the evolving needs of modern life.
                </p>
                <p>
                  We believe technology should empower and inspire — that's why we
                  are committed to providing only the best products at competitive
                  prices, with fast delivery and excellent support. Whether you're a
                  gamer, a creator, or just tech-savvy, TechLand is your trusted
                  partner for everything electronic.
                </p>
              </div>
              
              <Link to="/contactus">
                <button
                  type="button"
                  className="mt-4 py-3 px-8 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-center shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto"
                >
                  Contact Us
                </button>
              </Link>
            </div>

            <div className="w-full lg:w-1/2">
              <img
                src="/images/aboutus.jpg"
                alt="TechLand Team"
                className="w-full h-auto rounded-xl shadow-lg object-cover aspect-video lg:aspect-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AboutUs;