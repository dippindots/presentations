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

# From one viewer to many

Generalizing the H&E slide work

What Ray showed is **one viewer for one data type**.
We generalized it, so a study can bring its own images and its own viewer.

The first integration: the **IDC viewer**, from the ITCR side project.

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

## Open it: the viewer carries its own metadata

<p class="lead">The portal narrows it down; the IDC viewer opens on that slide with the full image detail.</p>

![width:720](assets/idc_viewer.png)

<p class="tight">Two levels of metadata: <strong>enough to find it</strong> in the portal, <strong>all of it</strong> in the viewer.</p>

---

## How it generalizes: curation, not code

- Curators attach **metadata to each image** while curating the study
- A small **contract** declares how each attribute behaves:
  display name, description, type, filterable, shown by default
- The portal builds the table, the filters, and the viewer link

**Adding a viewer is now a curation step, not an engineering project.**

**Ramya** generated the IDC metadata that makes this possible — without it, none of the above exists.
