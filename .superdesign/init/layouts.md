# Shared layouts

Every page wraps with `header.html` (document chrome + sidebar) and `footer.html` (scripts).

## Document header + sidebar
File: `site/layouts/partials/header.html`

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"{{with .Site.LanguageCode}} xml:lang="{{.}}" lang="{{.}}"{{end}}>
<head>
  <link href="http://gmpg.org/xfn/11" rel="profile">
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  {{ .Hugo.Generator }}
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  {{ if .IsHome }}
  <title>{{ .Site.Title }}</title>
  {{ else }}
  <title>{{ .Title }} &middot; {{ .Site.Title }}</title>
  {{ end }}
  <link rel="stylesheet" href="/css/main.css">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/apple-touch-icon-144-precomposed.png">
  <link rel="shortcut icon" href="/img/favicon.png">
  <link href="{{ .RSSLink }}" rel="alternate" type="application/rss+xml" title="{{ .Site.Title }}" />
</head>
<body class="{{ .Section | urlize }}">
{{ partial "sidebar" . }}
```

## Sidebar
File: `site/layouts/partials/sidebar.html`

Renders a fixed dark sidebar (18rem on desktop) with Rock Salt wordmark "Tasty Licks", lead copy, Home + About nav.

```html
<div class="sidebar">
  <div class="container sidebar-sticky">
    <div class="sidebar-about">
      <a href="{{ .Site.BaseURL }}"><h1>{{ .Site.Title }}</h1></a>
      <p class="lead">{{ .Site.Params.description | markdownify }}</p>
    </div>
    <ul class="sidebar-nav">
      <li><a href="/">Home</a> </li>
      {{ range .Site.Menus.main }}
        <li><a href="{{.URL}}"> {{ .Name }} </a></li>
      {{end}}
    </ul>
  </div>
</div>
```

## Footer scripts
File: `site/layouts/partials/footer.html`

```html
<script src="/js/siema.min.js"></script>
<script src="/app.js"></script>
</body>
</html>
```

There is no site-wide footer landmark — only closing scripts.
