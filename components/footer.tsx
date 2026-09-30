import { navigation, profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <span>End note / 2026</span>
        <p>Have a project that needs both product thinking and technical execution?</p>
      </div>

      <a className="footer-cta" href={`mailto:${profile.email}`}>
        <span>Start a conversation</span>
        <strong>LET&apos;S BUILD</strong>
        <i aria-hidden="true">↗</i>
      </a>

      <div className="footer-directory">
        <div className="footer-identity">
          <a className="footer-mark" href="#top">M/A</a>
          <p>{profile.name}<br />{profile.role}</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>India / IST</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}