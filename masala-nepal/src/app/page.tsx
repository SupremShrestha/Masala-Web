'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, CookingPot, Flower2, Heart, Leaf, Menu, Minus, Mountain, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Trash2, Users, X } from 'lucide-react';
import { brand, formatPrice, products, recipes, type Category, type Product, type Recipe } from '@/lib/shop';

type Basket = Record<string, number>;
const categories: Category[] = ['All spices', 'Signature blends', 'Ground spices', 'Whole spices'];

function SpiceMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 50 44" fill="none" aria-hidden="true"><path d="M4 33C16 29 14 11 29 12c11 0 13 12 3 18-7 4-16 5-28 3Z" stroke="currentColor" strokeWidth="2"/><path d="M33 13c0-6 4-10 11-10M11 30c9-1 14-4 19-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="m10 8 2-4m-6 9-4-1m19-4 2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

function SpiceDrawing({ kind }: { kind: Product['symbol'] }) {
  if (kind === 'sun') return <svg viewBox="0 0 120 95" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5"><path d="M25 69c-8-5-5-14 2-16l44-21c10-5 19 8 11 15L40 72c-6 4-11 3-15-3Zm11-19 9 17m2-23 10 15m0-21 10 15M75 35l5-15m-9 17-8-14"/><path d="M53 47c1-16-6-26-21-29 0 17 4 24 21 29Zm3-7c4-17 15-23 30-20-6 14-15 21-30 20Z"/></g></svg>;
  if (kind === 'momo') return <svg viewBox="0 0 120 95" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5"><path d="M20 62c0-12 12-19 27-32 8-7 18-7 27 0 15 13 27 20 27 32 0 17-81 18-81 0Z"/><path d="M47 30c-2 12-7 17-13 27m20-30c0 12-2 23-5 34m12-36v38m8-36c0 12 2 23 5 34m1-29c2 12 8 17 13 25M26 67c19 7 51 7 69-1m-49-52c-5-6 5-9 0-15m15 16c-5-6 5-9 0-15m15 18c-5-6 5-9 0-15"/></g></svg>;
  if (kind === 'flower') return <svg viewBox="0 0 120 95" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5"><path d="M60 15 68 35 89 22 82 44 105 48 83 58 92 79 70 69 60 91 50 69 28 79 37 58 15 48 38 44 31 22 52 35Z"/><circle cx="60" cy="51" r="12"/><path d="m60 20 0 18m26-12-17 17m30 5-25 3m13 22-17-13m-10 26V64M33 73l18-13M20 48l26 3M35 27l16 16"/></g></svg>;
  return <svg viewBox="0 0 120 95" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5"><path d="m36 88 29-61m-15 31-19-9m26-3 25-7m-38 32 32-9m-17-21-9-17m-2 40-17 0m31-30 12-18"/>{[[30,46],[25,60],[47,22],[65,24],[76,13],[85,36],[78,60],[31,65]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="7"/><path d={`m${cx-2} ${cy-3} 3 4 -3 2`}/></g>)}<path d="M63 70c15-2 23 2 26 11-14 1-23-2-26-11Z"/></g></svg>;
}

function Pouch({ product, small = false }: { product: Product; small?: boolean }) {
  return <div className={`pouch ${small ? 'pouch-small' : ''}`} style={{ '--pouch-color': product.color } as CSSProperties} aria-hidden="true"><div className="pouch-seal"/><div className="pouch-label"><span className="pouch-brand">{brand.name.toLowerCase()}</span><span className="pouch-tagline">A TASTE OF NEPAL</span><SpiceDrawing kind={product.symbol}/><span className="pouch-product">{product.name.replace(' · ', '\n')}</span><span className="pouch-nepali" lang="ne">{product.nepali}</span><span className="pouch-weight">NET WT. {product.weight.toUpperCase()}</span></div><div className="pouch-bottom"/></div>;
}

function Modal({ title, children, onClose, className = '' }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, summary, [tabindex="0"]')).filter(el => !el.hasAttribute('disabled'));
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [onClose]);
  return <div className={`modal-backdrop ${className}`} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><section className="modal-panel" role="dialog" aria-modal="true" aria-label={title} ref={panel} tabIndex={-1}><button className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}><X size={23}/></button>{children}</section></div>;
}

