import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";

function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Breadcrumb currentPage="Contact Us" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col items-center">
            <div className="w-full lg:w-2/3 xl:w-1/2 text-center">
              <h3 className="text-lg sm:text-xl text-red-600 mb-2">Contact</h3>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                Get in Touch With Us
              </h2>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <ContactUsForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContactUs;