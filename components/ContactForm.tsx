"use client";

import { FormEvent, useState, useRef, useEffect } from "react";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Malaysia",
  "Maldives",
  "Mexico",
  "Mongolia",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "North Korea",
  "Norway",
  "Pakistan",
  "Palau",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function ContactForm() {
  const [enquiryName, setEnquiryName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState("hidden");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ name: enquiryName, email: email, subject: subject, message: message }),
    });

    setEnquiryName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setShowToast("");

    const timeoutId = setTimeout(() => {
      setShowToast("hidden");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSubject(value);
    setFilteredCountries(countries.filter(c => c.toLowerCase().includes(value.toLowerCase())));
    setDropdownOpen(true);
  }

  function handleSelect(value: string) {
    setSubject(value);
    setDropdownOpen(false);
  }

  return (
    <>
      <div className={showToast}>
        <div className="toast toast-center mt-16 z-[999]">
          <div className="alert alert-success">
            <span>We have received your query ! Your tailor made itinerary is cooking</span>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="text-center mt-5">
          <h3 className="text-3xl font-bold">Write to us !</h3>
          <p className="p-6">
            Want to enquire about a package? Have a general query about Indian tours? Write to us to
            know more details and get a well tailored package to your needs !
          </p>
        </div>
        <form id="enquiry-form" className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              value={enquiryName}
              onChange={e => setEnquiryName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="input input-bordered"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <textarea
              placeholder="Message"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            ></textarea>
          </div>
          <div className="form-control mt-3">
            <button
              className="btn bg-[#025C7A] rounded-[41px] text-white px-8 hover:bg-[#6E9753]"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
