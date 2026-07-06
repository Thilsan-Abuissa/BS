// Blue Salon storefront sample data (fictional listings, real brand names).
window.BS_DATA = (function () {
  const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
  const products = [
    { id: "mcm-backpack", vendor: "MCM", name: "Stark Side Studs Backpack in Visetos Cognac",
      price: 5780, image: u("photo-1584917865442-de89df76afd3"), hover: u("photo-1559563458-527698bf5295"),
      badge: "New", badgeTone: "new", cat: "Women", type: "Bags", rating: 4.5, count: 64,
      color: "Cognac", sizes: ["OS"] },
    { id: "breitling-navitimer", vendor: "Breitling", name: "Navitimer Automatic 41 Steel Watch",
      price: 20930, compareAt: 29900, image: u("photo-1523275335684-37898b6baf30"), hover: u("photo-1547996160-81dfa63595aa"),
      badge: "-30%", badgeTone: "sale", cat: "Watches", type: "Watches", rating: 5, count: 38,
      color: "Steel", sizes: ["41mm"] },
    { id: "creed-aventus", vendor: "Creed", name: "Aventus Eau de Parfum 100ml",
      price: 1490, image: u("photo-1541643600914-78b084683601"), hover: u("photo-1592945403244-b3fbafd7f539"),
      cat: "Beauty", type: "Fragrance", soldOut: true, rating: 4.8, count: 210,
      color: "—", sizes: ["100ml"] },
    { id: "colehaan-oxford", vendor: "Cole Haan", name: "GrandPrø Leather Oxford Shoes",
      price: 890, image: u("photo-1549298916-b41d501d3772"), hover: u("photo-1614252369475-531eba835eb1"),
      badge: "Exclusive", badgeTone: "gold", cat: "Men", type: "Shoes", rating: 4.3, count: 51,
      color: "Tan", sizes: ["40","41","42","43","44"] },
    { id: "leolin-dress", vendor: "Leo Lin", name: "Matilda Puff Sleeve Midi Dress — Twilight Print",
      price: 2990, image: u("photo-1572804013309-59a88b7e92f1"), hover: u("photo-1595777457583-95e059d581b8"),
      cat: "Women", type: "Dresses", rating: 4.6, count: 22,
      color: "Marine", sizes: ["6","8","10","12"] },
    { id: "missoni-dress", vendor: "Missoni Kids", name: "Girl's Zigzag Knit Dress Multicolor",
      price: 1850, image: u("photo-1518831959646-742c3a14ebf7"), hover: u("photo-1503944168849-8bf86875bbd8"),
      cat: "Kids", type: "Dresses", rating: 4.1, count: 12,
      color: "Multicolor", sizes: ["8","10","12"] },
    { id: "rimowa-trunk", vendor: "Rimowa", name: "Original Cabin Aluminium Trolley",
      price: 6300, image: u("photo-1565026057447-bc90a3dceb87"), hover: u("photo-1553062407-98eeb64c6a62"),
      badge: "New", badgeTone: "new", cat: "Luggage", type: "Luggage", rating: 4.9, count: 73,
      color: "Silver", sizes: ["Cabin"] },
    { id: "godiva-box", vendor: "Godiva", name: "Gold Collection Chocolate Gift Box, 24 pcs",
      price: 320, image: u("photo-1548907040-4baa42d10919"), hover: u("photo-1511381939415-e44015466834"),
      cat: "Gourmet", type: "Chocolate", rating: 4.7, count: 156,
      color: "—", sizes: ["24 pcs"] },
  ];
  const categories = [
    { label: "Women", img: u("photo-1483985988355-763728e1935b") },
    { label: "Men", img: u("photo-1516257984-b1b4d707412e") },
    { label: "Beauty", img: u("photo-1522335789203-aabd1fc54bc9") },
    { label: "Watches", img: u("photo-1524805444758-089113d48a6d") },
    { label: "Luggage", img: u("photo-1565026057447-bc90a3dceb87") },
    { label: "Gourmet", img: u("photo-1548907040-4baa42d10919") },
  ];
  const nav = ["Women","Men","Kids","Beauty","Luggage","Gourmet","Home & Linen","Gift"];
  return { products, categories, nav, hero: u("photo-1490481651871-ab68de25d43d") };
})();
