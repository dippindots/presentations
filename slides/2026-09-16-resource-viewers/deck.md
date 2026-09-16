---
marp: true
theme: presentations
title: From One Viewer to Many
paginate: true
header: "cBioPortal"
footer: "Imaging resources and viewers"
---

# From one viewer to many

Generalizing the H&E slide work

What Ray showed is **one viewer for one data type**.
We generalized it, so a study can bring its own images and its own viewer.

The first integration: the **IDC viewer**, from the ITCR side project.

---

## Why: finding the right image

- Imaging lives outside the portal — you leave to look, and you cannot tell which images are worth opening
- TCGA BRCA alone has **3,074 slides across 1,084 patients**
- Without description, that is a list of 3,000 links

> A researcher cannot ask *"show me slides with high tumor content"*.
> They can only scroll.

---

## Demo

**BRCA study → Slide Microscopy tab**

1. Filter: **Tumor Cells > 70%**, **Section Location = TOP**
2. Sort, add columns, narrow further
3. Click through — the **IDC viewer** opens on that slide

Eleven attributes on this study, all filterable.
None of them hardcoded in the portal.

---

## How it generalizes: curation, not code

- Curators attach **metadata to each image** while curating the study
- A small **contract** declares how each attribute behaves:
  display name, description, type, filterable, shown by default
- The portal builds the table, the filters, and the viewer link

**Adding a viewer is now a curation step, not an engineering project.**

---

## Credit and what is next

**Ramya** generated the IDC metadata that makes filtering and sorting possible.
Without it, none of the above exists.

- ITCR side project on Imaging Data Commons data
- Next: more viewers, more studies

Questions?
