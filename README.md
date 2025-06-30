# VNPay Next.js Fullstack Example

A comprehensive example of integrating VNPay payment gateway with Next.js 15, featuring server actions, IPN handling, and a modern responsive UI built with Tailwind CSS.

⚠️ **Important**: This implementation correctly handles VNPay on the **server-side only**. The VNPay package cannot be used on the client-side, so all VNPay operations are handled through Next.js server actions and API routes.

## 🚀 Features

- **Next.js 15** with App Router and Server Actions
- **Server-side VNPay Integration** - All VNPay operations happen server-side
- **Dual Payment Options** for demo environments:
  - 🔄 **Direct Redirect**: Production-ready flow to VNPay gateway
  - 👁️ **URL Preview**: Generate and display payment URL for inspection, copying, or opening in new tab
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** with modern responsive design
- **Clean Architecture** with organized component structure
- **IPN (Instant Payment Notification)** handling
- **Payment verification** and result display with print functionality
- **Bank selection** with dynamic bank list
- **Responsive design** optimized for all devices
- **Vietnamese language support** with proper SEO
- **Resource Links** with color-coded styling
- **Error Boundary** for robust error handling
- **Reusable UI Components** following best practices

## 🛠 Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [VNPay Package](https://www.npmjs.com/package/vnpay) v2.4.0 - VNPay integration
- [Heroicons](https://heroicons.com/) - Beautiful SVG icons
- [clsx](https://github.com/lukeed/clsx) - Conditional class names
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes

## 📱 Demo Options

### 🔄 Redirect to VNPay

- Production-ready payment flow
- Immediately redirects to VNPay gateway
- Best for live applications

### 👁️ Generate URL Demo

- Perfect for development and testing
- Shows the generated payment URL
- Copy URL to clipboard functionality
- Open URL in new tab
- Inspect payment parameters

## 🏗️ Project Structure

```markdown
src/
├── app/
│   ├── actions/
│   │   └── payment.ts              # Server actions for VNPay operations
│   ├── api/
│   │   └── payment/
│   │       └── ipn/
│   │           └── route.ts        # IPN webhook handler
│   ├── payment/
│   │   └── return/
│   │       └── page.tsx            # Payment result page
│   ├── page.tsx                    # Main homepage with payment form
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles
│   └── sitemap.ts                  # SEO sitemap generation
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── Input.tsx               # Form input component
│   │   ├── Select.tsx              # Select dropdown component
│   │   ├── Textarea.tsx            # Textarea component
│   │   ├── PrintButton.tsx         # Print functionality component
│   │   └── index.ts                # Barrel exports
│   ├── layout/
│   │   ├── Header.tsx              # App header with branding
│   │   ├── Footer.tsx              # Footer with author info
│   │   └── index.ts                # Barrel exports
│   ├── payment/
│   │   ├── PaymentForm.tsx         # Main payment form
│   │   ├── PaymentResult.tsx       # Payment result display
│   │   ├── InfoPanels.tsx          # Information panels
│   │   └── index.ts                # Barrel exports
│   └── common/
│       └── ErrorBoundary.tsx       # Error boundary component
├── lib/
│   ├── vnpay.ts                    # VNPay configuration and utilities
│   └── utils.ts                    # Utility functions (cn, etc.)
├── types/
│   └── payment.ts                  # TypeScript type definitions
└── public/                         # Static assets and favicons
```

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# VNPay Configuration
VNPAY_TMN_CODE=your_tmn_code_here
VNPAY_SECURE_SECRET=your_secure_secret_here
VNPAY_RETURN_URL=http://localhost:3000/payment/return
VNPAY_IPN_URL=http://localhost:3000/api/payment/ipn
VNPAY_HOST=https://sandbox.vnpayment.vn
VNPAY_TEST_MODE=true
```

> **Note**: For demo purposes, the app works with fallback values even without environment variables.

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lehuygiang28/vnpay-nextjs-fullstack-example.git
   cd vnpay-nextjs-fullstack-example
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables (optional for demo):**

   ```bash
   # Copy and edit with your VNPay credentials
   cp .env.example .env.local
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 VNPay Setup

1. **Register with VNPay:**
   - Visit [VNPay Merchant Portal](https://vnpay.vn/)
   - Complete merchant registration
   - Get your TMN Code and Secure Secret

2. **Configure webhooks:**
   - Set IPN URL to: `your-domain.com/api/payment/ipn`
   - Set Return URL to: `your-domain.com/payment/return`

## 📊 Key Implementation Details

### Server Actions (`src/app/actions/payment.ts`)

- `createPaymentUrl()` - Creates payment and redirects to VNPay
- `generatePaymentUrlDemo()` - Generates payment URL for inspection
- `getBankListAction()` - Fetches available banks
- `getProductCodeOptions()` - Provides product categories
- `getLocaleOptions()` - Language options

### IPN Handler (`src/app/api/payment/ipn/route.ts`)

- Handles VNPay instant payment notifications
- Verifies payment authenticity using HMAC-SHA512
- Updates order status in your system
- Responds with appropriate status codes

### Payment Return (`src/app/payment/return/page.tsx`)

- Verifies payment results from VNPay
- Displays comprehensive transaction details
- Handles success/failure/error states
- Print functionality for receipts
- Beautiful responsive UI with status indicators

### VNPay Configuration (`src/lib/vnpay.ts`)

- Server-side VNPay client configuration
- Utility functions for payment processing
- IP detection and amount formatting
- Error handling and validation

### Component Architecture

- **UI Components**: Reusable components with TypeScript interfaces
- **Layout Components**: Header, Footer with consistent styling
- **Payment Components**: Specialized components for payment flow
- **Utility Functions**: Helper functions for class merging and formatting

### TypeScript & VNPay Types

⚠️ **Important**: When using VNPay types on the client-side, you **MUST** use Type-Only Imports to avoid bundling the VNPay package in the browser.

**✅ Correct - Type-Only Imports:**

```typescript
// Single type import
import { type Bank } from "vnpay";

// Multiple type imports
import type { Bank, QueryDr, Refund } from "vnpay";

// Using in component
interface PaymentFormProps {
  banks: Bank[];
  onPayment: (data: QueryDr) => void;
}
```

**❌ Incorrect - Regular Imports:**

```typescript
// This will cause errors in browser
import { Bank, QueryDr } from "vnpay";
```

**Why?** The VNPay package contains Node.js-specific code that cannot run in the browser. Type-only imports ensure you get TypeScript type checking without including the runtime code in your client bundle.

### Next.js Redirect Behavior

⚠️ **Note**: When using the "Chuyển đến VNPay" button, you may see a `NEXT_REDIRECT` error in the console. This is **expected behavior** - it's how Next.js handles `redirect()` in Server Actions, not an actual error.

```typescript
// This is normal behavior in Server Actions
try {
  await createPaymentUrl(formData);
} catch (error) {
  // NEXT_REDIRECT errors are expected when redirect() is called
  if (error.digest?.includes("NEXT_REDIRECT")) {
    // This means the redirect is working correctly
    return;
  }
  // Handle actual errors here
}
```

## 🔐 Security Features

- ✅ **Server-side only** VNPay processing
- ✅ **HMAC-SHA512** signature verification
- ✅ **Route Handlers** for secure API endpoints
- ✅ **Server Actions** for form processing
- ✅ **IP address validation**
- ✅ **Transaction amount verification**
- ✅ **Order ID uniqueness**
- ✅ **Input validation** and sanitization
- ✅ **HTTPS enforcement** for production
- ✅ **Secure environment variables**

## 🎨 UI/UX Features

- 📱 **Fully responsive** design for all devices
- 🎯 **Modern gradient backgrounds** and shadows
- 🔘 **Interactive form elements** with proper validation
- 📋 **Copy to clipboard** functionality
- 🔗 **Color-coded resource links** (GitHub, NPM, VNPay, API Docs)
- ⚡ **Loading states** and comprehensive error handling
- 🌟 **Beautiful icons** from Heroicons
- 🎨 **Professional styling** with Tailwind CSS
- ♿ **Accessibility features** with ARIA labels
- 🖨️ **Print functionality** for payment receipts

## 📚 Resources

- 📖 [VNPay Node.js Package](https://vnpay.js.org/)
- 📦 [NPM Package](https://www.npmjs.com/package/vnpay)
- 🐙 [GitHub Repository](https://github.com/lehuygiang28/vnpay)
- 📘 [VNPay API Documentation](https://sandbox.vnpayment.vn/apis/)
- ⚡ [Next.js 15 Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🧪 Testing

The application includes comprehensive demo mode with sandbox environment:

- **Test Environment**: Uses VNPay sandbox for safe testing
- **Sample Data**: Pre-filled form with test values (50,000 VND)
- **Test Cards**: Use VNPay provided test card numbers
- **URL Generation**: Inspect payment URLs before redirecting
- **IPN Testing**: Webhook endpoints work in development
- **Error Handling**: Comprehensive error states and recovery

## 📱 SEO & Performance

- 🌐 **Vietnamese language optimization**
- 📊 **Structured data** for search engines
- 🖼️ **Open Graph** and Twitter card meta tags
- 🤖 **Sitemap generation** for better indexing
- 📱 **Mobile-first responsive design**
- ⚡ **Optimized performance** with Next.js 15
- 🔗 **Proper internal linking structure**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

### lehuygiang28

- GitHub: [@lehuygiang28](https://github.com/lehuygiang28)
- Email: [lehuygiang28@gmail.com](mailto:lehuygiang28@gmail.com)

Made with ❤️ for the Vietnamese developer community

## 🙏 Acknowledgments

- [VNPay](https://vnpay.vn/) for providing the payment gateway services
- [Next.js team](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icon set
- [Vercel](https://vercel.com/) for Next.js hosting and deployment **platform**
