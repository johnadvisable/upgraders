import { fireEvent, render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { courses } from "@/components/home/data";
import { Pill } from "@/components/home/ui";

afterEach(cleanup);

describe("course booking", () => {
  it("books the AI Coding Masterclass through the supplied Eventora link", () => {
    const course = courses.find((c) => c.title === "AI Coding Masterclass");
    expect(course?.url).toBe("https://www.eventora.com/el/Events/upgraders-ai-coding-masterclas");
    expect(course?.status).toBe("open");
  });

  it("uses the masterclass dates and starting price listed on Eventora", () => {
    const course = courses.find((c) => c.title === "AI Coding Masterclass");
    expect(course?.date).toBe("17 & 18 Δεκεμβρίου 2026");
    expect(course?.time).toBe("15:00 – 20:00");
    expect(course?.price).toBe("από 149 €");
  });

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