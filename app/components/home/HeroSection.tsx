import { startTransition, useEffect, useState } from "react";
import type { HeroItem } from "~/data/featuredItems";

interface HeroSectionProps {
  items: HeroItem[];
}

const defaultBackground = "bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900";

export function HeroSection({ items }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) {
      return undefined;
    }

    const interval = setInterval(() => {
      startTransition(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (items.length <= 1) {
        return;
      }

      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        startTransition(() => {
          setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
        });
      } else if (event.key === "ArrowRight") {
        startTransition(() => {
          setCurrentSlide((prev) => (prev + 1) % items.length);
        });
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [items.length]);

  const showSlide = (index: number) => {
    startTransition(() => {
      setCurrentSlide(index);
    });
  };

  const nextSlide = () => {
    startTransition(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    });
  };

  const prevSlide = () => {
    startTransition(() => {
      setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
    });
  };

  if (items.length === 0) {
    return (
      <section className="relative w-full overflow-hidden">
        <div className={`flex h-[600px] w-full items-center justify-center pt-16 ${defaultBackground}`}>
          <p className="text-xl text-white">No featured content available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="hero-carousel flex h-[600px] w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((item, index) => (
          <div
            key={`${item.title}-${item.link}`}
            className={`hero-slide absolute inset-0 w-full transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 h-full w-full">
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                  <div
                    className="absolute inset-0 opacity-45 mix-blend-soft-light"
                    style={{
                      backgroundImage:
                        "radial-gradient(120% 90% at 50% 55%, rgba(26,55,77,0.9) 0%, rgba(193,129,77,0.45) 45%, rgba(0,0,0,0) 75%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 1px, transparent 1px, transparent 3px)",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.44)_55%,rgba(0,0,0,0.72)_100%)]" />
                </>
              ) : (
                <div className={`h-full w-full ${defaultBackground}`} />
              )}
            </div>

            <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <a
                href={item.link}
                className="group flex h-full items-center pt-16 pb-8"
                aria-label={
                  item.type === "post"
                    ? `Read article: ${item.title}`
                    : `View project: ${item.title}`
                }
              >
                <div className="mx-auto max-w-3xl px-4 text-center">
                  <div className="text-shadow-lg relative z-10 px-2 sm:px-6">
                    <div className="flex flex-col items-center opacity-75">
                      <span className="light:text-white text-sm font-light tracking-widest uppercase">
                        {item.type === "post" ? "From the Blog" : "Featured Project"}
                      </span>
                      <div className="mt-4 mb-6 h-px w-12 bg-white/30" />
                    </div>

                    {item.type === "project" && item.tags ? (
                      <div className="mb-4 space-x-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="light:text-white inline-block rounded-full border border-white/10 bg-white/15 px-3 py-1 text-sm backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <h1 className="light:text-white group-hover:text-white/90 mb-4 text-3xl font-bold [text-wrap:balance] drop-shadow-[0_0_14px_rgba(0,0,0,0.5)] transition-colors sm:text-4xl lg:text-5xl">
                      {item.title}
                    </h1>

                    <p className="mb-6 text-base text-gray-100 drop-shadow-[0_0_10px_rgba(0,0,0,0.45)] transition-colors group-hover:text-gray-200 sm:text-lg">
                      {item.description}
                    </p>

                    <div className="inline-block rounded-full border px-6 py-2 font-medium backdrop-blur-sm transition-colors light:border-white/20 dark:border-sand/35 light:bg-white/90 dark:bg-sand/90 light:text-gray-900 dark:text-text-primary light:group-hover:bg-white dark:group-hover:bg-dark-sand/90">
                      {item.type === "post" ? "Read Article" : "View Project"}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}

        {items.length > 1 ? (
          <div className="absolute right-4 bottom-8 left-4 flex items-center justify-between">
            <button
              className="rounded-full bg-black/20 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white"
              data-carousel-prev
              aria-label="Previous slide"
              onClick={prevSlide}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div className="flex gap-2 rounded-full bg-black/20 p-2 backdrop-blur-sm">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-dot`}
                  className={`relative flex h-10 w-10 touch-manipulation items-center justify-center ${
                    index === currentSlide ? "active" : ""
                  }`}
                  data-dot={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => showSlide(index)}
                  type="button"
                >
                  <span className="dot-indicator block h-2 w-2 rounded-full bg-white/50 transition-colors" />
                  <span className="sr-only">Slide {index + 1}</span>
                </button>
              ))}
            </div>

            <button
              className="rounded-full bg-black/20 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white"
              data-carousel-next
              aria-label="Next slide"
              onClick={nextSlide}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
