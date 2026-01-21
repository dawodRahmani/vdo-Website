# VDO Website - Brand Colors & Implementation Notes

## Brand Colors
- **#00B7EC** - Light cyan/turquoise (primary accent)
- **#23369C** - Dark blue (primary brand color)
- **#BDBFC1** - Gray (secondary)

---

## Afghanistan Map Implementation (January 2026)

### Overview
Interactive SVG map of Afghanistan showing VDO's regional presence with color-coded regions and office location pins.

### Files Modified
1. **`resources/js/components/afghanistan-map.tsx`** - Main map component
2. **`database/seeders/RegionSeeder.php`** - Region colors and data
3. **`resources/js/pages/home.tsx`** - Home page with map section
4. **`resources/js/pages/work/where-we-work.tsx`** - Dedicated where we work page

### Region Colors (from database)
| Region | Slug | Color |
|--------|------|-------|
| North Eastern | north-eastern | #00B7EC |
| Northern | northern | #23369C |
| Western | western | #00B7EC |
| Central | central | #1E5FAF |
| Eastern | eastern | #2B4A9D |
| Central Highland | central-highland | #3498DB |
| South Eastern | south-eastern | #5BC0DE |
| Southern | southern | #1A4B8C |

### Pin Locations (hardcoded in component)
Coordinates based on SVG viewBox (1000x762):

| City | Province | X% | Y% | Pin Color | Dot Color |
|------|----------|----|----|-----------|-----------|
| Kabul | Central | 59.2 | 44.6 | #23369C | #E74C3C |
| Mazar-e-Sharif | Balkh | 45.8 | 22.2 | #FF6B35 | #FF6B35 |
| Jalalabad | Nangarhar | 67.5 | 48.1 | #E74C3C | #2ECC71 |
| Herat | Herat | 13.7 | 47.1 | #E74C3C | #2ECC71 |
| Kandahar | Kandahar | 36.5 | 79.1 | #E74C3C | #F1C40F |
| Faryab | Faryab | 30.8 | 32.3 | #9B59B6 | #9B59B6 |

### SVG Province Mapping
The SVG file (`public/images/af.svg`) contains province paths with IDs like `AFKBL` (Kabul), `AFBAL` (Balkh), etc. The `provinceToRegion` object in the component maps these codes to region slugs.

### Key Features
- **Dynamic region colors** - Colors come from `regions` table via Laravel
- **Interactive tooltips** - Hover over regions to see name/description
- **Pin markers** - Show office locations with hover tooltips displaying:
  - City name
  - Region
  - Office type (Head Office, Regional Office, Field Office)
  - Beneficiary stats
- **Unmapped provinces** - Use brand colors (#00B7EC, #23369C, #BDBFC1) cycling

### To Make Pins Dynamic (Future Enhancement)
1. Create `offices` or `map_pins` database table
2. Add fields: name, region, description, stats, x_position, y_position, pin_color, dot_color, is_active
3. Create admin interface for CRUD operations
4. Pass pins as props from Laravel to React component

### Commands to Update Region Colors
```bash
php artisan db:seed --class=RegionSeeder
```

---

## Session: Opportunities & Where We Work Pages (January 2026)

### 1. Opportunities Page Created
**Files:**
- `resources/js/pages/opportunities/index.tsx` - Main opportunities page with filter and search
- `routes/web.php` - Added `/opportunities` route and section routes

**Features:**
- Combined view of all opportunity types (Bids, Jobs, Volunteer, Participation)
- **Filter functionality** - Filter tabs to show All, Jobs, Bids, Volunteer, or Participation
- **Search functionality** - Search bar to filter by title, description, location, or category
- Quick link cards to navigate to specific opportunity detail pages
- Content based on `Opportunities.docx` document

**Navigation:** Added "All Opportunities" link to header dropdown menu

---

### 2. Where We Work Page Updated
**Files:**
- `resources/js/pages/work/where-we-work.tsx` - Complete rewrite with detailed region info
- `routes/web.php` - Added `/where-we-work` routes with regional section routes
- `resources/js/components/header.tsx` - Updated navigation links

**Content from `Where we work.docx`:**
- 6 Regions with detailed descriptions:
  1. **Central Region** - Education, Economic Growth, Urban Development, Emergency Response
  2. **Northern Region** - Education, Economic Growth, Urban Development, Health & Nutrition
  3. **Eastern Region** - Education, Economic Growth, Urban Development, Health & Nutrition
  4. **Western Region** - Education, Economic Growth, Urban Development, Health & Nutrition
  5. **Southern Region** - Education, Economic Growth, Urban Development, Health & Nutrition
  6. **North-Western Region** (newly added) - Education, Economic Growth, Urban Development, Health & Nutrition

**Features:**
- Each region has color-coded header with provinces and statistics
- 4 program areas per region with icons and descriptions
- Summary statement for each region
- Scroll-to functionality for each section (map, area-based, offices, regions)
- Integrated Afghanistan Map component
- Office locations section

**Routes added:**
```
/where-we-work              - Overview page
/where-we-work/map          - Scrolls to map section
/where-we-work/area-based   - Scrolls to area-based information
/where-we-work/offices      - Scrolls to offices section
/where-we-work/central      - Scrolls to Central Region
/where-we-work/northern     - Scrolls to Northern Region
/where-we-work/eastern      - Scrolls to Eastern Region
/where-we-work/western      - Scrolls to Western Region
/where-we-work/southern     - Scrolls to Southern Region
/where-we-work/northwestern - Scrolls to North-Western Region
```

---

### 3. Afghanistan Map Component Fix
**File:** `resources/js/components/afghanistan-map.tsx`

**Issue:** `Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')` when opening Where We Work page

**Fix:**
- Made `regions` prop optional in interface: `regions?: Region[]`
- Added fallback for undefined regions: `(regions || []).reduce(...)`
- Updated useEffect dependency array to just `[regions]`

---

### Navigation Structure Updates (header.tsx)

**Where We Work dropdown:**
```
Overview           → /where-we-work
Map                → /where-we-work/map
Area-Based Info    → /where-we-work/area-based
Central Region     → /where-we-work/central
Northern Region    → /where-we-work/northern
Eastern Region     → /where-we-work/eastern
Western Region     → /where-we-work/western
Southern Region    → /where-we-work/southern
North-Western      → /where-we-work/northwestern
Our Offices        → /where-we-work/offices
```

**Opportunities dropdown:**
```
All Opportunities  → /opportunities
Bids               → /opportunities/bids
Jobs               → /opportunities/jobs
Volunteer          → /opportunities/volunteers
Participation      → /opportunities/participation
```

---

### Source Documents Used
- `Opportunities.docx` - Content for Bids, Jobs, Volunteer, Participation descriptions
- `Where we work.docx` - Area-based information for 6 regions of Afghanistan



















