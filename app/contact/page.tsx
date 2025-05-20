import { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Eaze Tours for Your Travel Inquiries",
  description:
    "Get in touch with Eaze Tours for personalized travel assistance. Our team is ready to help with bookings, inquiries, and more for your next trip. Call Now!",
};

export default function ContactUs() {
  return (
    <div>
      <div className="hero mt-[135px] min-h-screen bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">Head Office - New Delhi</h2>
                <span className="text-xl text-center">
                  <p>Eaze Tours</p>
                  <p>
                    Eaze House –Second Floor, RZP- 146, Gali No 2 Raj Nagar Part 2, Palam Colony,
                    New Delhi, South West Delhi, 110075
                  </p>
                </span>
              </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">Branch Office – Varanasi</h2>
                <span className="text-xl text-center">
                  <p>Eaze House - Sa 6/186-76 Srinagar Colony Pahariya, Varanasi 221007</p>
                </span>
              </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">Contact</h2>
                <span className="text-xl text-center">
                  <p>
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg ">
                      {" "}
                    </i>{" "}
                    +91 987 318 6168
                  </p>
                  <p>
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg ">
                      {" "}
                    </i>{" "}
                    +91 991 168 4818
                  </p>
                  <p>
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg ">
                      {" "}
                    </i>{" "}
                    +91 981 800 6830
                  </p>
                  <p>
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-envelope text-lg leading-lg ">
                      {" "}
                    </i>{" "}
                    info@eazetours.com
                  </p>
                </span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
