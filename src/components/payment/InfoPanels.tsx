import {
  ShieldCheckIcon,
  InformationCircleIcon,
  CogIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export function InfoPanels() {
  return (
    <aside className="space-y-6" aria-label="Payment information">
      {/* Demo Options Panel */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
          <InformationCircleIcon
            className="w-5 h-5 mr-2 flex-shrink-0"
            aria-hidden="true"
          />
          Tùy chọn Demo
        </h3>
        <div className="text-blue-800 text-sm space-y-2">
          <p>
            <strong>Chuyển đến VNPay:</strong> Chuyển hướng trực tiếp đến trang
            thanh toán VNPay (flow thực tế)
          </p>
          <p>
            <strong>Tạo URL Demo:</strong> Tạo và hiển thị URL thanh toán để
            kiểm tra hoặc sao chép
          </p>
        </div>
      </div>

      {/* Security Panel */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-900 mb-3 flex items-center">
          <ShieldCheckIcon
            className="w-5 h-5 mr-2 flex-shrink-0"
            aria-hidden="true"
          />
          Tính năng Bảo mật
        </h3>
        <ul className="text-green-800 text-sm space-y-1 mb-4">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            Server Actions cho xử lý server-side
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            Route Handlers cho API endpoints
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            IPN (Instant Payment Notification) handler
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            Xác thực chữ ký số và mã hóa dữ liệu
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            Validation form và sanitization
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></span>
            HTTPS và SSL/TLS encryption
          </li>
        </ul>
        <a
          href="https://github.com/lehuygiang28/vnpay-nextjs-fullstack-example"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-medium"
        >
          <CodeBracketIcon className="w-4 h-4" aria-hidden="true" />
          Xem mã nguồn
        </a>
      </div>

      {/* Environment Panel */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <CogIcon className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
          Môi trường
        </h3>
        <div className="text-gray-700 text-sm space-y-3">
          <div className="flex items-start gap-2">
            <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-900">Sandbox Mode:</span>
              <span className="ml-1 break-words">
                Đang sử dụng môi trường test của VNPay
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-900">Phiên bản:</span>
              <span className="ml-1 break-words">VNPay 2.3.2 + Next.js 15</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-900">Công nghệ:</span>
              <span className="ml-1 break-words">
                Server Actions, TypeScript, Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
