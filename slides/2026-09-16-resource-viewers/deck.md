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
.tight { font-size: 0.8em; }
.lead { font-size: 0.9em; margin-bottom: 0.4em; }
</style>

# Supporting the new slide viewer — and the next one

Ray's viewer carries far more per-image metadata than the portal could store.

So we made the portal hold **arbitrary metadata per image** — and generalized it,
so **any future viewer** can plug in the same way.

Current example: the **ITCR set-aside project**, integrating IDC images.

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

- Curators attach **metadata to each image** while curating the study
- A small **contract** declares how each attribute behaves:
  display name, description, type, filterable, shown by default
- The portal builds the table, the filters, and the link into the viewer

**Adding a viewer is a curation step, not an engineering project.**

---

## Current example: IDC images, via the ITCR set-aside project

<p class="lead">The images live in <strong>IDC</strong>. The descriptions live in <strong>GDC</strong>. Neither side joins them.</p>

![width:640](assets/idc_viewer.png)

<p class="tight"><strong>Ramya</strong> pulled the metadata from GDC and correlated it to the IDC slides. That correlation is what the portal curates and makes filterable — without it there is nothing to filter on.</p>
