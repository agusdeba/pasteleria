'use client';

const CATEGORIES = ['Todas', 'Dulce', 'Salado', 'Postre'] as const;

interface AdminCategoryFilterProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function AdminCategoryFilter({ activeCategory, onSelect }: AdminCategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            activeCategory === cat
              ? 'bg-rome-darkGreen text-white'
              : 'bg-gray-100 text-rome-gray hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
