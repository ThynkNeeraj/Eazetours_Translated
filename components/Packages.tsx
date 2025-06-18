"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PackageSummaryCard from "./PackageSummaryCard";
import packageData from "../data/packages.json";

function PackagesList() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  const [tabName, setTabName] = useState(initialTab);
  const [packagesList, setPackagesList] = useState(packageData);
  const dropDownRef = useRef<HTMLDetailsElement>(null);

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
    ["bhutan", "Bhutan Tours"],
    ["srilanka", "Sri Lanka Tours"],
  ]);

  useEffect(() => {
    if (initialTab !== "all") {
      const filteredPackages = packageData.filter(tourPackage =>
        tourPackage.Tags.includes(initialTab)
      );
      setPackagesList(filteredPackages);
    } else {
      setPackagesList(packageData);
    }
    setTabName(initialTab);
  }, [initialTab]);

  function handleTabClick(tab: string) {
    setTabName(tab);

    if (tab !== "all") {
      const filtered = packageData.filter(pkg =>
        pkg.Tags.includes(tab)
      );
      setPackagesList(filtered);
    } else {
      setPackagesList(packageData);
    }

    if (dropDownRef.current) {
      dropDownRef.current.removeAttribute("open");
    }

    // Update URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  }

  return (
    <>
      {/* Tabs for large screens */}
      <div role="tablist" className="hidden lg:tabs lg:tabs-boxed justify-center flex-wrap">
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "all" ? "tab-active" : "")}
          onClick={() => handleTabClick("all")}
        >
          All Packages
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "adventure" ? "tab-active" : "")}
          onClick={() => handleTabClick("adventure")}
        >
          Adventure Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "ayurveda" ? "tab-active" : "")}
          onClick={() => handleTabClick("ayurveda")}
        >
          Ayurveda
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "cultural" ? "tab-active" : "")}
          onClick={() => handleTabClick("cultural")}
        >
          Cultural Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "luxury" ? "tab-active" : "")}
          onClick={() => handleTabClick("luxury")}
        >
          Luxury Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "honeymoon" ? "tab-active" : "")}
          onClick={() => handleTabClick("honeymoon")}
        >
          Honeymoon Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "pilgrim" ? "tab-active" : "")}
          onClick={() => handleTabClick("pilgrim")}
        >
          Pilgrimage Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "tribal" ? "tab-active" : "")}
          onClick={() => handleTabClick("tribal")}
        >
          Tribals Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "wildlife" ? "tab-active" : "")}
          onClick={() => handleTabClick("wildlife")}
        >
          Wildlife Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "bhutan" ? "tab-active" : "")}
          onClick={() => handleTabClick("bhutan")}
        >
          Bhutan Tours
        </button>
        <button
          role="tab"
          className={"tab px-[10px]" + (tabName === "srilanka" ? "tab-active" : "")}
          onClick={() => handleTabClick("srilanka")}
        >
          Sri Lanka Tours
        </button>
      </div>

      {/* Dropdown for small screens */}
      <div className="flex justify-center lg:hidden">
        <details className="dropdown" ref={dropDownRef}>
          <summary className="btn m-1">{tabDisplayName.get(tabName)}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {Array.from(tabDisplayName.entries()).map(([key, label]) => (
              <li key={key}>
                <button onClick={() => handleTabClick(key)}>{label}</button>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Packages grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-8 my-8">
        {packagesList.map(tourPackage => (
          <div key={tourPackage.Id}>
            <PackageSummaryCard tourPackage={tourPackage} />
          </div>
        ))}
      </div>
    </>
  );
}

export default PackagesList;
