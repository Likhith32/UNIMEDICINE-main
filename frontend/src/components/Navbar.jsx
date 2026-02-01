import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Enhanced Navbar component
 * - Role-based navigation (student vs doctor)
 * - Fully responsive (mobile / tablet / laptop)
 * - Scroll-aware elevation
 * - Active route indicator (all screens)
 * - Auto-close menus on route change
 * - Accessibility improvements
 * - Framer Motion animations
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const panelRef = useRef(null);
  const accountPanelRef = useRef(null);

  // Scroll elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Screen size detection
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setNotifOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close notification panel on outside click
=======
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar component
 * - shows brand, primary nav, AI quick-action, notifications and account menu
 * - responsive behavior (basic): menu button toggles menu on small screens
 * - accessible attributes included
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2); // mock; replace with real state
  const panelRef = useRef(null);

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
<<<<<<< HEAD
      if (accountPanelRef.current && !accountPanelRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

<<<<<<< HEAD
  // Future: Real-time notification count (Socket.IO ready)
  useEffect(() => {
    if (role === "doctor") {
      // TODO: Subscribe to doctor notification socket
      // setUnreadCount(newConsultationsCount)
      setUnreadCount(2); // Mock data for now
    } else {
      setUnreadCount(0);
    }
  }, [role]);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
=======
  const handleNavigate = (path) => {
    setMenuOpen(false);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    navigate(path);
  };

  const handleLogout = () => {
<<<<<<< HEAD
    setMenuOpen(false);
    setNotifOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  // Role-aware navigation items
  const navItems = [
    { label: "Dashboard", path: "/", roles: ["student", "doctor"] },
    { label: "AI Chat", path: "/ai", roles: ["student"] },
    { label: "Nearby", path: "/nearby-places", roles: ["student"] },
    { label: "Image Check", path: "/image-diagnosis", roles: ["student"] },
    { label: "Doctor Chat", path: "/doctor-connect", roles: ["student"] },
    { label: "Consultations", path: "/doctor-dashboard", roles: ["doctor"] },
  ];

  // Filter nav items by role
  const filteredNavItems = navItems.filter((item) => 
    item.roles.includes(role || "student")
  );

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{keyframeStyles}</style>
      <motion.nav
        style={{
          ...navStyles.bar,
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.08)"
            : "none",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div style={navStyles.container}>
          {/* Brand */}
          <motion.div
            style={navStyles.brand}
            onClick={() => handleNavigate("/")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate("/")}
            aria-label="Go to dashboard"
          >
            <div style={navStyles.gemIcon}>✦</div>
            <div>
              <div style={navStyles.appName}>Uni Telemedicine</div>
              <div style={navStyles.appTag}>Campus care, simplified</div>
            </div>
          </motion.div>

          {/* Center Nav (Laptop only) */}
          {!isMobile && !isTablet && (
            <div style={navStyles.centerMenu}>
              {filteredNavItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    style={{
                      ...navStyles.navItem,
                      background: active
                        ? "rgba(139,92,246,0.12)"
                        : "transparent",
                      color: active ? "#7c3aed" : "#374151",
                      fontWeight: active ? 700 : 500,
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Right Actions */}
          <div style={navStyles.rightActions}>
            {!isMobile && role === "student" && (
              <motion.button
                style={navStyles.aiButton}
                onClick={() => handleNavigate("/ai")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="AI health check"
              >
                ⚡ AI Check
              </motion.button>
            )}

            {/* Notifications */}
            <div style={navStyles.notifWrap} ref={panelRef}>
              <motion.button
                style={navStyles.iconButton}
                onClick={() => setNotifOpen((s) => !s)}
                whileHover={{ scale: 1.15 }}
                aria-label="Notifications"
                aria-expanded={notifOpen}
                aria-haspopup="true"
              >
                🔔
                {unreadCount > 0 && (
                  <span style={navStyles.badge}>{unreadCount}</span>
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    style={navStyles.notifPanel}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="menu"
                  >
                    <strong style={navStyles.notifHeader}>Recent</strong>
                    {role === "doctor" ? (
                      <>
                        <div style={navStyles.notifItem}>
                          New student consultation
                        </div>
                        <div style={navStyles.notifItem}>
                          Follow-up request received
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={navStyles.notifItem}>
                          AI screening complete
                        </div>
                        <div style={navStyles.notifItem}>
                          Doctor response received
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account */}
            <div style={navStyles.accountWrap} ref={accountPanelRef}>
              <motion.button
                style={navStyles.accountBtn}
                onClick={() => setMenuOpen((s) => !s)}
                whileHover={{ scale: 1.05 }}
                aria-label="Account menu"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <div style={navStyles.avatar}>
                  {(user?.name || user?.email || "U")[0].toUpperCase()}
                </div>
              </motion.button>

              <AnimatePresence>
                {menuOpen && !isMobile && !isTablet && (
                  <motion.div
                    style={navStyles.accountPanel}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="menu"
                  >
                    <div style={navStyles.userInfo}>
                      <div style={navStyles.userName}>
                        {user?.name || user?.email || "User"}
                      </div>
                      <div style={navStyles.userRole}>
                        {role === "doctor" ? "Doctor" : "Student"}
                      </div>
                    </div>
                    <div style={navStyles.divider} />
                    <button
                      style={navStyles.menuItem}
                      onClick={() => handleNavigate("/profile")}
                      role="menuitem"
                    >
                      👤 Profile
                    </button>
                    <button
                      style={navStyles.menuItem}
                      onClick={() => handleNavigate("/settings")}
                      role="menuitem"
                    >
                      ⚙️ Settings
                    </button>
                    <div style={navStyles.divider} />
                    <button
                      style={navStyles.logoutItem}
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            {(isMobile || isTablet) && (
              <motion.button
                style={navStyles.hamburger}
                onClick={() => setMobileMenuOpen((s) => !s)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (isMobile || isTablet) && (
            <motion.div
              style={navStyles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              role="menu"
            >
              <div style={navStyles.mobileMenuContent}>
                {/* User Info Card */}
                <div style={navStyles.mobileUserCard}>
                  <div style={navStyles.mobileAvatar}>
                    {(user?.name || user?.email || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={navStyles.mobileUserName}>
                      {user?.name || user?.email || "User"}
                    </div>
                    <div style={navStyles.mobileUserRole}>
                      {role === "doctor" ? "Doctor Account" : "Student Account"}
                    </div>
                  </div>
                </div>

                <div style={navStyles.mobileDivider} />

                {/* Navigation Links */}
                {filteredNavItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <motion.button
                      key={item.path}
                      style={{
                        ...navStyles.mobileNavItem,
                        background: active
                          ? "rgba(139,92,246,0.12)"
                          : "transparent",
                        color: active ? "#7c3aed" : "#374151",
                        fontWeight: active ? 700 : 500,
                      }}
                      onClick={() => handleNavigate(item.path)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}

                {/* AI Button for Students */}
                {role === "student" && (
                  <motion.button
                    style={navStyles.mobileAiButton}
                    onClick={() => handleNavigate("/ai")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ⚡ AI Check
                  </motion.button>
                )}

                <div style={navStyles.mobileDivider} />

                {/* Account Actions */}
                <motion.button
                  style={navStyles.mobileMenuItem}
                  onClick={() => handleNavigate("/profile")}
                  whileHover={{ scale: 1.02 }}
                >
                  👤 Profile
                </motion.button>
                <motion.button
                  style={navStyles.mobileMenuItem}
                  onClick={() => handleNavigate("/settings")}
                  whileHover={{ scale: 1.02 }}
                >
                  ⚙️ Settings
                </motion.button>

                <motion.button
                  style={navStyles.mobileLogoutButton}
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚪 Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

/* ================= KEYFRAME ANIMATIONS ================= */
const keyframeStyles = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  body {
    scroll-padding-top: 72px;
  }
`;

/* ================= STYLES ================= */
=======
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyles.bar} role="navigation" aria-label="Main navigation">
      <div style={navStyles.container}>
        {/* Brand */}
        <div
          style={navStyles.brand}
          onClick={() => handleNavigate("/")}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigate("/")}
          aria-label="Go to dashboard"
        >
          <div style={navStyles.gemIcon} aria-hidden>
            <span style={navStyles.gemInner}>✦</span>
          </div>
          <div>
            <div style={navStyles.appName}>Uni Telemedicine</div>
            <div style={navStyles.appTag}>Campus care, simplified</div>
          </div>
        </div>

        {/* Center nav (visible on wide screens; simple buttons here) */}
        <div style={navStyles.centerMenu} aria-hidden>
          <button style={navStyles.navItem} onClick={() => handleNavigate("/")}>Dashboard</button>
          <button style={navStyles.navItem} onClick={() => handleNavigate("/ai")}>AI Chat</button>
          <button style={navStyles.navItem} onClick={() => handleNavigate("/nearby-places")}>Nearby</button>
          <button style={navStyles.navItem} onClick={() => handleNavigate("/image-diagnosis")}>Image Check</button>
          <button style={navStyles.navItem} onClick={() => handleNavigate("/doctor-connect")}>Doctor Chat</button>
        </div>

        {/* Right actions */}
        <div style={navStyles.rightActions}>
          {/* AI quick-action */}
          <button
            style={navStyles.aiButton}
            onClick={() => handleNavigate("/ai")}
            aria-label="Open AI chat"
            title="Quick AI Check"
          >
            ⚡ AI Check
          </button>

          {/* Notifications */}
          <div style={navStyles.notifWrap} ref={panelRef}>
            <button
              style={navStyles.iconButton}
              aria-haspopup="true"
              aria-expanded={notifOpen}
              aria-label="Notifications"
              onClick={() => setNotifOpen((s) => !s)}
              title="Notifications"
            >
              🔔
              {unreadCount > 0 && <span style={navStyles.badge}>{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div role="dialog" aria-label="Notifications" style={navStyles.notifPanel}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent</div>
                <div style={navStyles.notifItem}>AI screening complete — 1 new</div>
                <div style={navStyles.notifItem}>New consultation request</div>
                <div style={{ marginTop: 8 }}>
                  <button
                    style={navStyles.linkBtn}
                    onClick={() => {
                      setNotifOpen(false);
                      handleNavigate("/notifications");
                    }}
                  >
                    View all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account */}
          <div style={navStyles.accountWrap}>
            <button
              style={navStyles.accountBtn}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              title="Account"
            >
              <div style={navStyles.avatar} aria-hidden>
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>
              <div style={{ marginLeft: 8, textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "#374151" }}>{user?.name || user?.email || "Account"}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>{role === "doctor" ? "Doctor" : "Student"}</div>
              </div>
            </button>

            {menuOpen && (
              <div role="menu" aria-label="Account menu" style={navStyles.accountPanel}>
                <button style={navStyles.menuItem} onClick={() => { setMenuOpen(false); handleNavigate("/profile"); }}>Profile</button>
                <button style={navStyles.menuItem} onClick={() => { setMenuOpen(false); handleNavigate("/settings"); }}>Settings</button>
                <div style={navStyles.divider} />
                <button style={navStyles.logoutItem} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>

          {/* Hamburger for small screens (toggled menu) */}
          <button
            style={navStyles.hamburger}
            aria-label="Open menu"
            onClick={() => setMenuOpen((s) => !s)}
            title="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Simple mobile drawer (shows primary nav); visible when menuOpen === true */}
      {menuOpen && (
        <div style={navStyles.mobileDrawer} role="dialog" aria-label="Mobile menu">
          <div style={navStyles.mobileMenuInner}>
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/")}>Dashboard</button>
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/ai")}>AI Chat</button>
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/nearby-places")}>Nearby</button>
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/image-diagnosis")}>Image Check</button>
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/doctor-connect")}>Doctor Chat</button>
            <div style={{ height: 8 }} />
            <button style={navStyles.mobileNavItem} onClick={() => handleNavigate("/profile")}>Profile</button>
            <button style={navStyles.mobileNavItem} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

/* Inline styles for the navbar component */
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
const navStyles = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 1200,
<<<<<<< HEAD
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(240,231,255,0.95))",
    borderBottom: "1px solid rgba(139,92,246,0.08)",
    backdropFilter: "blur(6px)",
    transition: "box-shadow 0.3s ease",
=======
    background: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(240,231,255,0.95))",
    borderBottom: "1px solid rgba(139,92,246,0.08)",
    backdropFilter: "blur(6px)",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.6rem 1rem",
<<<<<<< HEAD
  },
  brand: {
    display: "flex",
    gap: 12,
    cursor: "pointer",
    alignItems: "center",
=======
    gap: 12,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  gemIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
<<<<<<< HEAD
    background: "linear-gradient(135deg,#8b5cf6,#a78bfa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: 700,
=======
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    boxShadow: "0 6px 18px rgba(139,92,246,0.25)",
  },
  gemInner: {
    transform: "translateY(-2px)",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  appName: {
    fontWeight: 800,
    fontSize: 16,
<<<<<<< HEAD
    background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  appTag: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: 500,
  },
  centerMenu: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  navItem: {
    border: "none",
    background: "transparent",
    padding: "0.5rem 0.8rem",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontSize: 14,
  },
  rightActions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
=======
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  appTag: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  centerMenu: {
    display: "flex",
    gap: 8,
  },
  navItem: {
    background: "transparent",
    border: "none",
    padding: "0.4rem 0.6rem",
    cursor: "pointer",
    fontSize: 14,
    color: "#374151",
    borderRadius: 8,
  },
  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  aiButton: {
    background: "linear-gradient(135deg,#8b5cf6,#a78bfa)",
    color: "#fff",
    border: "none",
<<<<<<< HEAD
    padding: "0.5rem 1rem",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
    transition: "all 0.3s ease",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    position: "relative",
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
=======
    padding: "0.5rem 0.9rem",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(139,92,246,0.25)",
  },
  iconButton: {
    position: "relative",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    background: "#ef4444",
    color: "#fff",
    borderRadius: 999,
    padding: "2px 6px",
    fontSize: 11,
    fontWeight: 700,
<<<<<<< HEAD
    animation: "pulse 1.5s infinite",
    minWidth: 18,
    textAlign: "center",
  },
  notifWrap: {
    position: "relative",
  },
  notifPanel: {
    position: "absolute",
    right: 0,
    top: 50,
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    minWidth: 240,
    border: "1px solid rgba(139,92,246,0.1)",
  },
  notifHeader: {
    display: "block",
    marginBottom: 12,
    fontSize: 14,
    color: "#1e293b",
  },
  notifItem: {
    fontSize: 13,
    marginTop: 8,
    padding: "8px 12px",
    background: "rgba(139,92,246,0.05)",
    borderRadius: 8,
    color: "#64748b",
    borderLeft: "3px solid #8b5cf6",
  },
  accountWrap: {
    position: "relative",
  },
  accountBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
=======
  },
  notifWrap: { position: "relative" },
  notifPanel: {
    position: "absolute",
    right: 0,
    top: 40,
    width: 240,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    padding: 12,
    zIndex: 1300,
  },
  notifItem: {
    fontSize: 13,
    color: "#374151",
    padding: "6px 0",
    borderBottom: "1px dashed rgba(0,0,0,0.04)",
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "#7c3aed",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
    fontSize: 13,
  },
  accountWrap: { position: "relative" },
  accountBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "none",
    background: "transparent",
    padding: "6px 8px",
    cursor: "pointer",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 999,
    background: "#fafafa",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
<<<<<<< HEAD
    color: "#fff",
    fontSize: 16,
    border: "2px solid rgba(139,92,246,0.2)",
=======
    color: "#4c1d95",
    border: "1px solid rgba(74,20,140,0.06)",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  accountPanel: {
    position: "absolute",
    right: 0,
<<<<<<< HEAD
    top: 50,
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    minWidth: 200,
    border: "1px solid rgba(139,92,246,0.1)",
  },
  userInfo: {
    padding: "8px 12px",
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: 500,
  },
  menuItem: {
    border: "none",
    background: "transparent",
    padding: "10px 12px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 8,
    fontSize: 14,
    color: "#374151",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  divider: {
    height: 1,
    background: "rgba(139,92,246,0.1)",
    margin: "8px 0",
  },
  logoutItem: {
    border: "none",
    padding: "10px 12px",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    width: "100%",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  hamburger: {
    border: "none",
    background: "transparent",
    fontSize: 24,
    cursor: "pointer",
    padding: 8,
    color: "#7c3aed",
  },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(240,231,255,0.98))",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    borderTop: "1px solid rgba(139,92,246,0.1)",
    backdropFilter: "blur(6px)",
  },
  mobileMenuContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxHeight: "calc(100vh - 80px)",
    overflowY: "auto",
  },
  mobileUserCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    background: "rgba(139,92,246,0.08)",
    borderRadius: 12,
    marginBottom: 8,
  },
  mobileAvatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#fff",
    fontSize: 18,
  },
  mobileUserName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: 2,
  },
  mobileUserRole: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: 500,
  },
  mobileDivider: {
    height: 1,
    background: "rgba(139,92,246,0.1)",
    margin: "8px 0",
  },
  mobileNavItem: {
    padding: "12px 16px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 15,
    transition: "all 0.2s ease",
  },
  mobileAiButton: {
    background: "linear-gradient(135deg,#8b5cf6,#a78bfa)",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
    boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
  },
  mobileMenuItem: {
    padding: "12px 16px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 15,
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  mobileLogoutButton: {
    padding: "12px 16px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "#fff",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
};

export default Navbar;
=======
    top: 46,
    width: 180,
    background: "#fff",
    borderRadius: 8,
    padding: 8,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    zIndex: 1300,
  },
  menuItem: {
    width: "100%",
    textAlign: "left",
    padding: "8px 10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    color: "#374151",
  },
  divider: { height: 1, background: "rgba(0,0,0,0.06)", margin: "6px 0" },
  logoutItem: {
    width: "100%",
    textAlign: "left",
    padding: "8px 10px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#f97316)",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
  },
  hamburger: {
    display: "none",
    border: "none",
    background: "transparent",
    fontSize: 18,
    cursor: "pointer",
  },
  mobileDrawer: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 68,
    zIndex: 1200,
    background: "rgba(255,255,255,0.98)",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    padding: 12,
    boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
  },
  mobileMenuInner: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  mobileNavItem: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    textAlign: "left",
    fontSize: 15,
    cursor: "pointer",
  },
};

export default Navbar;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
