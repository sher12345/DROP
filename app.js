(function(){
  "use strict";

  /* ============ CONFIG ============ */
  const CONFIG = { brandName: "Drop" };
  document.title = document.title.replace(/^.*?(—)/, CONFIG.brandName.toUpperCase() + " $1") || (CONFIG.brandName + " — Official Store");
  document.querySelectorAll("[data-brand]").forEach(function(el){ el.textContent = CONFIG.brandName.toUpperCase(); });
  var yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ ICONS ============ */
  const ICONS = {
    tshirt: '<svg viewBox="0 0 64 64"><path d="M20 8 L8 18 L14 28 L20 24 V56 H44 V24 L50 28 L56 18 L44 8 L38 12 H26 Z" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    jersey: '<svg viewBox="0 0 64 64"><path d="M20 8 L8 18 L14 28 L20 24 V56 H44 V24 L50 28 L56 18 L44 8 L38 12 H26 Z" stroke-linejoin="round" stroke-linecap="round"/><path d="M22 24 L42 24 M22 34 L42 34" stroke-linecap="round"/></svg>',
    trouser: '<svg viewBox="0 0 64 64"><path d="M16 8 H48 L50 56 L36 56 L32 26 L28 56 L14 56 Z" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    polo: '<svg viewBox="0 0 64 64"><path d="M22 8 L10 16 L16 26 L20 22 V56 H44 V22 L48 26 L54 16 L42 8 L36 14 L32 18 L28 14 Z" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    bag: '<svg viewBox="0 0 64 64"><path d="M14 22 H50 L46 56 H18 Z" stroke-linejoin="round" stroke-linecap="round"/><path d="M22 22 V16 A10 10 0 0 1 42 16 V22" stroke-linecap="round"/></svg>'
  };

  /* ============ PRODUCT DATA ============
     newIn / gentleEdge / minorFault flags decide which collection pages a
     product shows up on. dateAdded powers "new to old" sorting. */
  const PRODUCTS = [
    { id:"p1", name:"Static Oversized Tee — Grey", cat:"T-Shirts", price:2250, icon:"tshirt", tone:"", sizes:["S","M","L","XL"], newIn:true, dateAdded:"2026-07-10" },
    { id:"p2", name:"Drop Out Graphic Tee", cat:"T-Shirts", price:2250, icon:"tshirt", tone:"tone-dark", sizes:["S","M","L","XL"], gentleEdge:true, dateAdded:"2026-06-01" },
    { id:"p3", name:"Signal Unit Jersey — Blue", cat:"Jerseys", price:2600, icon:"jersey", tone:"", sizes:["S","M","L","XL"], newIn:true, dateAdded:"2026-07-12" },
    { id:"p4", name:"Signal Unit Jersey — White", cat:"Jerseys", price:2600, icon:"jersey", tone:"tone-red", sizes:["S","M","L","XL"], dateAdded:"2026-05-20" },
    { id:"p5", name:"Motion Wide Trouser", cat:"Trousers", price:4550, icon:"trouser", tone:"", sizes:["30","32","34","36"], gentleEdge:true, dateAdded:"2026-06-15" },
    { id:"p6", name:"Nova Track Trouser", cat:"Trousers", price:2750, icon:"trouser", tone:"tone-dark", sizes:["30","32","34","36"], newIn:true, dateAdded:"2026-07-05" },
    { id:"p7", name:"Creative Stripe Polo", cat:"Polos", price:3200, icon:"polo", tone:"", sizes:["S","M","L","XL"], gentleEdge:true, dateAdded:"2026-06-20" },
    { id:"p8", name:"Vintage Wash Polo — Brown", cat:"Polos", price:3200, icon:"polo", tone:"tone-red", sizes:["S","M","L","XL"], dateAdded:"2026-04-10" },
    { id:"p9", name:"Heritage Stripe Tee", cat:"T-Shirts", price:2400, icon:"tshirt", tone:"tone-dark", sizes:["S","M","L","XL"], gentleEdge:true, dateAdded:"2026-06-28" },
    { id:"p10", name:"Weekend Wide Polo", cat:"Polos", price:3400, icon:"polo", tone:"", sizes:["S","M","L","XL"], newIn:true, dateAdded:"2026-07-14" },
    { id:"p11", name:"Static Oversized Tee — Grey", cat:"T-Shirts", price:2250, faultPrice:1350, icon:"tshirt", tone:"", sizes:["S","M","L","XL"], minorFault:true, faultNote:"Small mark on inner hem", dateAdded:"2026-07-01" },
    { id:"p12", name:"Signal Unit Jersey — Blue", cat:"Jerseys", price:2600, faultPrice:1560, icon:"jersey", tone:"", sizes:["S","M","L","XL"], minorFault:true, faultNote:"Loose thread at cuff", dateAdded:"2026-06-25" },
    { id:"p13", name:"Motion Wide Trouser", cat:"Trousers", price:4550, faultPrice:2730, icon:"trouser", tone:"", sizes:["30","32","34","36"], minorFault:true, faultNote:"Slight discoloration on back pocket", dateAdded:"2026-06-10" },
    { id:"p14", name:"Creative Stripe Polo", cat:"Polos", price:3200, faultPrice:1920, icon:"polo", tone:"", sizes:["S","M","L","XL"], minorFault:true, faultNote:"Minor stitching flaw on collar", dateAdded:"2026-05-15" }
  ];
  const CATEGORIES = ["T-Shirts","Jerseys","Trousers","Polos"];
  const byId = function(id){ return PRODUCTS.find(function(p){ return p.id === id; }); };
  const fmt = function(n){ return "Rs." + n.toLocaleString("en-PK") + ".00"; };

  function photoHTML(p, extraClass){
    const tone = p && p.tone ? p.tone : "";
    const icon = p ? ICONS[p.icon] : ICONS.bag;
    return '<div class="photo '+tone+' '+(extraClass||'')+'"><span class="icon">'+icon+'</span></div>';
  }
  function priceHTML(p){
    if(p.minorFault && p.faultPrice){
      return '<span class="was">'+fmt(p.price)+'</span>'+fmt(p.faultPrice);
    }
    return fmt(p.price);
  }

  // Expose shared pieces for page-specific inline scripts (e.g. homepage).
  window.PRODUCTS = PRODUCTS;
  window.CATEGORIES = CATEGORIES;
  window.ICONS = ICONS;
  window.byId = byId;
  window.fmt = fmt;
  window.photoHTML = photoHTML;

  /* ============ QUICK LINKS ============ */
  (function initQuickLinks(){
    const row = document.getElementById("quickLinksRow");
    if(!row) return;
    const links = [
      { label:"T-Shirts", badge:"best" },
      { label:"Jerseys", badge:"new" },
      { label:"Trousers", badge:null },
      { label:"Polos", badge:"new" },
      { label:"Gentle Edge", href:"gentle-edge.html", badge:null },
      { label:"Track Order", href:"#", badge:null, track:true }
    ];
    row.innerHTML = links.map(function(l){
      const href = l.href || ("clothing.html?cat=" + encodeURIComponent(l.label));
      const trk = l.track ? ' data-open-track="1"' : "";
      const badge = l.badge === "new" ? '<span class="badge badge-new">New</span>' : l.badge === "best" ? '<span class="badge badge-best">Best Sellers</span>' : "";
      return '<a class="qlink" href="'+href+'"'+trk+'>'+l.label+badge+'</a>';
    }).join("");
  })();

  /* ============ CLOTHING DROPDOWN ============ */
  (function initClothingDropdown(){
    const dd = document.getElementById("clothingDropdown");
    const toggle = document.getElementById("clothingToggle");
    if(!dd) return;
    dd.innerHTML = CATEGORIES.map(function(c){
      return '<a href="clothing.html?cat='+encodeURIComponent(c)+'">'+c+'</a>';
    }).join("") + '<a href="clothing.html">All Clothing</a>';
    if(toggle){
      toggle.addEventListener("click", function(e){
        if(window.matchMedia("(max-width:720px)").matches){
          e.preventDefault();
          toggle.closest(".has-dropdown").classList.toggle("open");
        }
      });
    }
  })();

  /* ============ SEARCH ============ */
  const searchBox = document.getElementById("searchBox");
  const searchToggleBtn = document.getElementById("searchToggle");
  if(searchToggleBtn && searchBox){
    searchToggleBtn.addEventListener("click", function(){
      searchBox.classList.toggle("open");
      const input = document.getElementById("searchInput");
      if(searchBox.classList.contains("open") && input) input.focus();
    });
  }
  function goToSearch(){
    const input = document.getElementById("searchInput");
    const q = input ? input.value.trim() : "";
    window.location.href = "clothing.html" + (q ? ("?q=" + encodeURIComponent(q)) : "");
  }
  const searchGoBtn = document.getElementById("searchGo");
  if(searchGoBtn) searchGoBtn.addEventListener("click", goToSearch);
  const searchInputEl = document.getElementById("searchInput");
  if(searchInputEl) searchInputEl.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); goToSearch(); } });

  /* ============ MOBILE MENU ============ */
  const navLinks = document.getElementById("navLinks");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  if(hamburgerBtn && navLinks){
    hamburgerBtn.addEventListener("click", function(){ navLinks.classList.toggle("open"); });
    navLinks.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ navLinks.classList.remove("open"); }); });
  }

  /* ============ CART (per-page session state — resets on page navigation) ============ */
  let cart = [];
  const selectedSizes = {};
  PRODUCTS.forEach(function(p){ selectedSizes[p.id] = p.sizes[0]; });

  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const drawerItems = document.getElementById("drawerItems");
  const cartCount = document.getElementById("cartCount");
  const subtotalEl = document.getElementById("subtotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function openDrawer(){ if(drawer) drawer.classList.add("show"); if(overlay) overlay.classList.add("show"); }
  function closeDrawer(){ if(drawer) drawer.classList.remove("show"); if(overlay) overlay.classList.remove("show"); }
  const cartToggleBtn = document.getElementById("cartToggle");
  if(cartToggleBtn) cartToggleBtn.addEventListener("click", openDrawer);
  const closeDrawerBtn = document.getElementById("closeDrawer");
  if(closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if(overlay) overlay.addEventListener("click", function(){ closeDrawer(); closeModal(); closeTrack(); });

  function unitPrice(p){ return (p.minorFault && p.faultPrice) ? p.faultPrice : p.price; }

  function addToCart(pid, quiet){
    const product = byId(pid);
    if(!product) return;
    const size = selectedSizes[pid];
    const existing = cart.find(function(c){ return c.id === pid && c.size === size; });
    if(existing){ existing.qty += 1; }
    else { cart.push({ id:pid, name:product.name, price:unitPrice(product), size:size, icon:product.icon, tone:product.tone, qty:1 }); }
    renderCart();
    if(!quiet) showToast(product.name + " added to your bag");
    openDrawer();
  }

  function renderCart(){
    if(!drawerItems || !cartCount) return;
    const totalQty = cart.reduce(function(sum,c){ return sum + c.qty; }, 0);
    cartCount.textContent = totalQty;
    if(cart.length === 0){
      drawerItems.innerHTML = '<div class="drawer-empty">Your bag is empty.</div>';
      if(checkoutBtn) checkoutBtn.setAttribute("disabled","disabled");
    } else {
      drawerItems.innerHTML = cart.map(function(c, idx){
        return (
          '<div class="drawer-item">' +
            '<div class="drawer-swatch photo '+c.tone+'"><span class="icon">'+ICONS[c.icon]+'</span></div>' +
            '<div class="di-info">' +
              '<span class="name">'+c.name+'</span>' +
              '<span class="meta">Size: '+c.size+'</span>' +
              '<div class="qty-row">' +
                '<button class="qty-btn" data-dec="'+idx+'">–</button>' +
                '<span style="font-size:13px;">'+c.qty+'</span>' +
                '<button class="qty-btn" data-inc="'+idx+'">+</button>' +
                '<button class="remove-btn" data-remove="'+idx+'">Remove</button>' +
              '</div>' +
            '</div>' +
            '<span class="di-price">'+fmt(c.price * c.qty)+'</span>' +
          '</div>'
        );
      }).join("");
      if(checkoutBtn) checkoutBtn.removeAttribute("disabled");
    }
    const subtotal = cart.reduce(function(sum,c){ return sum + c.price * c.qty; }, 0);
    if(subtotalEl) subtotalEl.textContent = fmt(subtotal);
  }
  if(drawerItems){
    drawerItems.addEventListener("click", function(e){
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const rem = e.target.closest("[data-remove]");
      if(inc){ cart[inc.dataset.inc].qty += 1; renderCart(); }
      if(dec){ const idx = dec.dataset.dec; cart[idx].qty -= 1; if(cart[idx].qty <= 0) cart.splice(idx,1); renderCart(); }
      if(rem){ cart.splice(rem.dataset.remove,1); renderCart(); }
    });
  }

  window.addToCart = addToCart;
  window.selectedSizes = selectedSizes;
  window.setSelectedSize = function(pid, size){ selectedSizes[pid] = size; };
  window.renderCart = renderCart;

  /* ============ CHECKOUT MODAL ============ */
  const modalOverlay = document.getElementById("modalOverlay");
  function openModal(){
    const orderId = "ORD-" + Math.floor(10000 + Math.random()*89999);
    const msgEl = document.getElementById("modalMsg");
    if(msgEl) msgEl.textContent = "Order " + orderId + " placed — we'll text you a tracking ID once it's packed.";
    if(modalOverlay) modalOverlay.classList.add("show");
  }
  function closeModal(){ if(modalOverlay) modalOverlay.classList.remove("show"); }
  if(checkoutBtn){
    checkoutBtn.addEventListener("click", function(){
      if(cart.length === 0) return;
      closeDrawer(); openModal(); cart = []; renderCart();
    });
  }
  const modalCloseBtn = document.getElementById("modalClose");
  if(modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  /* ============ TRACK ORDER MODAL ============ */
  const trackOverlay = document.getElementById("trackOverlay");
  function openTrack(){ if(trackOverlay) trackOverlay.classList.add("show"); }
  function closeTrack(){ if(trackOverlay) trackOverlay.classList.remove("show"); }
  document.querySelectorAll("[data-open-track]").forEach(function(a){
    a.addEventListener("click", function(e){ e.preventDefault(); openTrack(); });
  });
  const trackCloseBtn = document.getElementById("trackClose");
  if(trackCloseBtn) trackCloseBtn.addEventListener("click", closeTrack);
  const trackForm = document.getElementById("trackForm");
  if(trackForm){
    trackForm.addEventListener("submit", function(e){
      e.preventDefault();
      const val = document.getElementById("trackInput").value.trim();
      if(!val) return;
      let hash = 0;
      for(let i=0;i<val.length;i++){ hash = (hash * 31 + val.charCodeAt(i)) >>> 0; }
      const stageIdx = hash % 5;
      const steps = [
        { title:"Order confirmed", note:"Payment verified" },
        { title:"Packed", note:"Quality-checked and sealed" },
        { title:"Dispatched", note:"Handed to courier" },
        { title:"Out for delivery", note:"With your local rider" },
        { title:"Delivered", note:"Signed for at drop-off" }
      ];
      const timeline = document.getElementById("timeline");
      timeline.innerHTML = steps.map(function(s,i){
        const done = i <= stageIdx ? " done" : "";
        return '<div class="tl-step'+done+'"><div class="tl-dot"></div><div><h5>'+s.title+'</h5><p>'+s.note+'</p></div></div>';
      }).join("");
      timeline.classList.add("show");
    });
  }

  /* ============ NEWSLETTER ============ */
  const newsForm = document.getElementById("newsForm");
  if(newsForm){
    newsForm.addEventListener("submit", function(e){
      e.preventDefault();
      const email = document.getElementById("newsEmail").value.trim();
      const msg = document.getElementById("newsMsg");
      if(!email) return;
      msg.textContent = "You're on the list, " + email + ".";
      document.getElementById("newsEmail").value = "";
    });
  }

  /* ============ CONTACT INFO ============ */
  document.querySelectorAll("[data-phone]").forEach(function(a){ a.href = "tel:+923391078910"; });
  document.querySelectorAll("[data-instagram]").forEach(function(a){ a.href = "https://instagram.com"; });
  document.querySelectorAll("[data-tiktok]").forEach(function(a){ a.href = "https://tiktok.com"; });
  document.querySelectorAll("[data-whatsapp]").forEach(function(a){ a.href = "https://wa.me/923391078910"; });

  /* ============ TOAST ============ */
  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById("toast");
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove("show"); }, 2400);
  }
  window.showToast = showToast;

  renderCart();

  /* ============ COLLECTION / CLOTHING PAGE GRID ============
     Reusable renderer with sort + pagination, used by clothing.html,
     new-in.html, gentle-edge.html, and minor-fault.html. */
  window.initCollectionPage = function(opts){
    const gridEl = opts.gridEl;
    const countEl = opts.countEl;
    const sortEl = opts.sortEl;
    const filtersEl = opts.filtersEl || null;
    const paginationEl = document.getElementById(opts.paginationId);
    const pageSize = opts.pageSize || 9;
    const allowCatFilter = !!opts.allowCatFilter;

    const params = new URLSearchParams(window.location.search);
    let activeCat = allowCatFilter ? (params.get("cat") || "All") : "All";
    let searchQuery = (params.get("q") || "").trim().toLowerCase();
    let sortMode = sortEl ? sortEl.value : "featured";
    let page = 1;

    if(filtersEl){
      filtersEl.querySelectorAll(".pill").forEach(function(p){
        p.classList.toggle("active", p.dataset.cat === activeCat);
      });
      filtersEl.addEventListener("click", function(e){
        const pill = e.target.closest(".pill");
        if(!pill) return;
        activeCat = pill.dataset.cat;
        filtersEl.querySelectorAll(".pill").forEach(function(p){ p.classList.toggle("active", p === pill); });
        page = 1;
        render();
      });
    }

    if(sortEl){
      sortEl.addEventListener("change", function(){ sortMode = sortEl.value; page = 1; render(); });
    }

    function getFiltered(){
      let list = opts.products.filter(function(p){
        const matchesCat = activeCat === "All" || p.cat === activeCat;
        const matchesSearch = !searchQuery || p.name.toLowerCase().indexOf(searchQuery) > -1;
        return matchesCat && matchesSearch;
      });
      if(sortMode === "price-asc") list = list.slice().sort(function(a,b){ return (a.faultPrice||a.price) - (b.faultPrice||b.price); });
      else if(sortMode === "price-desc") list = list.slice().sort(function(a,b){ return (b.faultPrice||b.price) - (a.faultPrice||a.price); });
      else if(sortMode === "new") list = list.slice().sort(function(a,b){ return new Date(b.dateAdded) - new Date(a.dateAdded); });
      return list;
    }

    function renderPagination(total){
      if(!paginationEl) return;
      const pages = Math.max(1, Math.ceil(total / pageSize));
      if(pages <= 1){ paginationEl.innerHTML = ""; return; }
      let html = '<button class="page-btn" data-page="prev" '+(page<=1?'disabled':'')+'>‹</button>';
      for(let i=1;i<=pages;i++){
        html += '<button class="page-btn'+(i===page?' active':'')+'" data-page="'+i+'">'+i+'</button>';
      }
      html += '<button class="page-btn" data-page="next" '+(page>=pages?'disabled':'')+'>›</button>';
      paginationEl.innerHTML = html;
    }

    function render(){
      const filtered = getFiltered();
      if(countEl) countEl.textContent = filtered.length + (filtered.length === 1 ? " product" : " products");
      const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if(page > pages) page = pages;
      const start = (page - 1) * pageSize;
      const pageItems = filtered.slice(start, start + pageSize);

      if(filtered.length === 0){
        gridEl.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">No pieces match that search or filter.</div>';
        renderPagination(0);
        return;
      }

      gridEl.innerHTML = pageItems.map(function(p){
        const sizeChips = p.sizes.map(function(s){
          const active = window.selectedSizes[p.id] === s ? " active" : "";
          return '<button class="size-chip'+active+'" data-pid="'+p.id+'" data-size="'+s+'">'+s+'</button>';
        }).join("");
        const badge = p.newIn ? '<div class="tag badge badge-new">New</div>' :
                      p.minorFault ? '<div class="tag badge badge-fault">Seconds</div>' : "";
        const faultNote = p.minorFault ? '<span class="fault-note">'+p.faultNote+'</span>' : "";
        return (
          '<div class="card">' +
            badge + photoHTML(p) +
            '<div class="card-body">' +
              '<span class="cat">'+p.cat+'</span>' +
              '<h4>'+p.name+'</h4>' +
              faultNote +
              '<div class="sizes">'+sizeChips+'</div>' +
              '<div class="price-row">' +
                '<span class="price">'+priceHTML(p)+'</span>' +
                '<button class="btn btn-sm btn-primary" data-add="'+p.id+'">Add</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join("");
      renderPagination(filtered.length);
    }

    gridEl.addEventListener("click", function(e){
      const sizeBtn = e.target.closest(".size-chip");
      if(sizeBtn){ window.selectedSizes[sizeBtn.dataset.pid] = sizeBtn.dataset.size; render(); return; }
      const addBtn = e.target.closest("[data-add]");
      if(addBtn){ window.addToCart(addBtn.dataset.add); }
    });

    if(paginationEl){
      paginationEl.addEventListener("click", function(e){
        const btn = e.target.closest("[data-page]");
        if(!btn) return;
        const val = btn.dataset.page;
        if(val === "prev") page = Math.max(1, page - 1);
        else if(val === "next") page = page + 1;
        else page = parseInt(val, 10);
        render();
        gridEl.scrollIntoView({ behavior:"smooth", block:"start" });
      });
    }

    render();
  };

})();
