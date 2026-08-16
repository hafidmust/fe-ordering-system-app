import React, { useState, useRef } from "react";
import {
  ChefHat, UtensilsCrossed, Receipt, ClipboardList, ShieldCheck, User,
  Plus, Minus, Trash2, CheckCircle2, Clock, Truck, CreditCard, BarChart3,
  LogOut, QrCode, ArrowLeft, ShoppingCart, X, PlusCircle, Pencil, Save,
  Users, Table2, FileDown, ChevronRight, Soup
} from "lucide-react";
import logoUrl from "../logo.jpeg";

const C = {
  board: "#1F3D31",
  boardDark: "#163025",
  cream: "#FFF8EC",
  creamDim: "#F3ECDA",
  chalk: "#F7F3E8",
  ink: "#20302A",
  inkSoft: "#5B6B63",
  mustard: "#E7A93D",
  mustardDark: "#C98C24",
  alert: "#C24B3B",
  good: "#3F8C5F",
  info: "#3E6FA6",
  line: "#D9CFB4",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito+Sans:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
    .kb-display { font-family: 'Fredoka', sans-serif; }
    .kb-body { font-family: 'Nunito Sans', sans-serif; }
    .kb-mono { font-family: 'Space Mono', monospace; }
    .ticket {
      position: relative;
      background: ${C.cream};
      border-radius: 14px;
      box-shadow: 0 6px 0 rgba(0,0,0,0.06);
    }
    .ticket::before, .ticket::after {
      content: "";
      position: absolute;
      left: 0; right: 0;
      height: 10px;
      background-image: radial-gradient(circle at 8px 5px, transparent 5px, ${C.cream} 5.5px);
      background-size: 16px 10px;
      background-repeat: repeat-x;
    }
    .ticket::before { top: -6px; }
    .ticket::after { bottom: -6px; transform: rotate(180deg); }
    .board-tile {
      background: ${C.board};
      background-image:
        radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 14px 14px;
    }
    .focus-ring:focus-visible {
      outline: 3px solid ${C.mustard};
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
    }
    .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
    @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
  `}</style>
);

const INITIAL_MENU = [
  { id: 1,  nama: "Beef Volcano Hotplate",              deskripsi: "Hotplate beef dengan saus volcano pedas",              harga: 45000, kategori: "Signature Hotplate", stok: 20 },
  { id: 2,  nama: "Beef Blackpepper Hotplate",          deskripsi: "Hotplate beef dengan saus blackpepper",                harga: 45000, kategori: "Signature Hotplate", stok: 20 },
  { id: 3,  nama: "Chicken Crispy Blackpepper Hotplate",deskripsi: "Hotplate ayam crispy saus blackpepper",                harga: 43000, kategori: "Signature Hotplate", stok: 20 },
  { id: 4,  nama: "Nasi Goreng Blackpepper Hotplate",   deskripsi: "Nasi goreng blackpepper di atas hotplate",             harga: 35000, kategori: "Signature Hotplate", stok: 20 },
  { id: 5,  nama: "Nasi Goreng Chicken Moza Hotplate",  deskripsi: "Nasi goreng dengan chicken mozarella di atas hotplate",harga: 45000, kategori: "Signature Hotplate", stok: 20 },
  { id: 6,  nama: "Chicken Crispy Grilled Steak",       deskripsi: "Ayam crispy panggang dengan pilihan saus",             harga: 40000, kategori: "Meltique Steak",     stok: 15 },
  { id: 7,  nama: "Meltique Beef Sirloin Steak",        deskripsi: "Daging sirloin meltique dengan pilihan saus",          harga: 75000, kategori: "Meltique Steak",     stok: 15 },
  { id: 8,  nama: "Meltique Beef Tenderloin Steak",     deskripsi: "Daging tenderloin meltique dengan pilihan saus",       harga: 85000, kategori: "Meltique Steak",     stok: 15 },
  { id: 9,  nama: "Meltique Sirloin + Tenderloin",      deskripsi: "Gandengan sirloin & tenderloin meltique",              harga: 157000, kategori: "Meltique Steak",    stok: 10 },
  { id: 10, nama: "Meltique Sirloin + Sirloin",         deskripsi: "Gandengan double sirloin meltique",                   harga: 152000, kategori: "Meltique Steak",    stok: 10 },
  { id: 11, nama: "Meltique Tenderloin + Tenderloin",   deskripsi: "Gandengan double tenderloin meltique",                 harga: 162000, kategori: "Meltique Steak",    stok: 10 },
  { id: 12, nama: "Spaghetti Aglio Olio",               deskripsi: "Spaghetti aglio olio dengan topping pilihan",          harga: 35000, kategori: "Signature Pasta",    stok: 20 },
  { id: 13, nama: "Spaghetti Blackpepper",              deskripsi: "Spaghetti dengan saus blackpepper",                   harga: 45000, kategori: "Signature Pasta",    stok: 20 },
  { id: 14, nama: "Spaghetti Creamy Crispy Chicken",    deskripsi: "Spaghetti krim dengan ayam crispy",                   harga: 50000, kategori: "Signature Pasta",    stok: 20 },
  { id: 15, nama: "Spaghetti Carbonara Crispy Chicken", deskripsi: "Spaghetti carbonara dengan ayam crispy",               harga: 55000, kategori: "Signature Pasta",    stok: 20 },
  { id: 16, nama: "Nasi Goreng",                        deskripsi: "Nasi goreng spesial dengan telur",                    harga: 33000, kategori: "Nasgor",             stok: 25 },
  { id: 17, nama: "Nasi Goreng Blackpepper",            deskripsi: "Nasi goreng dengan saus blackpepper",                 harga: 35000, kategori: "Nasgor",             stok: 25 },
  { id: 18, nama: "Nasi Goreng Babat Goreng",           deskripsi: "Nasi goreng dengan babat goreng crispy",              harga: 36000, kategori: "Nasgor",             stok: 25 },
  { id: 19, nama: "Mie Goreng Ngangeni",                deskripsi: "Mie goreng spesial Waroeng Ngangeni",                 harga: 35500, kategori: "Mie",               stok: 25 },
  { id: 20, nama: "Mie Goreng + Babat Goreng",          deskripsi: "Mie goreng dengan babat goreng",                      harga: 45000, kategori: "Mie",               stok: 20 },
  { id: 21, nama: "Babat Dingin",                       deskripsi: "Babat disajikan dingin dengan bumbu spesial",         harga: 60000, kategori: "Mie",               stok: 15 },
  { id: 22, nama: "Kwetiau Kuah/Goreng Sari Laut",      deskripsi: "Kwetiau kuah atau goreng dengan seafood",             harga: 30000, kategori: "Chinese Food",      stok: 20 },
  { id: 23, nama: "Kwetiau Kuah/Goreng Ayam",           deskripsi: "Kwetiau kuah atau goreng dengan ayam",                harga: 30000, kategori: "Chinese Food",      stok: 20 },
  { id: 24, nama: "Kwetiau Kuah/Goreng Sapi",           deskripsi: "Kwetiau kuah atau goreng dengan daging sapi",         harga: 45000, kategori: "Chinese Food",      stok: 20 },
  { id: 25, nama: "Capjay Goreng/Steam",                deskripsi: "Capjay goreng atau steam dengan sayuran segar",       harga: 32000, kategori: "Chinese Food",      stok: 20 },
  { id: 26, nama: "Kwetiau Goreng Blackpepper",         deskripsi: "Kwetiau goreng dengan saus blackpepper",              harga: 35500, kategori: "Chinese Food",      stok: 20 },
  { id: 27, nama: "Fuyunghai Ayam",                     deskripsi: "Fuyunghai ayam dengan saus asam manis",               harga: 32000, kategori: "Chinese Food",      stok: 20 },
  { id: 28, nama: "Egg Rice Bowl",                      deskripsi: "Rice bowl dengan topping telur spesial",              harga: 45000, kategori: "Rice Bowl",          stok: 20 },
  { id: 29, nama: "Beef Bulgogi Rice Bowl",             deskripsi: "Rice bowl dengan daging bulgogi ala Korea",           harga: 45000, kategori: "Rice Bowl",          stok: 20 },
];

const INITIAL_MEJA = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  id: n, nomor: String(n).padStart(2, "0"), status: "Kosong",
}));

const INITIAL_STAFF = [
  { id: 1, nama: "Rina Kasir", username: "rina.kasir", role: "Kasir" },
  { id: 2, nama: "Budi Koki", username: "budi.koki", role: "Koki" },
  { id: 3, nama: "Sari Pelayan", username: "sari.pelayan", role: "Pelayan" },
  { id: 4, nama: "Wawan Admin", username: "wawan.admin", role: "Admin" },
];

const STATUS = {
  MENUNGGU_KONFIRMASI: "menunggu_konfirmasi",
  DIKONFIRMASI: "dikonfirmasi",
  DIMASAK: "dimasak",
  SIAP_DIANTAR: "siap_diantar",
  SEDANG_DIANTAR: "sedang_diantar",
  DIANTAR: "diantar",
  MENUNGGU_BAYAR: "menunggu_bayar",
  SELESAI: "selesai",
};

const STATUS_META = {
  [STATUS.MENUNGGU_KONFIRMASI]: { label: "Menunggu Konfirmasi", color: C.alert, icon: Clock },
  [STATUS.DIKONFIRMASI]: { label: "Dikonfirmasi", color: C.info, icon: CheckCircle2 },
  [STATUS.DIMASAK]: { label: "Sedang Dimasak", color: C.mustardDark, icon: ChefHat },
  [STATUS.SIAP_DIANTAR]: { label: "Siap Diantar", color: C.good, icon: Soup },
  [STATUS.SEDANG_DIANTAR]: { label: "Sedang Diantar", color: C.info, icon: Truck },
  [STATUS.DIANTAR]: { label: "Sudah Diantar", color: C.good, icon: CheckCircle2 },
  [STATUS.MENUNGGU_BAYAR]: { label: "Menunggu Pembayaran", color: C.alert, icon: CreditCard },
  [STATUS.SELESAI]: { label: "Selesai", color: C.inkSoft, icon: Receipt },
};

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

function StatusPill({ status }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <span
      className="kb-body focus-ring"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: meta.color, color: "#fff", fontWeight: 700,
        fontSize: 14, padding: "6px 12px", borderRadius: 999,
      }}
    >
      <Icon size={15} /> {meta.label}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", icon: Icon, style, disabled }) {
  const palette = {
    primary: { bg: C.mustard, fg: C.ink },
    dark: { bg: C.board, fg: C.chalk },
    ghost: { bg: "transparent", fg: C.chalk, border: `2px solid ${C.chalk}` },
    ghostLight: { bg: "transparent", fg: C.ink, border: `2px solid ${C.ink}` },
    danger: { bg: C.alert, fg: "#fff" },
    success: { bg: C.good, fg: "#fff" },
  }[variant];
  const pad = size === "lg" ? "16px 26px" : size === "sm" ? "8px 14px" : "12px 20px";
  const fs = size === "lg" ? 18 : size === "sm" ? 14 : 16;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="kb-body focus-ring"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center",
        background: palette.bg, color: palette.fg, border: palette.border || "none",
        padding: pad, borderRadius: 12, fontWeight: 800, fontSize: fs,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        boxShadow: variant === "primary" ? "0 4px 0 " + C.mustardDark : "none",
        transition: "transform 120ms ease",
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(2px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {Icon && <Icon size={size === "lg" ? 22 : 18} />}
      {children}
    </button>
  );
}

function TicketCard({ children, style }) {
  return <div className="ticket kb-body" style={{ padding: "22px 20px", margin: "14px 0", ...style }}>{children}</div>;
}

function TopBar({ roleLabel, roleIcon: RIcon, onSwitchRole, title }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px", background: C.boardDark, borderBottom: `2px solid ${C.mustard}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={logoUrl} alt="Logo Waroeng Ngangeni" style={{ width: 42, height: 42, borderRadius: 10, objectFit: "cover" }} />
        <div>
          <div className="kb-display" style={{ color: C.chalk, fontSize: 20, lineHeight: 1 }}>Waroeng Ngangeni</div>
          <div className="kb-body" style={{ color: "#B9CBC2", fontSize: 13 }}>{title}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.chalk }}>
          <RIcon size={20} />
          <span className="kb-body" style={{ fontWeight: 700 }}>{roleLabel}</span>
        </div>
        <Btn variant="ghost" size="sm" icon={LogOut} onClick={onSwitchRole}>Ganti Peran</Btn>
      </div>
    </div>
  );
}

