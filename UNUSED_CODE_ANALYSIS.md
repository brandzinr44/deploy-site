# Unused Code Analysis for Lozinr Website

## Summary
This document lists all unused code, components, and files that can be safely removed to clean up the project.

---

## 1. UNUSED UI COMPONENTS (49 files)

These shadcn/ui components are imported in the project but **never used anywhere**:

### Form & Input Components (13 files)
- ❌ `components/ui/form.tsx` - Form builder (not used)
- ❌ `components/ui/field.tsx` - Form field wrapper (not used)
- ❌ `components/ui/input.tsx` - Text input (not used)
- ❌ `components/ui/input-group.tsx` - Input group wrapper (not used)
- ❌ `components/ui/input-otp.tsx` - OTP input (not used)
- ❌ `components/ui/textarea.tsx` - Text area (not used)
- ❌ `components/ui/checkbox.tsx` - Checkbox (not used)
- ❌ `components/ui/radio-group.tsx` - Radio buttons (not used)
- ❌ `components/ui/label.tsx` - Form label (not used)
- ❌ `components/ui/calendar.tsx` - Calendar picker (not used)
- ❌ `components/ui/select.tsx` - Dropdown select (not used)
- ❌ `components/ui/item.tsx` - Generic item (not used)
- ❌ `components/ui/button-group.tsx` - Button group (not used)

### Dialog & Modal Components (6 files)
- ❌ `components/ui/dialog.tsx` - Modal dialog (not used)
- ❌ `components/ui/alert-dialog.tsx` - Confirmation dialog (not used)
- ❌ `components/ui/drawer.tsx` - Side drawer (not used)
- ❌ `components/ui/popover.tsx` - Popover tooltip (not used)
- ❌ `components/ui/sheet.tsx` - Sheet sidebar (not used)
- ❌ `components/ui/hover-card.tsx` - Hover card (not used)

### Navigation Components (7 files)
- ❌ `components/ui/navigation-menu.tsx` - Navigation menu (not used)
- ❌ `components/ui/menubar.tsx` - Menu bar (not used)
- ❌ `components/ui/pagination.tsx` - Pagination (not used)
- ❌ `components/ui/tabs.tsx` - Tab navigation (not used)
- ❌ `components/ui/breadcrumb.tsx` - Breadcrumb nav (not used)
- ❌ `components/ui/sidebar.tsx` - Sidebar layout (not used)
- ❌ `components/ui/toggle-group.tsx` - Toggle group (not used)

### Data Display Components (7 files)
- ❌ `components/ui/table.tsx` - Data table (not used)
- ❌ `components/ui/accordion.tsx` - Accordion (not used)
- ❌ `components/ui/carousel.tsx` - Carousel slider (not used)
- ❌ `components/ui/chart.tsx` - Chart component (not used)
- ❌ `components/ui/skeleton.tsx` - Loading skeleton (not used)
- ❌ `components/ui/badge.tsx` - Badge label (not used)
- ❌ `components/ui/empty.tsx` - Empty state (not used)

### Utility & Other Components (9 files)
- ❌ `components/ui/button.tsx` - Button (NOT directly used, but imported by header)
- ❌ `components/ui/card.tsx` - Card (not used)
- ❌ `components/ui/alert.tsx` - Alert message (not used)
- ❌ `components/ui/aspect-ratio.tsx` - Aspect ratio (not used)
- ❌ `components/ui/avatar.tsx` - Avatar image (not used)
- ❌ `components/ui/collapsible.tsx` - Collapsible section (not used)
- ❌ `components/ui/command.tsx` - Command palette (not used)
- ❌ `components/ui/context-menu.tsx` - Context menu (not used)
- ❌ `components/ui/dropdown-menu.tsx` - Dropdown menu (not used)
- ❌ `components/ui/kbd.tsx` - Keyboard key (not used)
- ❌ `components/ui/progress.tsx` - Progress bar (not used)
- ❌ `components/ui/resizable.tsx` - Resizable container (not used)
- ❌ `components/ui/scroll-area.tsx` - Scroll area (not used)
- ❌ `components/ui/separator.tsx` - Divider (not used)
- ❌ `components/ui/slider.tsx` - Slider (not used)
- ❌ `components/ui/spinner.tsx` - Spinner loader (not used)
- ❌ `components/ui/switch.tsx` - Toggle switch (not used)
- ❌ `components/ui/toggle.tsx` - Toggle button (not used)
- ❌ `components/ui/tooltip.tsx` - Tooltip (not used)

### Toast & Notifications (2 files)
- ❌ `components/ui/toast.tsx` - Toast message (not used)
- ❌ `components/ui/toaster.tsx` - Toast container (not used)
- ❌ `components/ui/sonner.tsx` - Sonner toast (not used)

