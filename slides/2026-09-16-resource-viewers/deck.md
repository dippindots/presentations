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

<!--
~45s

Ray just showed the new slide viewer. The thing that makes it valuable is the
metadata it carries about each image.

The portal couldn't store that. Until now a resource was essentially a name and
a link — there was nowhere to put "this slide is 90% tumor nuclei".

So we changed the portal to hold arbitrary metadata per image. And rather than
solve it only for this viewer, we generalized it, so any future viewer plugs in
the same way.

The example I'll show is the ITCR set-aside project, which integrates IDC
imaging into the portal.
-->

---

## The example: IDC images, via the ITCR set-aside project

<p class="lead">The images live in <strong>IDC</strong>. The descriptions live in <strong>GDC</strong>. Neither side joins them.</p>

![width:620](assets/idc_viewer.png)

<p class="tight"><strong>Ramya</strong> pulled the metadata from GDC and correlated it to the IDC slides. That correlation is what the portal curates — without it there is nothing to filter on.</p>

<!--
~60s

The images come from Imaging Data Commons.

The important part: the descriptive metadata is NOT in IDC. IDC does not carry
it. For TCGA it lives in GDC — a different source entirely.

Ramya pulled that metadata from GDC and correlated it to the IDC slides. That
correlation is the thing the portal curates, and it is what everything else on
these slides depends on. Without it there is literally nothing to filter on.

If asked about this screenshot: it illustrates the metadata that correlates to
a given slide. It is not something the IDC viewer displays.
-->

---

## Before: a list of links

<p class="lead">Every row described as "Slide Microscopy". Nothing to tell one image from another.</p>

![width:1000](assets/previous_design.png)

<p class="tight">A researcher cannot ask <em>"show me slides with high tumor content"</em> — they can only scroll.</p>

<!--
~45s

This is the same study before the change.

Look at the Description column — every single row says "Slide Microscopy".
That is all we could store. Over a thousand rows of it.

So you cannot tell one image from another, which means you cannot choose. The
only way through is to open them one at a time and look.
-->

---

## After: every image described, sortable and filterable

<p class="lead">Same study — 3,074 slides, 11 attributes. Filtered here to <strong>487 slides across 450 patients</strong>.</p>

![width:960](assets/filtering.png)

<!--
~75s  — this is the payoff slide, slow down here

Same study, now described. 3,074 slides, eleven attributes on each one.

Every column is sortable and filterable. Categories like section location, and
numeric ranges like percent tumor cells — that is the slider on the right.

In this screenshot it is filtered down to 487 slides across 450 patients.

That is the difference between browsing and asking a question. A researcher can
now say "show me slides with high tumor content and low necrosis" and get an
answer in a few clicks, instead of scrolling three thousand links.
-->

---

## How it generalizes: curation, not code

![flow width:1050](assets/flow.svg)

<p class="tight">Curators declare the metadata and how each attribute behaves — display name, type, filterable, shown by default. <strong>Adding a viewer is a curation step, not an engineering project.</strong></p>

<!--
~55s

How this generalizes.

The curator supplies three things: links to the images, the metadata, and a
small contract that says how each attribute should behave — what to call it,
whether it is a number, whether it can be filtered, whether it shows by default.

The portal builds the table, the filters, and the link out to the viewer.

The key point is the line at the bottom: the portal never learns about a
specific viewer. It only knows what the curator declared. So adding the next
viewer is a curation step, not an engineering project.

And again — thanks to Ramya, the GDC-to-IDC correlation is what made this
example possible.
-->
