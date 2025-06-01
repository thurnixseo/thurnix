---
title: "Test Debug"
layout: "simple"
---

**Hugo Version:** {{ hugo.Version }}

**Current Categories:**
{{ range .Site.Taxonomies.categories }}
- **{{ .Page.Title }}** → {{ .Page.RelPermalink }} ({{ .Count }} posts)
{{ end }}

**Permalink Config Test:**
{{ with .Site.Config.Permalinks }}
- Categories: {{ .categories }}
- Tags: {{ .tags }}
{{ end }}

**Sample Posts with Categories:**
{{ range first 3 (where .Site.RegularPages "Params.categories" "!=" nil) }}
- **{{ .Title }}** → Categories: {{ delimit .Params.categories ", " }}
{{ end }}