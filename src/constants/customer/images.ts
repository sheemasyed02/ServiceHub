/**
 * Stable mock image URLs for development (no backend).
 */
export const MOCK_IMAGES = {
  userAvatar: 'https://i.pravatar.cc/300?img=32',
  offerBanner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  mapPreview: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
  providers: {
    p1: {
      avatar: 'https://i.pravatar.cc/300?img=12',
      cover: 'https://images.unsplash.com/photo-1607472586893-eb033778c1a8?w=600&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1585704032915-c3400ca9e816?w=400&q=80',
        'https://images.unsplash.com/photo-1504149904226-f635b4002f87?w=400&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
      ],
    },
    p2: {
      avatar: 'https://i.pravatar.cc/300?img=15',
      cover: 'https://images.unsplash.com/photo-1621905251189-08d45b6a2690?w=600&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac71?w=400&q=80',
      ],
    },
    p3: {
      avatar: 'https://i.pravatar.cc/300?img=47',
      cover: 'https://images.unsplash.com/photo-1585421514284-efb74c2a69b?w=600&q=80',
      portfolio: ['https://images.unsplash.com/photo-1527515637462-cff94ee67983?w=400&q=80'],
    },
    p4: {
      avatar: 'https://i.pravatar.cc/300?img=33',
      cover: 'https://images.unsplash.com/photo-1631545806609-59e165a62526?w=600&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1631545965197-73b786209221?w=400&q=80',
        'https://images.unsplash.com/photo-1621905251189-08d45b6a2690?w=400&q=80',
        'https://images.unsplash.com/photo-1581094794359-0cdb391a0311?w=400&q=80',
      ],
    },
  },
  reviews: {
    cr1: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca9e816?w=300&q=80',
      'https://images.unsplash.com/photo-1504149904226-f635b4002f87?w=300&q=80',
    ],
    cr3: ['https://images.unsplash.com/photo-1527515637462-cff94ee67983?w=300&q=80'],
  },
  reviewers: {
    cr1: 'https://i.pravatar.cc/150?img=45',
    cr2: 'https://i.pravatar.cc/150?img=21',
    cr3: 'https://i.pravatar.cc/150?img=26',
    cr4: 'https://i.pravatar.cc/150?img=18',
  },
} as const;

export type ProviderImages = {
  avatar: string;
  cover: string;
  portfolio: readonly string[];
};

export function getProviderImages(providerId: string): ProviderImages | null {
  return (MOCK_IMAGES.providers as Record<string, ProviderImages>)[providerId] ?? null;
}
