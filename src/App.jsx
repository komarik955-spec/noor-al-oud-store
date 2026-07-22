import { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  BadgeCheck,
  FlaskConical,
  Leaf,
  Truck,
  Gift,
  Compass,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { products } from "./data";

const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function Button({ children, light = false, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`btn ${light ? "btn-light" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight size={16} />
    </motion.button>
  );
}

function LegacyHeader({ cartCount, favCount, onCart }) {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 45);
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  const links = [
    ["Коллекция", "collection"],
    ["О бренде", "story"],
    ["Ноты", "featured"],
    ["Подбор аромата", "quiz"],
    ["Доставка", "service"],
  ];
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav>
        {links.slice(0, 3).map(([a, b]) => (
          <a href={"#" + b} key={b}>
            {a}
          </a>
        ))}
      </nav>
      <a href="#top" className="brand">
        <b>NOORÉ</b>
        <span>Арабская парфюмерия</span>
      </a>
      <a className="promo" href="#newsletter">
        −10% на первый заказ
      </a>
      <div className="actions">
        <button aria-label="Поиск">
          <Search />
        </button>
        <button aria-label="Избранное">
          <Heart />
          <i>{favCount}</i>
        </button>
        <button aria-label="Корзина" onClick={onCart}>
          <ShoppingBag />
          <i>{cartCount}</i>
        </button>
        <a href="#quiz" className="header-cta">
          Подобрать
        </a>
        <button
          className="burger"
          aria-label="Открыть меню"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>
              <X />
            </button>
            <div className="brand">
              <b>NOORÉ</b>
              <span>Арабская парфюмерия</span>
            </div>
            {links.map(([a, b]) => (
              <a onClick={() => setOpen(false)} href={"#" + b} key={b}>
                {a}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LegacyHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 150]);
  const rotate = useTransform(scrollY, [0, 900], [0, -5]);
  return (
    <section className="hero" id="top">
      <motion.img
        style={{ y }}
        className="hero-bg hero-image"
        src="/images/hero-clouds.png"
        alt=""
        aria-hidden="true"
        initial={{ scale: 1.03 }}
        animate={{ scale: [1.03, 1.09, 1.03], x: [0, -14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="hero-shade" />
      <motion.div
        className="mega-logo"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        NOORÉ
      </motion.div>
      <motion.div style={{ rotate }} className="hero-bottle" hidden>
        <img src="/images/oud.png" alt="Флакон NOORÉ" />
      </motion.div>
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="show"
        hidden
      >
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.2 } },
          }}
          className="eyebrow"
        >
          Новая коллекция · 2026
        </motion.p>
        <h1>
          {["Аромат,", "который остаётся", "после вас"].map((x, i) => (
            <motion.span
              key={x}
              variants={{
                hidden: { opacity: 0, y: 35 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.35 + i * 0.12, duration: 0.7 },
                },
              }}
            >
              {x}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="hero-text"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.9 } },
          }}
        >
          Глубокие восточные композиции, которые меняют настроение и остаются в
          памяти.
        </motion.p>
        <motion.div
          className="hero-buttons"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 1 } },
          }}
        >
          <Button>Начать знакомство</Button>
          <a href="#collection">
            Собрать набор <ArrowRight size={15} />
          </a>
        </motion.div>
        <motion.div
          className="hero-perks"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 1.15 } },
          }}
        >
          <span>Глубокий шлейф</span>
          <span>Редкие эссенции</span>
          <span>Подарочная упаковка</span>
        </motion.div>
      </motion.div>
      <motion.aside
        className="hero-review"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <p>«Аромат раскрывается часами и каждый раз звучит иначе»</p>
        <b>Мария · Москва</b>
        <span>★★★★★</span>
      </motion.aside>
      <a href="#manifest" className="scroll">
        Листайте вниз
        <span />
      </a>
    </section>
  );
}

function Header({ cartCount, favCount, onCart }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Коллекции", "collection"],
    ["Парфюм для него", "collection"],
    ["Парфюм для неё", "collection"],
    ["Подарки", "service"],
    ["Новинки", "collection"],
    ["Бренд", "story"],
    ["Блог", "manifest"],
  ];

  return (
    <header className={`oud-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="oud-brand" aria-label="NOOR AL OUD — на главную">
        <span className="oud-mark" aria-hidden="true">✦</span>
        <span><b>NOOR AL OUD</b><small>Арабская парфюмерия</small></span>
      </a>
      <nav className="oud-nav">
        {links.map(([label, id], index) => (
          <a href={`#${id}`} key={`${label}-${index}`}>
            {label}{index === 0 && <ChevronDown size={12} />}
          </a>
        ))}
      </nav>
      <div className="oud-tools">
        <label className="oud-search">
          <Search size={19} />
          <input aria-label="Поиск" placeholder="Поиск" />
        </label>
        <button aria-label="Избранное" className="oud-icon"><Heart /><i>{favCount}</i></button>
        <button aria-label="Корзина" className="oud-icon" onClick={onCart}><ShoppingBag /><i>{cartCount}</i></button>
        <a href="#quiz" className="oud-pick">Подобрать аромат</a>
        <button className="oud-burger" aria-label="Открыть меню" onClick={() => setOpen(true)}><Menu /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="oud-mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
            <button aria-label="Закрыть меню" onClick={() => setOpen(false)}><X /></button>
            <div className="oud-brand"><span className="oud-mark">✦</span><span><b>NOOR AL OUD</b><small>Арабская парфюмерия</small></span></div>
            {links.map(([label, id], index) => <a href={`#${id}`} key={`${id}-${index}`} onClick={() => setOpen(false)}>{label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 110]);

  return (
    <section className="oud-hero" id="top">
      <motion.img
        className="oud-hero-bg"
        src="/images/hero-noor-al-oud.png"
        alt="Флакон NOOR AL OUD в золотой пустынной сцене"
        style={{ y }}
        initial={{ scale: 1.02 }}
        animate={{ scale: [1.02, 1.065, 1.02] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="oud-hero-vignette" />
      <div className="oud-glow" aria-hidden="true" />
      <motion.div className="oud-hero-content" initial="hidden" animate="visible" variants={{hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.13,delayChildren:.25}}}}>
        <motion.p className="oud-kicker" variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}>Премиальная арабская парфюмерия</motion.p>
        <motion.h1 variants={{hidden:{opacity:0,y:30},visible:{opacity:1,y:0}}}>
          <span>Искусство</span>
          <strong>арабского аромата</strong>
        </motion.h1>
        <motion.div className="oud-divider" variants={{hidden:{scaleX:0},visible:{scaleX:1}}}><span>✦</span></motion.div>
        <motion.p className="oud-description" variants={{hidden:{opacity:0,y:16},visible:{opacity:1,y:0}}}>
          Создано традициями. Вдохновлено Востоком.<br />{" "}
          Раскройте свою индивидуальность с ароматами NOOR AL OUD.
        </motion.p>
        <motion.div className="oud-hero-actions" variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0}}}>
          <a href="#collection" className="oud-primary">Смотреть коллекцию</a>
          <a href="#service" className="oud-secondary"><Gift size={20} />Подарочные наборы</a>
        </motion.div>
      </motion.div>
      <motion.a href="#story" className="oud-film" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:1.1,duration:.7}}>
        <span className="oud-play" aria-hidden="true" />
        <b>Посмотреть<br />фильм о бренде</b>
      </motion.a>
      <div className="oud-slider-dots" aria-hidden="true"><i className="active" /><i /></div>
      <a href="#manifest" className="oud-down" aria-label="Перейти к следующему разделу">↓</a>
    </section>
  );
}

