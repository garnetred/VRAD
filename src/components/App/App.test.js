import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("should show the login page when website first loads", () => {
    const router = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const { getByText } = render(router);
    expect(getByText("Email")).toBeInTheDocument();
  });
  //should show the areas page when login form is submitted

  it("should be able to log users out", () => {
    //should redirect user to login page if they've clicked sign out
    // - basically 'email' should be in the document when the button is clicked
    const router = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      router
    );
    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Ryan" },
    });
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "ryan@gmail.com" },
    });
    fireEvent.change(getByDisplayValue("--Please select a purpose--"), {
      target: { value: "business" },
    });
    fireEvent.click(getByText("Login"));
    fireEvent.click(getByText("Sign Out"));
    expect(getByText("Email")).toBeInTheDocument();
  });

  it("should show information retrieved via fetch", async () => {
    //should redirect user to login page if they've clicked sign out
    // - basically 'email' should be in the document when the button is clicked
    const router = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const data = [
      {
        about:
          "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
        id: 590,
        image: "/static/media/RiNo.b8c7b96a.png",
        length: 6,
        __proto__: Array(0),
        location: "North of Downtown Denver",
        name: "River North",
        nickname: "RiNo",
        quick_search: "o5kod9f5cqo0",
        region_code: 6356834,
      },
    ];

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      router
    );
    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Ryan" },
    });
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "ryan@gmail.com" },
    });
    fireEvent.change(getByDisplayValue("--Please select a purpose--"), {
      target: { value: "business" },
    });
    fireEvent.click(getByText("Login"));
    await waitFor(expect(getByText("River North")).toBeInTheDocument());
    //might not be an issue with fetch call
    //need data to iterate through, there is no data because
    //mainpagecontainer doesn't receive any data in the test...
    //even if fetch call is working perfectly the data still isn't being passed in
    //other tests won't work for the same reason
  });

  //should show listings when "view listings" is clicked within the area container

  //should add item to favorites from the alllistings component

  //should add item to favorites from the singlebiglisting component

  //should show additional listing information if user has clicked that button
  //on an individual listing on the all listings page
});
