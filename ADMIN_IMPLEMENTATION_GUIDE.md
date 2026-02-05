# Complete Admin Panel CRUD Implementation Guide

## **Step 1: Create Admin Context for State Management**

File: `/lib/admin-context.tsx`

```typescript
'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Types
export interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  sales: number
  description: string
  active: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  productCount: number
  active: boolean
}

export interface Promo {
  id: string
  title: string
  discount: number
  type: 'percentage' | 'fixed'
  endDate: string
  applicableTo: 'all' | 'product' | 'category'
  targetId?: string
  active: boolean
  startDate: string
}

export interface SpecialOffer {
  id: string
  name: string
  description: string
  condition: string
  priority: 'high' | 'medium' | 'low'
  expiresAt: string
  isLimited: boolean
  limitedQuantity?: number
  active: boolean
}

// Context Type
interface AdminContextType {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  deleteMultipleProducts: (ids: string[]) => void
  
  // Categories
  categories: Category[]
  addCategory: (category: Omit<Category, 'id'>) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
  
  // Promos
  promos: Promo[]
  addPromo: (promo: Omit<Promo, 'id'>) => void
  updatePromo: (id: string, updates: Partial<Promo>) => void
  deletePromo: (id: string) => void
  
  // Offers
  offers: SpecialOffer[]
  addOffer: (offer: Omit<SpecialOffer, 'id'>) => void
  updateOffer: (id: string, updates: Partial<SpecialOffer>) => void
  deleteOffer: (id: string) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

// Mock Initial Data
const initialProducts: Product[] = [
  { id: '1', name: 'Netflix Premium', price: 15.99, category: 'vault', stock: 1000, sales: 450, description: '4K Ultra HD', active: true },
  { id: '2', name: 'Spotify Premium', price: 12.99, category: 'vault', stock: 800, sales: 320, description: 'Ad-free music', active: true },
  { id: '3', name: 'Ooredoo 10GB', price: 19.99, category: 'telecom', stock: 500, sales: 280, description: 'Internet bundle', active: true },
  { id: '4', name: 'Free Fire 520', price: 9.99, category: 'gaming', stock: 2000, sales: 890, description: 'Gaming credits', active: true },
]

const initialCategories: Category[] = [
  { id: 'vault', name: 'The Vault', description: 'Streaming', color: 'from-[#0066CC] to-[#4A90E2]', icon: '🎬', productCount: 6, active: true },
  { id: 'telecom', name: 'Telecom Hub', description: 'Internet & Top-ups', color: 'from-[#2ECC71] to-[#27AE60]', icon: '📱', productCount: 6, active: true },
  { id: 'gaming', name: 'Gaming Corner', description: 'Gaming Credits', color: 'from-[#FF6B35] to-[#FF4500]', icon: '🎮', productCount: 6, active: true },
  { id: 'business', name: 'Business Suite', description: 'Business Tools', color: 'from-[#5B4A9F] to-[#0066CC]', icon: '💼', productCount: 6, active: true },
]

const initialPromos: Promo[] = [
  { id: '1', title: 'Netflix 50% Off', discount: 50, type: 'percentage', endDate: '2024-02-28', applicableTo: 'product', targetId: '1', active: true, startDate: '2024-02-01' },
  { id: '2', title: 'Gaming 30% Off', discount: 30, type: 'percentage', endDate: '2024-02-15', applicableTo: 'category', targetId: 'gaming', active: true, startDate: '2024-02-01' },
]

const initialOffers: SpecialOffer[] = [
  { id: '1', name: 'Bundle Deal', description: 'Buy 2 Get 1 Free', condition: 'Minimum 2 products', priority: 'high', expiresAt: '2024-02-28', isLimited: true, limitedQuantity: 100, active: true },
  { id: '2', name: 'First Purchase', description: '20% off for new users', condition: 'New customers only', priority: 'medium', expiresAt: '2024-03-15', isLimited: false, active: true },
]

// Provider Component
export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [promos, setPromos] = useState<Promo[]>(initialPromos)
  const [offers, setOffers] = useState<SpecialOffer[]>(initialOffers)

  // ===== PRODUCT OPERATIONS =====
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setProducts(prev => [...prev, newProduct])
    console.log('[v0] Product added:', newProduct)
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    )
    console.log('[v0] Product updated:', id, updates)
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    console.log('[v0] Product deleted:', id)
  }, [])

  const deleteMultipleProducts = useCallback((ids: string[]) => {
    setProducts(prev => prev.filter(p => !ids.includes(p.id)))
    console.log('[v0] Products deleted:', ids)
  }, [])

  // ===== CATEGORY OPERATIONS =====
  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setCategories(prev => [...prev, newCategory])
    console.log('[v0] Category added:', newCategory)
  }, [])

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, ...updates } : c)
    )
    console.log('[v0] Category updated:', id, updates)
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    console.log('[v0] Category deleted:', id)
  }, [])

  // ===== PROMO OPERATIONS =====
  const addPromo = useCallback((promo: Omit<Promo, 'id'>) => {
    const newPromo: Promo = {
      ...promo,
      id: `promo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setPromos(prev => [...prev, newPromo])
    console.log('[v0] Promo added:', newPromo)
  }, [])

  const updatePromo = useCallback((id: string, updates: Partial<Promo>) => {
    setPromos(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    )
    console.log('[v0] Promo updated:', id, updates)
  }, [])

  const deletePromo = useCallback((id: string) => {
    setPromos(prev => prev.filter(p => p.id !== id))
    console.log('[v0] Promo deleted:', id)
  }, [])

  // ===== OFFER OPERATIONS =====
  const addOffer = useCallback((offer: Omit<SpecialOffer, 'id'>) => {
    const newOffer: SpecialOffer = {
      ...offer,
      id: `offer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setOffers(prev => [...prev, newOffer])
    console.log('[v0] Offer added:', newOffer)
  }, [])

  const updateOffer = useCallback((id: string, updates: Partial<SpecialOffer>) => {
    setOffers(prev =>
      prev.map(o => o.id === id ? { ...o, ...updates } : o)
    )
    console.log('[v0] Offer updated:', id, updates)
  }, [])

  const deleteOffer = useCallback((id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id))
    console.log('[v0] Offer deleted:', id)
  }, [])

  return (
    <AdminContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, deleteMultipleProducts,
      categories, addCategory, updateCategory, deleteCategory,
      promos, addPromo, updatePromo, deletePromo,
      offers, addOffer, updateOffer, deleteOffer
    }}>
      {children}
    </AdminContext.Provider>
  )
}

// Custom Hook
export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used inside AdminProvider')
  }
  return context
}
```

---

## **Step 2: Create Modal Form Components**

File: `/components/admin-modals.tsx`

```typescript
'use client'
import { Product, Category, Promo, SpecialOffer } from '@/lib/admin-context'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

// ===== REUSABLE MODAL WRAPPER =====
export function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
      </Card>
    </div>
  )
}

// ===== PRODUCT MODAL =====
export function ProductModal({ isOpen, onClose, onSave, initialData }: any) {
  const [form, setForm] = useState<Partial<Product>>(initialData || {
    name: '',
    price: 0,
    category: 'vault',
    stock: 0,
    sales: 0,
    description: '',
    active: true
  })

  const handleSubmit = () => {
    if (!form.name || form.price === 0) {
      alert('Please fill in all required fields')
      return
    }
    onSave(form)
    setForm({
      name: '',
      price: 0,
      category: 'vault',
      stock: 0,
      sales: 0,
      description: '',
      active: true
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Product' : 'Add Product'}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Product Name *</label>
          <input
            type="text"
            value={form.name || ''}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="e.g., Netflix Premium"
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Price (TND) *</label>
            <input
              type="number"
              value={form.price || 0}
              onChange={(e) => setForm({...form, price: parseFloat(e.target.value)})}
              placeholder="0.00"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Category *</label>
            <select
              value={form.category || 'vault'}
              onChange={(e) => setForm({...form, category: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="vault">The Vault</option>
              <option value="telecom">Telecom Hub</option>
              <option value="gaming">Gaming Corner</option>
              <option value="business">Business Suite</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Stock</label>
            <input
              type="number"
              value={form.stock || 0}
              onChange={(e) => setForm({...form, stock: parseInt(e.target.value)})}
              placeholder="0"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Sales</label>
            <input
              type="number"
              value={form.sales || 0}
              onChange={(e) => setForm({...form, sales: parseInt(e.target.value)})}
              placeholder="0"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Description</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => setForm({...form, description: e.target.value})}
            placeholder="Product description..."
            rows={3}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active || false}
            onChange={(e) => setForm({...form, active: e.target.checked})}
          />
          <span className="text-sm">Active</span>
        </label>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-primary text-white">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// ===== CATEGORY MODAL =====
export function CategoryModal({ isOpen, onClose, onSave, initialData }: any) {
  const [form, setForm] = useState<Partial<Category>>(initialData || {
    name: '',
    description: '',
    color: 'from-[#0066CC] to-[#4A90E2]',
    icon: '📦',
    productCount: 0,
    active: true
  })

  const handleSubmit = () => {
    if (!form.name) {
      alert('Please enter category name')
      return
    }
    onSave(form)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Category' : 'Add Category'}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Category Name *</label>
          <input
            type="text"
            value={form.name || ''}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="e.g., The Vault"
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Description</label>
          <input
            type="text"
            value={form.description || ''}
            onChange={(e) => setForm({...form, description: e.target.value})}
            placeholder="Category description..."
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Icon Emoji</label>
          <input
            type="text"
            value={form.icon || '📦'}
            onChange={(e) => setForm({...form, icon: e.target.value})}
            maxLength={2}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-center text-2xl"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active || false}
            onChange={(e) => setForm({...form, active: e.target.checked})}
          />
          <span className="text-sm">Active</span>
        </label>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-primary text-white">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Similar modals for Promo and SpecialOffer...
```

---

## **Step 3: Update Admin Panel with CRUD Operations**

Key changes to `/app/admin/page.tsx`:

```typescript
'use client'
import { useAdmin } from '@/lib/admin-context'
import { ProductModal, CategoryModal } from '@/components/admin-modals'
import { useState, useMemo } from 'react'

export default function AdminDashboard() {
  const admin = useAdmin()
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'promos' | 'offers'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // ===== FILTERED PRODUCTS =====
  const filteredProducts = useMemo(() => {
    return admin.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [admin.products, searchTerm])

  // ===== PRODUCTS HANDLERS =====
  const handleAddProduct = (newProduct) => {
    admin.addProduct(newProduct)
    setShowProductModal(false)
    console.log('[v0] Product added successfully')
  }

  const handleUpdateProduct = (updates) => {
    admin.updateProduct(editingItem.id, updates)
    setEditingItem(null)
    setShowProductModal(false)
    console.log('[v0] Product updated successfully')
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure?')) {
      admin.deleteProduct(id)
      console.log('[v0] Product deleted successfully')
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedProducts.size} products?`)) {
      admin.deleteMultipleProducts(Array.from(selectedProducts))
      setSelectedProducts(new Set())
      console.log('[v0] Bulk delete completed')
    }
  }

  // ===== PRODUCTS TABLE =====
  const renderProducts = () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
        </div>
        <Button 
          onClick={() => { setEditingItem(null); setShowProductModal(true) }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
        {selectedProducts.size > 0 && (
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={handleBulkDelete}
          >
            <Trash2 className="w-4 h-4" /> Delete ({selectedProducts.size})
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" className="w-4 h-4" /></th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={(e) => {
                      const newSet = new Set(selectedProducts)
                      if (e.target.checked) newSet.add(product.id)
                      else newSet.delete(product.id)
                      setSelectedProducts(newSet)
                    }}
                  />
                </td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 font-semibold text-primary">{product.price} TND</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => { setEditingItem(product); setShowProductModal(true) }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={showProductModal}
        onClose={() => { setShowProductModal(false); setEditingItem(null) }}
        onSave={editingItem ? handleUpdateProduct : handleAddProduct}
        initialData={editingItem}
      />
    </div>
  )

  // Main render...
  return (
    <div className="min-h-screen bg-background">
      {/* ... header and tabs ... */}
      {activeTab === 'products' && renderProducts()}
    </div>
  )
}
```

---

## **Step 4: Wrap App with AdminProvider**

File: `/app/layout.tsx`

```typescript
import { AdminProvider } from '@/lib/admin-context'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AdminProvider>
          {/* ... existing layout ... */}
          {children}
        </AdminProvider>
      </body>
    </html>
  )
}
```

---

## **Testing Checklist**

- [ ] Add product - appears in list immediately
- [ ] Edit product - updates with new data
- [ ] Delete product - removed from list
- [ ] Bulk delete - multiple products removed
- [ ] Search filter - filters products by name/category
- [ ] Same operations for categories, promos, offers

---

## **Key Principles**

1. **State flows downward** - Admin context provides data to components
2. **Events flow upward** - Click handlers call context methods
3. **Modals use initial data** - Pre-populate form with existing data
4. **Debug logging** - console.log for tracking operations
5. **Confirmation dialogs** - Prevent accidental deletions
