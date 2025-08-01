# TODO - Guia Itala Sergipe

## 🐛 Bug Fixes

### Layout Issues
- [ ] **Fix layout shift on height when add first tour to WhatsApp tours list**
  - Issue: When first tour is selected, WhatsApp popup opens and causes layout shift
  - Location: `src/app/components/WhatsAppButton/index.tsx`
  - Priority: High

### Card Interactions
- [ ] **Fix card tour hover scale**
  - Issue: Scale animation not working properly on tour cards
  - Location: `src/app/components/Roteiros/index.tsx`
  - Current: `hover:scale-150` not working due to transform conflicts
  - Priority: Medium

### Mobile Responsiveness
- [ ] **Fix contact alignment on mobile**
  - Issue: Contact section alignment issues on mobile devices
  - Location: Contact component (need to identify exact file)
  - Priority: Medium

## 🔄 Integrations & Setup

### Notion Integration
- [ ] **Create new workspace on Notion and reintegrate**
  - Action: Set up new Notion workspace
  - Update: Environment variables and database IDs
  - Test: API integration with new workspace
  - Priority: High

## 📞 WhatsApp API Issues

### Desktop App Integration
- [ ] **Investigate why WhatsApp API does not send custom message when popup to open the desktop app appears**
  - Issue: Custom message not being sent when desktop app popup appears
  - Investigation: WhatsApp Web API behavior
  - Priority: Medium

## 📋 Content & Feedback

### Client Review
- [ ] **Send current site to Itala and ask for feedback**
  - Action: Deploy current version
  - Send: Link to Itala for review
  - Collect: Feedback on design, content, and functionality
  - Priority: High

## 🎯 Current Task

### CTA Buttons
- [ ] **Add WhatsApp link to all CTA buttons that applies**
  - Action: Update all relevant CTA buttons with WhatsApp integration
  - Priority: Immediate

---

## 📝 Notes

- All WhatsApp links should use format: `https://wa.me/557996411312?text=ENCODED_MESSAGE`
- Ensure proper URL encoding for custom messages
- Test all CTA buttons on mobile and desktop
- Consider user experience when opening WhatsApp 