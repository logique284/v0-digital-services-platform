'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, ShoppingCart, TrendingUp, Plus, Trash2, Edit2, Search, Tag, Zap } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  sales: number
}

interface Category {
  id: string
  name: string
  description: string
  color: string
}

interface Promo {
  id: string
  title: string
  discount: number
  endDate: string
  active: boolean
}

const mockProducts: Product[] = [
  { id: '1', name: 'Netflix Premium', price: 15.99, category: 'vault', stock: 1000, sales: 450 },
  { id: '2', name: 'Spotify Premium', price: 12.99, category: 'vault', stock: 800, sales: 320 },
  { id: '3', name: 'Ooredoo 10GB', price: 19.99, category: 'telecom', stock: 500, sales: 280 },
  { id: '4', name: 'Free Fire 520', price: 9.99, category: 'gaming', stock: 2000, sales: 890 },
  { id: '5', name: 'Canva Pro', price: 14.99, category: 'business', stock: 300, sales: 150 },
]

const mockCategories: Category[] = [
  { id: 'vault', name: 'The Vault', description: 'Streaming subscriptions', color: 'from-[#0066CC] to-[#4A90E2]' },
  { id: 'telecom', name: 'Telecom Hub', description: 'Internet & top-ups', color: 'from-[#2ECC71] to-[#27AE60]' },
  { id: 'gaming', name: 'Gaming Corner', description: 'Gaming credits', color: 'from-[#FF6B35] to-[#FF4500]' },
  { id: 'business', name: 'Business Suite', description: 'Business tools', color: 'from-[#5B4A9F] to-[#0066CC]' },
]

const mockPromos: Promo[] = [
  { id: '1', title: 'Netflix 50% Off', discount: 50, endDate: '2024-02-28', active: true },
  { id: '2', title: 'Gaming 30% Off', discount: 30, endDate: '2024-02-15', active: true },
  { id: '3', title: 'Spring Sale 20%', discount: 20, endDate: '2024-03-15', active: false },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'promos' | 'orders'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [promos, setPromos] = useState<Promo[]>(mockPromos)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0)
  const totalProducts = products.length
  const totalCategories = categories.length
  const totalPromos = promos.filter(p => p.active).length

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const deletePromo = (id: string) => {
    setPromos(promos.filter(p => p.id !== id))
  }

  const togglePromo = (id: string) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage products, categories, and promotions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'Products' },
            { id: 'categories', label: 'Categories' },
            { id: 'promos', label: 'Promotions' },
            { id: 'orders', label: 'Orders' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-primary text-white' : 'bg-card text-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">From all sales</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">Active products</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalCategories}</div>
                <p className="text-xs text-muted-foreground mt-1">Product categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Promos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalPromos}</div>
                <p className="text-xs text-muted-foreground mt-1">Running promotions</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Product name" className="px-3 py-2 border border-border rounded-lg" />
                      <input type="number" placeholder="Price" className="px-3 py-2 border border-border rounded-lg" />
                      <select className="px-3 py-2 border border-border rounded-lg">
                        <option>Select category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                      <input type="number" placeholder="Stock" className="px-3 py-2 border border-border rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">Save</Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category} • Stock: {product.stock} • Sales: {product.sales}</p>
                        <p className="text-lg font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline"><Edit2 className="w-4 h-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categories Management */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <Button size="sm" variant="ghost" onClick={() => deleteCategory(category.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <div className={`h-16 rounded-lg bg-gradient-to-r ${category.color} mt-4 opacity-70`} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Promotions Management */}
        {activeTab === 'promos' && (
          <div className="space-y-6">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Promotion
            </Button>

            <div className="grid gap-4">
              {promos.map(promo => (
                <Card key={promo.id} className={`${promo.active ? '' : 'opacity-50'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          <h3 className="font-bold text-foreground">{promo.title}</h3>
                          {promo.active && <span className="text-xs bg-green-500/20 text-green-700 px-2 py-1 rounded">Active</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">Discount: {promo.discount}% • Ends: {promo.endDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={promo.active ? 'default' : 'outline'}
                          onClick={() => togglePromo(promo.id)}
                        >
                          {promo.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deletePromo(promo.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Order management coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
