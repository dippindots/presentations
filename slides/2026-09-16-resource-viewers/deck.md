---
marp: true
theme: presentations
title: From One Viewer to Many
paginate: true
header: "cBioPortal"
footer: "Imaging resources and viewers"
---

<style>
img { border: 1px solid #e5e7eb; border-radius: 6px; }
img[alt="flow"] { border: none; }
.tight { font-size: 0.8em; }
.lead { font-size: 0.9em; margin-bottom: 0.4em; }
</style>

# Supporting the new slide viewer — and the next one

Ray's viewer carries far more per-image metadata than the portal could store.

So we made the portal hold **arbitrary metadata per image** — and generalized it,
so **any future viewer** can plug in the same way.

Our current example: the **ITCR set-aside project**, integrating IDC images.

---

## The example: IDC images, via the ITCR set-aside project

<p class="lead">The images live in <strong>IDC</strong>. The descriptions live in <strong>GDC</strong>. Neither side joins them.</p>

![width:620](assets/idc_viewer.png)

<p class="tight"><strong>Ramya</strong> pulled the metadata from GDC and correlated it to the IDC slides. That correlation is what the portal curates — without it there is nothing to filter on.</p>

---

## Before: a list of links

<p class="lead">Every row described as "Slide Microscopy". Nothing to tell one image from another.</p>

![width:1000](assets/previous_design.png)

<p class="tight">A researcher cannot ask <em>"show me slides with high tumor content"</em> — they can only scroll.</p>

---

## After: every image described, sortable and filterable

<p class="lead">Same study — 3,074 slides, 11 attributes. Filtered here to <strong>487 slides across 450 patients</strong>.</p>

![width:960](assets/filtering.png)

---

## How it generalizes: curation, not code

![flow width:1050](assets/flow.svg)

<p class="tight">Curators declare the metadata and how each attribute behaves — display name, type, filterable, shown by default. <strong>Adding a viewer is a curation step, not an engineering project.</strong></p>