function TrustStrip() {
  const items = [
    {
      icon: BadgeCheck,
      title: "Оригинальная парфюмерия",
      text: <>Только подлинные ароматы<br />прямо с Ближнего Востока</>,
    },
    {
      icon: Truck,
      title: "Быстрая доставка",
      text: <>Доставка по России 1–3 дня<br />и по всему миру</>,
    },
    {
      icon: Gift,
      title: "Подарочная упаковка",
      text: <>Каждый заказ упакован<br />с заботой и стилем</>,
    },
    {
      icon: ShieldCheck,
      title: "Гарантия качества",
      text: <>100% гарантия подлинности<br />и премиального качества</>,
    },
  ];

  return (
    <section className="trust-strip-wrap" aria-label="Преимущества магазина">
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {items.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            className="trust-strip-item"
            key={title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 + index * 0.1 }}
          >
            <span className="trust-strip-icon"><Icon /></span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function LegacyManifest() {
  return (
    <section className="manifest" id="manifest">
      <div className="ticker">
        <span>
          NOORÉ · АРОМАТЫ С ХАРАКТЕРОМ · NOORÉ · АРОМАТЫ С ХАРАКТЕРОМ ·
        </span>
      </div>
      <div className="manifest-grid">
        <p>01 / Философия</p>
        <motion.h2 {...reveal}>
          Не просто аромат.
          <br />
          <em>Новое состояние.</em>
        </motion.h2>
        <motion.p {...reveal}>
          NOORÉ соединяет восточную насыщенность и современную ясность.
          Композиции раскрываются постепенно — вместе с вами.
        </motion.p>
      </div>
    </section>
  );
}

function Manifest() {
  const collections = [
    {
      title: "Для него",
      description: "Сила. Харизма. Стиль.",
      image: "/images/collection-him.png",
      position: "center",
    },
    {
      title: "Для неё",
      description: "Лёгкость. Грация. Искушение.",
      image: "/images/collection-her.png",
      position: "center",
    },
    {
      title: "Унисекс",
      description: "Подлинные ноты для истинных ценителей.",
      image: "/images/collection-unisex.png",
      position: "center",
    },
  ];

  return (
    <section className="collection-showcase" id="manifest">
      <motion.div className="collection-showcase-head" {...reveal}>
        <h2>Коллекции</h2>
        <a href="#collection">Смотреть все коллекции <ArrowRight /></a>
      </motion.div>
      <div className="collection-showcase-grid">
        {collections.map((item, index) => (
          <motion.article
            className="collection-showcase-card"
            key={item.title}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: index * 0.12 }}
          >
            <img src={item.image} alt={`Коллекция ${item.title}`} loading="lazy" style={{ objectPosition: item.position }} />
            <div className="collection-card-shade" />
            <div className="collection-emblem" aria-hidden="true">✦</div>
            <div className="collection-card-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#collection">Смотреть</a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function WhyNoor() {
  const advantages = [
    {
      icon: BadgeCheck,
      title: "Оригинальная продукция",
      text: "Мы работаем напрямую с лучшими домами ОАЭ",
    },
    {
      icon: FlaskConical,
      title: "Стойкость премиум-класса",
      text: "Ароматы, которые остаются с вами надолго",
    },
    {
      icon: Leaf,
      title: "Отборные ингредиенты",
      text: "Ценные масла, редкие смолы и экстракты",
    },
    {
      icon: Gift,
      title: "Роскошная упаковка",
      text: "Каждый аромат — как произведение искусства",
    },
    {
      icon: ShieldCheck,
      title: "Безопасная оплата",
      text: "Надёжные способы оплаты и защита ваших данных",
    },
  ];

  return (
    <section className="why-noor" id="why-noor">
      <motion.img
        className="why-noor-background"
        src="/images/why-noor.png"
        alt="Флакон арабского парфюма NOOR AL OUD рядом с восточными фонарями"
        loading="lazy"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="why-noor-shade" />
      <div className="why-noor-content">
        <motion.header className="why-noor-heading" {...reveal}>
          <p>Почему выбирают</p>
          <h2>NOOR AL OUD</h2>
          <div className="why-noor-rule"><span>✦</span></div>
        </motion.header>

        <div className="why-noor-grid">
          {advantages.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              className="why-noor-item"
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured({ onAdd }) {
  return (
    <section className="featured" id="featured">
      <motion.div className="feature-image" {...reveal}>
        <img
          src="/images/oud.png"
          alt="Флакон Oud Al Sahra с шафраном, розой и древесиной"
        />
        <span className="note n1">Шафран</span>
        <span className="note n2">Дамасская роза</span>
        <span className="note n3">Уд</span>
      </motion.div>
      <motion.div className="feature-copy" {...reveal}>
        <p className="eyebrow">Аромат коллекции</p>
        <h2>Oud Al Sahra</h2>
        <p>
          Тёплая композиция, в которой пряный шафран встречается с бархатной
          розой, древесным удом и мягкой амброй.
        </p>
        <div className="character">
          Глубокий <i /> Восточный <i /> Шлейфовый
        </div>
        <div className="pyramid">
          <div>
            <span>Верхние ноты</span>Шафран · Бергамот · Розовый перец
          </div>
          <div>
            <span>Ноты сердца</span>Уд · Дамасская роза · Жасмин
          </div>
          <div>
            <span>Базовые ноты</span>Амбра · Мускус · Ваниль
          </div>
        </div>
        <div className="buy">
          <b>8 990 ₽</b>
          <Button onClick={() => onAdd(products[0])}>Добавить в корзину</Button>
        </div>
      </motion.div>
    </section>
  );
}

const benefits = [
  [
    "Стойкое раскрытие",
    "Композиция постепенно раскрывается на коже, меняя звучание в течение дня.",
  ],
  [
    "Выразительный шлейф",
    "Аромат остаётся в пространстве и создаёт узнаваемое впечатление.",
  ],
  [
    "Насыщенное звучание",
    "Достаточно небольшого количества, чтобы аромат звучал ярко и многогранно.",
  ],
];
function Benefits() {
  return (
    <section className="benefits">
      {benefits.map((x, i) => (
        <motion.article key={x[0]} {...reveal}>
          <span>0{i + 1}</span>
          <div className={`benefit-art art-${i}`} />
          <h3>{x[0]}</h3>
          <p>{x[1]}</p>
        </motion.article>
      ))}
    </section>
  );
}

const moods = [
  ["Уверенно", "Пряные, древесные и кожаные композиции."],
  ["Загадочно", "Уд, дым, смолы и тёмная амбра."],
  ["Нежно", "Роза, ваниль, белые цветы и мягкий мускус."],
  ["Ярко", "Шафран, фрукты, специи и насыщенные цветы."],
  ["Спокойно", "Чистый мускус, сандал и лёгкие древесные ноты."],
];
function Moods() {
  const [active, setActive] = useState(0);
  return (
    <section className="moods">
      <motion.div {...reveal}>
        <p className="eyebrow">Парфюмерный гардероб</p>
        <h2>
          Как вы хотите
          <br />
          <i>звучать</i> сегодня?
        </h2>
        <p>Выберите настроение — мы покажем подходящие композиции.</p>
      </motion.div>
      <div className="mood-row">
        {moods.map((m, i) => (
          <button
            onClick={() => setActive(i)}
            className={active === i ? "active" : ""}
            key={m[0]}
          >
            <span>0{i + 1}</span>
            <h3>{m[0]}</h3>
            <p>{m[1]}</p>
            <ArrowRight />
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, onAdd, onFav, isFav }) {
  return (
    <motion.article layout className="product">
      <button
        aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
        onClick={() => onFav(p)}
        className={`fav ${isFav ? "on" : ""}`}
      >
        <Heart fill={isFav ? "currentColor" : "none"} />
      </button>
      {p.badge && <span className="badge">{p.badge}</span>}
      <div className={`product-photo ${p.tone}`}>
        <img loading="lazy" src="/images/oud.png" alt={`Флакон ${p.name}`} />
      </div>
      <p className="category">
        {p.category} · {p.type}
      </p>
      <h3>{p.name}</h3>
      <p className="notes">{p.notes}</p>
      <div className="product-foot">
        <b>{money(p.price)}</b>
        <button
          aria-label={`Добавить ${p.name} в корзину`}
          onClick={() => onAdd(p)}
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </motion.article>
  );
}

function Collection({ onAdd, onFav, favorites }) {
  const [filter, setFilter] = useState("Все");
  const filters = ["Все", "Женские", "Мужские", "Унисекс", "Новинки"];
  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          filter === "Все" ||
          (filter === "Женские" && p.category === "Женский") ||
          (filter === "Мужские" && p.category === "Мужской") ||
          (filter === "Унисекс" && p.category === "Унисекс") ||
          (filter === "Новинки" && p.badge === "Новинка"),
      ),
    [filter],
  );
  return (
    <section className="collection" id="collection">
      <motion.div className="section-head" {...reveal}>
        <div>
          <p className="eyebrow">Коллекция NOORÉ</p>
          <h2>
            Ароматы с<br />
            <i>характером</i>
          </h2>
        </div>
        <p>
          От прозрачных цветочных композиций до глубоких восточных аккордов.
        </p>
      </motion.div>
      <div className="filters">
        {filters.map((f) => (
          <button
            onClick={() => setFilter(f)}
            className={f === filter ? "active" : ""}
            key={f}
          >
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="product-grid">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            onAdd={onAdd}
            onFav={onFav}
            isFav={favorites.some((x) => x.id === p.id)}
          />
        ))}
      </motion.div>
      <Button className="center-btn">Смотреть всю коллекцию</Button>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div />
      <motion.article {...reveal}>
        <p className="eyebrow">История NOORÉ</p>
        <h2>
          Ароматы, рождённые между <i>традицией</i> и современностью
        </h2>
        <p>
          NOORÉ соединяет выразительность восточной парфюмерии с современной
          минималистичной эстетикой. Каждая композиция строится вокруг эмоции,
          воспоминания или момента, который хочется сохранить.
        </p>
        <Button light>Узнать о бренде</Button>
      </motion.article>
    </section>
  );
}

const questions = [
  [
    "Какое звучание вам ближе?",
    ["Свежее", "Сладкое", "Древесное", "Пряное", "Цветочное", "Дымное"],
  ],
  [
    "Когда вы планируете носить аромат?",
    [
      "Каждый день",
      "На работу",
      "На свидание",
      "На вечер",
      "Для особого случая",
    ],
  ],
  [
    "Какой шлейф предпочитаете?",
    ["Деликатный", "Заметный", "Максимально выразительный"],
  ],
];
function Quiz() {
  const [answers, setAnswers] = useState({}),
    [result, setResult] = useState(false);
  return (
    <section className="quiz" id="quiz">
      <motion.div {...reveal}>
        <p className="eyebrow">Персональный подбор</p>
        <h2>
          Не знаете, какой
          <br />
          аромат выбрать?
        </h2>
        <p>
          Ответьте на несколько вопросов, и мы предложим композицию, которая
          подойдёт именно вам.
        </p>
      </motion.div>
      <div className="quiz-card">
        {questions.map((q, qi) => (
          <div className="question" key={q[0]}>
            <span>0{qi + 1}</span>
            <h3>{q[0]}</h3>
            <div>
              {q[1].map((a) => (
                <button
                  className={answers[qi] === a ? "active" : ""}
                  onClick={() => setAnswers({ ...answers, [qi]: a })}
                  key={a}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={() => setResult(true)}>Подобрать аромат</Button>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div
            className="modal-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResult(false)}
          >
            <motion.div
              className="result"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button aria-label="Закрыть" onClick={() => setResult(false)}>
                <X />
              </button>
              <p className="eyebrow">Ваше звучание</p>
              <h2>
                {answers[0] === "Цветочное" ? "Rose Al Qamar" : "Oud Al Sahra"}
              </h2>
              <p>
                Глубокая композиция с красивым раскрытием и выразительным
                шлейфом — в точности под выбранное настроение.
              </p>
              <Button>Открыть аромат</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const reviews = [
  [
    "Очень необычное раскрытие. Сначала чувствуется шафран, а затем появляется тёплая древесная база.",
    "Анна, Екатеринбург",
  ],
  [
    "Аромат звучит дорого и совсем не похож на привычные композиции из сетевых магазинов.",
    "Мария, Москва",
  ],
  [
    "Покупал в подарок, но теперь хочу подобрать аромат и для себя.",
    "Алексей, Казань",
  ],
];
function Reviews() {
  const [i, setI] = useState(0);
  return (
    <section className="reviews">
      <p className="eyebrow">Отзывы</p>
      <h2>
        Ароматы, о которых <i>говорят</i>
      </h2>
      <div className="review-card">
        <div className="stars">★★★★★</div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
          >
            «{reviews[i][0]}»<cite>{reviews[i][1]}</cite>
          </motion.blockquote>
        </AnimatePresence>
        <div>
          <button
            aria-label="Предыдущий отзыв"
            onClick={() => setI((i + 2) % 3)}
          >
            <ArrowLeft />
          </button>
          <span>0{i + 1} / 03</span>
          <button
            aria-label="Следующий отзыв"
            onClick={() => setI((i + 1) % 3)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function Service() {
  const s = [
    [ShieldCheck, "Оригинальная продукция"],
    [Truck, "Доставка по всей России"],
    [Gift, "Подарочная упаковка"],
    [Compass, "Помощь в выборе аромата"],
  ];
  return (
    <section className="service" id="service">
      {s.map(([Icon, t]) => (
        <div key={t}>
          <Icon />
          <span>{t}</span>
        </div>
      ))}
    </section>
  );
}
function Newsletter() {
  const [ok, setOk] = useState(false);
  return (
    <section className="newsletter" id="newsletter">
      <div>
        <p className="eyebrow">Закрытые письма NOORÉ</p>
        <h2>
          Письма с ароматом <i>Востока</i>
        </h2>
        <p>Новые коллекции, истории ароматов и персональные предложения.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOk(true);
        }}
      >
        <label>
          <span className="sr-only">Ваш email</span>
          <input required type="email" placeholder="Ваш email" />
          <button>
            {ok ? "Вы подписаны" : "Подписаться"}
            <ArrowRight />
          </button>
        </label>
        <small>
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
        </small>
      </form>
    </section>
  );
}
function Finale() {
  return (
    <section className="finale">
      <div className="finale-bottle">
        <img src="/images/oud.png" alt="Флакон коллекции NOORÉ" />
      </div>
      <motion.div {...reveal}>
        <p className="eyebrow">Ваш аромат ждёт</p>
        <h2>
          Найдите аромат,
          <br />
          который будет <i>говорить</i> за вас
        </h2>
        <Button>Перейти к коллекции</Button>
      </motion.div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <b>NOORÉ</b>
        <span>Арабская парфюмерия</span>
        <p>Современная восточная парфюмерия с характером.</p>
      </div>
      {[
        ["Каталог", "Женские ароматы", "Мужские ароматы", "Унисекс", "Новинки"],
        [
          "Покупателям",
          "Доставка и оплата",
          "Возврат",
          "Как выбрать аромат",
          "Частые вопросы",
        ],
        ["О бренде", "Наша история", "Философия", "Составы", "Блог"],
      ].map((c) => (
        <div className="footer-col" key={c[0]}>
          <b>{c[0]}</b>
          {c.slice(1).map((x) => (
            <a href="#collection" key={x}>
              {x}
            </a>
          ))}
        </div>
      ))}
      <div className="footer-bottom">
        <span>© 2026 NOORÉ. Все права защищены.</span>
        <span>Политика конфиденциальности · Публичная оферта</span>
      </div>
    </footer>
  );
}

function Cart({ open, onClose, items, setItems }) {
  const total = items.reduce((s, x) => s + x.price * x.qty, 0);
  const update = (id, d) =>
    setItems(
      items.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x,
      ),
    );
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <header>
              <h2>
                Корзина <span>{items.reduce((s, x) => s + x.qty, 0)}</span>
              </h2>
              <button aria-label="Закрыть корзину" onClick={onClose}>
                <X />
              </button>
            </header>
            {items.length === 0 ? (
              <div className="empty">
                <ShoppingBag />
                <h3>Ваша корзина пуста</h3>
                <p>Выберите аромат, который будет говорить за вас.</p>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {items.map((x) => (
                    <div className="cart-item" key={x.id}>
                      <img src="/images/oud.png" alt="" />
                      <div>
                        <h3>{x.name}</h3>
                        <p>{x.notes}</p>
                        <b>{money(x.price)}</b>
                        <div className="qty">
                          <button onClick={() => update(x.id, -1)}>
                            <Minus />
                          </button>
                          <span>{x.qty}</span>
                          <button onClick={() => update(x.id, 1)}>
                            <Plus />
                          </button>
                        </div>
                      </div>
                      <button
                        aria-label="Удалить"
                        onClick={() =>
                          setItems(items.filter((i) => i.id !== x.id))
                        }
                      >
                        <Trash2 />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <div>
                    <span>Итого</span>
                    <b>{money(total)}</b>
                  </div>
                  <Button>Оформить заказ</Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [cart, setCart] = useState([]),
    [cartOpen, setCartOpen] = useState(false),
    [favorites, setFavorites] = useState([]);
  const add = (p) => {
    setCart((c) => {
      const x = c.find((i) => i.id === p.id);
      return x
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const fav = (p) =>
    setFavorites((f) =>
      f.some((x) => x.id === p.id) ? f.filter((x) => x.id !== p.id) : [...f, p],
    );
  return (
    <>
      <Header
        cartCount={cart.reduce((s, x) => s + x.qty, 0)}
        favCount={favorites.length}
        onCart={() => setCartOpen(true)}
      />
      <main>
        <Hero />
        <TrustStrip />
        <Manifest />
        <WhyNoor />
        <Featured onAdd={add} />
        <Benefits />
        <Moods />
        <Collection onAdd={add} onFav={fav} favorites={favorites} />
        <Story />
        <Quiz />
        <Reviews />
        <Service />
        <Newsletter />
        <Finale />
      </main>
      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        setItems={setCart}
      />
    </>
  );
}
