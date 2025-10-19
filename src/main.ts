import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "./style.css";

interface MapData {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  thumbnailWebp: string;
  imageWebp: string;
  category: "national" | "city" | "details";
  operator?: string;
}

// Helper function to generate image paths
function getImagePaths(filename: string) {
  return {
    image: `./route-details/${filename}.png`,
    thumbnail: `/optimized/thumbs/${filename}.png`,
    thumbnailWebp: `/optimized/thumbs-webp/${filename}.webp`,
    imageWebp: `/optimized/webp/${filename}.webp`,
  };
}

const maps: MapData[] = [
  {
    id: "fta-national-am",
    title: "FTA National Route Map (Amharic)",
    description: "Federal Transport Authority National Intercity Bus Network",
    ...getImagePaths("fta-national-route-map-am"),
    category: "national",
    operator: "FTA",
  },
  {
    id: "fta-national-en",
    title: "FTA National Route Map (English)",
    description: "Federal Transport Authority National Intercity Bus Network",
    ...getImagePaths("fta-national-route-map-en"),
    category: "national",
    operator: "FTA",
  },
  {
    id: "fta-national-original",
    title: "FTA National Route Map",
    description: "Original Federal Transport Authority National Network Map",
    ...getImagePaths("FTA-National-Route-Map"),
    category: "national",
    operator: "FTA",
  },
  {
    id: "anbessa",
    title: "Anbessa Route Network (Amharic)",
    description: "Anbessa City Bus Service Routes",
    ...getImagePaths("anbessa-route-network-map-am"),
    category: "city",
    operator: "Anbessa",
  },
  {
    id: "sheger",
    title: "Sheger Route Network (Amharic)",
    description: "Sheger City Bus Service Routes",
    ...getImagePaths("sheger-route-network-map-am"),
    category: "city",
    operator: "Sheger",
  },
  {
    id: "taxi",
    title: "Taxi Route Network (Amharic)",
    description: "Public Taxi Service Routes",
    ...getImagePaths("taxi-route-network-map-am"),
    category: "city",
    operator: "Taxi",
  },
  {
    id: "details-1",
    title: "Route Details - Page 1",
    description: "Detailed route information and schedules",
    ...getImagePaths("route-details-page-1"),
    category: "details",
  },
  {
    id: "details-2",
    title: "Route Details - Page 2",
    description: "Additional route information and schedules",
    ...getImagePaths("route-details-page-2"),
    category: "details",
  },
];

