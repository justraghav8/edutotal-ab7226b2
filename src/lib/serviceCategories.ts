export function servicesInCategory<T extends { category_id?: string | null; published?: boolean }>(services: T[], categoryId: string, publishedOnly = false): T[] {
  return services.filter((service) => service.category_id === categoryId && (!publishedOnly || service.published === true));
}

export function categoryAnchor(key: string): string {
  return `cat-${encodeURIComponent(key)}`;
}