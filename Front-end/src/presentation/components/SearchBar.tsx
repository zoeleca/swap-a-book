// components/SearchBar.tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({value, onChange}: Props) => (
  <div className="w-full max-w-md mt-8 relative">
    <input
      type="text"
      placeholder="🔍 Search by title or author..."
      className="w-full px-5 py-3 pl-10 rounded-full border border-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-200 text-amber-950 placeholder-amber-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <svg
      className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-800 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  </div>
);

export default SearchBar;