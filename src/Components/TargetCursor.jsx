// ─────────────────────────────────────────────────
// src/components/TargetCursor.jsx
//
// This is the animated target cursor, ported from the
// React Bits library and converted to plain JS + React.
//
// How it works:
//   • A small dot and 4 corner brackets follow the mouse
//   • When idle  → the whole cursor slowly spins (GSAP)
//   • When hovering a .cursor-target element
//     → the 4 corners snap to surround that element
//     → the spin stops
//   • When the mouse leaves → corners return to idle
//   • On mobile → the cursor is hidden (returns null)
//
// GSAP is loaded as a global via CDN in public/index.html
// so we access it as window.gsap
// ─────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

// Props this component accepts (all have defaults):
//   targetSelector  — CSS class to lock onto (default ".cursor-target")
//   spinDuration    — seconds for one idle spin (default 2)
//   hideDefaultCursor — hide the normal browser cursor (default true)
//   hoverDuration   — how fast corners snap onto target (default 0.2)
//   parallaxOn      — subtle parallax while locked on target (default true)
function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) {
  // useRef stores references to the DOM nodes so we can animate them.
  // We use ref instead of getElementById because React manages the DOM.
  const cursorRef = useRef(null); // the outer wrapper div
  const dotRef = useRef(null); // the centre dot

  useEffect(() => {
    // ── 1. Check if we are on mobile ──────────────────────────────
    // On mobile/touch devices we do nothing — the cursor stays hidden.
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const ua = (navigator.userAgent || '').toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    const isMobile = (hasTouchScreen && isSmallScreen) || isMobileUA;

    if (isMobile) return; // bail out early — nothing to set up

    // ── 2. Get the real DOM nodes from our refs ───────────────────
    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;

    // Select all 4 corner divs inside the cursor wrapper
    const corners = Array.from(cursorEl.querySelectorAll('.target-cursor-corner'));

    // GSAP sizes for the corners (must match CSS)
    const BORDER_WIDTH = 3;
    const CORNER_SIZE = 12;

    // ── 3. Hide the default browser cursor ───────────────────────
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    // ── 4. Position cursor at screen centre on start ──────────────
    // window.gsap — because GSAP is loaded via CDN as a global
    window.gsap.set(cursorEl, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // ── 5. Idle spin animation ────────────────────────────────────
    // spinTl is a GSAP timeline that rotates the cursor 360° forever
    let spinTl = null;

    function createSpinTl() {
      if (spinTl) spinTl.kill(); // kill any existing spin first
      spinTl = window.gsap.timeline({ repeat: -1 }) // repeat: -1 = loop forever
        .to(cursorEl, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
    createSpinTl();

    // ── 6. Mouse tracking ─────────────────────────────────────────
    // Every time the mouse moves, smoothly move the cursor to follow it
    function moveCursor(x, y) {
      window.gsap.to(cursorEl, { x, y, duration: 0.1, ease: 'power3.out' });
    }
    window.addEventListener('mousemove', (e) => moveCursor(e.clientX, e.clientY));

    // ── 7. Parallax ticker ────────────────────────────────────────
    // While locked on a target, this runs every frame to keep the
    // corners aligned even if the user moves the mouse slightly
    let activeStrength = 0;   // 0 = not locked, 1 = fully locked
    let targetCornerPositions = null; // pixel positions for each corner
    let tickerActive = false;

    function tickerFn() {
      if (!targetCornerPositions || activeStrength === 0) return;

      // Get where the cursor wrapper currently is
      const curX = window.gsap.getProperty(cursorEl, 'x');
      const curY = window.gsap.getProperty(cursorEl, 'y');

      corners.forEach((corner, i) => {
        // Current corner position
        const cX = window.gsap.getProperty(corner, 'x');
        const cY = window.gsap.getProperty(corner, 'y');

        // Where the corner SHOULD be (relative to cursor centre)
        const tX = targetCornerPositions[i].x - curX;
        const tY = targetCornerPositions[i].y - curY;

        // Interpolate towards target using activeStrength (0→1)
        const fX = cX + (tX - cX) * activeStrength;
        const fY = cY + (tY - cY) * activeStrength;
        const dur = activeStrength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        window.gsap.to(corner, {
          x: fX, y: fY,
          duration: dur,
          ease: dur === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        });
      });
    }

    // ── 8. Hover targeting ───────────────────────────────────────
    // When the mouse enters a .cursor-target element:
    //   • stop spinning
    //   • snap corners to surround the element's bounding box
    let activeTarget = null; // the element currently being targeted
    let currentLeaveHandler = null; // the mouseleave listener for cleanup
    let resumeTimeout = null; // timer to restart the spin after leaving

    // Helper: remove the current mouseleave listener from a target
    function cleanupTarget(target) {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    }

    // Listen for ANY mouseover on the page, then check if it is a target
    window.addEventListener('mouseover', (e) => {
      // Walk up the DOM tree to find if we hovered a .cursor-target
      let el = e.target;
      let target = null;
      while (el && el !== document.body) {
        if (el.matches(targetSelector)) { target = el; break; }
        el = el.parentElement;
      }
      if (!target) return; // not a target — ignore
      if (activeTarget === target) return; // already locked on this one
      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }

      activeTarget = target;

      // Stop spin
      corners.forEach((c) => window.gsap.killTweensOf(c));
      window.gsap.killTweensOf(cursorEl, 'rotation');
      spinTl?.pause();
      window.gsap.set(cursorEl, { rotation: 0 });

      // Calculate where each corner should go
      const rect = target.getBoundingClientRect(); // element position on screen
      const curX = window.gsap.getProperty(cursorEl, 'x');
      const curY = window.gsap.getProperty(cursorEl, 'y');

      // 4 corners: top-left, top-right, bottom-right, bottom-left
      targetCornerPositions = [
        { x: rect.left - BORDER_WIDTH, y: rect.top - BORDER_WIDTH },
        { x: rect.right + BORDER_WIDTH - CORNER_SIZE, y: rect.top - BORDER_WIDTH },
        { x: rect.right + BORDER_WIDTH - CORNER_SIZE, y: rect.bottom + BORDER_WIDTH - CORNER_SIZE },
        { x: rect.left - BORDER_WIDTH, y: rect.bottom + BORDER_WIDTH - CORNER_SIZE },
      ];

      // Animate activeStrength from 0 → 1 over hoverDuration seconds
      const proxy = { v: 0 };
      window.gsap.to(proxy, {
        v: 1,
        duration: hoverDuration,
        ease: 'power2.out',
        onUpdate() { activeStrength = proxy.v; },
      });

      // Also immediately animate each corner to its target position
      corners.forEach((corner, i) => {
        window.gsap.to(corner, {
          x: targetCornerPositions[i].x - curX,
          y: targetCornerPositions[i].y - curY,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      // Start the ticker if not already running
      if (!tickerActive) {
        window.gsap.ticker.add(tickerFn);
        tickerActive = true;
      }

      // ── Mouse LEAVE handler ──────────────────────────────────
      // When the mouse leaves the target, return corners to idle positions
      const onLeave = () => {
        window.gsap.ticker.remove(tickerFn);
        tickerActive = false;
        activeStrength = 0;
        targetCornerPositions = null;
        activeTarget = null;

        // Animate corners back to their idle (spread) positions
        window.gsap.killTweensOf(corners);
        const idle = [
          { x: -CORNER_SIZE * 1.5, y: -CORNER_SIZE * 1.5 },
          { x: CORNER_SIZE * 0.5, y: -CORNER_SIZE * 1.5 },
          { x: CORNER_SIZE * 0.5, y: CORNER_SIZE * 0.5 },
          { x: -CORNER_SIZE * 1.5, y: CORNER_SIZE * 0.5 },
        ];
        const tl = window.gsap.timeline();
        corners.forEach((corner, i) => {
          tl.to(corner, { x: idle[i].x, y: idle[i].y, duration: 0.3, ease: 'power3.out' }, 0);
        });

        // After a tiny delay, restart the idle spin
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && spinTl) {
            const cur = window.gsap.getProperty(cursorEl, 'rotation') % 360;
            spinTl.kill();
            spinTl = window.gsap.timeline({ repeat: -1 })
              .to(cursorEl, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            window.gsap.to(cursorEl, {
              rotation: cur + 360,
              duration: spinDuration * (1 - cur / 360),
              ease: 'none',
              onComplete: () => spinTl?.restart(),
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentLeaveHandler = onLeave;
      target.addEventListener('mouseleave', onLeave);
    }, { passive: true });

    // ── 9. Scroll check ────────────────────────────────────────
    // If the page scrolls while locked on a target, check if
    // the cursor is still over the target — if not, leave
    window.addEventListener('scroll', () => {
      if (!activeTarget) return;
      const mx = window.gsap.getProperty(cursorEl, 'x');
      const my = window.gsap.getProperty(cursorEl, 'y');
      const hit = document.elementFromPoint(mx, my);
      const still = hit && (hit === activeTarget || hit.closest(targetSelector) === activeTarget);
      if (!still && currentLeaveHandler) currentLeaveHandler();
    }, { passive: true });

    // ── 10. Click press effect ─────────────────────────────────
    // Scale down slightly on mousedown, back up on mouseup
    window.addEventListener('mousedown', () => {
      window.gsap.to(dotEl, { scale: 0.7, duration: 0.3 });
      window.gsap.to(cursorEl, { scale: 0.9, duration: 0.2 });
    });
    window.addEventListener('mouseup', () => {
      window.gsap.to(dotEl, { scale: 1, duration: 0.3 });
      window.gsap.to(cursorEl, { scale: 1, duration: 0.2 });
    });

    // ── 11. Cleanup on unmount ────────────────────────────────
    // React calls this when the component is removed from the page.
    // We must remove all event listeners and kill GSAP timelines
    // to prevent memory leaks.
    return () => {
      window.gsap.ticker.remove(tickerFn);
      document.body.style.cursor = '';
      if (spinTl) spinTl.kill();
    };

    // We list all props in the dependency array so if a parent
    // changes a prop, the effect re-runs cleanly.
  }, [targetSelector, spinDuration, hideDefaultCursor, hoverDuration, parallaxOn]);

  // ── On mobile: render nothing ──────────────────────────────
  const hasTouchScreen = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (hasTouchScreen && isSmallScreen) return null;

  // ── Render: 4 corner divs + 1 centre dot ──────────────────
  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      {/* Centre dot — visible at all times */}
      <div ref={dotRef} className="target-cursor-dot" />

      {/* Four L-shaped corner brackets */}
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}

export default TargetCursor;
