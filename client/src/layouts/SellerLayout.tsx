import { useState, ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BellIcon,
  Close,
  LogoutIcon,
  MenuIcon,
  MessageSquareIcon,
  RightArrow,
  SellerCenterIcon,
  SettingIcon,
} from "../widgets/icons";
import { LogoutButton } from "../widgets";

type SellerLayoutProps = {
  children: ReactNode;
};

export default function SellerLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const closeRightSidebar = () => setIsRightSidebarOpen(false);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(menu)
        ? prevOpenMenus.filter((item) => item !== menu)
        : [...prevOpenMenus, menu]
    );
  };

  const isMenuOpen = (menu: string) => openMenus.includes(menu);

  const rightMenuItems = [
    { label: "Notifications", element: <BellIcon /> },
    { label: "Message", element: <MessageSquareIcon /> },
    { label: "Settings", element: <SettingIcon /> },
  ];

  const leftMenuItems = [
    {
      label: "Products",
      level: 0,
      href: 'products',
      children: [
        {
          label: 'Manage Products',
          level: 1,
          element: null,
          href: 'products'
        },
        {
          label: 'Add Products',
          level: 1,
          element: null,
          href: 'product/add'
        },
        {
          label: 'Brands Management',
          level: 1,
          element: null,
          href: 'Brands'
        },
      ]
    },
    {
      label: "Orders and Reviews",
      level: 0,
      href: 'orders-reviews',
      children: [
        {
          label: 'Order Management',
          level: 1,
          element: null,
          href: 'orders'
        },
        {
          label: 'Handle Return',
          level: 1,
          element: null,
          href: 'return'
        },
        {
          label: 'Reviews',
          level: 1,
          element: null,
          href: 'review'
        },
      ]
    },
    {
      label: "Manage Store",
      level: 0,
      href: 'store',
      children: [
        {
          label: 'Store Preview',
          level: 1,
          element: null,
          href: 'Preview'
        },
        {
          label: 'Store Settings',
          level: 1,
          element: null,
          href: 'store-settings'
        },
      ]
    },
    {
      label: "Finance",
      level: 0,
      href: 'finance',
      children: [
        {
          label: 'Income',
          level: 1,
          element: null,
          href: 'income'
        },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button type="button" onClick={toggleLeftSidebar} className="mr-4 sm:hidden text-gray-500">
            <MenuIcon />
          </button>
          <div className="flex items-center">
            <span>
              <SellerCenterIcon width={40} height={40} />
            </span>
            <h1 className="text-2xl font-semibold">Bonux Seller Center</h1>
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden sm:flex space-x-2 mr-4">
            <Link to={' '} className="px-4 py-2 border rounded hover:bg-gray-100">
              Product Data
            </Link>
            <Link to={' '} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              + New Product
            </Link>
          </div>
          <button onClick={toggleRightSidebar} className="sm:hidden">
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0`}
        >
          {/* Left Sidebar Header */}
          <div className="flex sm:hidden items-center justify-between h-16 border-b px-4">
            <div className="flex items-center">
              <span>
                <SellerCenterIcon width={40} height={40} />
              </span>
              <span className="ml-2 text-xl font-semibold">
                Bonux Seller Center
              </span>
            </div>
            <button
              type="button"
              onClick={toggleLeftSidebar}
              className="sm:hidden p-1 rounded-full hover:bg-gray-200"
            >
              <Close />
            </button>
          </div>


          
            {/* Left Sidebar menus */}
          <nav className="mt-6">
            {leftMenuItems.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <MenuIcon  />
                    {item.label}
                  </div>
                  <RightArrow
                    classname={`h-4 w-4 transition-transform ${
                      isMenuOpen(item.label) ? "transform rotate-90" : ""
                    }`}
                  />
                </button>
                {isMenuOpen(item.label) && item.children && (
                  <div className="bg-gray-100 py-2 px-6">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block py-2 text-sm text-gray-700 hover:text-gray-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Outlet for child components */}
          <Outlet />
        </main>

        {/* Right sidebar -  for larger screens */}
        <div className="hidden sm:block w-16 bg-white shadow-lg">
          <div className="flex flex-col items-center py-4">
            <button className="mb-4">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <button className="mb-4">
              <MessageSquareIcon className="h-6 w-6 text-gray-500" />
            </button>
            <button onClick={toggleSettings}>
              <SettingIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Right sidebar -  for mobile screens */}
        <div
          className={`sm:hidden fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={closeRightSidebar}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <Close className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {rightMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={
                    item.label === "Settings" ? toggleSettings : undefined
                  }
                  className="w-full flex justify-start items-center gap-4 duration-200 text-left px-6 py-3 text-gray-700 hover:bg-gray-200 border-b"
                >
                  <span>{item.element}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Settings panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-lg p-6 transform transition-all duration-300 ease-in-out ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Account</h2>
          <button onClick={toggleSettings}>
            <Close className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {[
              "Profile",
              "User Management",
              "Account Settings",
              "Chat Settings",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  {item}
                  <RightArrow className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 pt-4 border-t">
          <a
            href="#"
            className="flex items-center gap-4 text-red-500 hover:bg-red-100 px-2 py-1 rounded"
          >
            <LogoutIcon className="h-4 w-4 mr-2" />
            <LogoutButton/>
          </a>
        </div>
        
      </div>
    </div>
  );
}