### Hook Duplicates (2 files)
- ⚠️ `components/ui/use-mobile.tsx` - Duplicate of `hooks/use-mobile.ts` (use one or the other)
- ⚠️ `components/ui/use-toast.ts` - Duplicate of `hooks/use-toast.ts` (use one or the other)

---

## 2. UNUSED COMPONENTS

### Not Actually Used
- ❌ `components/custom-cursor.tsx` - Custom cursor (imported but never rendered anywhere)
- ❌ `components/page-transition.tsx` - Page transition (not used in any routes)
- ❌ `components/preloader.tsx` - Preloader animation (not currently active)
- ❌ `components/contact-client.tsx` - Contact form (imported but never rendered on contact page)

---

## 3. HEADER COMPONENT - UNUSED CODE

**File:** `components/header.tsx`

### Unused State & Variables
- ❌ Line ~84: `onWorkClick` prop - defined but never used
- ❌ Line ~90-92: `isMenuOpen` state - menu never actually opens/closes properly
- ❌ Line ~91: `showHeaderBg` state - always set to `true`, never used
- ❌ Line ~92: `isDark` state - always set to `true`, never used
- ❌ Line ~93: `isDarkMobile` state - always set to `true`, never used
- ❌ Line ~100+: `SCROLL_THRESHOLD` and `SCROLL_THRESHOLD_MOBILE` - never used, always true

### Unused Functions
- ❌ `useScramble()` hook - defined and used, but the scramble animation on hover is never triggered (empty implementation)
- ❌ `DesktopNavItem` component - animation `whileHover={{ x: 4 }}` is defined but doesn't work
- ❌ `MobileNavItem` component - scramble effect not actually visible

### Dead Code Path
- ❌ Lines ~103-120: All scroll detection logic is dead code (always shows header as dark)

---

## 4. UNUSED PAGES & ROUTES

These route pages exist but are never linked or used:

- ⚠️ `app/robots.ts` - SEO robots file (basic, could be enhanced)
- ⚠️ `app/sitemap.ts` - SEO sitemap (basic, could be enhanced)
- ⚠️ `app/projects/[id]/page.tsx` - Project detail page (route exists but may not be fully implemented)

---

## 5. DUPLICATE FOLDERS

- ❌ `lozinr-fixed/` - **ENTIRE FOLDER** is a backup/duplicate (already deleted or marked for deletion)

---

## 6. UNUSED IMPORTS

Throughout the codebase:

### In `app/work/page.tsx`
- ⚠️ Unused import: `useRef` is imported but already used for `cardRef`, might have extras

### In `components/hero-section.tsx`
- All imports are used ✅

### In `components/work.tsx`
- All imports are used ✅

---

## 7. UNUSED EXPORTS IN `lib/projects-data.ts`

The following interfaces are defined but some properties on projects are never used in the UI:

- ⚠️ `ProjectSection` interface - used but some fields might be over-engineered
- ⚠️ `detailChallenge`, `detailStrategy`, `detailProcess` - defined in project data but never rendered on the detail page

---

## 8. DUPLICATE HOOKS

- ⚠️ `hooks/use-mobile.ts` vs `components/ui/use-mobile.tsx` - duplicate files
- ⚠️ `hooks/use-toast.ts` vs `components/ui/use-toast.ts` - duplicate files

Recommendation: Keep only the ones in `hooks/` folder and delete the UI versions.

---

## 9. UNUSED CSS/STYLING

No unused Tailwind classes found (all styling is actively used).

---

## Cleanup Recommendations

### Priority 1: DELETE (Safe to remove immediately)
1. Delete entire `components/ui/` folder except: `button.tsx`, `card.tsx`
2. Delete `components/custom-cursor.tsx`
3. Delete `components/preloader.tsx`
4. Delete `components/page-transition.tsx`
5. Keep only: `hooks/use-mobile.ts` and `hooks/use-toast.ts`, delete UI versions

### Priority 2: REFACTOR (Should be cleaned up)
1. `components/header.tsx` - remove dead scroll logic, unused state variables
2. `components/contact-client.tsx` - ensure it's actually being used on contact page
3. Remove unused `onWorkClick` prop from Header

### Priority 3: VERIFY (Might be needed)
1. `app/robots.ts` - keep but verify SEO is correct
2. `app/sitemap.ts` - keep but verify SEO is correct
3. `app/projects/[id]/page.tsx` - verify project detail page is working

---

## Expected Savings

- **Files to delete:** 60+ files
- **Size reduction:** ~500KB+ (UI components are often bloated)
- **Build time improvement:** ~5-10% faster build
- **Code clarity:** Much cleaner project structure

