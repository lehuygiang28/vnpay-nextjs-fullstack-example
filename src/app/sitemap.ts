import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vnpay-nextjs-demo.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/payment/return`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
