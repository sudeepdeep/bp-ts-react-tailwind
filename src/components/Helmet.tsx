import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

interface HelmetProps {
  appTitle: string;
  favicon: string;
  description: string;
}

function Helmet({ appTitle, favicon, description }: HelmetProps) {
  return (
    <ReactHelmet htmlAttributes={{ lang: "en" }}>
      <title>{appTitle}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      <meta property="og:title" content={"snap news"} />
      <meta
        property="og:description"
        content={"Your Hub for Instant News and Incident Reporting"}
      />
      <meta property="og:image" content={favicon} />
      <meta property="og:url" content={"https://snapnews.vercel.app/"} />
      <meta property="og:type" content="website" />
    </ReactHelmet>
  );
}

export default Helmet;
