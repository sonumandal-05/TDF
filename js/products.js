/* =====================================================================
   THE DAILY FINDS — PRODUCT DATABASE
   This is the ONLY file you need to edit to update the website.

   HOW TO ADD A PRODUCT
   1. Copy one whole block from { ... }, including the comma after it.
   2. Paste it at the TOP of the list (newest first is easiest to manage).
   3. Give it a new unique id (just use the next number).
   4. Change the fields. Save. Refresh the page. Done.

   HOW TO EDIT A PRODUCT
   Change any value inside the quotes. Nothing else needs to change.

   HOW TO DELETE A PRODUCT
   Delete its whole { ... }, block. Make sure the commas stay correct.

   FIELD GUIDE
   id            Unique number. Never reuse one.
   name          Product title shown on the card.
   category      MUST match one of these exactly:
                 "Fashion & Outfits", "Tech & Gadgets", "Home Decor",
                 "Beauty & Personal Care", "Lifestyle Essentials",
                 "Accessories", "Student Essentials"
   description   One short sentence.
   image         Path like "assets/products/mouse.jpg" or a full image URL
                 you have permission to use. Do NOT copy Amazon images
                 unless you are authorised (use Amazon's own tools).
   price         Optional. Write exactly what you want shown, e.g. "₹799".
                 Leave "" to hide it. Prices change often on Amazon, so
                 only add one if you will keep it up to date.
   affiliateLink Your exact approved product link. Never edit the tag.
                 Entries still holding the placeholder text show a
                 disabled "Link coming soon" button instead of a broken link.
   dateAdded     "YYYY-MM-DD". Controls "Newest" and "Latest Finds".
   featured      true = appears in "Trending Finds". false = does not.
   badge         Optional small label, e.g. "Editor's Pick". "" for none.

   NOTE: Every entry below is a DEMO product. Replace them with real
   products, real images and your real affiliate links.
   ===================================================================== */

const LINK_PLACEHOLDER = "YOUR_APPROVED_AMAZON_AFFILIATE_PRODUCT_LINK";
const IMG = "assets/products/placeholder.svg"; // swap per product later

const products = [
  { id: 24, name: "Lymio Men T-Shirt || Cotton Casual T Shirt for Men (T- 52-53)", category: "Fashion & Outfits",
    description: "A slim adjustable lamp for late study sessions.",
    image: "C:\Users\Sonu\Desktop\Websites\TDF\assets\image\tshirt.tdf.jpeg", price: "449", affiliateLink: https://link.amazon/B0iR4oqn8,
    dateAdded: "2026-11-17", featured: true, badge: "In Stock" },
  { id: 23, name: "Wireless Bluetooth Mouse (Demo)", category: "Tech & Gadgets",
    description: "A practical wireless mouse for everyday productivity.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-16", featured: true, badge: "Demo item" },
  { id: 22, name: "Minimal Canvas Tote (Demo)", category: "Accessories",
    description: "A roomy everyday tote that goes with almost anything.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-15", featured: true, badge: "Demo item" },
  { id: 21, name: "Ruled Notebook Set (Demo)", category: "Student Essentials",
    description: "Pack of notebooks for lectures, notes and planning.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-14", featured: false, badge: "Demo item" },
  { id: 20, name: "Hydrating Face Moisturiser (Demo)", category: "Beauty & Personal Care",
    description: "A lightweight daily moisturiser for a simple routine.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-13", featured: true, badge: "Demo item" },
  { id: 19, name: "Insulated Steel Bottle (Demo)", category: "Lifestyle Essentials",
    description: "Keeps drinks cold or hot through a long day out.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-12", featured: true, badge: "Demo item" },
  { id: 18, name: "Relaxed Fit Oxford Shirt (Demo)", category: "Fashion & Outfits",
    description: "A clean, versatile shirt for class, work or weekends.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-11", featured: false, badge: "Demo item" },
  { id: 17, name: "Portable Power Bank (Demo)", category: "Tech & Gadgets",
    description: "Slim backup battery that fits in a jacket pocket.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-10", featured: false, badge: "Demo item" },
  { id: 16, name: "Woven Wall Basket Set (Demo)", category: "Home Decor",
    description: "Natural woven baskets to add texture to a plain wall.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-09", featured: false, badge: "Demo item" },
  { id: 15, name: "Everyday Sunglasses (Demo)", category: "Accessories",
    description: "Lightweight frames with a classic shape.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-08", featured: false, badge: "Demo item" },
  { id: 14, name: "Laptop Stand, Foldable (Demo)", category: "Student Essentials",
    description: "Raises your screen for better posture on long study days.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-07", featured: false, badge: "Demo item" },
  { id: 13, name: "Gentle Daily Face Wash (Demo)", category: "Beauty & Personal Care",
    description: "A mild cleanser that suits everyday use.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-06", featured: false, badge: "Demo item" },
  { id: 12, name: "Straight Fit Everyday Jeans (Demo)", category: "Fashion & Outfits",
    description: "Comfortable mid-weight denim that pairs with everything.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-05", featured: false, badge: "Demo item" },
  { id: 11, name: "Noise-Reducing Earbuds (Demo)", category: "Tech & Gadgets",
    description: "Compact earbuds for commutes and focus time.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-04", featured: false, badge: "Demo item" },
  { id: 10, name: "Scented Soy Candle (Demo)", category: "Home Decor",
    description: "A calm, slow-burning candle for the evening.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-03", featured: false, badge: "Demo item" },
  { id: 9, name: "Leather-Look Card Wallet (Demo)", category: "Accessories",
    description: "Slim wallet that holds cards and a little cash.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-02", featured: false, badge: "Demo item" },
  { id: 8, name: "Weekly Planner Pad (Demo)", category: "Student Essentials",
    description: "Tear-off planner to map out your week at a glance.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-11-01", featured: false, badge: "Demo item" },
  { id: 7, name: "Lip Balm Trio (Demo)", category: "Beauty & Personal Care",
    description: "Three soft balms for dry-weather days.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-30", featured: false, badge: "Demo item" },
  { id: 6, name: "Oversized Cotton Hoodie (Demo)", category: "Fashion & Outfits",
    description: "A soft, heavyweight hoodie for cooler days.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-28", featured: false, badge: "Demo item" },
  { id: 5, name: "Mini Desk Organiser (Demo)", category: "Lifestyle Essentials",
    description: "Keeps pens, cables and small items in one place.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-26", featured: false, badge: "Demo item" },
  { id: 4, name: "Analog Minimal Watch (Demo)", category: "Accessories",
    description: "A simple dial that works with casual and smart outfits.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-24", featured: false, badge: "Demo item" },
  { id: 3, name: "USB-C Multi-Port Hub (Demo)", category: "Tech & Gadgets",
    description: "Adds HDMI, USB and card slots to a slim laptop.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-22", featured: false, badge: "Demo item" },
  { id: 2, name: "Reusable Lunch Box (Demo)", category: "Lifestyle Essentials",
    description: "Leak-resistant box for college or office lunches.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-20", featured: false, badge: "Demo item" },
  { id: 1, name: "Highlighter Pastel Set (Demo)", category: "Student Essentials",
    description: "Soft-colour highlighters that keep notes readable.",
    image: IMG, price: "", affiliateLink: LINK_PLACEHOLDER,
    dateAdded: "2026-10-18", featured: false, badge: "Demo item" }
];