export default function Home() {
  const [category, setCategory] = useState<Category>('All spices');
  const [basket, setBasket] = useState<Basket>({});
  const [hydrated, setHydrated] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [review, setReview] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [toast, setToast] = useState('');
  const closeDrawer = useCallback(() => { setDrawer(false); setReview(false); }, []);
  const closeSearch = useCallback(() => setSearch(false), []);
  const closeProduct = useCallback(() => setProduct(null), []);
  const closeRecipe = useCallback(() => setRecipe(null), []);
  const closeMenu = useCallback(() => setMobileMenu(false), []);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('masala-basket') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        const valid: Basket = {};
        for (const [id, qty] of Object.entries(saved)) if (products.some(p => p.id === id) && typeof qty === 'number' && Number.isInteger(qty) && qty > 0) valid[id] = Math.min(qty, 20);
        setBasket(valid);
      }
    } catch { /* An unavailable or invalid browser store should not prevent shopping. */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) { try { localStorage.setItem('masala-basket', JSON.stringify(basket)); } catch { /* Basket still works in memory. */ } } }, [basket, hydrated]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2800); return () => clearTimeout(timer); }, [toast]);

  const count = Object.values(basket).reduce((sum, quantity) => sum + quantity, 0);
  const total = products.reduce((sum, item) => sum + item.price * (basket[item.id] || 0), 0);
  const add = (item: Product) => {
    if ((basket[item.id] || 0) >= 20) { setToast('You can add up to 20 of each spice.'); return; }
    setBasket(current => ({ ...current, [item.id]: Math.min((current[item.id] || 0) + 1, 20) }));
    setToast(`${item.name} added to your bag`);
  };
  const quantity = (id: string, change: number) => setBasket(current => {
    const next = { ...current, [id]: Math.min((current[id] || 0) + change, 20) };
    if (next[id] <= 0) delete next[id];
    return next;
  });
  const visibleProducts = products.filter(item => category === 'All spices' || item.category === category);
  const matches = products.filter(item => `${item.name} ${item.nepali} ${item.description} ${item.ingredients}`.toLowerCase().includes(query.toLowerCase().trim()));

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="announcement"><span>Rooted in Nepal. Made for your kitchen.</span><span lang="ne">हाम्रो स्वाद, हाम्रो पहिचान <span aria-hidden="true">✦</span></span></div>
    <header className="site-header">
      <a href="#" className="wordmark" aria-label={`${brand.name} home`}><SpiceMark/><span>{brand.name.toLowerCase()}<small>THE TASTE OF HOME</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#spices">Our spices <ChevronDown size={13}/></a><a href="#story">Our roots</a><a href="#recipes">From the kitchen</a></nav>
      <div className="header-actions"><span className="country-label"><Mountain size={15}/> NEPAL</span><button className="icon-button" onClick={() => setSearch(true)} aria-label="Search spices"><Search size={21}/></button><button className="bag-button" onClick={() => setDrawer(true)} aria-label={`Open shopping bag, ${count} items`}><ShoppingBag size={20}/><span className="bag-label">Bag</span><span className="bag-count">{count}</span></button><button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open navigation menu"><Menu size={23}/></button></div>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-line"/> ROOTED IN NEPAL. SHARED WITH LOVE.</div>
          <h1 id="hero-title">A little spice.<br/>A lot of <em>home.</em></h1>
          <p>That familiar aroma. That first perfect bite. Bring the warmth of a Nepali kitchen to your table, one beautiful spice at a time.</p>
          <div className="hero-actions"><a href="#spices" className="button button-gold">Find your flavour <ArrowUpRight size={20}/></a><a href="#story" className="text-link">Discover our roots <ArrowRight size={18}/></a></div>
          <div className="hero-footnote"><Flower2 size={27} strokeWidth={1}/><span>For everyday dal. For Sunday momo.<br/><strong>For the meals that bring us together.</strong></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img className="hero-image" src="/images/spice-hero.png" alt="A brass masala box filled with colourful spices, surrounded by dried chillies and whole spices" width={1254} height={1254} fetchPriority="high"/><div className="hero-image-shade"/><div className="image-caption"><span>A story in every spice.</span><span lang="ne">घरको स्वाद</span></div></div>
          <div className="heritage-stamp"><span>A TASTE OF</span><Mountain size={34} strokeWidth={1}/><strong>नेपाल</strong></div>
          <button className="hero-featured-spice" onClick={() => setProduct(products[0])}><span className="hero-spice-symbol"><SpiceDrawing kind="momo"/></span><span><small>MEET YOUR NEXT FAVOURITE</small><strong>Momo Masala</strong><span>A little magic for momo night.</span></span><ArrowUpRight size={22}/></button>
          <span className="hero-edition">THE SPICE CUPBOARD — COLLECTION 01</span>
        </div>
        <a href="#spices" className="hero-scroll" aria-label="Scroll to the spice collection"><ArrowDown size={18}/></a>
      </section>

      <div className="values-strip" aria-label="Our inspiration"><span><Flower2 size={20}/> Big flavour, little rituals</span><i>✦</i><span><Mountain size={21}/> Inspired by Nepal</span><i>✦</i><span><CookingPot size={21}/> For everyday & special days</span><i>✦</i><span><Heart size={20}/> Best shared with people you love</span></div>

      <section id="spices" className="collection section-pad" aria-labelledby="collection-title">
        <div className="section-heading"><div><div className="eyebrow"><span>01</span> THE SPICE CUPBOARD</div><h2 id="collection-title">Good food starts <em>here.</em></h2></div><p>From everyday essentials to your secret ingredient.<br/>Find a little something for whatever’s cooking.</p></div>
        <div className="collection-toolbar"><div className="filter-tabs" role="group" aria-label="Filter spices by category">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><span className="product-count"><SlidersHorizontal size={15}/>{visibleProducts.length} spices to explore</span></div>
        <div className="product-grid">{visibleProducts.map(item => <article className="product-card" key={item.id}>
          <button className="product-art" style={{ '--product-background': item.background, '--product-accent': item.color } as CSSProperties} onClick={() => setProduct(item)} aria-label={`View ${item.name} details`}>{item.badge && <span className="product-badge">{item.badge}</span>}<span className="product-ghost-name" lang="ne">{item.nepali}</span><Pouch product={item}/><span className="product-view">Discover this spice <ArrowUpRight size={15}/></span></button>
          <div className="product-info"><div className="product-meta"><span>{item.category === 'Signature blends' ? 'SIGNATURE BLEND' : item.category.toUpperCase()}</span><span>{item.weight}</span></div><button className="product-name" onClick={() => setProduct(item)}><h3>{item.name}</h3></button><p className="product-note">{item.note}</p><div className="product-buy-row"><p className="product-price">{formatPrice(item.price)}</p><button className="add-button" aria-label={`Add ${item.name} to bag`} onClick={() => add(item)}><span>Add to bag</span><Plus size={18}/></button></div></div>
        </article>)}</div>
        <div className="collection-bottom"><span><Leaf size={18}/> A good meal begins with good ingredients.</span><a href="#recipes" className="text-link">Find your next kitchen favourite <ArrowRight size={18}/></a></div>
      </section>

      <section id="story" className="story-section" aria-labelledby="story-title"><div className="story-illustration"><div className="story-halo"/><span className="story-nepali" lang="ne">घरको स्वाद</span><svg className="mountain-art" viewBox="0 0 600 350" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><path d="M0 310 75 231 114 258 239 75 290 149 348 35 460 221 495 185 600 305"/><path d="m114 258 105-116 20-67 24 102 27-28m-51-74 55 150 54-190 28 122 84 64m-166 4 54-102 28 34 16-17m-201 1 8 25 22-4 24 24m85-60 20-16 14 19 24-15M0 338l114-80 76 60 104-93 129 88 72-128 105 141"/><path d="m160 260 30-30 20 24 17-4 12 18 16-8m160 12 17-27 13 13 19-21M8 349h584"/></g><circle cx="138" cy="85" r="30" stroke="currentColor" strokeWidth="1.2"/><path d="M111 86h54m-47 11h40m-40-23h40" stroke="currentColor" strokeWidth=".7"/></svg><span className="story-coordinates">FROM THE HILLS TO THE HEART.</span></div><div className="story-copy"><div className="eyebrow">OUR ROOTS, YOUR TABLE</div><h2>Some flavours<br/>just feel like <em>home.</em></h2><p>The sound of jeera hitting warm oil. A spoonful of besar in the dal. The unmistakable zing of timur in your favourite achaar.</p><p>In Nepal, spices are more than ingredients. They’re everyday rituals, recipes passed around the kitchen, and a way of saying <span className="inline-nepali" lang="ne">“अलिकति अझै खाऊ न।”</span></p><p className="story-signoff">A little more food. A little more love.</p><a href="#recipes" className="text-link">Bring that feeling to your kitchen <ArrowRight size={18}/></a></div></section>

      <section id="recipes" className="recipes-section section-pad" aria-labelledby="recipe-title"><div className="section-heading"><div><div className="eyebrow">FROM OUR KITCHEN TO YOURS</div><h2 id="recipe-title">A pinch of <em>inspiration.</em></h2></div><p>Simple recipes. Familiar flavours.<br/>Something lovely to gather around.</p></div><div className="recipe-layout"><button className="featured-recipe" onClick={() => setRecipe(recipes[0])}><div className="recipe-photo"><img src="/images/momo-table.png" alt="Freshly steamed vegetable momo with a bowl of tomato achaar" loading="lazy"/><span className="recipe-photo-label">LET’S MAKE MOMO</span><span className="round-arrow"><ArrowUpRight size={24}/></span></div><div className="featured-recipe-info"><span className="eyebrow">THE WEEKEND FAVOURITE</span><h3>Good things come<br/>in little <em>dumplings.</em></h3><span className="recipe-time"><Clock3 size={14}/> 50 minutes <span>·</span> A recipe worth sharing</span></div></button><div className="recipe-list">{recipes.slice(1).map((item, index) => <button className="recipe-row" key={item.id} onClick={() => setRecipe(item)}><span className="recipe-number">0{index + 2}</span><span className="recipe-row-body"><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><span className="recipe-time"><Clock3 size={14}/>{item.time}<span>·</span>{item.serves}</span></span><ArrowUpRight size={23}/></button>)}<div className="kitchen-note"><Sparkles size={23} strokeWidth={1.3}/><div><h4>A little kitchen wisdom</h4><p>Toast whole spices gently, grind what you need, and let your nose tell you when they’re ready.</p></div></div></div></div></section>

      <section className="closing-note"><span className="closing-flower" aria-hidden="true">✳</span><div><span className="eyebrow" lang="ne">मिठो खानुहोस्, खुसी रहनुहोस्।</span><h2>Make room for <em>a little flavour.</em></h2></div><a href="#spices" className="button button-green">Find your spice <ArrowUpRight size={18}/></a></section>
    </main>

    <footer className="site-footer"><div className="footer-topline"><span className="eyebrow">A LITTLE PIECE OF NEPAL, IN EVERY KITCHEN.</span><Flower2 size={26} strokeWidth={1}/></div><div className="footer-main"><a href="#" className="wordmark footer-wordmark"><SpiceMark/><span>{brand.name.toLowerCase()}<small>THE TASTE OF HOME</small></span></a><p>Spices. Stories. A little piece of Nepal.<br/>Made for the meals that bring us together.</p><nav aria-label="Footer navigation"><a href="#spices">Our spices</a><a href="#story">Our roots</a><a href="#recipes">Recipes</a><button onClick={() => setDrawer(true)}>Your bag <ArrowUpRight size={16}/></button></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. With love, from Nepal.</span><span className="demo-label">A concept storefront · Sample products & prices</span><span lang="ne">स्वादले जोडिएका। <Heart size={14}/></span></div></footer>

    <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status" aria-live="polite">{toast && <><Check size={18}/><span>{toast}</span><button onClick={() => { setProduct(null); setRecipe(null); setSearch(false); setMobileMenu(false); setDrawer(true); setToast(''); }}>View bag <ArrowRight size={14}/></button></>}</div>

    {mobileMenu && <Modal title="Navigation" onClose={closeMenu} className="mobile-navigation"><SpiceMark/><nav>{[['Our spices','#spices'],['Our roots','#story'],['From the kitchen','#recipes']].map(([label,href])=><a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight/></a>)}</nav><span className="eyebrow">THE TASTE OF HOME</span></Modal>}

    {search && <Modal title="Search the spice cupboard" onClose={closeSearch} className="search-modal"><span className="eyebrow">FIND YOUR FLAVOUR</span><h2>The spice cupboard.</h2><label className="search-input"><Search size={21}/><input aria-label="Search products" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try momo, turmeric, or timur…" autoFocus/>{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Clear search"><X size={18}/></button>}</label><p className="search-count">{matches.length} {matches.length === 1 ? 'spice' : 'spices'} to explore</p><div className="search-results">{matches.length ? matches.map(item => <button key={item.id} onClick={() => { setSearch(false); setProduct(item); }}><span className="search-swatch" style={{ background: item.background }}><SpiceDrawing kind={item.symbol}/></span><span><strong>{item.name}</strong><small>{item.note}</small></span><span>{formatPrice(item.price)}</span><ArrowUpRight size={20}/></button>) : <div className="empty-state"><Search size={32}/><h3>No spices found just yet.</h3><p>Try “momo”, “cumin”, or “turmeric”.</p><button className="text-link" onClick={() => setQuery('')}>See all spices <ArrowRight size={16}/></button></div>}</div></Modal>}

    {product && <Modal title={product.name} onClose={closeProduct} className="product-modal"><div className="product-modal-art" style={{ background: product.background }}><Pouch product={product}/></div><div className="product-modal-copy"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><span className="detail-nepali" lang="ne">{product.nepali}</span><p>{product.description}</p><div className="detail-price"><strong>{formatPrice(product.price)}</strong><span>{product.weight}</span></div><button className="button button-green full-width" onClick={() => add(product)}>Add to your bag <Plus size={19}/></button><details open><summary>What’s inside <Plus size={15}/></summary><p>{product.ingredients}</p></details><details><summary>A little kitchen inspiration <Plus size={15}/></summary><p>{product.use}</p></details><small className="sample-note">Sample product. Ingredients, pack sizes, and prices are illustrative and must be confirmed before ordering.</small></div></Modal>}

    {drawer && <Modal title={review ? 'Review your sample order' : 'Your spice bag'} onClose={closeDrawer} className="cart-modal"><div className="cart-header"><span className="eyebrow">A LITTLE SOMETHING GOOD</span><h2>{review ? 'One lovely little order.' : 'Your spice bag.'} {!review && <span>({count})</span>}</h2><p>{review ? 'Your sample order summary is ready.' : 'Good things are cooking.'}</p></div>{count > 0 ? <><div className="cart-items">{products.filter(item => basket[item.id]).map(item => <div className="cart-item" key={item.id}><div className="cart-item-art" style={{ background: item.background }}><Pouch product={item} small/></div><div className="cart-item-copy"><h3>{item.name}</h3><span>{item.weight} · {formatPrice(item.price)}</span><div className="cart-item-controls"><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => quantity(item.id, -1)}><Minus size={14}/></button><span aria-label={`${item.name} quantity`}>{basket[item.id]}</span><button aria-label={`Increase ${item.name} quantity`} disabled={basket[item.id] >= 20} onClick={() => quantity(item.id, 1)}><Plus size={14}/></button></div><button className="icon-button" aria-label={`Remove ${item.name} from bag`} onClick={() => setBasket(current => { const next = { ...current }; delete next[item.id]; return next; })}><Trash2 size={15}/></button></div></div><strong>{formatPrice(item.price * basket[item.id])}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p>Prices shown in Nepalese rupees (NPR).</p>{review ? <div className="order-notice"><Check size={22}/><div><strong>You’re all set to explore.</strong><p>This is a demo shop. Checkout, delivery, and payments will be available when the store launches. No order has been placed.</p></div></div> : <button className="button button-green full-width" onClick={() => setReview(true)}>Review sample order <ArrowRight size={18}/></button>}<button className="continue-button" onClick={closeDrawer}>Continue exploring <ArrowRight size={15}/></button><small className="sample-note">Demo storefront · No payments are collected</small></div></> : <div className="empty-state cart-empty"><ShoppingBag size={45} strokeWidth={1}/><h3>A little room for flavour.</h3><p>Your bag is empty. Let’s find something<br/>lovely for your kitchen.</p><a href="#spices" className="button button-green" onClick={closeDrawer}>Explore the spices <ArrowRight size={17}/></a></div>}</Modal>}

    {recipe && <Modal title={recipe.title} onClose={closeRecipe} className="recipe-modal"><span className="eyebrow">{recipe.category}</span><span className="recipe-nepali" lang="ne">{recipe.nepali}</span><h2>{recipe.title}</h2><p className="recipe-intro">{recipe.intro}</p><div className="recipe-facts"><span><Clock3 size={17}/>{recipe.time}</span><span><Users size={17}/>{recipe.serves}</span><span><Leaf size={17}/>Vegetarian</span></div><div className="recipe-instructions"><div><h3>What you’ll need</h3><ul>{recipe.ingredients.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Let’s get cooking</h3><ol>{recipe.steps.map(step => <li key={step}>{step}</li>)}</ol></div></div><div className="recipe-end" lang="ne">मिठो खानुहोस्। <Heart size={17}/></div></Modal>}
  </>;
}
