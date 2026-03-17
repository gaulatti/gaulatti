import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-sand/10 via-transparent to-transparent" />
      </div>

      <div className="from-sunset/0 via-sunset to-sunset/0 absolute top-0 left-1/2 h-24 w-[1px] -translate-x-1/2 bg-gradient-to-b" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display mb-8 text-6xl leading-tight font-medium tracking-tight md:text-7xl">
            <span className="text-fade-in block" id="dynamicText">
              Javier Godoy
            </span>
          </h1>

          <p className="font-display tracking-refined mb-6 text-2xl font-normal text-sea md:text-3xl">
            Staff Software Engineer
          </p>

          <p className="text-text-secondary mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-light md:text-xl">
            I build and operate media infrastructure, real-time production
            systems, and platform engineering solutions. Formerly at Amazon and
            CNN/Warner Bros. Discovery. Currently architecting FifthBell — a
            personal media systems platform.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/engineering"
              className="light:bg-sea light:hover:bg-desert light:hover:border-desert/20 tracking-elegant border border-transparent px-8 py-3.5 text-base font-medium text-white transition-all duration-400"
            >
              View Systems
            </Link>
            <Link
              to="/contact"
              className="light:border-dusk dark:hover:border-accent-blue light:hover:border-desert dark:border-white tracking-elegant light:text-dusk dark:text-white light:hover:text-desert dark:hover:text-accent-blue border px-8 py-3.5 text-base font-medium transition-all duration-400"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
