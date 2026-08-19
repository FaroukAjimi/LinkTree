"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";

export default function Home() {
  const templates = useMemo(
    () => [
      // Option 1
      {
        id: "tpl-Star Vision",
        layout: "stack",
        title: "Star Vision",
        imageSrc: "/MainMenu.jpg",
        aboutTitle: "About",
        description:
          "Design a light show for any song.\n\nStar Vision lets you upload a song, split it into sections, and program synced lighting visuals then play the track back with your custom light show.",

        // Videos (Walkthrough + Results)
        ctaLinks: [
          {
            title: "Results",
            url: "https://youtu.be/m-3JQ0eiNTI",
            icon: "▶",
          },
        ],

        // Download
        dwnlLinks: [
          {
            title: "GameJolt",
            url: "https://gamejolt.com/games/StarVision/1092934", // put file in /public/downloads/star-vision.zip
            icon: "",
            download: false,
          },
        ],
      },

      // Option 2
      {
        id: "tpl-Owl Insight",
        layout: "stack",
        title: "Owl Insight",
        imageSrc: "/owl.jpg",
        aboutTitle: "About",
        description: "Owl Insight is a third-person memory-and-puzzle game with dual gameplay: scout the night as an owl flying between trees to observe and gather clues then return as Traveller as the same events unfold again at the exact same time.",
                ctaLinks: [
          {
            title: "GameJolt",
            url: "https://gamejolt.com/games/OwlInsight/1092969",
            icon: "▶",
          },
        ]

      },

      // Option 3
      {
        id: "tpl-twitter",
        layout: "stack",
        title: "Twitter / X",
        imageSrc: "/images/x.png",
        aboutTitle: "About",
        description: "Default description (this is the description).",
      },

      // Option 4
      {
        id: "tpl-contact",
        layout: "menu",
        title: "Contact",
        buttons: [
          { title: "fbenajimi@gmail.com", url: "mailto:fbenajimi@gmail.com", icon: "" },
          {
            title: "LinkedIn",
            url: "https://www.linkedin.com/in/farouk-ben-ajimi-79a557365/",
            icon: "",
          },
          { title: "GitHub", url: "https://github.com/FaroukAjimi", icon: "" },
          { title: "Meduim", url: "https://medium.com/@faroukbenajimi", icon: "" },
        ],
      },
    ],
    []
  );

  const links = [
    { title: "Star Vision", icon: "", templateId: "tpl-Star Vision" },
    { title: "Owl Insight", icon: "", templateId: "tpl-Owl Insight" },
    {
      title: "Medium : How I designed Guard Patrol for Owl Insight",
      url: "https://faroukbenajimi.medium.com/how-i-designed-guard-patrol-for-owl-insight-add30f0c6c8a",
      icon: "",
    },
    {
      title: "Medium : System Scalability in game development",
      url: "https://faroukbenajimi.medium.com/system-scalability-in-game-development-1b66c0271ce7",
      icon: "",
    },
    { title: "Contact", url: "#", icon: "", templateId: "tpl-contact" },
  ];

  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const activeTemplate = templates.find((t) => t.id === activeTemplateId) ?? null;

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: (typeof links)[number]) => {
    if (link.templateId) {
      e.preventDefault();
      setActiveTemplateId(link.templateId);
    }
  };

  // Stars
  useEffect(() => {
    const makeShadowList = (count: number, w: number, h: number, big = false) => {
      const shadows = [];
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * w);
        const y = Math.floor(Math.random() * h);
        const a = (Math.random() * 0.65 + 0.2).toFixed(2);
        const blur = big ? Math.floor(Math.random() * 2) : 0;
        const spread = big ? Math.floor(Math.random() * 2) : 0;
        shadows.push(`${x}px ${y}px ${blur}px ${spread}px rgba(255,255,255,${a})`);
      }
      return shadows.join(", ");
    };

    const generateStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const smallCount = Math.floor((w * h) / 4500);
      const largeCount = Math.floor((w * h) / 3500);

      document.body.style.setProperty("--stars-sm", makeShadowList(smallCount, w, h, false));
      document.body.style.setProperty("--stars-lg", makeShadowList(largeCount, w, h, true));

      document.body.style.setProperty("--twinkle-delay-sm", `${Math.random() * -6}s`);
      document.body.style.setProperty("--twinkle-delay-lg", `${Math.random() * -8}s`);
    };

    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="content-wrapper">
          {!activeTemplate ? (
            <>
              <div className="profile-section">
                <h1 className="profile-title">Farouk Ben Ajimi</h1>
              </div>

              <div className="links-container">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url ?? "#"}
                    target={link.templateId ? undefined : "_blank"}
                    rel={link.templateId ? undefined : "noopener noreferrer"}
                    className="link-button"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span>
                      {link.title.split("\n").map((line, i) => (
                        <Fragment key={i}>
                          {i > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </span>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="template-header">
                <button type="button" className="return-button" onClick={() => setActiveTemplateId(null)}>
                  ← Return
                </button>
                <h2 className="template-title">{activeTemplate.title}</h2>
              </div>

              {activeTemplate.layout === "stack" && (
                <div className="template-content">
                  {activeTemplate.imageSrc && (
                    <img className="template-image" src={activeTemplate.imageSrc} alt="" />
                  )}

                  <h3 className="template-section-title">{activeTemplate.aboutTitle}</h3>
                  <p className="template-description">{activeTemplate.description}</p>

                  {/* CTA (videos) */}
                  {(activeTemplate.ctaLinks?.length ?? 0) > 0 && (
                    <div className="template-cta">
                      {(activeTemplate.ctaLinks ?? []).map((btn, idx) => (
                        <a
                          key={idx}
                          href={btn.url}
                          className="link-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="link-icon">{btn.icon}</span>
                          <span>{btn.title}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Download */}
                  {(activeTemplate.dwnlLinks?.length ?? 0) > 0 && (
                    <div className="template-dwnl">
                      {(activeTemplate.dwnlLinks ?? []).map((btn, idx) => (
                        <a
                          key={idx}
                          href={btn.url}
                          className="link-button"
                          target={btn.download ? undefined : "_blank"}
                          rel={btn.download ? undefined : "noopener noreferrer"}
                          download={btn.download ? "" : undefined}
                        >
                          <span className="link-icon">{btn.icon}</span>
                          <span>{btn.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTemplate.layout === "center" && (
                <div className="template-content template-content--center">
                  {activeTemplate.imageSrc && (
                    <img className="template-image template-image--center" src={activeTemplate.imageSrc} alt="" />
                  )}
                  <h3 className="template-section-title">{activeTemplate.aboutTitle}</h3>
                  <p className="template-description">{activeTemplate.description}</p>
                </div>
              )}

              {activeTemplate.layout === "split" && (
                <div className="template-content template-content--split">
                  {activeTemplate.imageSrc && (
                    <img className="template-image template-image--split" src={activeTemplate.imageSrc} alt="" />
                  )}
                  <div className="template-split-text">
                    <h3 className="template-section-title">{activeTemplate.aboutTitle}</h3>
                    <p className="template-description">{activeTemplate.description}</p>
                  </div>
                </div>
              )}

              {activeTemplate.layout === "menu" && (
                <div className="links-container">
                  {(activeTemplate.buttons ?? []).map((btn, idx) => (
                    <a key={idx} href={btn.url} target="_blank" rel="noopener noreferrer" className="link-button">
                      <span className="link-icon">{btn.icon}</span>
                      <span>
                        {btn.title.split("\n").map((line, i) => (
                          <Fragment key={i}>
                            {i > 0 && <br />}
                            {line}
                          </Fragment>
                        ))}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}