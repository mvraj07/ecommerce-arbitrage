// Product reviews & ratings.
// Reviews are assigned deterministically per product (by slug) so every product
// page shows a varied, believable set of ratings without a backend.

// Pool of realistic Indian customer reviews keyed by category, so reviews feel
// relevant to the product type (saree, salwar suit, lehenga, western wear).
const REVIEW_POOL = {
  saree: [
    { name: 'Priya Sharma', rating: 5, title: 'Stunning saree, great fabric!', text: 'The fabric is so soft and the embroidery is beautiful. Received many compliments at my sister’s wedding. Highly recommend!' },
    { name: 'Ananya Patel', rating: 5, title: 'Worth every rupee', text: 'Quality is far better than expected at this price. The colour is exactly as shown in the pictures. Delivery was quick too.' },
    { name: 'Meera Iyer', rating: 4, title: 'Beautiful but slightly long', text: 'Lovely saree with rich detailing. Only issue was the length — had to get it stitched. Otherwise perfect.' },
    { name: 'Kavita Reddy', rating: 5, title: 'Gorgeous!', text: 'Wore this for a family function and everyone asked where I got it. The fall and pico finish is really good.' },
    { name: 'Sneha Joshi', rating: 3, title: 'Good, not great', text: 'The design is nice but the material felt a bit thin in parts. Okay for the price though.' },
    { name: 'Ritu Malhotra', rating: 4, title: 'Nice colour, good value', text: 'Colour is vibrant and matches the photos. Slightly heavier than I expected but drapes well.' },
    { name: 'Shalini Gupta', rating: 5, title: 'Bahut badhiya quality!', text: 'Saree ka fabric itna soft hai aur embroidery bhi kaafi acchi hai. Shaadi mein sabne poocha kahan se liya. Highly recommended!' },
    { name: 'Pooja Yadav', rating: 4, title: 'Picture jaisa hi hai', text: 'Colour bilkul photos jaisa hi hai, bahut sundar lagta hai. Bas thoda lamba tha, stitch karvana pada. Baaki sab best hai.' },
  ],
  'salwar-suit': [
    { name: 'Deepika Rao', rating: 5, title: 'Perfect fit and elegant', text: 'The suit fits perfectly and the stitching is neat. Great for daily wear and festive occasions alike.' },
    { name: 'Sunita Verma', rating: 4, title: 'Very comfortable', text: 'Comfortable fabric and the design is classy. Would have liked better packaging but overall happy.' },
    { name: 'Pooja Nair', rating: 5, title: 'Loved it!', text: 'Ordered for a family function and it looked lovely. The dupatta is a nice touch. Will buy again.' },
    { name: 'Rashmi Kulkarni', rating: 3, title: 'Decent quality', text: 'Good for the price but the colour was slightly duller than shown. Fits fine though.' },
    { name: 'Neha Agarwal', rating: 5, title: 'Elegant and comfortable', text: 'Soft fabric, nice embroidery and true to size. Very happy with this purchase.' },
    { name: 'Divya Menon', rating: 4, title: 'Good purchase', text: 'Fits well and looks good. The material could be a bit softer but it’s fine for the price.' },
    { name: 'Riya Chauhan', rating: 5, title: 'Mast fit hai!', text: 'Suit ka fit ekdum perfect hai, stitching bhi saaf-sutri hai. Family function mein pehena aur sab impressed ho gaye. Value for money!' },
    { name: 'Komal Sahu', rating: 4, title: 'Comfortable, bas thoda aur soft', text: 'Kurta comfortable hai aur design bhi accha. Material thoda aur soft hota toh aur accha hota, warna theek hai.' },
  ],
  'lehenga-choli': [
    { name: 'Shreya Ghosh', rating: 5, title: 'Dream lehenga!', text: 'The lehenga is absolutely stunning. The skirt is full and flowy, and the blouse fits perfectly. Felt like a princess!' },
    { name: 'Tanvi Kaur', rating: 5, title: 'Wedding ready', text: 'Bought this for my cousin’s wedding and it was a hit. Great quality, rich colour and beautiful embellishments.' },
    { name: 'Ishita Bansal', rating: 4, title: 'Beautiful design', text: 'Very pretty lehenga, exactly as pictured. The fit was slightly loose at the waist but easily adjusted.' },
    { name: 'Aishwarya Das', rating: 4, title: 'Great value', text: 'Looks much more expensive than it was. Good stitching and the fabric has a nice sheen.' },
    { name: 'Nidhi Chopra', rating: 5, title: 'Absolutely gorgeous', text: 'The embroidery work is detailed and the colour is vibrant. Received so many compliments!' },
    { name: 'Sara Khan', rating: 3, title: 'Nice but sizing tricky', text: 'The design is lovely but the sizing runs a bit small. Order a size up if you’re between sizes.' },
    { name: 'Ankita Verma', rating: 5, title: 'Ekdum dreamy lehenga!', text: 'Yeh lehenga dekh ke toh yakeen nahi hua itne kam price mein. Skirt full aur flowy hai, blouse ka fit bhi perfect. Main toh princess lag rahi thi!' },
    { name: 'Pragati Bose', rating: 4, title: 'Bahut sundar, bas sizing', text: 'Design bilkul picture jaisa beautiful hai. Bas waist thoda loose tha, kuch adjust karwane ke baad perfect laga.' },
  ],
  'western-wear': [
    { name: 'Riya Kapoor', rating: 5, title: 'Trendy and comfy', text: 'Love this! The fit is flattering and the fabric breathes well. Perfect for college and outings.' },
    { name: 'Aditi Singh', rating: 4, title: 'Nice quality', text: 'Good stitching and nice design. Colours match the pictures. Happy with the purchase.' },
    { name: 'Kritika Jain', rating: 5, title: 'My new favourite', text: 'So comfortable and stylish. Worn it several times already. Definitely worth the money.' },
    { name: 'Simran Gill', rating: 4, title: 'Good value', text: 'Quality is decent for the price and it looks trendy. Fits true to size.' },
    { name: 'Manisha Kaur', rating: 3, title: 'Average', text: 'The design is okay but the material is a bit thin. Fine for casual wear.' },
    { name: 'Esha Dutta', rating: 5, title: 'Love the style', text: 'Exactly as shown, great fabric and comfortable fit. Will be ordering more colours.' },
    { name: 'Zara Sheikh', rating: 5, title: 'Bahut stylish hai!', text: 'Iska fit bilkul flattering hai aur fabric bhi hawa khaata hai. College aur hangout dono ke liye perfect. Naya favourite ban gaya!' },
    { name: 'Khushi Arora', rating: 4, title: 'Design accha, price sahi', text: 'Stitching acchi hai aur colour pictures jaisa hi hai. Itne price mein solid option hai. Happy with it!' },
  ],
  'top-selling': [
    { name: 'Priya Sharma', rating: 5, title: 'Absolutely love it', text: 'This is one of the best purchases I’ve made. Quality, fit and look — everything is on point.' },
    { name: 'Ananya Patel', rating: 5, title: 'Better than expected', text: 'Didn’t expect such good quality at this price. Highly recommended, delivery was fast too.' },
    { name: 'Rohit Mehra', rating: 4, title: 'Great gift', text: 'Bought this as a gift and the recipient loved it. Great packaging and quality.' },
    { name: 'Kavita Reddy', rating: 5, title: 'Superb!', text: 'Beautiful product, exactly as described. Would definitely buy from here again.' },
    { name: 'Sneha Joshi', rating: 4, title: 'Very happy', text: 'Nice quality and great colours. Fits well. One of my better online purchases.' },
    { name: 'Ritu Malhotra', rating: 5, title: 'Excellent', text: 'The quality exceeded my expectations. True to size and looks great on.' },
    { name: 'Vikram Singh', rating: 5, title: 'Worth har rupaya!', text: 'Quality se toh price bahut kam hai. Fit bhi perfect hai aur look bhi first class. Gift ke liye bhi best hai.' },
    { name: 'Monica Kapoor', rating: 4, title: 'Sab accha laga', text: 'Quality acchi hai aur delivery bhi time pe aa gayi. Ek order aur karne ka plan hai. Recommended!' },
  ],
};

