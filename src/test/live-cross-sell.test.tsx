import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BookingProvider } from "@/components/home/BookingModal";
import { LiveCourses } from "@/components/home/Top";

afterEach(cleanup);

describe("Live cross-sell destinations", () => {
  it.each([
    "Θέλω εξατομικευμένη εταιρική εκπαίδευση",
    "Θέλω ένα 8ωρο Sprint μέσα στην εταιρεία μου",
  ])("opens booking and restores focus for %s", (name) => {
    const { getByRole, queryByRole } = render(<BookingProvider><LiveCourses /></BookingProvider>);
    const link = getByRole("link", { name });
    expect(link).toHaveAttribute("href", "#contact");
    expect(fireEvent.click(link)).toBe(false);
    expect(getByRole("dialog").querySelector("iframe")?.src).toContain("https://calendly.com/theupgraders/30min");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(link);
  });

  it("opens recordings in a secure new tab", () => {
    const { getByRole } = render(<BookingProvider><LiveCourses /></BookingProvider>);
    const link = getByRole("link", { name: "Θέλω να δω μαγνητοσκοπημένες εκπαιδεύσεις" });
    expect(link).toHaveAttribute("href", "https://thesessions.gr/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});