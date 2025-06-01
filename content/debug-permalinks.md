---
title: "Debug Permalinks"
layout: "simple"
---

Hugo Version: {{ hugo.Version }}

Supported permalink tokens:
- :year
- :month  
- :day
- :title
- :slug
- :filename
- :section

Current taxonomies:
{{ range .Site.Taxonomies.categories }}
- {{ .Page.Title }} → {{ .Page.RelPermalink }}
{{ end }}