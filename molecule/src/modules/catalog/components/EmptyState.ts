export function EmptyState(): string {
  return `
    <div class="text-center py-12 col-span-full">
      <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">No products found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
    </div>
  `;
}
