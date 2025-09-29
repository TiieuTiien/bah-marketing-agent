# Evaluation Sample Size Plan for Multi-Agent Book Review System

## 1. Goals
- Estimate average performance of the book review agents reliably.
- Detect meaningful differences between versions of the system.
- Stay within quota limits while maintaining statistical validity.

---

## 2. Recommended Sample Sizes

| Scenario | Approx. N | Purpose |
|----------|-----------|---------|
| **Sanity check** | 30–50 | Quick pilot to check pipeline, calibrate judge, estimate variance. |
| **Baseline (minimum)** | 200 | Coarse evaluation when quota is tight. |
| **Recommended** | 400 | ±0.1 margin on mean scores; sufficient for small effect detection. |
| **Rigorous** | 400–1000 | Strong confidence; use for release readiness or critical decisions. |

**Rule of thumb:** start with 400 stratified books. If limited by quota, 200 is acceptable for early experiments.

---

## 3. Statistical Justification
- **Mean estimation formula:**
  \[ n = (Z * σ / E)^2 \]
  - 95% confidence → Z=1.96
  - σ ≈ 1 (on 0–5 rubric)
  - Margin of error E = 0.1 → n ≈ 385 → use 400.

- **Detecting differences:**
  \[ n = ((Z_{α/2} + Z_{β}) * σ / δ)^2 \]
  - With σ=1, δ=0.2 → ~196 per group (≈392 total).

- **Proportions (exact match, failures):**
  Worst-case p=0.5, margin E=0.05 → n ≈ 385.

---

## 4. Sampling Strategy
Use **stratified sampling** instead of random:
- Genre (fiction, non-fiction, sci-fi, romance, etc.).
- Book length / review length.
- Popularity buckets (bestsellers vs. niche).
- Fact-heavy vs. opinion-driven content.
- (Optional) Language or region.

**Example:** For 400 books across 8 genres → 50 per genre, split by popularity.

---

## 5. Evaluation Workflow
1. **Pilot (50 books)**
   - Stratified sample.
   - Generate reviews, collect judge scores, BLEU/ROUGE, latency, failures.
   - Compute observed σ.

2. **Recompute required N**
   - Plug σ into formulas.
   - Adjust target N accordingly.

3. **Main evaluation (200–400 books)**
   - Use paired design if comparing two models (reduces required N).
   - Use response flipping and multi-sampling if budget allows.

4. **Human calibration (50–100 books)**
   - Ensure judge-model alignment.

---

## 6. Cost & Quota Management
- Judge multi-sampling increases cost (sampling_count × N).
- Pairwise with flipping doubles judge calls.
- Balance pilot vs. full run carefully.

---

## 7. Checklist
- [ ] Run 50-book pilot.
- [ ] Compute observed σ.
- [ ] Decide target margin/error or effect size.
- [ ] Select final N (200–400 typical).
- [ ] Stratify by genre/length/popularity.
- [ ] Run main evaluation.
- [ ] Spot-check with human ratings.

