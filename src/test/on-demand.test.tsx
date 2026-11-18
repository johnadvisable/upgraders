import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BookingProvider } from "@/components/home/BookingModal";
import { Services } from "@/components/home/Top";

afterEach(cleanup);

it("keeps On Demand unavailable without navigation or opening booking", () => {
  const { getByRole, queryByRole } = render(<BookingProvider><Services /></BookingProvider>);
  const card = getByRole("heading", { name: "On Demand εκπαίδευση" }).parentElement;
  const action = card?.querySelector("button");
  expect(action).toBeDisabled();
  expect(card?.querySelector("a")).toBeNull();
  if (!action) throw new Error("On Demand action is missing");
  fireEvent.click(action);
  expect(queryByRole("dialog")).toBeNull();
});