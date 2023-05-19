import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section className="bg-slate-900 px-6 py-28 text-slate-300 md:px-10">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="grid gap-6">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading3: ({ children }) => (
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  {children}
                </p>
              ),
              heading1: ({ children }) => (
                <h1 className="max-w-lg text-6xl font-semibold text-white">
                  {children}
                </h1>
              ),
            }}
          />
          {slice.items.length > 0 ? (
            <ul className="flex flex-wrap gap-4">
              {slice.items.map((item) => (
                <li key={item.button_label}>
                  <PrismicNextLink
                    field={item.button_link}
                    className="inline-block rounded bg-white px-5 py-3 font-medium text-black"
                  >
                    {item.button_label}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          sizes="100vw"
          priority={true}
          className="w-full rounded-xl bg-slate-700"
        />
      </div>
    </section>
  );
};

export default Hero;
