# 🟦 PROJECT CHROMA-K: AGENTIC BEAUTY ENGINE (V1.5.1)

## 🧬 Overview
Chroma-K is a 2026-grade colorimetry engine designed for high-precision skin and seasonal analysis. Built with a **Multi-Agent Blackboard Architecture**, it decouples user jitter from data capture to ensure laboratory-grade results on consumer hardware.

### 🤖 Core Agents
1. **The Sentry (App.js):** Continuous pose tracking. Enforces a **0.5s stability window** and a **<5° Yaw gate** before allowing the Analyst to trigger.
2. **The Analyst (App.js):** Hardware-level physics engine. Processes L*a*b* values using a **Gated Multiplicative Confidence** model ($M_p \times [Light + Anchor + Dist]$).
3. **The Arbiter:** Logic-gate that enforces a **0.75 Confidence Floor**. Rejects samples with High Standard Deviation (SD > 12) or geometric distortion.

---

## 🛠️ Technical Stack
- **Framework:** React 18 (Mobile-Optimized)
- **Engine:** MediaPipe FaceMesh (WASM-accelerated)
- **Bridge:** Capacitor JS (iOS Native)
- **Deployment:** TestFlight (v1.5.1 Build)

---

## 🚀 Deployment Instructions (Mobile-Only Path)

### 1. Repository Setup
Ensure the following files are in the root directory:
- `package.json` (Dependencies & Build Scripts)
- `App.js` (The Resilient Engine)
- `manifest.json` (PWA/iOS Metadata)

### 2. Native Build via Codemagic
1. Connect this GitHub repository to [Codemagic.io](https://codemagic.io).
2. Set build target to **iOS (.ipa)**.
3. Use the **Apple Distribution Certificate** stored in your environment secrets.
4. Trigger build. The `.ipa` will automatically push to App Store Connect.

### 3. TestFlight Setup
1. Open **App Store Connect** app on iPhone.
2. Select **Project Chroma-K**.
3. Under the **TestFlight** tab, add your "External Testers" group (Beta 50).
4. Once the build is "Ready to Test," click **Notify Testers**.

---

## ⚖️ Calibration Logic (V1.5.1)
- **Fitzpatrick Type 6:** Applies a **1.15x Weber Multiplier** to contrast ratios when $L^* < 40$.
- **D65 Normalization:** Assumes indirect daylight. If $Delta E > 4$, the engine triggers a **Low Light Reject** (Error_004).
- **Systemic Redness:** Samples temperature from the neck region if the forehead $a^*$ value exceeds 15 (Rosacea/Flush bypass).

---

## 📄 License & Privacy
Copyright © 2026 Chroma-K Beta. All rights reserved. 
*Note: This application processes biometric landmarks locally on-device. No image data is transmitted to external servers.*
