"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation, profile } from "@/lib/portfolio-data";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
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
            <small>Product & AI engineer</small>
          </span>
        </a>

        <div className="desktop-nav">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? "nav-link--active" : ""}
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