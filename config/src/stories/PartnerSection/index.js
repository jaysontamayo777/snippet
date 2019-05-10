import React from "react";
import { storiesOf } from "@storybook/react";
import configureStore from "redux-mock-store";
import PartnerSection from "../../components/PartnerSection";
import { Provider } from "react-redux";

const mockStore = configureStore();

storiesOf("PartnerSection", module)
  .add("Default", () => {
    const state = {
      partner: {
        name: "",
        styles: {
          color: "#333",
          borderColor: "#ccc",
          backgroundColor: "#FFFFFF"
        }
      }
    };
    return (
      <Provider store={mockStore(state)}>
        <PartnerSection />
      </Provider>
    );
  })

  .add("Cebu Pacific", () => {
    const state = {
      partner: {
        name: "cebupacific",
        styles: {
          color: '#0077e8',
          borderColor: "#fbe122",
          backgroundColor: "#ececec"
        }
      }
    };
    return (
      <Provider store={mockStore(state)}>
        <PartnerSection />
      </Provider>
    );
  })

  .add("HSBC", () => {
    const state = {
      partner: {
        name: "hsbc",
        styles: {
          color: "#000000",
          borderColor: "#da0011",
          backgroundColor: "#f5f6f7"
        }
      }
    };
    return (
      <Provider store={mockStore(state)}>
        <PartnerSection />
      </Provider>
    );
  });
