"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation, profile } from "@/lib/portfolio-data";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");

  useEffect(() => {
    const trackedSections = navigation
      .map((item) => ({ ...item, element: document.querySelector(item.href) }))
      .filter((item): item is typeof item & { element: Element } => Boolean(item.element));

    const updateNavigationState = () => {
      setScrolled(window.scrollY > 24);

      // The active section is the last tracked section that has reached the
      // navigation's scroll threshold. This remains stable across sections
      // with different heights and also works when scrolling quickly.
      const sectionThreshold = 120;
      const currentSection = trackedSections
        .filter(({ element }) => element.getBoundingClientRect().top <= sectionThreshold)
        .at(-1);

      setActiveHref(currentSection?.href ?? navigation[0].href);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    updateNavigationState();
    window.addEventListener("scroll", updateNavigationState, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", updateNavigationState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label={`${profile.name}, home`}>
          <span className="wordmark-symbol">M/A</span>
          <span className="wordmark-copy">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>

        <div className="desktop-nav">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? "nav-link--active" : ""}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-utilities">
          <span className="nav-status"><i /> India / Open to work</span>
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className={`menu-toggle${menuOpen ? " menu-toggle--open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav mobile-nav--open"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
          >
            {navigation.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.a>
            ))}
            <a href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              <span>0{navigation.length + 1}</span>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
