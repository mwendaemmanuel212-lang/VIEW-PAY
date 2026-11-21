
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "getting-started-with-viewpay",
    title: "Getting Started with ViewPay",
    description:
      "Learn how to create an account, verify your email, and explore available opportunities.",
    category: "Guides",
    content: [
      "Welcome to ViewPay. The platform helps members discover sponsored opportunities and eligible tasks.",
      "Create an account using your name, email address, and a secure password. Verify your email before signing in.",
      "After signing in, explore the dashboard and review the requirements of each available opportunity.",
      "Rewards depend on eligibility and successful verification. Earnings are not guaranteed.",
    ],
  },
  {
    slug: "online-task-safety",
    title: "Staying Safe with Online Tasks",
    description:
      "Practical tips for identifying trustworthy online opportunities.",
    category: "Safety",
    content: [
      "Always read the requirements of an opportunity before participating.",
      "Never share your password, verification links, or sensitive account information.",
      "Be cautious of anyone promising guaranteed earnings or asking you to pay unexpected fees.",
      "Report suspicious activity through the official ViewPay support channel once it is available.",
    ],
  },
];
