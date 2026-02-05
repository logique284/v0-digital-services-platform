'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Smartphone, Gamepad2, Film, Briefcase, Search, ArrowRight, Star, Zap, Lock, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroPromo } from '@/components/hero-promo';

const categories = [
  {
    id: 'vault',
    name: 'The Vault',
    description: 'Stream your favorite content worldwide',
    longDescription: 'International streaming subscriptions at the best prices',
    items: ['Netflix', 'Disney+', 'Spotify', 'Apple TV+'],
    icon: Film,
    gradient: 'bg-gradient-to-br from-[#0066CC] to-[#4A90E2]',
  },
  {
    id: 'telecom',
    name: 'Telecom Hub',
    description: 'Stay connected with Tunisian carriers',
    longDescription: 'Internet bundles and mobile top-ups for all carriers',
    items: ['Ooredoo', 'Orange', 'TT', 'Internet Plans'],
    icon: Smartphone,
    gradient: 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60]',
  },
  {
    id: 'gaming',
    name: 'Gaming Corner',
    description: 'Power up your gaming experience',
    longDescription: 'Gaming credits and subscriptions for all platforms',
    items: ['Free Fire', 'PUBG', 'Steam', 'PlayStation'],
    icon: Gamepad2,
    gradient: 'bg-gradient-to-br from-[#FF6B35] to-[#FF4500]',
  },
  {
    id: 'business',
    name: 'Business Suite',
    description: 'Tools for productivity and growth',
    longDescription: 'Professional tools and services for your business',
    items: ['Canva Pro', 'ChatGPT Plus', 'Hosting', 'Domains'],
    icon: Briefcase,
    gradient: 'bg-gradient-to-br from-[#5B4A9F] to-[#0066CC]',
  },
];

// Mock services data - replace with API calls
const allServices = [
  { id: 1, name: 'Netflix Premium', slug: 'netflix-premium', category: 'vault', price: 15.99, rating: 4.8, reviews: 324, tags: ['Popular', 'Promo'], description: '4K streaming, multiple screens' },
  { id: 2, name: 'Spotify Premium', slug: 'spotify-premium', category: 'vault', price: 12.99, rating: 4.9, reviews: 512, tags: ['Popular'], description: 'Unlimited music, ad-free' },
  { id: 3, name: 'Disney+', slug: 'disney-plus', category: 'vault', price: 10.99, rating: 4.7, reviews: 203, tags: ['New'], description: 'Disney, Pixar, Marvel content' },
  { id: 4, name: 'Ooredoo 10GB', slug: 'ooredoo-10gb', category: 'telecom', price: 19.99, rating: 4.5, reviews: 156, tags: ['Popular'], description: '10GB + unlimited calls' },
  { id: 5, name: 'Orange 10GB', slug: 'orange-10gb', category: 'telecom', price: 19.99, rating: 4.4, reviews: 142, tags: [], description: '10GB + SMS unlimited' },
  { id: 6, name: 'Free Fire 520 Diamonds', slug: 'free-fire-diamonds', category: 'gaming', price: 9.99, rating: 4.8, reviews: 789, tags: ['Popular', 'Promo'], description: 'Instant game currency' },
  { id: 7, name: 'PUBG 1200 UC', slug: 'pubg-uc', category: 'gaming', price: 29.99, rating: 4.7, reviews: 456, tags: ['Popular'], description: 'PlayerUnknown Battlegrounds' },
  { id: 8, name: 'Canva Pro', slug: 'canva-pro', category: 'business', price: 14.99, rating: 4.9, reviews: 678, tags: ['New'], description: 'Design tool subscription' },
  { id: 9, name: 'ChatGPT Plus', slug: 'chatgpt-plus', category: 'business', price: 19.99, rating: 4.8, reviews: 1203, tags: ['Popular'], description: 'AI assistant premium' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Intelligent search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allServices.filter((service) =>
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full bg-background">
      {/* Promotional Hero Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroPromo />
        </div>
      </section>

      {/* Hero Section with Intelligent Search */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Your All-in-One Digital Services Marketplace
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Access streaming subscriptions, telecom services, gaming credits, and business tools—all in one place. 
              Secure payments with multiple trusted options.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by service name, category, or keywords..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-border">
                    {searchResults.slice(0, 5).map((service) => (
                      <Link key={service.id} href={`/product/${service.slug}`}>
                        <div className="p-3 hover:bg-muted transition-colors cursor-pointer flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.description}</p>
                          </div>
                          <p className="font-bold text-primary flex-shrink-0">{service.price} TND</p>
                        </div>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <Link href={`/products?search=${encodeURIComponent(searchQuery)}`}>
                        <div className="p-3 text-center text-primary hover:bg-muted transition-colors text-sm font-medium cursor-pointer">
                          View all {searchResults.length} results
                        </div>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No services found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/products?category=vault">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View Categories
                <Gamepad2 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 sm:py-24 lg:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Popular Services Right Now
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the services customers love most
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.slice(0, 6).map((service) => (
              <Link key={service.id} href={`/product/${service.slug}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    {service.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap justify-end">
                        {service.tags.map((tag) => (
                          <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{service.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-2xl font-bold text-primary">{service.price} TND</p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Browse Categories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our curated collection of digital services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/products?category=${category.id}`}>
                  <div className="group h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col">
                    <div className={`${category.gradient} h-40 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                      <Icon className="w-20 h-20 text-white relative z-10" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="inline-block bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Orders Completed</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm sm:text-base text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose AtlasVault?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience seamless digital services shopping with proven benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lock,
                title: 'Secure Payments',
                description: 'D17, Flouci, Card - all encrypted',
              },
              {
                icon: Zap,
                title: 'Instant Delivery',
                description: 'Active instantly after purchase',
              },
              {
                icon: Rocket,
                title: 'Best Prices',
                description: 'Regular promos and discounts',
              },
              {
                icon: Star,
                title: '24/7 Support',
                description: 'WhatsApp support anytime',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                  <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of satisfied customers. Start shopping today.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Browse Services Now
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
