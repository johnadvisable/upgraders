import { fireEvent, render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { courses } from "@/components/home/data";
import { Pill } from "@/components/home/ui";

afterEach(cleanup);

describe("course booking", () => {
  it("uses the supplied AI for Business placeholder", () => {
    expect(courses.find((c) => c.date === "12 & 13 Νοεμβρίου 2026")?.url).toBe("https://eventora.example/PLACEHOLDER-ai-for-business");
  });

  it("uses the supplied Managers placeholder", () => {
    expect(courses.find((c) => c.date === "3 Δεκεμβρίου 2026")?.url).toBe("https://eventora.example/PLACEHOLDER-ai-for-managers");
  });

  it("does not activate a booking without a URL", () => {
    const onClick = vi.fn();
    const { getByText } = render(<Pill href={undefined} aria-disabled onClick={onClick}>Book</Pill>);
    expect(fireEvent.click(getByText("Book"))).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });
});