// Deterministic pseudo-random from a string — same product always gets the
// same "random" seed so reviews are stable across reloads.
function hashString(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0
  }
  return h
}

const FIRST_NAMES = ['Aarav', 'Vivaan', 'Aditya', 'Saanvi', 'Ananya', 'Ishita', 'Rohan', 'Sneha', 'Kavya', 'Arjun']
const LAST_NAMES = ['Sharma', 'Patel', 'Reddy', 'Iyer', 'Nair', 'Joshi', 'Mehra', 'Kulkarni', 'Malhotra', 'Chopra']
const TITLES = ['Great quality!', 'Loved it', 'Worth the money', 'Beautiful product', 'Happy with my purchase', 'Would recommend']
const TEXTS = [
  'The quality is excellent and it looks exactly like the photos. Very happy with my purchase.',
  'Bought this recently and it did not disappoint. Great value for the price.',
  'Fits perfectly and the design is beautiful. Fast delivery as well.',
  'Nice product, good stitching and the colour is vibrant. Recommended.',
  'Really impressed with the quality. Will definitely order again.',
]
const VERIFIED = ['Verified Purchase', 'Verified Purchase', 'Verified Purchase', '']

// Build a review list for a product: picks a category-relevant pool, then
// adds deterministic filler reviews seeded by the slug so every product has a
// varied, believable mix.
export function getProductReviews(product) {
  if (!product) return []
  const pool = REVIEW_POOL[product.category] || REVIEW_POOL['top-selling']
  const seed = hashString(product.slug)

  // Pick 3 reviews from the category pool, rotating by the seed
  const count = 3 + (seed % 3) // 3-5 pool reviews
  const picked = []
  for (let i = 0; i < count; i++) {
    picked.push(pool[(seed + i) % pool.length])
  }

  // Add 2-3 filler reviews generated from the seed
  const fillerCount = 2 + (seed % 2)
  for (let i = 0; i < fillerCount; i++) {
    const name = FIRST_NAMES[(seed + i * 3) % FIRST_NAMES.length] + ' ' + LAST_NAMES[(seed + i * 5) % LAST_NAMES.length]
    const rating = 3 + ((seed + i) % 3) // 3-5
    picked.push({
      name,
      rating,
      title: TITLES[(seed + i) % TITLES.length],
      text: TEXTS[(seed + i) % TEXTS.length],
      verified: VERIFIED[(seed + i) % VERIFIED.length],
    })
  }

  // Assign verification badges to pool reviews too
  return picked.map((r, i) => ({ ...r, verified: r.verified || VERIFIED[(seed + i) % VERIFIED.length] }))
}

// Average rating + count for a product (deterministic)
export function getProductRating(product) {
  const reviews = getProductReviews(product)
  if (reviews.length === 0) return { avg: 0, count: 0 }
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  return { avg: Math.round(avg * 10) / 10, count: reviews.length }
}
