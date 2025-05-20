"use client";

import React, { useRef, useState } from "react";
import PackageSummaryCard from "./PackageSummaryCard";

import packageData from "../data/packages.json";

function PackagesList() {
  const [tabName, setTabName] = useState("all");
  const tabDisplayName = new Map<string, string>([
    ["all", "All Packages"],
    ["adventure", "Adventure Tours"],
    ["ayurveda", "Ayurveda"],
    ["cultural", "Cultural Tours"],
    ["luxury", "Luxury Tours"],
    ["honeymoon", "Honeymoon Tours"],
    ["pilgrim", "Pilgrimage Tours"],
    ["tribal", "Tribals Tours"],
    ["wildlife", "Wildlife Tours"],
  ]);
  const [packagesList, setPackagesList] = useState(packageData);
  const dropDownRef = useRef<HTMLDetailsElement>(null);

  function handleTabClick(tabName: string) {
    setTabName(tabName);
    if (tabName != "all") {
      const filteredPackages = packageData.filter(tourPackage =>
        tourPackage.Tags.includes(tabName)
      );
      setPackagesList(filteredPackages);
    } else {
      setPackagesList(packageData);
    }
    if (dropDownRef.current != null) {
      dropDownRef.current.removeAttribute("open");
    }
  }
  return (
    <>
      <div role="tablist" className="hidden lg:tabs lg:tabs-boxed justify-center">
        <button
          role="tab"
          className={"tab " + (tabName == "all" ? "tab-active" : "")}
          onClick={_ => handleTabClick("all")}
        >
          All Packages
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "adventure" ? "tab-active" : "")}
          onClick={_ => handleTabClick("adventure")}
        >
          Adventure Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "ayurveda" ? "tab-active" : "")}
          onClick={_ => handleTabClick("ayurveda")}
        >
          Ayurveda
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "cultural" ? "tab-active" : "")}
          onClick={_ => handleTabClick("cultural")}
        >
          Cultural Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "luxury" ? "tab-active" : "")}
          onClick={_ => handleTabClick("luxury")}
        >
          Luxury Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "honeymoon" ? "tab-active" : "")}
          onClick={_ => handleTabClick("honeymoon")}
        >
          Honeymoon Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "pilgrim" ? "tab-active" : "")}
          onClick={_ => handleTabClick("pilgrim")}
        >
          Pilgrimage Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "tribal" ? "tab-active" : "")}
          onClick={_ => handleTabClick("tribal")}
        >
          Tribals Tours
        </button>
        <button
          role="tab"
          className={"tab " + (tabName == "wildlife" ? "tab-active" : "")}
          onClick={_ => handleTabClick("wildlife")}
        >
          Wildlife Tours
        </button>
      </div>
      <div className="flex justify-center lg:hidden">
        <details className="dropdown" ref={dropDownRef}>
          <summary className="btn m-1">{tabDisplayName.get(tabName)}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <button onClick={_ => handleTabClick("all")}>All Packages</button>{" "}
            </li>
            <li>
              <button onClick={_ => handleTabClick("adventure")}>Adventure Tours</button>{" "}
            </li>
            <li>
              <button onClick={_ => handleTabClick("ayurveda")}>Ayurveda</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("cultural")}>Cultural Tours</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("luxury")}>Luxury Tours</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("honeymoon")}>Honeymoon Tours</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("pilgrim")}>Pilgrimage Tours</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("tribal")}>Tribals Tours</button>
            </li>
            <li>
              <button onClick={_ => handleTabClick("wildlife")}>Wildlife Tours</button>
            </li>
          </ul>
        </details>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-8 my-8">
        {packagesList.map(tourPackage => (
          <div key={tourPackage.Id}>
            <PackageSummaryCard tourPackage={tourPackage}></PackageSummaryCard>
          </div>
        ))}
      </div>
    </>
  );
}

export default PackagesList;
