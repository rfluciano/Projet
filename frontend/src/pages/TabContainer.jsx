/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../style/tab.css";

const TabbedContainer = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <div>Date et Heure</div>;
      case "reservations":
        return <div>Départ & Destination</div>;
      case "announcements":
        return <div>Places & Prix</div>;
      case "history":
        return <div>Publier</div>;
      default:
        return null;
    }
  };

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
            <img src="/images/timetable.png" alt="" width={"20px"}/>
          Date et Heure
        </button>
        <button
          className={`tab-button ${activeTab === "reservations" ? "active" : ""}`}
          onClick={() => setActiveTab("reservations")}
        >
            <img src="/images/Location.png" alt="" width={"20px"}/>
          Départ & Destination
        </button>
        <button
          className={`tab-button ${activeTab === "announcements" ? "active" : ""}`}
          onClick={() => setActiveTab("announcements")}
        >
            <img src="/images/taxi_pay.png" alt="" width={"20px"}/>
          Places & Prix
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
            <img src="/images/share_document.png" alt="" width={"20px"}/>
          Publier
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabbedContainer;
