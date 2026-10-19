/* ===========================================================
   NextDay Digital — pricing
   Edit this file only to change plan names, prices, features,
   checkout links, and the billing portal. The site renders
   whatever is here. No API keys live in this project.

   website is the $499 one-time purchase (its own Stripe Payment
   Link, no subscription). Every "Get started" button goes to
   website.checkoutUrl. Monthly plans are OPTIONAL add-ons.

   plans[]: {
     name, monthly, features, badge,
     checkoutUrl  (bundle: $499 website + this plan),
     addOnUrl     (monthly only, no $499: for existing clients)
   }
   =========================================================== */
window.NDD_PRICING = {
  kicker: "Pricing",
  heading: "Buy a finished\nwebsite online.",
  lede: "$499 one-time for your website. No monthly plan required.",
  note: "14-day money-back guarantee if you haven't received your website. Monthly plans are optional: add, switch or cancel anytime. Payment is secured by Stripe.",
  manageBillingUrl: "https://billing.stripe.com/p/login/00waEWaDTbUzc9vbD37ok00",
  website: {
    amount: "$499",
    label: "one-time",
    title: "Website",
    subtitle: "No monthly plan required",
    checkoutUrl: "https://buy.stripe.com/6oUeVcfYd7Ejc9v8qR7ok05",
    cta: "Get started",
    features: [
      "Custom, mobile-friendly website (up to 5 pages) with click-to-call, a contact form and a map",
      "Basic Google setup: titles, descriptions and sitemap",
      "Launch within 24 hours of payment",
      "Connecting your own domain, plus a free .com for year 1 if you need one",
      "Hosting included at no monthly cost",
      "1 week of free edits after launch",
      "14-day money-back guarantee if you haven't received your website"
    ]
  },
  noAccounts: {
    title: "No accounts needed",
    points: [
      "Pay as a guest on Stripe. No account to create.",
      "We host the site, so you don't need a hosting account.",
      "Want a free .com? We register and connect it for you, and can transfer it to you later.",
      "Already own a domain? Add us as a user, or change two DNS records we send you (about 5 minutes).",
      "Google Business Profile is optional. Google has the owner verify it, then you can add us as a manager.",
      "Manage a monthly plan anytime from an emailed link. No password."
    ]
  },
  plansHeading: "Optional monthly plans",
  plansLede: "Not required. Add one with your website or anytime later if you want ongoing help.",
  plans: [
    {
      name: "Care",
      monthly: "$29",
      features: [
        "Uptime & backup monitoring",
        "Security and SSL",
        "Up to 30 minutes of small edits a month"
      ],
      checkoutUrl: "https://buy.stripe.com/28E3cubHXf6L2yV8qR7ok02",
      addOnUrl: "https://buy.stripe.com/6oUcN4bHXaQv8XjfTj7ok06"
    },
    {
      name: "Growth",
      monthly: "$79",
      badge: "Most popular",
      features: [
        "Everything in Care",
        "Google Business Profile setup and upkeep",
        "Basic local SEO",
        "Up to 2 hours of updates a month"
      ],
      checkoutUrl: "https://buy.stripe.com/3cI28qaDTaQv8Xj8qR7ok03",
      addOnUrl: "https://buy.stripe.com/3cI28q13j9Mr2yV6iJ7ok07"
    },
    {
      name: "Pro",
      monthly: "$149",
      features: [
        "Everything in Growth",
        "4 Instagram and Google posts a month",
        "Priority same-day changes"
      ],
      checkoutUrl: "https://buy.stripe.com/4gM3cu6nD8Inc9v7mN7ok04",
      addOnUrl: "https://buy.stripe.com/cNidR87rH3o37Tf22t7ok08"
    }
  ]
};