function EmptyState({ text, icon: Icon }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 20px", color: "#B9CBC2" }}>
      <Icon size={40} style={{ marginBottom: 10, opacity: 0.7 }} />
      <div className="kb-body" style={{ fontSize: 16 }}>{text}</div>
    </div>
  );
}

const ROLES = [
  { key: "Pelanggan", label: "Pelanggan", icon: UtensilsCrossed, desc: "Pesan makanan dari meja" },
  { key: "Kasir", label: "Kasir", icon: CreditCard, desc: "Verifikasi & proses bayar" },
  { key: "Koki", label: "Koki", icon: ChefHat, desc: "Lihat & masak pesanan" },
  { key: "Pelayan", label: "Pelayan", icon: Truck, desc: "Antar pesanan ke meja" },
  { key: "Admin", label: "Admin", icon: ShieldCheck, desc: "Kelola menu & meja" },
  { key: "Manager", label: "Manager", icon: BarChart3, desc: "Lihat laporan penjualan" },
];

function RoleSelectScreen({ onSelect }) {
  return (
    <div className="board-tile" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <img src={logoUrl} alt="Logo Waroeng Ngangeni" style={{ width: 100, height: 100, borderRadius: 20, objectFit: "cover", marginBottom: 18 }} />
      <h1 className="kb-display" style={{ color: C.chalk, fontSize: 40, margin: 0, textAlign: "center" }}>Waroeng Ngangeni</h1>
      <p className="kb-body" style={{ color: "#C7D6CE", fontSize: 17, marginTop: 8, marginBottom: 36, textAlign: "center", maxWidth: 480 }}>
        Prototipe pemesanan meja dengan QR code. Pilih peranmu untuk mencoba alur pemesanan dari sisi pelanggan maupun staf.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, width: "100%", maxWidth: 780 }}>
        {ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.key}
              onClick={() => onSelect(r.key)}
              className="focus-ring"
              style={{
                background: C.cream, border: "none", borderRadius: 16, padding: "22px 18px",
                cursor: "pointer", textAlign: "left", boxShadow: "0 5px 0 rgba(0,0,0,0.15)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(3px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: C.board, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={24} color={C.mustard} />
              </div>
              <div className="kb-display" style={{ fontSize: 19, color: C.ink }}>{r.label}</div>
              <div className="kb-body" style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 2 }}>{r.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PelangganView({ menu, meja, setMeja, orders, placeOrder, requestBill, session, setSession }) {
  const { step, activeMejaId, activeOrderId } = session;
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [kategori, setKategori] = useState("Semua");
  const activeMeja = meja.find((m) => m.id === activeMejaId) || null;

  const kategoris = ["Semua", ...Array.from(new Set(menu.map((m) => m.kategori)))];
  const filtered = kategori === "Semua" ? menu : menu.filter((m) => m.kategori === kategori);

  const addToCart = (item) => {
    setCart((c) => {
      const existing = c.find((x) => x.idMenu === item.id);
      if (existing) return c.map((x) => x.idMenu === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { idMenu: item.id, nama: item.nama, harga: item.harga, qty: 1 }];
    });
  };
  const changeQty = (idMenu, delta) => {
    setCart((c) => c.map((x) => x.idMenu === idMenu ? { ...x, qty: Math.max(0, x.qty + delta) } : x).filter((x) => x.qty > 0));
  };
  const cartTotal = cart.reduce((s, i) => s + i.harga * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const activeOrder = orders.find((o) => o.id === activeOrderId);

  const handleScan = (m) => {
    setMeja((prev) => prev.map((t) => t.id === m.id ? { ...t, status: "Terisi" } : t));
    setSession({ step: "menu", activeMejaId: m.id, activeOrderId: null });
  };

  const handleBuatPesanan = () => {
    const id = placeOrder(activeMeja.id, cart);
    setCart([]);
    setShowCart(false);
    setSession({ step: "tracking", activeMejaId: activeMeja.id, activeOrderId: id });
  };

  if (step === "meja") {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h2 className="kb-display" style={{ color: C.chalk, fontSize: 26, marginBottom: 6 }}>Scan QR di Mejamu</h2>
        <p className="kb-body" style={{ color: "#C7D6CE", marginBottom: 20 }}>Pilih nomor meja tempat kamu duduk untuk mulai memesan.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: 14 }}>
          {meja.map((m) => (
            <button
              key={m.id}
              onClick={() => handleScan(m)}
              className="focus-ring"
              style={{
                background: C.cream, border: "none", borderRadius: 14, padding: "22px 12px",
                cursor: "pointer", boxShadow: "0 4px 0 rgba(0,0,0,0.15)", textAlign: "center",
              }}
            >
              <QrCode size={30} color={C.board} style={{ marginBottom: 8 }} />
              <div className="kb-display" style={{ fontSize: 22, color: C.ink }}>Meja {m.nomor}</div>
              <div className="kb-body" style={{ fontSize: 12.5, color: m.status === "Kosong" ? C.good : C.inkSoft, fontWeight: 700 }}>{m.status}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "menu") {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto", paddingBottom: 110 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <button onClick={() => setSession({ step: "meja", activeMejaId: null, activeOrderId: null })} className="focus-ring" style={{ background: "none", border: "none", color: C.chalk, cursor: "pointer" }}>
            <ArrowLeft size={22} />
          </button>
          <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, margin: 0 }}>Menu &mdash; Meja {activeMeja.nomor}</h2>
        </div>
        <div style={{ display: "flex", gap: 8, margin: "16px 0", flexWrap: "wrap" }}>
          {kategoris.map((k) => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className="kb-body focus-ring"
              style={{
                padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 700,
                background: kategori === k ? C.mustard : "rgba(255,255,255,0.12)",
                color: kategori === k ? C.ink : C.chalk,
              }}
            >{k}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 }}>
          {filtered.map((item) => {
            const inCart = cart.find((c) => c.idMenu === item.id);
            return (
              <div key={item.id} className="ticket" style={{ padding: 16 }}>
                <div className="kb-display" style={{ fontSize: 17, color: C.ink }}>{item.nama}</div>
                <div className="kb-body" style={{ fontSize: 13.5, color: C.inkSoft, margin: "4px 0 10px" }}>{item.deskripsi}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="kb-mono" style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{rupiah(item.harga)}</div>
                  {!inCart ? (
                    <Btn size="sm" icon={Plus} onClick={() => addToCart(item)}>Tambah</Btn>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => changeQty(item.id, -1)} className="focus-ring" style={{ background: C.board, color: C.chalk, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer" }}><Minus size={16} /></button>
                      <span className="kb-body" style={{ fontWeight: 800, minWidth: 18, textAlign: "center" }}>{inCart.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="focus-ring" style={{ background: C.mustard, color: C.ink, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer" }}><Plus size={16} /></button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {cartCount > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.boardDark, borderTop: `3px solid ${C.mustard}`, padding: "14px 24px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 852, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="kb-body" style={{ color: C.chalk }}>
                <span style={{ fontWeight: 800 }}>{cartCount} item</span> &middot; <span className="kb-mono">{rupiah(cartTotal)}</span>
              </div>
              <Btn icon={ShoppingCart} onClick={() => setShowCart(true)}>Lihat Keranjang</Btn>
            </div>
          </div>
        )}

        {showCart && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 20 }}>
            <div style={{ background: C.cream, borderRadius: "18px 18px 0 0", width: "100%", maxWidth: 520, padding: 22, maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div className="kb-display" style={{ fontSize: 20, color: C.ink }}>Keranjang</div>
                <button onClick={() => setShowCart(false)} className="focus-ring" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} color={C.ink} /></button>
              </div>
              {cart.length === 0 ? (
                <EmptyState text="Keranjang masih kosong." icon={ShoppingCart} />
              ) : (
                <>
                  {cart.map((i) => (
                    <div key={i.idMenu} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px dashed ${C.line}` }}>
                      <div>
                        <div className="kb-body" style={{ fontWeight: 700, color: C.ink }}>{i.nama}</div>
                        <div className="kb-mono" style={{ fontSize: 13, color: C.inkSoft }}>{i.qty} &times; {rupiah(i.harga)}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => changeQty(i.idMenu, -1)} className="focus-ring" style={{ background: C.board, color: C.chalk, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer" }}><Minus size={14} /></button>
                        <span className="kb-body" style={{ fontWeight: 800 }}>{i.qty}</span>
                        <button onClick={() => changeQty(i.idMenu, 1)} className="focus-ring" style={{ background: C.mustard, color: C.ink, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer" }}><Plus size={14} /></button>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 6px" }}>
                    <span className="kb-display" style={{ fontSize: 17, color: C.ink }}>Total</span>
                    <span className="kb-mono" style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{rupiah(cartTotal)}</span>
                  </div>
                  <Btn size="lg" style={{ width: "100%", marginTop: 10 }} icon={ClipboardList} onClick={handleBuatPesanan}>Buat Pesanan</Btn>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!activeOrder) return null;
  const flow = [STATUS.MENUNGGU_KONFIRMASI, STATUS.DIKONFIRMASI, STATUS.DIMASAK, STATUS.SIAP_DIANTAR, STATUS.SEDANG_DIANTAR, STATUS.DIANTAR];
  const idx = flow.indexOf(activeOrder.status);

  return (
    <div style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 16, textAlign: "center" }}>Status Pesananmu</h2>
      <TicketCard>
        <div className="kb-mono" style={{ fontSize: 13, color: C.inkSoft, marginBottom: 4 }}>PESANAN #{String(activeOrder.id).padStart(4, "0")} &mdash; MEJA {activeMeja.nomor}</div>
        {activeOrder.items.map((it, i) => (
          <div key={i} className="kb-body" style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.ink, padding: "3px 0" }}>
            <span>{it.qty}x {it.nama}</span>
            <span className="kb-mono">{rupiah(it.subTotal)}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px dashed ${C.line}`, marginTop: 8, paddingTop: 8 }}>
          <span className="kb-display" style={{ color: C.ink }}>Total</span>
          <span className="kb-mono" style={{ fontWeight: 700, color: C.ink }}>{rupiah(activeOrder.total)}</span>
        </div>
      </TicketCard>

      {activeOrder.status !== STATUS.MENUNGGU_BAYAR && activeOrder.status !== STATUS.SELESAI && (
        <div style={{ margin: "20px 0" }}>
          {flow.map((s, i) => {
            const meta = STATUS_META[s];
            const Icon = meta.icon;
            const done = i < idx;
            const current = i === idx;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, opacity: done || current ? 1 : 0.4 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: done || current ? meta.color : "rgba(255,255,255,0.15)", flexShrink: 0,
                }}>
                  <Icon size={17} color="#fff" />
                </div>
                <span className="kb-body" style={{ color: C.chalk, fontWeight: current ? 800 : 600 }}>
                  {meta.label}{current && <span className="pulse-dot"> &bull; sedang berlangsung</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {activeOrder.status === STATUS.DIANTAR && (
        <Btn size="lg" icon={Receipt} style={{ width: "100%" }} onClick={() => requestBill(activeOrder.id)}>Minta Tagihan</Btn>
      )}

      {activeOrder.status === STATUS.MENUNGGU_BAYAR && (
        <div style={{ textAlign: "center", color: "#C7D6CE" }} className="kb-body">
          <Clock size={30} className="pulse-dot" style={{ marginBottom: 8 }} />
          <div>Menunggu kasir memproses pembayaran&hellip;</div>
        </div>
      )}

      {activeOrder.status === STATUS.SELESAI && (
        <>
          <TicketCard style={{ textAlign: "center" }}>
            <CheckCircle2 size={34} color={C.good} style={{ marginBottom: 8 }} />
            <div className="kb-display" style={{ fontSize: 18, color: C.ink }}>Terima kasih!</div>
            <div className="kb-body" style={{ color: C.inkSoft, fontSize: 14 }}>Pembayaran diterima. Selamat menikmati.</div>
          </TicketCard>
          <Btn variant="ghost" style={{ width: "100%" }} onClick={() => setSession({ step: "meja", activeMejaId: null, activeOrderId: null })}>Pesan Lagi</Btn>
        </>
      )}
    </div>
  );
}

function KasirView({ orders, verifyOrder, processPayment }) {
  const [payModal, setPayModal] = useState(null);
  const [metode, setMetode] = useState("QRIS");
  const [receipt, setReceipt] = useState(null);

  const toVerify = orders.filter((o) => o.status === STATUS.MENUNGGU_KONFIRMASI);
  const toPay = orders.filter((o) => o.status === STATUS.MENUNGGU_BAYAR);

  const confirmPayment = () => {
    const paid = processPayment(payModal.id, metode);
    setReceipt({ order: payModal, metode, ...paid });
    setPayModal(null);
  };

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 4 }}>Verifikasi Pesanan Masuk</h2>
      <p className="kb-body" style={{ color: "#C7D6CE", marginBottom: 8 }}>Konfirmasi pesanan sebelum dikirim ke dapur.</p>
      {toVerify.length === 0 ? <EmptyState text="Tidak ada pesanan menunggu konfirmasi." icon={ClipboardList} /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 14 }}>
          {toVerify.map((o) => (
            <TicketCard key={o.id} style={{ margin: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="kb-mono" style={{ fontWeight: 700, color: C.ink }}>#{String(o.id).padStart(4, "0")} &middot; Meja {o.mejaNomor}</span>
                <StatusPill status={o.status} />
              </div>
              {o.items.map((it, i) => <div key={i} className="kb-body" style={{ fontSize: 14, color: C.ink }}>{it.qty}x {it.nama}</div>)}
              <div className="kb-mono" style={{ marginTop: 8, fontWeight: 700, color: C.ink }}>{rupiah(o.total)}</div>
              <Btn style={{ marginTop: 12, width: "100%" }} icon={CheckCircle2} onClick={() => verifyOrder(o.id)}>Verifikasi Pesanan</Btn>
            </TicketCard>
          ))}
        </div>
      )}

      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, margin: "30px 0 4px" }}>Proses Pembayaran</h2>
      <p className="kb-body" style={{ color: "#C7D6CE", marginBottom: 8 }}>Pesanan yang meminta tagihan.</p>
      {toPay.length === 0 ? <EmptyState text="Tidak ada permintaan tagihan." icon={CreditCard} /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 14 }}>
          {toPay.map((o) => (
            <TicketCard key={o.id} style={{ margin: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="kb-mono" style={{ fontWeight: 700, color: C.ink }}>#{String(o.id).padStart(4, "0")} &middot; Meja {o.mejaNomor}</span>
                <StatusPill status={o.status} />
              </div>
              <div className="kb-mono" style={{ fontWeight: 700, color: C.ink, fontSize: 18 }}>{rupiah(o.total)}</div>
              <Btn style={{ marginTop: 12, width: "100%" }} icon={CreditCard} onClick={() => setPayModal(o)}>Pilih Metode & Bayar</Btn>
            </TicketCard>
          ))}
        </div>
      )}

      {payModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
          <div style={{ background: C.cream, borderRadius: 18, padding: 24, width: 340 }}>
            <div className="kb-display" style={{ fontSize: 19, color: C.ink, marginBottom: 12 }}>Metode Pembayaran</div>
            {["Tunai", "QRIS", "Debit"].map((m) => (
              <button key={m} onClick={() => setMetode(m)} className="kb-body focus-ring" style={{
                display: "block", width: "100%", textAlign: "left", padding: "12px 14px", marginBottom: 8, borderRadius: 10,
                border: metode === m ? `2px solid ${C.mustard}` : `2px solid ${C.line}`, background: "#fff", cursor: "pointer", fontWeight: 700, color: C.ink,
              }}>{m}</button>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <Btn variant="ghostLight" style={{ flex: 1 }} onClick={() => setPayModal(null)}>Batal</Btn>
              <Btn style={{ flex: 1 }} icon={CheckCircle2} onClick={confirmPayment}>Konfirmasi</Btn>
            </div>
          </div>
        </div>
      )}

      {receipt && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
          <div style={{ width: 320 }}>
            <TicketCard>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <img src={logoUrl} alt="Logo" style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover", marginBottom: 6 }} />
                <div className="kb-display" style={{ fontSize: 18, color: C.ink }}>Waroeng Ngangeni</div>
                <div className="kb-mono" style={{ fontSize: 12, color: C.inkSoft }}>STRUK PEMBAYARAN</div>
              </div>
              <div style={{ borderTop: `1px dashed ${C.line}`, margin: "10px 0" }} />
              {receipt.order.items.map((it, i) => (
                <div key={i} className="kb-mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.ink, padding: "2px 0" }}>
                  <span>{it.qty}x {it.nama}</span><span>{rupiah(it.subTotal)}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px dashed ${C.line}`, margin: "10px 0" }} />
              <div className="kb-mono" style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: C.ink }}>
                <span>TOTAL</span><span>{rupiah(receipt.order.total)}</span>
              </div>
              <div className="kb-mono" style={{ fontSize: 12, color: C.inkSoft, marginTop: 4 }}>Metode: {receipt.metode}</div>
            </TicketCard>
            <Btn style={{ width: "100%" }} icon={Receipt} onClick={() => setReceipt(null)}>Tutup Struk</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function KokiView({ orders, startCooking, markReady }) {
  const masuk = orders.filter((o) => o.status === STATUS.DIKONFIRMASI);
  const dimasak = orders.filter((o) => o.status === STATUS.DIMASAK);

  const Column = ({ title, list, actionLabel, onAction, icon }) => (
    <div style={{ flex: 1, minWidth: 280 }}>
      <h3 className="kb-display" style={{ color: C.chalk, fontSize: 19, marginBottom: 10 }}>{title} ({list.length})</h3>
      {list.length === 0 ? <EmptyState text="Kosong." icon={ChefHat} /> : list.map((o) => (
        <TicketCard key={o.id}>
          <div className="kb-mono" style={{ fontWeight: 700, color: C.ink, marginBottom: 6 }}>#{String(o.id).padStart(4, "0")} &middot; Meja {o.mejaNomor}</div>
          {o.items.map((it, i) => <div key={i} className="kb-body" style={{ fontSize: 14, color: C.ink }}>{it.qty}x {it.nama}</div>)}
          <Btn style={{ marginTop: 12, width: "100%" }} icon={icon} onClick={() => onAction(o.id)}>{actionLabel}</Btn>
        </TicketCard>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 16 }}>Dapur &mdash; Tiket Pesanan</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Column title="Pesanan Masuk" list={masuk} actionLabel="Mulai Masak" icon={ChefHat} onAction={startCooking} />
        <Column title="Sedang Dimasak" list={dimasak} actionLabel="Tandai Siap" icon={Soup} onAction={markReady} />
      </div>
    </div>
  );
}

function PelayanView({ orders, takeOrder, deliverOrder }) {
  const siap = orders.filter((o) => o.status === STATUS.SIAP_DIANTAR);
  const diantar = orders.filter((o) => o.status === STATUS.SEDANG_DIANTAR);

  const Column = ({ title, list, actionLabel, onAction, icon }) => (
    <div style={{ flex: 1, minWidth: 280 }}>
      <h3 className="kb-display" style={{ color: C.chalk, fontSize: 19, marginBottom: 10 }}>{title} ({list.length})</h3>
      {list.length === 0 ? <EmptyState text="Kosong." icon={Truck} /> : list.map((o) => (
        <TicketCard key={o.id}>
          <div className="kb-mono" style={{ fontWeight: 700, color: C.ink, marginBottom: 6 }}>#{String(o.id).padStart(4, "0")} &middot; Meja {o.mejaNomor}</div>
          {o.items.map((it, i) => <div key={i} className="kb-body" style={{ fontSize: 14, color: C.ink }}>{it.qty}x {it.nama}</div>)}
          <Btn style={{ marginTop: 12, width: "100%" }} icon={icon} onClick={() => onAction(o.id)}>{actionLabel}</Btn>
        </TicketCard>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 16 }}>Antar Pesanan</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Column title="Siap Diambil" list={siap} actionLabel="Ambil Pesanan" icon={Truck} onAction={takeOrder} />
        <Column title="Sedang Diantar" list={diantar} actionLabel="Tandai Terkirim" icon={CheckCircle2} onAction={deliverOrder} />
      </div>
    </div>
  );
}

function AdminView({ menu, setMenu, meja, setMeja, staff, setStaff }) {
  const [tab, setTab] = useState("menu");
  const [newItem, setNewItem] = useState({ nama: "", harga: "", kategori: "Makanan", stok: "" });
  const [newStaff, setNewStaff] = useState({ nama: "", username: "", role: "Kasir" });

  const addMenuItem = () => {
    if (!newItem.nama || !newItem.harga) return;
    setMenu((m) => [...m, { id: Date.now(), nama: newItem.nama, deskripsi: "Menu baru", harga: Number(newItem.harga), kategori: newItem.kategori, stok: Number(newItem.stok) || 0 }]);
    setNewItem({ nama: "", harga: "", kategori: "Makanan", stok: "" });
  };
  const removeMenuItem = (id) => setMenu((m) => m.filter((i) => i.id !== id));
  const updateStok = (id, stok) => setMenu((m) => m.map((i) => i.id === id ? { ...i, stok: Number(stok) || 0 } : i));
  const updateHarga = (id, harga) => setMenu((m) => m.map((i) => i.id === id ? { ...i, harga: Number(harga) || 0 } : i));

  const addMeja = () => setMeja((t) => [...t, { id: Date.now(), nomor: String(t.length + 1).padStart(2, "0"), status: "Kosong" }]);
  const removeMeja = (id) => setMeja((t) => t.filter((m) => m.id !== id));
  const toggleMeja = (id) => setMeja((t) => t.map((m) => m.id === id ? { ...m, status: m.status === "Kosong" ? "Terisi" : "Kosong" } : m));

  const addStaff = () => {
    if (!newStaff.nama || !newStaff.username) return;
    setStaff((s) => [...s, { id: Date.now(), ...newStaff }]);
    setNewStaff({ nama: "", username: "", role: "Kasir" });
  };
  const removeStaff = (id) => setStaff((s) => s.filter((u) => u.id !== id));

  const inputStyle = { padding: "10px 12px", borderRadius: 8, border: `2px solid ${C.line}`, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: C.ink };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 14 }}>Panel Admin</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["menu", "Kelola Menu", UtensilsCrossed], ["meja", "Kelola Meja", Table2], ["staff", "Kelola Pengguna", Users]].map(([k, label, Icon]) => (
          <button key={k} onClick={() => setTab(k)} className="kb-body focus-ring" style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700,
            background: tab === k ? C.mustard : "rgba(255,255,255,0.12)", color: tab === k ? C.ink : C.chalk,
          }}><Icon size={16} />{label}</button>
        ))}
      </div>

      {tab === "menu" && (
        <>
          <TicketCard>
            <div className="kb-display" style={{ fontSize: 16, color: C.ink, marginBottom: 10 }}>Tambah Menu Baru</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input placeholder="Nama menu" value={newItem.nama} onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })} style={{ ...inputStyle, flex: "2 1 160px" }} />
              <input placeholder="Harga" type="number" value={newItem.harga} onChange={(e) => setNewItem({ ...newItem, harga: e.target.value })} style={{ ...inputStyle, flex: "1 1 100px" }} />
              <select value={newItem.kategori} onChange={(e) => setNewItem({ ...newItem, kategori: e.target.value })} style={{ ...inputStyle, flex: "1 1 120px" }}>
                <option>Makanan</option><option>Minuman</option><option>Camilan</option>
              </select>
              <input placeholder="Stok" type="number" value={newItem.stok} onChange={(e) => setNewItem({ ...newItem, stok: e.target.value })} style={{ ...inputStyle, flex: "1 1 80px" }} />
              <Btn icon={PlusCircle} onClick={addMenuItem}>Tambah</Btn>
            </div>
          </TicketCard>
          {menu.map((item) => (
            <TicketCard key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ flex: "1 1 160px" }}>
                <div className="kb-body" style={{ fontWeight: 800, color: C.ink }}>{item.nama}</div>
                <div className="kb-body" style={{ fontSize: 12.5, color: C.inkSoft }}>{item.kategori}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span className="kb-mono" style={{ fontSize: 13, color: C.inkSoft }}>Rp</span>
                <input type="number" value={item.harga} onChange={(e) => updateHarga(item.id, e.target.value)} style={{ ...inputStyle, width: 90 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span className="kb-mono" style={{ fontSize: 13, color: C.inkSoft }}>Stok</span>
                <input type="number" value={item.stok} onChange={(e) => updateStok(item.id, e.target.value)} style={{ ...inputStyle, width: 70 }} />
              </div>
              <button onClick={() => removeMenuItem(item.id)} className="focus-ring" style={{ background: "none", border: "none", cursor: "pointer" }}><Trash2 size={18} color={C.alert} /></button>
            </TicketCard>
          ))}
        </>
      )}

      {tab === "meja" && (
        <>
          <Btn icon={PlusCircle} onClick={addMeja} style={{ marginBottom: 14 }}>Tambah Meja</Btn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 12 }}>
            {meja.map((m) => (
              <TicketCard key={m.id} style={{ margin: 0, textAlign: "center" }}>
                <div className="kb-display" style={{ fontSize: 20, color: C.ink }}>Meja {m.nomor}</div>
                <div className="kb-body" style={{ fontSize: 13, fontWeight: 700, color: m.status === "Kosong" ? C.good : C.alert, margin: "6px 0" }}>{m.status}</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  <Btn size="sm" variant="ghostLight" onClick={() => toggleMeja(m.id)}>Ubah Status</Btn>
                  <button onClick={() => removeMeja(m.id)} className="focus-ring" style={{ background: "none", border: "none", cursor: "pointer" }}><Trash2 size={16} color={C.alert} /></button>
                </div>
              </TicketCard>
            ))}
          </div>
        </>
      )}

      {tab === "staff" && (
        <>
          <TicketCard>
            <div className="kb-display" style={{ fontSize: 16, color: C.ink, marginBottom: 10 }}>Tambah Pengguna Staf</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input placeholder="Nama" value={newStaff.nama} onChange={(e) => setNewStaff({ ...newStaff, nama: e.target.value })} style={{ ...inputStyle, flex: "1 1 140px" }} />
              <input placeholder="Username" value={newStaff.username} onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })} style={{ ...inputStyle, flex: "1 1 140px" }} />
              <select value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} style={{ ...inputStyle, flex: "1 1 120px" }}>
                <option>Kasir</option><option>Koki</option><option>Pelayan</option><option>Admin</option><option>Manager</option>
              </select>
              <Btn icon={PlusCircle} onClick={addStaff}>Tambah</Btn>
            </div>
          </TicketCard>
          {staff.map((u) => (
            <TicketCard key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="kb-body" style={{ fontWeight: 800, color: C.ink }}>{u.nama}</div>
                <div className="kb-mono" style={{ fontSize: 12.5, color: C.inkSoft }}>@{u.username} &middot; {u.role}</div>
              </div>
              <button onClick={() => removeStaff(u.id)} className="focus-ring" style={{ background: "none", border: "none", cursor: "pointer" }}><Trash2 size={18} color={C.alert} /></button>
            </TicketCard>
          ))}
        </>
      )}
    </div>
  );
}

function ManagerView({ orders, payments }) {
  const [exported, setExported] = useState(false);
  const totalPenjualan = payments.reduce((s, p) => s + p.jumlah, 0);
  const selesai = orders.filter((o) => o.status === STATUS.SELESAI);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 className="kb-display" style={{ color: C.chalk, fontSize: 24, marginBottom: 16 }}>Laporan Penjualan</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
        <TicketCard style={{ margin: 0, textAlign: "center" }}>
          <div className="kb-mono" style={{ fontSize: 12, color: C.inkSoft }}>TOTAL PENJUALAN</div>
          <div className="kb-display" style={{ fontSize: 26, color: C.ink, marginTop: 4 }}>{rupiah(totalPenjualan)}</div>
        </TicketCard>
        <TicketCard style={{ margin: 0, textAlign: "center" }}>
          <div className="kb-mono" style={{ fontSize: 12, color: C.inkSoft }}>PESANAN SELESAI</div>
          <div className="kb-display" style={{ fontSize: 26, color: C.ink, marginTop: 4 }}>{selesai.length}</div>
        </TicketCard>
        <TicketCard style={{ margin: 0, textAlign: "center" }}>
          <div className="kb-mono" style={{ fontSize: 12, color: C.inkSoft }}>TRANSAKSI</div>
          <div className="kb-display" style={{ fontSize: 26, color: C.ink, marginTop: 4 }}>{payments.length}</div>
        </TicketCard>
      </div>

      <Btn icon={FileDown} onClick={() => setExported(true)} style={{ marginBottom: 16 }}>Ekspor Laporan (PDF)</Btn>
      {exported && (
        <div className="kb-body" style={{ color: C.good, fontWeight: 700, marginBottom: 16 }}>
          <CheckCircle2 size={16} style={{ marginRight: 6, verticalAlign: "-2px" }} />Laporan berhasil diekspor (simulasi prototipe).
        </div>
      )}

      <h3 className="kb-display" style={{ color: C.chalk, fontSize: 18, marginBottom: 10 }}>Riwayat Transaksi</h3>
      {payments.length === 0 ? <EmptyState text="Belum ada transaksi." icon={Receipt} /> : payments.slice().reverse().map((p) => (
        <TicketCard key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="kb-mono" style={{ fontWeight: 700, color: C.ink }}>#{String(p.idPesanan).padStart(4, "0")}</div>
            <div className="kb-body" style={{ fontSize: 12.5, color: C.inkSoft }}>{p.metode} &middot; {p.waktu}</div>
          </div>
          <div className="kb-mono" style={{ fontWeight: 700, color: C.ink }}>{rupiah(p.jumlah)}</div>
        </TicketCard>
      ))}
    </div>
  );
}

export default function KedaiMejaApp() {
  const [role, setRole] = useState(null);
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [meja, setMeja] = useState(INITIAL_MEJA);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [pelangganSession, setPelangganSession] = useState({ step: "meja", activeMejaId: null, activeOrderId: null });
  const orderIdRef = useRef(1);
  const paymentIdRef = useRef(1);

  const placeOrder = (mejaId, cart) => {
    const id = orderIdRef.current++;
    const table = meja.find((m) => m.id === mejaId);
    const items = cart.map((c) => ({ ...c, subTotal: c.harga * c.qty }));
    const total = items.reduce((s, i) => s + i.subTotal, 0);
    setOrders((o) => [...o, { id, idMeja: mejaId, mejaNomor: table.nomor, items, total, status: STATUS.MENUNGGU_KONFIRMASI, waktu: new Date().toLocaleTimeString("id-ID") }]);
    return id;
  };

  const updateOrderStatus = (id, status) => setOrders((o) => o.map((x) => x.id === id ? { ...x, status } : x));
  const verifyOrder = (id) => updateOrderStatus(id, STATUS.DIKONFIRMASI);
  const startCooking = (id) => updateOrderStatus(id, STATUS.DIMASAK);
  const markReady = (id) => updateOrderStatus(id, STATUS.SIAP_DIANTAR);
  const takeOrder = (id) => updateOrderStatus(id, STATUS.SEDANG_DIANTAR);
  const deliverOrder = (id) => updateOrderStatus(id, STATUS.DIANTAR);
  const requestBill = (id) => updateOrderStatus(id, STATUS.MENUNGGU_BAYAR);

  const processPayment = (id, metode) => {
    const order = orders.find((o) => o.id === id);
    const paymentId = paymentIdRef.current++;
    const waktu = new Date().toLocaleTimeString("id-ID");
    setPayments((p) => [...p, { id: paymentId, idPesanan: id, jumlah: order.total, metode, waktu }]);
    setOrders((o) => o.map((x) => x.id === id ? { ...x, status: STATUS.SELESAI } : x));
    setMeja((t) => t.map((m) => m.id === order.idMeja ? { ...m, status: "Kosong" } : m));
    return { paymentId, waktu };
  };

  if (!role) return <>{FONTS}<RoleSelectScreen onSelect={setRole} /></>;

  const roleInfo = ROLES.find((r) => r.key === role);

  return (
    <div className="board-tile" style={{ minHeight: "100vh" }}>
      {FONTS}
      <TopBar
        roleLabel={roleInfo.label}
        roleIcon={roleInfo.icon}
        title={roleInfo.desc}
        onSwitchRole={() => setRole(null)}
      />
      {role === "Pelanggan" && <PelangganView menu={menu} meja={meja} setMeja={setMeja} orders={orders} placeOrder={placeOrder} requestBill={requestBill} session={pelangganSession} setSession={setPelangganSession} />}
      {role === "Kasir" && <KasirView orders={orders} verifyOrder={verifyOrder} processPayment={processPayment} />}
      {role === "Koki" && <KokiView orders={orders} startCooking={startCooking} markReady={markReady} />}
      {role === "Pelayan" && <PelayanView orders={orders} takeOrder={takeOrder} deliverOrder={deliverOrder} />}
      {role === "Admin" && <AdminView menu={menu} setMenu={setMenu} meja={meja} setMeja={setMeja} staff={staff} setStaff={setStaff} />}
      {role === "Manager" && <ManagerView orders={orders} payments={payments} />}
    </div>
  );
}
