CHAMOS TECH - AI PROJECT RULES
Company Context

Chamos Tech is a professional software development firm that builds custom systems for businesses and organizations.

Core message:

"We Build Solutions. You Build The Future."

The website must communicate:

Trust
Professionalism
Technical expertise
Modern software engineering
Business growth through technology

Avoid startup gimmicks, flashy animations, gaming aesthetics, or overly playful designs.

Brand Colors

Use colors inspired by the Chamos Tech logo.

Primary Colors
--primary-blue: #0066FF;
--secondary-blue: #009DFF;
--primary-orange: #FF8A00;
--secondary-orange: #FFB000;
Background Colors
--bg-dark: #031633;
--bg-card: #082147;
--bg-light: #F8FAFC;
Text Colors
--text-primary: #FFFFFF;
--text-secondary: #D1D5DB;
--text-dark: #111827;
Design Principles
Always
Clean and modern
Enterprise-level appearance
Mobile-first responsive design
Accessibility compliant
Professional spacing
Consistent typography
Never
Neon colors
Random gradients
Cartoon illustrations
Excessive shadows
Cluttered layouts
More than 2 accent colors per section
Typography

Preferred font stack:

font-family:
Inter,
Poppins,
system-ui,
sans-serif;

Headings:

font-weight: 700;

Body:

font-weight: 400;
line-height: 1.7;
Component Rules
Buttons

Primary:

background: var(--primary-orange);
color: white;

Hover:

transform: translateY(-2px);

Secondary:

border: 1px solid var(--primary-blue);
background: transparent;
Cards
border-radius: 16px;
padding: 24px;

Use subtle shadows only.

No glassmorphism.

Website Structure

Required sections:

Hero
Services
Why Choose Us
Industries Served
Development Process
Portfolio / Projects
Testimonials
FAQ
Contact Section
Footer
Hero Section Rules

Headline must clearly state what Chamos Tech does.

Examples:

Custom Software Solutions For Growing Businesses
We Build Systems That Scale With Your Business

Include:

CTA Button
Secondary CTA
Trust indicators
Services Section

Highlight services such as:

Custom Software Development
Web Applications
Mobile Applications
Business Automation
API Development
Database Design
Cloud Solutions
System Integrations
Code Quality Rules

Always:

Use TypeScript when possible
Follow SOLID principles
Create reusable components
Avoid duplicated code
Keep files under 300 lines where practical
Use meaningful naming conventions
React Rules

Always:

- Functional components only
- Custom hooks for reusable logic
- Context only when necessary
- Proper loading states
- Proper error handling

Never:

- Inline business logic inside JSX
- Massive components
- Unused state
- Unused imports
UI Rules

Always:

- Responsive
- Accessible
- Fast loading
- SEO friendly

Use:

Rounded corners
Soft shadows
Blue + Orange accents
Dark professional sections
White content sections
Content Tone

Voice:

Professional
Confident
Clear
Solution-focused

Avoid:

Buzzwords
Exaggerated claims
"World-class"
"Revolutionary"
"Best in the world"
AI Output Rules

Before generating code:

Check consistency with brand colors.
Check responsiveness.
Check accessibility.
Check SEO structure.
Check component reusability.
Ensure enterprise-level appearance.

If any generated section violates the Chamos Tech design system, regenerate it before presenting the final solution.


# SHADCN/UI ENFORCEMENT RULES

## Component Library

The project MUST use shadcn/ui components as the default UI system.

Before creating a custom component, verify that a shadcn/ui component does not already exist.

Priority order:

1. shadcn/ui
2. Radix UI primitives
3. Custom component (only when absolutely necessary)

---

## Allowed Components

Use shadcn/ui versions of:

* Button
* Card
* Input
* Textarea
* Label
* Form
* Dialog
* Drawer
* Sheet
* Select
* Combobox
* Popover
* Dropdown Menu
* Navigation Menu
* Tabs
* Accordion
* Alert
* Alert Dialog
* Badge
* Avatar
* Skeleton
* Table
* Pagination
* Tooltip
* Breadcrumb
* Separator
* Scroll Area

---

## Layout Rules

DO NOT create custom layout systems.

Use:

* Container
* Grid
* Flexbox
* Responsive Tailwind utilities

Prefer:

* max-w-7xl
* max-w-6xl
* mx-auto
* gap spacing system

Avoid:

* Arbitrary positioning
* Absolute positioning for layouts
* Fixed widths unless necessary

---

## Form Rules

All forms must use:

* React Hook Form
* Zod validation
* shadcn Form components

Never build forms manually if shadcn Form can be used.

---

## Dialog Rules

Use:

* Dialog
* Sheet
* AlertDialog

Do NOT create custom modals.

---

## Data Display Rules

Use:

* Table
* Card
* Accordion
* Tabs

Do NOT create custom table implementations unless a business requirement exists.

---

## Loading States

Use:

* Skeleton
* Spinner component

Every async operation must have:

* Loading state
* Error state
* Empty state

---

## Styling Rules

Use Tailwind utility classes.

Do NOT:

* Write large custom CSS files
* Create random utility classes
* Mix multiple styling systems

Preferred stack:

* Tailwind CSS
* shadcn/ui
* clsx
* tailwind-merge

---

## Component Creation Rules

Before creating a component ask:

1. Does shadcn already provide it?
2. Can Card solve this?
3. Can Dialog solve this?
4. Can Accordion solve this?
5. Can Tabs solve this?

If yes, use the existing component.

---

## Dashboard Rules

Dashboard pages should be built from:

* Card
* Table
* Tabs
* Badge
* Button
* Sheet

Avoid custom dashboard widgets.

---

## Design Consistency Rules

All pages must:

* Follow the Chamos Tech color system
* Follow the same spacing scale
* Follow the same border radius scale
* Use the same typography system
* Use the same shadcn component variants

Never introduce a new visual style without explicit approval.

---

## AI Generation Rule

When generating UI:

1. Prefer existing shadcn components.
2. Avoid creating custom components.
3. Avoid unusual layouts.
4. Maintain enterprise SaaS appearance.
5. Ensure mobile responsiveness.
6. Match Chamos Tech branding.
7. Keep the UI professional and client-facing.

If a shadcn component exists for the requirement, use it instead of building a custom solution.
DO NOT generate components from scratch when an equivalent
shadcn/ui component exists.

The project should look like a modern SaaS platform
(Stripe, Vercel, Linear, Notion, Clerk, Supabase),
not a Dribbble concept design.