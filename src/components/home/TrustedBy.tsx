import { clients } from "./data";

export function TrustedBy() {
  return (
    <section aria-label="Μας εμπιστεύονται" className="trusted-by">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-[26px] md:gap-10">
        <p className="w-[110px] shrink-0 text-[15px] leading-snug">
          Μας<br />εμπιστεύονται
        </p>
        <div className="trusted-by-window min-w-0 flex-1 overflow-hidden">
          <div className="trusted-by-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center gap-12 pr-12">
                {clients.map((client) => (
                  <div key={client} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-xl font-semibold text-trusted-name">
                    <span aria-hidden="true" className="h-[22px] w-[22px] shrink-0 rounded-[6px] border-[1.5px] border-dashed border-trusted-placeholder" />
                    <span>{client}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}