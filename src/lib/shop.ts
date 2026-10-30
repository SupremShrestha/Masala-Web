// Change this name to update the storefront, packaging, and page metadata.
export const brand = {
  name: 'Rasa',
  nepaliName: 'रासा',
  tagline: 'The taste of home.',
};

export type Category = 'All spices' | 'Signature blends' | 'Ground spices' | 'Whole spices';
export type Product = {
  id: string;
  name: string;
  nepali: string;
  category: Category;
  price: number;
  weight: string;
  color: string;
  background: string;
  note: string;
  description: string;
  ingredients: string;
  use: string;
  symbol: 'momo' | 'sun' | 'flower' | 'branch';
  badge?: string;
};

// Illustrative products and prices. Replace with your verified catalogue before launch.
export const products: Product[] = [
  { id: 'momo', name: 'Momo Masala', nepali: 'मोमो मसला', category: 'Signature blends', price: 180, weight: '100 g', color: '#a7412e', background: '#f0e4d9', note: 'For the love of momo', description: 'A warming, aromatic blend imagined for juicy momo fillings and the achaar that brings everyone back for more.', ingredients: 'Coriander, cumin, black pepper, ginger, garlic, cinnamon and cardamom.', use: 'Start with 1–2 teaspoons per 500 g of vegetable or meat filling. Adjust to your taste.', symbol: 'momo', badge: 'KITCHEN FAVOURITE' },
  { id: 'garam', name: 'Garam Masala', nepali: 'गरम मसला', category: 'Signature blends', price: 220, weight: '100 g', color: '#465340', background: '#e6e9df', note: 'Warmth in every pinch', description: 'A fragrant finishing blend for slow Sunday curries, festive feasts, and the simple dinners in between.', ingredients: 'Cumin, coriander, cinnamon, cloves, black pepper and cardamom.', use: 'Stir a small pinch into dal or curry near the end of cooking to keep the aroma bright.', symbol: 'flower' },
  { id: 'turmeric', name: 'Besar · Turmeric', nepali: 'बेसार', category: 'Ground spices', price: 150, weight: '100 g', color: '#b98322', background: '#f3e8cb', note: 'A little golden goodness', description: 'The familiar golden colour of everyday Nepali cooking, from a comforting pot of dal to a quick seasonal tarkari.', ingredients: 'Ground turmeric.', use: 'Add ¼–½ teaspoon while cooking a pot of dal or vegetables, and let it cook with the other spices.', symbol: 'sun' },
  { id: 'timur', name: 'Himalayan Timur', nepali: 'टिमुर', category: 'Whole spices', price: 250, weight: '50 g', color: '#6c474c', background: '#eee3e5', note: 'Small spice. Big personality.', description: 'Citrusy and pleasantly tingling, timur brings a distinctive character to tomato achaar, potatoes, and a bowl of thukpa.', ingredients: 'Whole timur peppercorns.', use: 'Lightly toast, crush, and add a small pinch to achaar. A little goes a long way.', symbol: 'branch', badge: 'A NEPALI ESSENTIAL' },
];

export type Recipe = { id: string; title: string; nepali: string; time: string; serves: string; category: string; intro: string; ingredients: string[]; steps: string[] };
export const recipes: Recipe[] = [
  { id: 'momo', title: 'Vegetable momo, made with love.', nepali: 'घरको मोमो', time: '50 min', serves: 'Serves 4', category: 'THE WEEKEND FAVOURITE', intro: 'Gather around the table, fold a few imperfect dumplings, and make an afternoon of it.', ingredients: ['250 g plain flour, plus water for a firm dough', '3 cups finely chopped cabbage and carrot', '1 small onion, finely chopped', '1 tbsp grated ginger and garlic', '2 tsp momo masala', '1 tbsp oil and salt to taste'], steps: ['Knead the flour with enough water to form a firm, smooth dough. Cover and rest for 20 minutes.', 'Salt the chopped cabbage lightly, rest for 10 minutes, then squeeze out excess liquid. Mix with carrot, onion, ginger, garlic, masala, and oil.', 'Roll small rounds of dough. Place a spoonful of filling in each and pinch the edges firmly closed.', 'Arrange in a greased steamer without touching. Steam for 12–15 minutes until the wrappers are cooked through. Serve hot with tomato achaar.'] },
  { id: 'dal', title: 'The everyday, extraordinary dal.', nepali: 'घरको दाल', time: '30 min', serves: 'Serves 3', category: 'EVERYDAY COMFORT', intro: 'A humble pot of dal, a little golden besar, and the comfort of a meal that feels like home.', ingredients: ['1 cup red lentils, rinsed', '3 cups water, plus more as needed', '½ tsp turmeric', '1 tbsp ghee or oil', '½ tsp cumin seeds', '2 garlic cloves, sliced', 'Salt and fresh coriander to taste'], steps: ['Bring the lentils, water, and turmeric to a boil. Reduce to a gentle simmer.', 'Cook for 20–25 minutes, stirring occasionally, until the lentils are soft. Add water to your preferred consistency and season.', 'Heat the ghee in a small pan. Add cumin, then garlic, and cook until fragrant and lightly golden.', 'Pour the tempering over the dal. Finish with coriander and serve with rice.'] },
  { id: 'achaar', title: 'Tomato achaar with a little zing.', nepali: 'टमाटरको अचार', time: '20 min', serves: 'Serves 4', category: 'THE PERFECT SIDEKICK', intro: 'Roasted tomatoes, sesame, and a small pinch of timur. Your momo just found its best friend.', ingredients: ['4 ripe tomatoes', '1 tbsp sesame seeds', '2 garlic cloves', '1 dried red chilli, or to taste', '¼ tsp timur, lightly toasted', '1 tbsp lemon juice and salt to taste'], steps: ['Toast sesame seeds in a dry pan until lightly golden, then set aside.', 'Char the tomatoes, garlic, and chilli in the same pan, turning until softened and slightly blistered.', 'Blend with the sesame seeds, timur, lemon juice, and salt. Add a splash of water if needed.', 'Taste, adjust the seasoning, and serve with momo or alongside dal bhat.'] },
];

export const formatPrice = (price: number) => `Rs. ${price.toLocaleString('en-NP')}`;
