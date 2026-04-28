import { CONFIG } from "../../../utils/constants";
import { Product } from "../types/product.interface";

export function ProductCard(product: Product, index: number): string {
  const delay = `${index * CONFIG.ANIMATION_DELAY_STEP}s`;

  return `
    <div class="scroll-animate animate-fade-up" style="transition-delay: ${delay}">
      <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
        <div class="w-full h-48 overflow-hidden bg-gray-100 shrink-0">
          <img 
            src="${product.imageUrl}" 
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div class="p-4 flex flex-col grow">
          <h3 class="text-lg font-semibold text-dark mb-2">${escapeHtml(product.name)}</h3>
          <p class="text-sm text-dark/70 mb-3 line-clamp-2">${escapeHtml(product.description)}</p>
          <div class="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
            <div class="flex items-center gap-1">
              <span class="text-yellow text-sm">★</span>
              <span class="text-sm font-medium text-dark/80">${product.rating}</span>
            </div>
            <span class="text-purple font-bold text-base">$${product.price.toFixed(2)}</span>
          </div>
          <div class="mt-2">
            <span class="text-xs px-2 py-1 rounded-full ${
              product.category === "premium"
                ? "bg-purple/20 text-purple"
                : "bg-green/20 text-green"
            }">
              ${product.category === "premium" ? "Premium" : "Standard"}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
