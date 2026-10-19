/* ===========================================================
   NextDay Digital — pricing
   Edit this file only to change plan names, prices, features,
   checkout links, and the billing portal. The site renders
   whatever is here. No API keys live in this project.

   websiteFee is included with every plan (not a separate checkout).
   plans[] is one Stripe Payment Link each: the website fee plus
   that monthly plan. Mark one plan primary: true for the default
   Get started button. Set badge to label a plan (for example
   "Most popular").

   plans[]: {
     name, monthly, features, checkoutUrl, cta, primary, badge
   }
   =========================================================== */
window.NDD_PRICING = {
  kicker: "Pricing",
  heading: "Buy a finished\nwebsite online.",
  lede: "Every plan includes a $499 one-time website fee, then one monthly plan.",
  note: "14-day money-back guarantee on the $499 website fee. Switch or cancel your monthly plan anytime. Payment is secured by Stripe.",
  manageBillingUrl: "https://billing.stripe.com/p/login/00waEWaDTbUzc9vbD37ok00",
  websiteFee: {
    amount: "$499",
    label: "one-time website fee",
    title: "Included with every plan",
    features: [
      "Finished custom site",
      "Connecting your own domain",
      "One round of edits",
      "A free .com domain for the first year if you don't have one"
    ]
  },
  plans: [
    {
      name: "Care",
      monthly: "$29",
      primary: true,
      features: [
        "Hosting",
        "Security and SSL",
        "Up to 30 minutes of small edits a month"
      ],
      checkoutUrl: "https://buy.stripe.com/28E3cubHXf6L2yV8qR7ok02",
      cta: "Get started"
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
      cta: "Choose Growth"
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
      cta: "Choose Pro"
    }
  ]
};
