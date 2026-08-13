# Project Reclaim Validation Record

## Public Portal Routes

The landing page, initiative overview, project registry, partnership page, workforce and opportunities page, evidence and impact page, NEXINUS and Root connection page, and contact page were visually reviewed at desktop (1280 × 720) and mobile (375 × 812) breakpoints. The public navigation collapses to an accessible menu button on mobile, and each page retains a visible route back to the central portal through the sticky header and footer.

## Owner Workspace

The owner workspace was reviewed at desktop and mobile breakpoints. Its query procedures are restricted to the authenticated `OWNER_OPEN_ID` on the server, and its interface confirms owner access only after the protected access query succeeds. The inquiry list, filtering controls, status select, alert-status marker, and empty state all render at both breakpoints.

## Accessibility-Critical Paths

The portal uses semantic navigation landmarks, route links, native buttons, labelled form inputs, labelled text areas, form validation requirements, a labelled mobile navigation control, and a labelled status selector. Visible focus treatment is supplied through the shared theme tokens. Contact and partnership form fields are keyboard reachable in document order, and their submit controls are native buttons.

### Explicit Keyboard-Control Review

The mobile menu trigger is a native `<button>` with both `aria-label` and `aria-expanded`; it therefore supports standard keyboard activation by Enter and Space and exposes its state to assistive technology. The contact and partnership flows use explicit `<label>` associations for every input and text area, followed by a native submit button. The owner dashboard uses native filter buttons, a labelled search input, and a native labelled `<select>` for changing inquiry status. These controls preserve the browser’s expected Tab, Shift+Tab, Enter, Space, and Arrow-key behavior without custom keyboard handlers that could interfere with it.

## Automated and Runtime Checks

`pnpm check` completed successfully. `pnpm test` completed successfully with five tests across the authentication and inquiry suites, covering validation, public registry and opportunity response contracts, owner-alert triggering, and rejected non-owner inquiry access. The development console was reset and the landing, partnership, contact, and owner-dashboard routes were reloaded. No Project Reclaim application error was recorded; the only warning and rejection observed came from the installed MetaMask browser extension while it attempted to restore its own session, which is outside the portal application.
