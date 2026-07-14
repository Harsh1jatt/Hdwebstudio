export const siteConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME,
  shortName: process.env.NEXT_PUBLIC_BRAND_SHORT_NAME,

  url: process.env.NEXT_PUBLIC_SITE_URL,

  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,

  phone: process.env.NEXT_PUBLIC_PHONE,

  email: process.env.NEXT_PUBLIC_EMAIL,

  address: {
    city: process.env.NEXT_PUBLIC_CITY,
    state: process.env.NEXT_PUBLIC_STATE,
    country: process.env.NEXT_PUBLIC_COUNTRY,
    pincode: process.env.NEXT_PUBLIC_PINCODE,
  },

  socials: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN,
    github: process.env.NEXT_PUBLIC_GITHUB,
  },
};