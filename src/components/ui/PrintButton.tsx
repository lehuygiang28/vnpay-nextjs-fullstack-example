"use client";

export function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
    >
      In hóa đơn
    </button>
  );
}