class TransitMapViewer {
  private lightbox: PhotoSwipeLightbox | null = null;
  private currentFilter: string = "all";
  private isDarkMode: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    this.checkDarkModePreference();
    this.render();
    this.initLightbox();
    this.attachEventListeners();
  }

  private checkDarkModePreference(): void {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    this.isDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }

  private toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");

    // Update icon
    const icon = document.querySelector(".theme-toggle-icon");
    if (icon) {
      icon.textContent = this.isDarkMode ? "☀️" : "🌙";
    }
  }

  private render(): void {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `
      <div class="app-container">
        <!-- Header -->
        <header class="header">
          <div class="header-content">
            <div class="header-top">
              <h1 class="title">
                <span class="title-icon">🇪🇹</span>
                Ethiopian Public Transit Network
              </h1>
              <button class="theme-toggle" aria-label="Toggle dark mode">
                <span class="theme-toggle-icon">${
                  this.isDarkMode ? "☀️" : "🌙"
                }</span>
              </button>
            </div>
            <p class="subtitle">
              Explore the National Intercity Public Bus Network and City Transit Routes
            </p>
          </div>
        </header>

        <!-- Filter Tabs -->
        <div class="filters">
          <button class="filter-btn active" data-filter="all">
            <span class="filter-icon">🗺️</span>
            All Maps
          </button>
          <button class="filter-btn" data-filter="national">
            <span class="filter-icon">🌍</span>
            National Routes
          </button>
          <button class="filter-btn" data-filter="city">
            <span class="filter-icon">🏙️</span>
            City Routes
          </button>
          <button class="filter-btn" data-filter="details">
            <span class="filter-icon">📋</span>
            Details
          </button>
        </div>

        <!-- Maps Grid -->
        <div class="maps-grid" id="gallery">
          ${this.renderMaps()}
        </div>

        <!-- Stats -->
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${
              maps.filter((m) => m.category === "national").length
            }</div>
            <div class="stat-label">National Maps</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${
              maps.filter((m) => m.category === "city").length
            }</div>
            <div class="stat-label">City Routes</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${
              maps.filter((m) => m.category === "details").length
            }</div>
            <div class="stat-label">Detail Pages</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${maps.length}</div>
            <div class="stat-label">Total Maps</div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
          <div class="footer-content">
            <div class="footer-section">
              <p class="footer-title">© 2019-${new Date().getFullYear()} Ethiopian Public Transit Network</p>
              <p class="footer-subtitle">Interactive map viewer built with modern web technologies</p>
            </div>
            
            <div class="footer-section footer-links">
              <a href="https://github.com/rabira-hierpa/et-transit-map" target="_blank" rel="noopener noreferrer" class="footer-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <div class="github-badge">
                <img src="https://img.shields.io/github/stars/rabira-hierpa/et-transit-map?style=social" alt="GitHub Stars">
              </div>
            </div>
            
            <div class="footer-section footer-credits">
              <p class="footer-made-by">
                Made with <span class="heart">❤️</span> by 
                <a href="https://rz-codes.com" target="_blank" rel="noopener noreferrer" class="author-link">Rabra Hierpa</a>
              </p>
              <p class="footer-amharic">ለኢትዪጲያ በፍቅር የተሰራ 🇪🇹</p>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  private renderMaps(): string {
    const filteredMaps =
      this.currentFilter === "all"
        ? maps
        : maps.filter((m) => m.category === this.currentFilter);

    return filteredMaps
      .map(
        (map, index) => `
      <div class="map-card" data-category="${
        map.category
      }" data-index="${index}">
        <a href="${map.image}" 
           data-pswp-width="2000" 
           data-pswp-height="2000"
           data-pswp-src-webp="${map.imageWebp}"
           class="map-link"
           target="_blank">
          <div class="map-image-container">
            <div class="image-placeholder"></div>
            <picture>
              <source 
                srcset="${map.thumbnailWebp}" 
                type="image/webp"
                data-src="${map.thumbnailWebp}">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3C/svg%3E"
                data-src="${map.thumbnail}"
                alt="${map.title}" 
                class="map-image lazy-image" 
                loading="lazy" />
            </picture>
            <div class="map-overlay">
              <span class="view-icon">🔍</span>
              <span class="view-text">Click to view full size</span>
            </div>
          </div>
          <div class="map-info">
            ${
              map.operator
                ? `<span class="map-badge badge-${map.operator.toLowerCase()}">${
                    map.operator
                  }</span>`
                : ""
            }
            <h3 class="map-title">${map.title}</h3>
            <p class="map-description">${map.description}</p>
          </div>
        </a>
      </div>
    `
      )
      .join("");
  }

  private initLightbox(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      bgOpacity: 0.95,
      spacing: 0.1,
      allowPanToNext: true,
      zoom: true,
      pinchToClose: true,
      closeOnVerticalDrag: true,
    });

    // Add custom button for viewing full resolution
    this.lightbox.on("uiRegister", () => {
      this.lightbox?.pswp?.ui?.registerElement({
        name: "full-resolution-button",
        order: 9,
        isButton: true,
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zm-1-9h-3V7h-2v3H8v2h3v3h2v-3h3z" fill="currentColor"/><title>View Full Resolution</title>',
          outlineID: "pswp__icn-full-res",
        },
        onClick: (_event: MouseEvent, _el: HTMLElement, pswp: any) => {
          const currentSlide = pswp.currSlide;
          const link = currentSlide?.data?.element;

          if (link) {
            const fullResUrl = link.getAttribute("href");
            if (fullResUrl) {
              // Open in new tab
              window.open(fullResUrl, "_blank");
            }
          }
        },
      });

      // Add download button
      this.lightbox?.pswp?.ui?.registerElement({
        name: "download-button",
        order: 8,
        isButton: true,
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/><title>Download Image</title>',
          outlineID: "pswp__icn-download",
        },
        onClick: (_event: MouseEvent, _el: HTMLElement, pswp: any) => {
          const currentSlide = pswp.currSlide;
          const link = currentSlide?.data?.element;

          if (link) {
            const fullResUrl = link.getAttribute("href");
            const imageName = fullResUrl?.split("/").pop() || "map.png";

            if (fullResUrl) {
              // Create temporary link to trigger download
              const downloadLink = document.createElement("a");
              downloadLink.href = fullResUrl;
              downloadLink.download = imageName;
              downloadLink.click();
            }
          }
        },
      });
    });

    this.lightbox.init();
  }

  private attachEventListeners(): void {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const filter = target.dataset.filter || "all";
        this.applyFilter(filter);
      });
    });

    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    themeToggle?.addEventListener("click", () => this.toggleDarkMode());

    // Add scroll animations
    this.observeCards();
  }

  private applyFilter(filter: string): void {
    this.currentFilter = filter;

    // Update active button
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`[data-filter="${filter}"]`)
      ?.classList.add("active");

    // Fade out cards
    const cards = document.querySelectorAll(".map-card");
    cards.forEach((card) => {
      card.classList.add("fade-out");
    });

    // Wait for fade out, then update
    setTimeout(() => {
      const gallery = document.getElementById("gallery");
      if (gallery) {
        gallery.innerHTML = this.renderMaps();

        // Re-init lightbox
        if (this.lightbox) {
          this.lightbox.destroy();
          this.initLightbox();
        }

        // Observe new cards
        this.observeCards();
      }
    }, 300);
  }

  private observeCards(): void {
    // Observer for card animations
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observer for lazy loading images
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const picture = img.closest("picture");

            // Load WebP source if available
            if (picture) {
              const source = picture.querySelector("source");
              if (source && source.dataset.src) {
                source.srcset = source.dataset.src;
              }
            }

            // Load main image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add("loaded");

              // Remove placeholder after image loads
              img.addEventListener("load", () => {
                const placeholder = img
                  .closest(".map-image-container")
                  ?.querySelector(".image-placeholder");
                if (placeholder) {
                  placeholder.classList.add("hidden");
                }
              });
            }

            imageObserver.unobserve(img);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "200px", // Start loading 200px before entering viewport
      }
    );

    // Observe all cards and images
    document.querySelectorAll(".map-card").forEach((card) => {
      cardObserver.observe(card);
    });

    document.querySelectorAll(".lazy-image").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Initialize app
new TransitMapViewer();
