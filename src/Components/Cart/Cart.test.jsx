import { vi, it, describe, expect } from "vitest";
import Cart from './Cart.jsx'
import { within, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";
/* ---------- Test wrapper ---------- */
function CartWrapper({ cart, handleQuantity }) {
  return <Outlet context={{ cart, handleQuantity }} />;
}

/* ---------- Render helper ---------- */

export function renderCart(cart = [], handleQuantity = vi.fn()) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <CartWrapper
            cart={cart}
            handleQuantity={handleQuantity}
          />
        ),
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
    ],
    {
      initialEntries: ["/"],
    }
  );

  render(<RouterProvider router={router} />);

  return { handleQuantity };
}

describe('Shopping cart', () => {
  it("shows empty cart message when cart is empty", () => {
    renderCart([]);

    expect(
      screen.getByText(/There is nothing to show here, your cart is empty./i)
    ).toBeInTheDocument();
  });

  it("renders products in the cart", () => {
    renderCart([
      {
        id: "1",
        title: "Test Product",
        price: 10,
        quantity: 2,
        imgUrl: "test.jpg",
      },
    ]);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });
  it("shows correct total per product", () => {
    renderCart([
      {
        id: "1",
        title: "Product",
        price: 10,
        quantity: 3,
        imgUrl: "test.jpg",
      },
    ]);
    const details = screen.getByText("Details").closest("div");

    expect(within(details).getByText("Subtotal:")).toBeInTheDocument();
    expect(within(details).getByText("$30.00")).toBeInTheDocument();
    expect(within(details).getByText("$35.40")).toBeInTheDocument();

  });

  it("calls handleQuantity when clicking +", async () => {
    const handleQuantity = vi.fn();
    const user = userEvent.setup();

    renderCart(
      [
        {
          id: "1",
          title: "Product",
          price: 10,
          quantity: 1,
          imgUrl: "",
        },
      ],
      handleQuantity
    );

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(handleQuantity).toHaveBeenCalledWith("1", 2);
  });
  it("calls handleQuantity when clicking -", async () => {
    const handleQuantity = vi.fn();
    const user = userEvent.setup();

    renderCart(
      [
        {
          id: "1",
          title: "Product",
          price: 10,
          quantity: 2,
          imgUrl: "",
        },
      ],
      handleQuantity
    );

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(handleQuantity).toHaveBeenCalledWith("1", 1);
  });

})

