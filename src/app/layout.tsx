import "./globals.css";

import Link from "next/link";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: asText(settings.data.site_title),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="bg-slate-900 p-6 text-slate-300 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-baseline gap-4 md:flex-row">
        <Link href="/" className="shrink-0 text-2xl font-medium text-white">
          <PrismicText field={settings.data.site_title} />
        </Link>
        <nav className="grow">
          <ul className="flex flex-wrap gap-x-6 gap-y-4 md:justify-end md:gap-x-12">
            {settings.data.navigation.map((item) => (
              <li key={item.label}>
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="bg-white px-6 py-10 text-slate-500">
      <div className="mx-auto w-full max-w-5xl text-center text-xs">
        <PrismicText field={settings.data.site_title} /> &mdash; Powered by
        Prismic
      </div>
    </footer>
  );
}
