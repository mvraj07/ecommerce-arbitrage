import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-200"></div>
            <span className="font-semibold">Store</span>
          </a>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-green-600 font-bold">
            ₹0.00{" "}
            <span className="ml-2 bg-green-100 text-green-700 rounded-full px-2">
              0
            </span>
          </div>
          <button className="p-2 bg-green-500 text-white rounded-md">☰</button>
        </div>
      </div>
    </header>
  );
}
