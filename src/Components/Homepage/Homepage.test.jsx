import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";

import Homepage from "./Homepage";
import Shop from "../Shop/Shop.jsx";
import Cart from "../Cart/Cart.jsx";

/* ---------- Test helpers ---------- */

function HomeStub() {
  return <h1>Home</h1>;
}

function renderWithRouter(initialEntry) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Homepage />,
        children: [
          { path: "home", element: <HomeStub /> },
          { path: "shop", element: <Shop />, loader: shopLoaderStub },
          { path: "cart", element: <Cart /> },
        ],
      },
    ],
    {
      initialEntries: [initialEntry],
    }
  );

  render(<RouterProvider router={router} />);
}

const shopLoaderStub = async () => {
  return {
    products: [
      {
        asin: "TEST-ASIN-1",
        title: "Test Product One With Long Name",
        imageUrl: "https://example.com/product.jpg",
        price: {
          amount: 19.99,
        },
      },
    ],
  };
};



/* ---------- Tests ---------- */

describe("Homepage cart integration", () => {
  it("renders with an empty cart at /home", () => {
    renderWithRouter("/home");

    // Home route renders
    expect(
      screen.getByRole("heading", { name: "Home" })
    ).toBeInTheDocument();

    // Cart counter should not exist
    expect(
      screen.queryByLabelText(/cart items:/i)
    ).not.toBeInTheDocument();
  });

  it("updates cart when adding an item from Shop", async () => {
    const user = userEvent.setup();
    renderWithRouter("/shop");

    // Cart starts empty
    expect(
      screen.queryByLabelText(/cart items:/i)
    ).not.toBeInTheDocument();

    // Add item
    const addButton = await screen.findByRole("button", {
      name: /Add to cart/i,
    });
    await user.click(addButton);

    // Cart counter updates
    expect(
      screen.getByLabelText(/cart items: 1/i)
    ).toBeInTheDocument();
  });

  it("cart persists when navigating from Shop to Cart", async () => {
    const user = userEvent.setup();
    renderWithRouter("/shop");
    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    // Add item
    await user.click(addButton);

    // Navigate to cart
    await user.click(
      screen.getByRole("link", { name: /shopping cart/i })
    );

    // Item is still present
    expect(
      screen.getByText("Test Product One With Long Name")
    ).toBeInTheDocument();
  });
  it("removes item when clicking remove from cart", async () => {
    const user = userEvent.setup();
    renderWithRouter("/shop");

    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButton);

    const removeButton = await screen.findByRole("button", {
      name: /remove from cart/i,
    });

    await user.click(removeButton);
    expect(
      screen.queryByLabelText(/cart items:/i)
    ).not.toBeInTheDocument();
  });

});

