'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import MobileSidebar from '../components/MobileSidebar';
import './globals.css'; // Import global styles

// Define Navbar component with authentication
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/app', label: 'Analyzer' },
    { href: '/ai-chat', label: 'AI Chat' },
  ];
  return (
    <nav className="bg-black/95 backdrop-blur-xl p-3 sm:p-4 fixed w-full z-50 shadow-lg border-b border-blue-500/50">
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-4">
        {/* Logo and Mobile Sidebar */}
        <div className="flex items-center">
          {/* Mobile Sidebar Button - Positioned to the left */}
          <div className="mr-3 sm:hidden">
            <MobileSidebar />
          </div>
          
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider -ml-2 sm:-ml-4">
            SALES<span className="text-pink-500">DOC</span>
          </Link>
        </div>
        
        {/* Nav Links - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:flex flex-1 justify-center">
          <div className="flex gap-4 md:gap-6 -ml-8 sm:-ml-12 md:-ml-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 text-sm md:text-base font-medium transition-colors duration-200 whitespace-nowrap
                  ${pathname === link.href
                    ? 'text-white after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-pink-500 after:rounded-full'
                    : 'text-gray-300 hover:text-white hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:to-pink-500 hover:after:rounded-full'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* User/Auth Button Right */}
        <div className="flex items-center">
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 sm:h-10 sm:w-10",
                  userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                  userButtonPopoverActionButton: "text-white hover:bg-gray-800",
                  userButtonPopoverActionButtonText: "text-white",
                  userButtonPopoverFooter: "hidden"
                }
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-xs sm:text-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

// Define Footer component (moved here from page.tsx for layout)
const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-black py-10 px-4 text-gray-400 text-center text-sm border-t border-pink-500/50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h4 className="text-white font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Blog</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-3">Support</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Help Center</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact Us</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Legal</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-3">Connect</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Twitter</a></li>
                    <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Facebook</a></li>
                </ul>
            </div>
        </div>
        <p className="mt-8">&copy; 2025 Built with passion by <a href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" className="text-blue-400 hover:text-blue-300 transition-colors">Divyanshu Sharma</a>. All rights reserved.</p>
    </footer>
  );
};

// RootLayout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showFooter = pathname === '/';

  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#0a0a0a",
          colorInputBackground: "rgba(255, 255, 255, 0.05)",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#9ca3af",
          colorTextOnPrimaryBackground: "#ffffff",
          colorShimmer: "rgba(255, 255, 255, 0.1)",
          colorNeutral: "#374151",
          borderRadius: "12px",
          fontFamily: "inherit"
        },
        elements: {
          // Root container
          rootBox: "font-sans",
          
          // Card styling
          card: "bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden",
          cardBox: "bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl rounded-2xl",
          
          // Header
          headerTitle: "text-white text-2xl font-bold mb-2",
          headerSubtitle: "text-gray-300 text-sm",
          
          // Form elements
          formButtonPrimary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-0",
          formButtonSecondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-xl transition-all duration-300 font-medium",
          
          // Input fields
          formFieldLabel: "text-white font-medium text-sm mb-2",
          formFieldInput: "bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 rounded-xl py-3 px-4 transition-all duration-200",
          formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
          
          // Social buttons
          socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-xl font-medium",
          socialButtonsBlockButtonText: "text-white font-medium",
          socialButtonsBlockButtonArrow: "text-gray-400",
          
          // Links and actions
          footerActionLink: "text-blue-400 hover:text-blue-300 transition-colors font-medium",
          formResendCodeLink: "text-blue-400 hover:text-blue-300 transition-colors font-medium",
          
          // Dividers
          dividerLine: "bg-white/20",
          dividerText: "text-gray-400 text-sm",
          
          // OTP and verification
          otpCodeFieldInput: "bg-white/5 border border-white/20 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 rounded-xl text-center font-mono",
          
          // Identity preview
          identityPreviewText: "text-gray-300",
          identityPreviewEditButton: "text-blue-400 hover:text-blue-300 transition-colors",
          
          // Modal
          modalBackdrop: "bg-black/80 backdrop-blur-sm",
          modalContent: "bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl rounded-2xl max-w-md mx-auto",
          
          // Internal card
          main: "bg-transparent",
          
          // Footer
          footer: "bg-transparent",
          footerActionText: "text-gray-400",
          
          // Avatar and profile
          avatarBox: "border-2 border-white/20 rounded-full",
          
          // Form field row
          formFieldRow: "space-y-1",
          
          // Alert and errors
          alertText: "text-red-400",
          formFieldWarningText: "text-yellow-400",
          formFieldSuccessText: "text-green-400",
          formFieldErrorText: "text-red-400",
          
          // Dropdown and selects
          selectButton: "bg-white/5 border border-white/20 text-white hover:bg-white/10 rounded-xl",
          selectSearchInput: "bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl",
          selectOption: "text-white hover:bg-white/10",
          
          // Loading spinner
          spinner: "text-blue-400",
          
          // Profile page specific
          profilePage: "bg-transparent",
          profileSection: "bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl",
          profileSectionTitle: "text-white font-semibold text-lg",
          profileSectionContent: "text-gray-300",
          
          // Breadcrumbs
          breadcrumbsItem: "text-gray-400",
          breadcrumbsItemCurrent: "text-white",
          breadcrumbsItemDivider: "text-gray-600",
          
          // Menu and popover
          userButtonPopoverCard: "bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl rounded-xl",
          userButtonPopoverActionButton: "text-white hover:bg-white/10 transition-colors rounded-lg",
          userButtonPopoverActionButtonText: "text-white",
          userButtonPopoverActionButtonIcon: "text-gray-400",
          userButtonPopoverFooter: "border-t border-white/10 pt-2",
          
          // Page backgrounds
          pageScrollBox: "bg-transparent",
          
          // Form field hints
          formFieldHintText: "text-gray-400 text-sm",
          
          // Phone input
          phoneInputBox: "bg-white/5 border border-white/20 rounded-xl",
          
          // Navbar (if using Clerk's navbar)
          navbar: "bg-black/90 border-b border-white/10 backdrop-blur-xl",
          navbarButton: "text-white hover:bg-white/10 rounded-lg transition-colors",
          
          // Organization switcher
          organizationSwitcherTrigger: "bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl transition-all duration-300",
          organizationSwitcherPopoverCard: "bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl rounded-xl",
          
          // File upload
          fileDropAreaBox: "border-2 border-dashed border-white/20 bg-white/5 rounded-xl",
          fileDropAreaButtonPrimary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium",
        }
      }}
    >
      <html lang="en">
        <body className="bg-[#0a0a0a] text-gray-200 antialiased">
          <Navbar />
          <main>{children}</main>
          {showFooter && <Footer />}
        </body>
      </html>
    </ClerkProvider>
  );
}