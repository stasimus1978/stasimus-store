import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "Kumar Admin",
      email: "admin@admin.com",
      password: hashSync("123456", 10),
      role: "admin"
    },
    {
      name: "Kumar User",
      email: "user@user.com",
      password: hashSync("123456", 10),
      role: "user"
    }
  ],
  products: [
    {
      name: "Monti Sports Shoes",
      slug: "monti-sports-shoes",
      category: "Ladies Shoes",
      description: "Monti Sport shoes for lady",
      images: [
        "https://utfs.io/f/HI9tOglpZNuRyB1OGYWXfM69BcwTqWAlC7gsmju2nhIRbp0Y",
        "https://utfs.io/f/HI9tOglpZNuR7sIZkXXL3H0VstzF5niqmpB2kdoQUgGYuORW",
        "https://utfs.io/f/HI9tOglpZNuRDPuBXGJx0mci8FJr4lDf1uLbvoXIt7WzSdeg"
      ],
      price: 59.99,
      brand: "Monti",
      rating: 4.5,
      numReviews: 10,
      stock: 1,
      isFeatured: false,
      banner: "banner-1.jpg",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Carlo High Shoes for mens",
      slug: "carlo-high-shoes-for-mens",
      category: "Men's Shoes",
      description: "Carlo Comfort shoes for full day",
      images: ["https://utfs.io/f/HI9tOglpZNuRuLaQTkQqrPfSwKWNyF14jEJA6RU3d5LegaOI"],
      price: 85.9,
      brand: "Carlo",
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: "https://utfs.io/f/HI9tOglpZNuR2Bo4JIYfOFWhzZ4EcU3PyMe6XqxtuwC79GV0",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Lama Party wear lady sandals",
      slug: "lama-party-wear-lady-sandal",
      category: "Ladies Shoes",
      description: "perfect golden sandals lady party wear ",
      images: ["https://utfs.io/f/HI9tOglpZNuR6sLjhiG3xjb8RE4JVuOip1eUYoCTyWAPZHMr"],
      price: 99.95,
      brand: "Lama",
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: true,
      banner: "https://utfs.io/f/HI9tOglpZNuRtseyEChEvak5ydHpsjz9LeVYAZlDQ38Nw4P2",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Lama Party wear lady sandals",
      slug: "lama-sports-shoes",
      category: "Men's Shoes",
      description: "Perfect style and premium comfort",
      images: ["https://utfs.io/f/HI9tOglpZNuRKV4MzYtfqCRyDLT6ebaWw1AZoQ5xYJgNsumP"],
      price: 39.95,
      brand: "Lama",
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: true,
      banner: "https://utfs.io/f/HI9tOglpZNuRAjqLmMF07kzPyJNMe23WYCwX1c9bnGimj8Sv",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Nike Kids Shoes",
      slug: "nike-kids-shoes",
      category: "Kids Shoes",
      description: "A perfect blend and comfort",
      images: ["https://utfs.io/f/HI9tOglpZNuRhk9rhl84EUSc73FC0zPXenwy5Ijv9ZTMWoBu"],
      price: 79.99,
      brand: "Nike",
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Pata Office Shoes ",
      slug: "pata-office-shoes",
      category: "Men's Shoes",
      description: "Comfort on full day premium product ",
      images: ["https://utfs.io/f/HI9tOglpZNuRjaf2ARKshMrEAcb1o36zHRqSkdgUPt924Wev"],
      price: 99.99,
      brand: "Pata",
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: "https://utfs.io/f/HI9tOglpZNuR2BlzMeWfOFWhzZ4EcU3PyMe6XqxtuwC79GV0",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    },
    {
      name: "Hilton Ladies Office Sandal",
      slug: "ladies-office-sandal",
      category: "Ladies Shoes",
      description: "Comfort office sandals for ladies.",
      images: ["https://utfs.io/f/HI9tOglpZNuRXmGznpkzAjcy3i6KSlDYNfvPgUp9sJrha8Qe"],
      price: 99.99,
      brand: "Hilton",
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: false,
      banner: "",
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Pink", "Blue"]
    }
  ]
};

export default sampleData;
